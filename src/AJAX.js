var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
function AJAX() {
	let xhr = new XMLHttpRequest();
	xhr.open('get', 'https://www.baidu.com');
	console.log(xhr);
	xhr.onreadystatechange = () => {
		if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 300) {
			console.log(xhr,'status');

			let string = xhr.responseText;
			// let object = JSON.parse(string);
			console.log(string);
		}
	};
	xhr.send();
}
AJAX();
