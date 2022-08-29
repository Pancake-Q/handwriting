/**
 * @Author       : Pancake
 * @Date         : 2022-04-04 00:38:19
 * @LastEditTime : 2022-04-04 01:06:04
 * @LastEditors  : Pancake
 * @FilePath     : \oktest\handwritten\Delay.js
 * @Description  : set time out function
 */

const delay = time => {
	return Promise.resolve('two seconds')
		.then(res => setTimeout(() => console.log(res), time * 1000))
		.catch(err => console.log(err));
};
console.log(delay(3));
