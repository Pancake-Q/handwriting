/**
 * @Author       : Pancake
 * @Date         : 2022-04-05 01:03:02
 * @LastEditTime : 2022-04-05 01:22:03
 * @LastEditors  : Pancake
 * @FilePath     : \oktest\handwritten\Promise_MyAll.js
 * @Description  : promise.all
 */

/**
 * 1. 传入参数为一个空的可迭代对象，则直接进行resolve。
 * 2. 如果参数中有一个promise失败，那么Promise.all返回的promise对象失败
 * 3. 在任何情况下，Promise.all 返回的 promise 的完成状态的结果都是一个数组
 */
 
Promise.myAll = list => {
	return new Promise((resolve, rejected) => {
		let count = 0;
		const resList = [];
		list.forEach(promise => {
			promise
				.then(res => {
					resList.push(res);
					count = count + 1;
					if (list.length === count) {
						resolve();
					}
				})
				.catch(res);
		});
	});
};
