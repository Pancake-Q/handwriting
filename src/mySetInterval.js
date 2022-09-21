function mySetInterval(fn, t) {
	let timerId = null;
	function interval() {
		fn();
		timerId = setTimeout(interval, t); // 递归调用
	}
	timerId = setTimeout(interval, t); // 首次调用
	return {
		// 利用闭包的特性 保存timerId
		cancel: () => {
			clearTimeout(timerId);
		},
	};
}
