/**
 * @Author       : Pancake
 * @Date         : 2022-04-03 15:26:07
 * @LastEditTime : 2022-04-03 17:32:13
 * @LastEditors  : Pancake
 * @FilePath     : \oktest\handwritten\InstanceOf.js
 * @Description  :
 */

const instanceOf = (obj, targetClass) => {
	console.log(obj.__proto__)
	while (obj.__proto__) {
		if (obj.__proto__.constructor === targetClass) {
			return true;
		}
		obj = obj.__proto__;
	}
	return false;
};
console.log(instanceOf([],Object))
console.log([] instanceof Object)
