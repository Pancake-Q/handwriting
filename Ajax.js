/**
 * @Author       : Pancake
 * @Date         : 2022-03-23 09:46:46
 * @LastEditTime : 2022-03-23 18:08:33
 * @LastEditors  : Pancake
 * @FilePath     : \handwritten\Ajax.js
 * @Description  : 
 */

GET_URL='/server'
const xhr=new XMLHttpRequest()
xhr.open('GET',GET_URL)
xhr.onreadystatechange=function(){
	if (this.readyState !== 4) return;
	// 当请求成功时
	if (this.status === 200) {
		handle(this.response);
	} else {
		console.error(this.statusText);
	}
}
xhr.onerror=function(){
	console.error(this.statusText)
}
xhr.responseType='json';
xhr.setRequestHeader('Accept','application/json')
xhr.send(null)