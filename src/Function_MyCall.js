/**
 * @Author       : Pancake
 * @Date         : 2022-04-06 22:22:16
 * @LastEditTime : 2022-04-06 23:05:51
 * @LastEditors  : Pancake
 * @FilePath     : \oktest\handwritten\Function_MyCall.js
 * @Description  :
 */

Function.prototype.myCall = function (context) {
	if (typeof this !== 'function') {
		console.error('type error');
	}
	let args = [...arguments].slice(1);
	let result = null;
	context = context || globalThis;
	context.fn = this;
	result = context.fn(...args);
	delete context.fn;
	return result;
};
const obj = { 0: 'hello', 1: 'world', length: 2 };
console.log(obj);
console.log([].slice.call(obj));
console.log(Array.prototype.slice.myCall(obj), '___');
