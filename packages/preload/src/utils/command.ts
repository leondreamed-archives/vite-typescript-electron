import type { Buffer } from 'buffer';
import type { Options as ExecaOptions } from 'execa';
import execa from 'execa';
import { postMessage } from './message.js';

export async function runCommand(command: string, options?: ExecaOptions) {
	// Notifies the renderer process about the command
	postMessage('running-command', command);

	const child = execa.command(command, options);

	child.stderr?.on('data', (data: Buffer) => {
		postMessage('command-output', data.toString());
	});

	child.stdout?.on('data', (data: Buffer) => {
		postMessage('command-output', data.toString());
	});

	// Wait for child to finish running
	await child;
}
