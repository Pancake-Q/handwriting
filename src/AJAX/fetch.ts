import axios from "axios";
import getRequestId from "request-id";
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

interface Interceptors {
    // 请求拦截器
    requestInterceptors?: (config: RequestConfig) => RequestConfig;
    requestInterceptorsCatch?: (err: any) => any;
    // 响应拦截器
    responseInterceptors?: (config: AxiosResponse) => AxiosResponse;
    responseInterceptorsCatch?: (err: any) => any;
}

// 扩展AxiosRequestConfig，新增自定义字段
interface RequestConfig extends AxiosRequestConfig {
    platformID?: string;
    interceptors?: Interceptors;
    disableCache?: boolean;
    lock?: boolean;
    protocol?: IProtocol;
    successCode?: number;
    errorHandle?: { [propName: string]: (msg: string) => void };
    defError?: (msg: string) => void;
    requestId?: (config: RequestConfig) => void;
}

interface IProtocol {
    data: string;
    msg: string;
    code: string;
}

class Fetch {
    instance: AxiosInstance;
    interceptorsObj: Interceptors | undefined;
    options: RequestConfig;
    constructor(config: RequestConfig) {
        // 合并平台定制化的参数
        this.options = Object.assign(
            {
                // 平台ID，默认为空，需各个平台覆写
                platformID: "",
                // 因各个平台返回格式不一致，这里统一处理
                protocol: {
                    data: "data",
                    msg: "msg",
                    code: "code"
                },
                // 成功code码
                successCode: 0,
                // 平台单独处理错误code
                errorHandle: {},
                // 错误默认处理
                defError: this.defError,
                // 设置requestId
                requestId: this.setRequestId
            },
            config
        );
        // 创建axios实例
        this.instance = axios.create(this.options);
        // 实例的拦截器
        this.interceptorsObj = config.interceptors;

        // 类的请求拦截器
        this.instance.interceptors.request.use(
            (config: RequestConfig) => {
                // 处理requestId逻辑，mock数据不可以加requestId
                if (!config.headers?.requestid && config.url?.indexOf('moco.okzhihui.cn') == -1) {
                    config.platformID && config.requestId && Object.assign(config.headers || {}, config.requestId(config));
                }
                // 配置get时间戳，是否需要缓存
                config.method == "get" &&
                    config.disableCache &&
                    Object.assign(config.params, this.setDataTime());

                return config;
            },
            (err: any) => err
        );

        // 实例请求拦截器
        this.instance.interceptors.request.use(
            this.interceptorsObj?.requestInterceptors,
            this.interceptorsObj?.requestInterceptorsCatch
        );

        // 实例响应拦截器
        this.instance.interceptors.response.use(
            this.interceptorsObj?.responseInterceptors,
            this.interceptorsObj?.responseInterceptorsCatch
        );

        // 类的响应拦截器
        this.instance.interceptors.response.use(
            (res: AxiosResponse) => {
                const response = res.data;
                const _p = this.options.protocol;
                const code = this.getField(response, _p?.code);
                const msg = this.getField(response, _p?.msg);
                const data = this.getField(response, _p?.data);
                if (code === this.options.successCode) {
                    return data;
                } else {
                    // 根据code处理的逻辑应该在外层处理
                    // 如果有定义的处理方式，则执行；如无，执行默认方法
                    if (
                        this.options.errorHandle &&
                        this.options.errorHandle[code]
                    ) {
                        this.options.errorHandle[code](msg);
                    } else {
                        this.options.defError && this.options.defError(msg);
                    }
                    return Promise.reject(response);
                }
            },
            (err: any) => {
                this.options.defError && this.options.defError("error");
                return Promise.reject(err.response);
            }
        );
    }

    /**
     * 给接口加时间戳 避免缓存
     * @return   {Object}  添加时间戳后的参数对象
     */
    private setDataTime() {
        const _data = {
            _: +new Date()
        };
        return _data;
    }

    // 接口锁ID
    private _lock: any = new Map();
    /**
     * 获取lockID
     * @param url
     * @returns
     */
    private _getLockId(config: RequestConfig) {
        const lock = config.lock,
            url = config.url || "",
            lock_id = lock ? url : "";
        return lock_id;
    }
    /**
     * 是否锁定
     * @param lock_id
     * @returns
     */
    private isLock(lock_id: string) {
        if (this._lock.get(lock_id)) {
            return true;
        } else {
            return false;
        }
    }
    /**
     * 接口加锁
     * @param lock_id
     */
    private lock(lock_id: string) {
        this._lock.set(lock_id, true);
    }
    /**
     * 接口解锁
     * @param lock_id
     */
    private unLock(lock_id: string) {
        this._lock.delete(lock_id);
    }
    /**
     * 获取protocol字段
     * @param res
     * @param field
     * @returns
     */
    private getField(res: any, field: any) {
        return res[field];
    }
    /**
     * 通用错误处理
     * @param msg
     */
    private defError(msg: string) {
        console.log(`接口错误：${msg || ``}`);
    }
    // 设置requestid
    private setRequestId(config: RequestConfig) {
        return { requestid: getRequestId(config.platformID) };
    }
    /**
     * 删除传入的参数,避免覆盖默认参数
     * @param config
     */
    private deleteParams(config: RequestConfig) {
        delete config?.url;
        delete config?.params;
        delete config?.method;
    }

    request(config: RequestConfig): Promise<any> {
        // 接口是否加锁
        let lock_id = "";
        if (config?.lock) {
            lock_id = this._getLockId(config);
            if (this.isLock(lock_id)) {
                return new Promise(() => ({}));
            }
            // 加锁
            this.lock(lock_id);
        }
        return new Promise((resolve, reject) => {
            this.instance
                .request(config)
                .then(res => {
                    resolve(res);
                })
                .catch(err => {
                    reject(err);
                })
                .finally(() => {
                    // 解锁
                    this.unLock(lock_id);
                });
        });
    }
    /**
     * get请求
     * @param url     请求地址
     * @param params  传参
     * @param config    扩展参数
     * @returns
     */
    get(
        url: string,
        params?: unknown,
        config: RequestConfig = {}
    ): Promise<any> {
        this.deleteParams(config);
        const _args = {
            url,
            params,
            method: "get"
        };
        return this.request(Object.assign(_args, config));
    }

    /**
     * post请求
     * @param url 请求地址
     * @param data 传参
     * @param config 扩展参数
     * @returns
     */
    post(url: string, data: unknown, config: RequestConfig = {}): Promise<any> {
        this.deleteParams(config);
        const _args = {
            url,
            data,
            method: "post"
        };
        return this.request(Object.assign(_args, config));
    }
    /**
     * all
     * @param promises
     * @returns
     */
    all(promises: unknown[]): any {
        return axios.all(promises);
    }
}

export default Fetch;
