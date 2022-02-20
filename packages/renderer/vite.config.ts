import { builtinModules } from 'module';
import path from 'path';
import fs from 'fs';
import process from 'process';
import vue from '@vitejs/plugin-vue';
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
	resolve: {
		alias: {
			'~r': path.join(PACKAGE_ROOT, './src'),
		},
	},
	plugins: [
		vue({
			reactivityTransform: true,
		}),
	],
	base: '',
	server: {
		fs: {
			strict: true,
		},
	},
	build: {
		sourcemap: true,
		target: `chrome${chrome}`,
		outDir: 'dist',
		assetsDir: '.',
		rollupOptions: {
			external: [
				...builtinModules,
				...builtinModules.map((moduleName) => `node:${moduleName}`),
			],
		},
		emptyOutDir: true,
		brotliSize: false,
	},
};

export default config;
