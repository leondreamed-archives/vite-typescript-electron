import { contextBridge } from 'electron';
import inquirer from 'inquirer';
import * as bootstrapModule from './modules/bootstrap.js';

(async () => {
	const PressToContinuePrompt = await import('inquirer-press-to-continue');

	inquirer.registerPrompt('press-to-continue', PressToContinuePrompt);

	contextBridge.exposeInMainWorld('bootstrapModule', bootstrapModule);
})();
