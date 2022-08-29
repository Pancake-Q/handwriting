/**
 * @Author       : Pancake
 * @Date         : 2022-04-06 22:04:32
 * @LastEditTime : 2022-04-06 22:09:31
 * @LastEditors  : Pancake
 * @FilePath     : \oktest\handwritten\Promise_Myrace.js
 * @Description  :
 */

Promise.myRace = list => {
	return new Promise((resolve, reject) => {
		list.forEach(promise => {
			promise.then(resolve,reject).catch(reject);
		});
	});
};
