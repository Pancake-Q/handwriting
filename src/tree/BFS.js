const bfs = (root)=>{
  const stack = [root];
  while (stack.length > 0){
    const node = stack.shift();
    node.children.forEach((item)=> stack.push(item));
    console.log(node.value);
  }
}

bfs(tree);