function addLargeNum(a, b) {
	// write your code
	a = a.toString();
	b = b.toString();
	let maxLength = Math.max(a.length, b.length);
	a = a.padStart(maxLength, 0);
	b = b.padStart(maxLength, 0);
	let t = 0;
	let f = 0;
	let num = '';
	for (let i = maxLength - 1; i >= 0; i--) {
		t = parseInt(a[i]) + parseInt(b[i]) + f;
		f = Math.floor(t / 10);
		num = (t % 10) + num;
	}
	if (f == 1) {
		num = '1' + num;
	}
	return num;
}
console.log(addLargeNum(1, 100748254740333)); //"9107947509481325"
addLargeNum(1, 2); //"3"
console.log(addLargeNum(1, 2));
