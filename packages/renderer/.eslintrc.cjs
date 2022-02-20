const path = require('path');
const createAliases = require('@leonzalion/configs/eslint/alias');

module.exports = {
	env: {
		browser: true,
		node: false,
	},
	extends: ['../../.eslintrc.cjs'],
	parserOptions: {
		project: path.resolve(__dirname, './tsconfig.eslint.json'),
		extraFileExtensions: ['.vue'],
	},
	settings: createAliases({
		'~r': path.resolve(__dirname, './src'),
		'~p': path.resolve(__dirname, '../preload/src'),
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
		'import/extensions': [
			'error',
			{
				ts: 'never',
				js: 'never',
				vue: 'always',
			},
		],
	},
};
