/**
 * @Author       : Pancake
 * @Date         : 2022-03-20 16:18:16
 * @LastEditTime : 2022-03-20 19:24:04
 * @LastEditors  : Pancake
 * @FilePath     : \handwritten\promise.js
 * @Description  :
 */

class myPromise {
	static PENDING = 'pending';
	static FULFILLED = 'fulfilled';
	static REJECTED = 'rejected';
	constructor(func) {
		this.PromiseState = myPromise.PENDING;
		this.PromiseResult = null;
		this.onFulfilledCallbacks = [];
		this.onRejectedCallbacks = [];
		try {
			func(this.resolve.bind(this), this.reject.bind(this));
		} catch (error) {
			this.reject(error);
		}
	}
	resolve(result) {
		if (this.PromiseState === myPromise.PENDING) {
			setTimeout(() => {
				this.PromiseState = myPromise.FULFILLED;
				this.PromiseResult = result;
				this.onFulfilledCallbacks.forEach(callback => {
					callback(result);
				});
			});
		}
	}
	reject(reason) {
		if (this.PromiseState === myPromise.PENDING) {
			setTimeout(() => {
				this.PromiseState = myPromise.REJECTED;
				this.PromiseResult = reason;
				this.onRejectedCallbacks.forEach(callback => {
					callback(reason);
				});
			});
		}
	}
	then(onFulfilled, onRejected) {
		onFulfilled =
			typeof onFulfilled === 'function' ? onFulfilled : value => value;
		onRejected =
			typeof onRejected === 'function'
				? onRejected
				: reason => {
						throw reason;
				  };
		const promise=new myPromise((resolve,reject)=>{
			if (this.PromiseState === myPromise.PENDING) {
				this.onFulfilledCallbacks.push(onFulfilled);
				this.onRejectedCallbacks.push(onRejected);
			}
			if (this.PromiseState === myPromise.FULFILLED) {
				setTimeout(() => {
					let x=onFulfilled(this.PromiseResult)
					resolvePromise(promise,x,resolve,reject)
				});
			}
			if (this.PromiseState === myPromise.REJECTED) {
				setTimeout(() => {
					let x=onRejected(this.PromiseResult)
					resolvePromise(promise,x,resolve,reject)
				});
			}
		})
		return promise
	}
}






console.log('1');
let promise = new myPromise((res, rej) => {
	console.log('2');
	res('she');
	// rej('he')
});
promise.then(
	res => console.log(res),
	rej => console.log(rej)
);
console.log('3');
