import { builtinModules } from 'node:module';
import path from 'node:path';
import process from 'node:process';
import fs from 'node:fs';
import type { UserConfig } from 'vite';

const { chrome } = JSON.parse(
	fs
		.readFileSync(path.join(__dirname, '../../electron-vendors.config.json'))
		.toString()
) as { chrome: string; node: string };

const PACKAGE_ROOT = __dirname;

const config: UserConfig = {
	mode: process.env.MODE,
	root: PACKAGE_ROOT,
	envDir: process.cwd(),
	resolve: {
		alias: {
			'~p': path.join(PACKAGE_ROOT, 'src'),
		},
	},
	build: {
		sourcemap: 'inline',
		target: `chrome${chrome}`,
		outDir: 'dist',
		assetsDir: '.',
		minify: process.env.MODE !== 'development',
		lib: {
			entry: 'src/preload.ts',
			formats: ['cjs'],
		},
		rollupOptions: {
			external: [
				'electron',
				'execa',
				'inquirer',
				'inquirer-press-to-continue',
				...builtinModules,
			],
			output: {
				entryFileNames: '[name].cjs',
			},
		},
		emptyOutDir: true,
		brotliSize: false,
	},
};

export default config;
