/**
 * @Author       : Pancake
 * @Date         : 2022-03-21 17:34:22
 * @LastEditTime : 2022-03-21 22:29:24
 * @LastEditors  : Pancake
 * @FilePath     : \handwritten\inherit.js
 * @Description  :
 */

//原型链继承 共享数据无法传参

// function Parent() {
// 	this.name = ['xiao li', 'xiao wang'];
// }
// function Child(){

// }
// Child.prototype=new Parent()
// const child=new Child()
// child.name.push('xiao hong')
// console.log(child.name)
// const child1=new Child()
// child1.name.push('xiao hua')
// console.log(child.name,'child')

// 构造函数继承

// function Parent(name){
// 	this.name=['xiao ming','xiao wang']
// }

// function Child(){
// 	Parent.call(this)
// }

// const child=new Child()
// child.name.push('xiao hong')
// console.log(child.name)
// const child1=new Child()
// child1.name.push('xiao li')
// console.log(child1.name)

// 组合继承

// function Parent(name) {
// 	this.name=name
// }
// function Child(name) {
// 	Parent.call(this,name);
// }
// Child.prototype = new Parent();

// const child=new Child('xiao wang')
// console.log(child.name)

// 原型式继承

// function createObj(o){
// 	function F(){}
// 	F.prototype=o
// 	return new F();
// }

// const person={
// 	name:'xiao wang'
// }

// const person1 = createObj(person)

// console.log(person1.name)

//继承式组合继承

// function createObj(o){
// 	let clone=Object.create(o);
// 	return clone
// }

//寄生组合式继承

function Parent(){
	this.name='xiao wang'
}
function Child(){
		Parent.call(this)
}

function object(o) {
	function F() {}
	F.prototype = o;
	return new F();
}

function prototype(child, parent) {
	let prototype = object(parent.prototype);
	prototype.constructor = child;
	child.prototype = prototype;
}
prototype(Child,Parent)
let child=new Child()

console.log(child.name)