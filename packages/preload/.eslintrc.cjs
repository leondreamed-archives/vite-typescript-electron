const path = require('path');
const createAliases = require('@leonzalion/configs/eslint/alias');

module.exports = {
	extends: ['../../.eslintrc.cjs'],
	parserOptions: {
		project: path.resolve(__dirname, './tsconfig.eslint.json'),
		extraFileExtensions: ['.vue'],
	},
	settings: createAliases({
		'~p': path.resolve(__dirname, './src'),
		'~m': path.resolve(__dirname, '../main/src'),
		'~r': path.resolve(__dirname, '../renderer/src'),
	}),
	overrides: [
		{
			files: '*.cjs',
			env: {
				browser: false,
				node: true,
			},
		},
	],
	rules: {
		'unicorn/no-process-exit': 'off',
	},
};
