/* eslint-disable @typescript-eslint/naming-convention, @typescript-eslint/triple-slash-reference */
/// <reference types="vite/client" />

interface ImportMetaEnv {
	/**
	 * The value of the variable is set in scripts/watch.js and depend on packages/main/vite.config.ts
	 */
	readonly VITE_DEV_SERVER_URL: undefined | string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
