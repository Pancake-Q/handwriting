/**
 * @Author       : Pancake
 * @Date         : 2022-04-03 15:19:50
 * @LastEditTime : 2022-04-03 15:25:16
 * @LastEditors  : Pancake
 * @FilePath     : \oktest\handwritten\Typeof.js
 * @Description  : 
 */

const myTypeof=(value)=>{
	return Object.prototype.toString.call(value)
}