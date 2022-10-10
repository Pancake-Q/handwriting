
type methodType = 'GET' | 'POST';
type dataEnum = 'string' | 'json';
export interface ajaxParams {
    url:string,
    method: methodType,
    async?:true,
    data: Document | XMLHttpRequestBodyInit | null | undefined | string,
    headers:Record<string|number|symbol,string>,
    dataType:dataEnum,
    success:(res:any) => any,
    error:(res:any) => any
}


function queryStringify(obj:any) {
    var str = '';
    for (var k in obj) {
        str += k + '=' + obj[k] + '&';
    }
    return str.slice(0, -1);
}

function ajax(options:ajaxParams) {
    if (Object.prototype.toString.call(options) !== '[object Object]') {
        throw new Error('"options"需要传递一个 Object 类型数据');
    }
    const { url, method, async, data, headers, dataType, success, error } =
        options;
    if (!(method === undefined || /^(get|post)$/i.test(method))) {
        throw new Error('只接受 GET 和 POST 请求');
    }
    if (!(async === undefined || typeof async === 'boolean')) {
        throw new Error('"async" 需要传递一个布尔值');
    }
    if (
        !(
            data === undefined ||
            typeof data === 'string' ||
            Object.prototype.toString.call(data) === '[object Object]'
        )
    ) {
        throw new Error('"data"需要传递一个 String 或者 Object 类型数据');
    }
    if (
        !(
            headers === undefined ||
            Object.prototype.toString.call(headers) === '[object Object]'
        )
    ) {
        throw new Error('"headers" 需要传递一个 Object 数据类型');
    }
    if (!(dataType === undefined || /^(string|json)$/i.test(dataType))) {
        throw new Error('"dataType" 需要传递一个 "string" 或 "json"');
    }
    if (!(success === undefined || typeof success === 'function')) {
        throw new Error('"success" 需要传递一个 Function 数据类型');
    }
    if (!(error === undefined || typeof error === 'function')) {
        throw new Error('"error" 需要传递一个 Function 数据类型');
    }
    const _default = {
        url: url,
        method: method || 'GET',
        async: async ?? true,
        data: data || '',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            ...headers,
        } as Record<string,any>,
        dataType: dataType || 'string',
        success: success || function () {},
        error: error || function () {},
    };
    //data 如果是对象数据类型,转换成查询字符串
    if (typeof data === 'object') _default.data = queryStringify(data);
    //如果是get请求,并且有参数,直接组装url信息
    if (/^get$/i.test(_default.method) && data)
        _default.url += '?' + _default.data;
    //开始请求操作
    const xhr = new XMLHttpRequest();
    xhr.open(_default.method, _default.url, _default.async);
    xhr.onload = function () {
        if (_default.dataType === 'string')
            return _default.success(xhr.responseText);
        try {
            let result = JSON.parse(xhr.responseText);
            _default.success(result);
        } catch (err) {
            _default.error(
                '解析失败 ! 因为后端返回的结果不是 json 格式字符串, 请查证后再试 !!!'
            );
        }
    };
    for (let k in _default.headers)
        xhr.setRequestHeader(k, _default.headers[k]);
    /^get$/i.test(_default.method) ? xhr.send() : xhr.send(_default.data);
}

function pAjax(options:ajaxParams) {
    return new Promise((resolve, reject) => {
        ajax({
            url: options.url,
            data: options.data,
            async: options.async,
            method: options.method,
            headers: options.headers,
            dataType: options.dataType,
            success(res: any) {
                resolve(res);
            },
            error(err: any) {
                reject(err);
            },
        });
    });
}
