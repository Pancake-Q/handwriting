const AuthTree = [
	{
		key: 'x',
		children: [
			{
				key: 'y',
				children: [
					{
						key: 'a',
						children: [
							{
								key: 'v',
								children: [
									{
										key: 'z',
										children: [],
									},
								],
							},
						],
					},
				],
			},
		],
	},
];

const find = (key, tree) => {
	let res = [];
	const _find = (key, tree) => {
		tree.forEach(item => {
			if (item['key'] !== key) {
				res.push(item['key']);
				if (item['children']) {
					_find(key, item['children']);
				}
			}
		});
	};
	_find(key, tree);
	return res;
};
const a = find('z', AuthTree);
console.log(a);
