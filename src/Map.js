/**
 * @Author       : Pancake
 * @Date         : 2022-03-17 22:36:16
 * @LastEditTime : 2022-03-17 22:47:04
 * @LastEditors  : Pancake
 * @FilePath     : \handwritten\map.js
 * @Description  : 
 */

Array.prototype.myMap=function(callback){
	let result=[]
	this.forEach((value,index)=>{
		result.push(callback(value,index,this))
	})
	return result
}

const arr=[1,2,3]
const result=arr.myMap((item,index,value)=>{
		return item+index
})
console.log(result)