/**
 * @Author       : Pancake
 * @Date         : 2022-03-24 20:50:32
 * @LastEditTime : 2022-03-24 21:03:42
 * @LastEditors  : Pancake
 * @FilePath     : \handwritten\debounce.js
 * @Description  :
 */

export default function debounce(fn, delay) {
	let timer = null;
	return function () {
		let arg = arguments;
		let context = this;
		timer && clearTimeout(timer);
		timer = setTimeout(function(){
			console.log(this)
			console.log(context)
			fn.apply(context, arg);
		}, delay);
	};
}
