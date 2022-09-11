/**
 * 从第一个元素开始，把当前元素和下一个索引元素进行比较。
 * 如果当前元素大，那么就交换位置，重复操作直到比较到最后一个元素，
 * 那么此时最后一个元素就是该数组中最大的数。
 * 下一轮重复以上操作，但是此时最后一个元素已经是最大数了，
 * 所以不需要再比较最后一个元素，只需要比较到 length - 1 的位置
 * @param {*} list
 * @returns
 */
const bubblesSort = list => {
	const length = list.length;
	if (!length) return [];

	for (let i = 0; i < length; i++) {
		// 注意这里需要 n - i - 1
		for (let j = 0; j < length - i - 1; j++) {
			if (list[j] > list[j + 1]) {
				const temp = list[j + 1];
				list[j + 1] = list[j];
				list[j] = temp;
			}
		}
	}
	return list;
};
