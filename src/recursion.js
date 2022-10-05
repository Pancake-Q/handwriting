// 有一个嵌套层次很深的对象，key 都是 a_b 形式 ，需要改成 ab 的形式，注意不能用递归。

const a = {
	a_y: {
		a_z: {
			y_x: 6,
		},
		b_c: 1,
	},
};
// {
//   ay: {
//     az: {
//       yx: 6
//     },
//     bc: 1
//   }
// }
const recursion = obj => {
	const keys = Object.keys(obj);
	keys.forEach(key => {
		const newKey = key.replace(/_/g, '');
		obj[newKey] = recursion(obj[key]);
		delete obj[key];
	});
	return obj;
};
