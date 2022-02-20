const path = require('path');

module.exports = {
	extends: [require.resolve('@leonzalion/configs/eslint')],
	parserOptions: { project: [path.resolve(__dirname, 'tsconfig.eslint.json')] },
	rules: {
		'unicorn/prefer-node-protocol': 'off',
		'unicorn/prefer-module': 'off'
	},
};
