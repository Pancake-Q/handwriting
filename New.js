/**
 * @Author       : Pancake
 * @Date         : 2022-04-03 17:36:58
 * @LastEditTime : 2022-04-04 01:06:07
 * @LastEditors  : Pancake
 * @FilePath     : \oktest\handwritten\New.js
 * @Description  :
 */

// const _new = fn => {
// 	console.log(fn)
// 	const res = {};
// 	res.__proto__ = fn.prototype;
// 	const obj = fn.call(res);
// 	return obj instanceof Object ? obj : res;
// };

// const _new = fn => {
// 	// console.log(fn);
// 	const res = {};
// 	res.__proto__ = fn.prototype;
// 	const obj = fn.call(res);
// 	// return (typeof obj).indexOf('object') > -1 ? obj : res;
// 	return obj instanceof Object ? obj : res;
// };
const _new = function () {
	const object1 = {};
	const Fn = [...arguments].shift();
	object1.__proto__ = Fn.prototype;
	const object2 = Fn.apply(object1, arguments);
	return object2 instanceof Object ? object2 : object1;
};
// console.log(
// 	_new(() => 1),
// 	'arrow'
// );
// console.log(
// 	_new(function a() {
// 		return 1;
// 	})
// );
console.log(_new(()=>{a:1}));
