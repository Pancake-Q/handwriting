Array.prototype.myFilter = function (callback, context = window) {
	let len = this.length;
	(newArr = []), (i = 0);

	for (; i < len; i++) {
		if (callback.apply(context, [this[i], i, this])) {
			newArr.push(this[i]);
		}
	}
	return newArr;
};
