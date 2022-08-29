/**
 * @Author       : Pancake
 * @Date         : 2022-04-04 00:51:05
 * @LastEditTime : 2022-04-04 01:08:32
 * @LastEditors  : Pancake
 * @FilePath     : \oktest\handwritten\Console.js
 * @Description  : console methods
 */

console.clear(); //Console was clered
console.count(); //Console was count++
console.countReset(); //Console was count clered
console.debug(); //打印bug 此特性在 Web Worker 中可用
console.dir(); //打印路径
console.assert(); //断言检测
console.dirxml(); //打印XML信息
console.error(); //打印错误
console.group(); //打印组开始
console.groupCollapsed();
console.groupEnd(); //打印组结束
console.info(); //打印咨询
console.log(); //打印
console.table(); //打印表格
console.time(); //打印开始时间
console.timeEnd(); //打印结束时间
console.timeLog(); //打印此时时间
console.timeStamp(); //该特性是非标准的，请尽量不要在生产环境中使用它！  此特性在 Web Worker 中可用
console.trace(); //当前执行的代码在堆栈中的调用路径。
console.warn(); //警告
// console.memory(); //当前内存的使用情况
const users = [ 
	{ 
		 "first_name":"Harcourt",
		 "last_name":"Huckerbe",
		 "gender":"Male",
		 "city":"Linchen",
		 "birth_country":"China"
	},
	{ 
		 "first_name":"Allyn",
		 "last_name":"McEttigen",
		 "gender":"Male",
		 "city":"Ambelókipoi",
		 "birth_country":"Greece"
	},
	{ 
		 "first_name":"Sandor",
		 "last_name":"Degg",
		 "gender":"Male",
		 "city":"Mthatha",
		 "birth_country":"South Africa"
	}
]

console.table(users, ['first_name', 'last_name', 'gender','city','birth_country']);
