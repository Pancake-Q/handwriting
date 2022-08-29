const _once = fn => {
	let flog = false;
	let res = null;
	console.log(fn, 11111);
	return function () {
		if (flog) {
			return res;
		}
		flog = true;
		return (res = fn.apply(this, arguments));
	};
};

_once(() => {
	console.log(12);
	return 3;
})();
