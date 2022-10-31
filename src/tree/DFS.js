const tree = {
	value: 'a',
	children: [
		{
			value: 'b',
			children: [
				{
					value: 'd',
					children: [
						{
							value: 'e',
							children: [],
						},
					],
				},
			],
		},
		{
			value: 'c',
			children: [
				{
					value: 'f',
					children: [],
				},
				{
					value: 'g',
					children: [],
				},
			],
		},
	],
};

const dfs = node => {
	console.log(node.value);
	node.children.forEach(dfs);
};

dfs(tree);
