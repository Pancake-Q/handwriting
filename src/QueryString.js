const stringify = data => {
	const pairs = Object.entries(data);
	const qs = pairs
		.map(([k, v]) => {
			let noValue = false;
			if (v === null || v === undefined || typeof v === 'object') {
				noValue = true;
			}
			return `${encodeURIComponent(k)}=${noValue ? '' : encodeURIComponent(v)}`;
		})
		.join('&');
	return qs;
};
const getRequest1 = () => {
	const url = location.search; //获取url中"?"符后的字串
	const theRequest = new Object();
	if (url.indexOf('?') != -1) {
		const str = url.substr(1);
		const strs = str.split('&');
		for (let i = 0; i < strs.length; i++) {
			theRequest[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1]);
		}
	}
	return theRequest;
};
const getRequest2 = () => {
	// var url = new URL('https://example.com?foo=1&bar=2')
	const url = window.location.search; //获取url中"?"符后的字串
	const theRequest = new URLSearchParams(url.search);

	return theRequest;
};

getRequest2();