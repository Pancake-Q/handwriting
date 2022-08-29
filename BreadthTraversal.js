/**
 * @Author       : Pancake
 * @Date         : 2022-03-22 21:20:50
 * @LastEditTime : 2022-03-22 21:50:22
 * @LastEditors  : Pancake
 * @FilePath     : \handwritten\Breadth_traversal.js
 * @Description  :
 */

const node={
	
}

function wideTraversal(node) {
	var nodes = [];
	var i = 0;
	if (!(node == null)) {
		nodes.push(node);
		wideTraversal(node.nextElementSibling);
		node = nodes[i++];
		wideTraversal(node.firstElementChild);
	}
	return nodes;
}
