/**
 * @Author       : Pancake
 * @Date         : 2022-03-14 18:04:32
 * @LastEditTime : 2022-03-14 19:20:21
 * @LastEditors  : Pancake
 * @FilePath     : \handwritten\reduce.js
 * @Description  :
 */

Array.prototype.myReduce = function (callback, prev) {
	let result = prev;
	this.forEach((item, index) => {
		result = callback(result, item, index, this);
	}, this);
	return result;
};
let arr = [10, 20, 30, 40];

let result2 = arr.myReduce(function (result, item, index) {
	return result + item;
}, []);
console.log(result2, '2');
