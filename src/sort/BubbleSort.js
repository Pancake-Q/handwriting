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
