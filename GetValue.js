/**
 * @Author       : Pancake
 * @Date         : 2022-03-24 20:38:31
 * @LastEditTime : 2022-03-24 20:38:31
 * @LastEditors  : Pancake
 * @FilePath     : \handwritten\getValue.js
 * @Description  :
 */
function get(obj, path, defaultValue) {
	const paths = path.split('.');
	const attr = paths.shift();
	let result = '';
	console.log(paths);
	const reg1 = /^([a-zA-Z]+)$/;
	const getValue = (paths, val) => {
		if (paths.length > 0 && (val !== null || val !== undefined)) {
			result = get(val, path.join('.'));
		}
	};
	console.log(reg1.test(attr));
	if (reg1.test(attr)) {
		let val = obj[attr];
		result = val;
		getValue(paths, val);
	}
}

var obj = {
	a: 1,
	b: {
		c: 2,
		d: [
			{
				e: 3,
			},
		],
	},
};

get(obj, 'a'); //1
get(obj, 'f'); //undefined
get(obj, 'g', 10); // 10
get(obj, 'b.d[0].e'); //3
