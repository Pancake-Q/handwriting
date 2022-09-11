/**
 * 找一个基准大的放右边小的放左边
 * 随机选取一个数组中的值作为基准值，从左至右取值与基准值对比大小。
 * 比基准值小的放数组左边，大的放右边，对比完成后将基准值和第一个比基准值大的值交换位置。
 * 然后将数组以基准值的位置分为两部分，继续递归以上操作
 */

const quickSort = list => {
	// 缓存数组长度
	const length = list.length;
	// 定义 minIndex，缓存当前区间最小值的索引，注意是索引
	let minIndex;
	// i 是当前排序区间的起点
	for (let i = 0; i < length - 1; i++) {
		// 初始化 minIndex 为当前区间第一个元素
		minIndex = i;
		// i、j分别定义当前区间的上下界，i是左边界，j是右边界
		for (let j = i; j < length; j++) {
			// 若 j 处的数据项比当前最小值还要小，则更新最小值索引为 j
			if (list[j] < arr[minIndex]) {
				minIndex = j;
			}
		}
		// 如果 minIndex 对应元素不是目前的头部元素，则交换两者
		if (minIndex !== i) {
			[arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
		}
	}
	return list;
};
