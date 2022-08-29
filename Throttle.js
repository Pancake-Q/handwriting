/**
 * @Author       : Pancake
 * @Date         : 2022-03-24 21:07:18
 * @LastEditTime : 2022-03-24 21:26:53
 * @LastEditors  : Pancake
 * @FilePath     : \handwritten\Throttle.js
 * @Description  :
 */

function throttle(fn,delay) {
	let timer = null;
	return function () {
		let context = this;
		let arg = arguments;
		if (!timer) {
			timer=setTimeout(() => {
				fn.apply(context,arg)
				timer=null
			},delay);
		}
	};
}
