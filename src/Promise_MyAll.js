/**
 * @Author       : Pancake
 * @Date         : 2022-04-05 01:03:02
 * @LastEditTime : 2022-04-05 01:22:03
 * @LastEditors  : Pancake
 * @FilePath     : \oktest\handwritten\Promise_MyAll.js
 * @Description  : promise.all
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
