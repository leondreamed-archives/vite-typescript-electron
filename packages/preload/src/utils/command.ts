import type { Buffer } from 'buffer';
import type { Options as ExecaOptions } from 'execa';
import execa from 'execa';
import { sendMessage } from './message.js';

export async function runCommand(command: string, options?: ExecaOptions) {
	// Notifies the renderer process about the command
	sendMessage('running-command', command);

	const child = execa.command(command, options);

	child.stderr?.on('data', (data: Buffer) => {
		sendMessage('command-output', data.toString());
	});

	child.stdout?.on('data', (data: Buffer) => {
		sendMessage('command-output', data.toString());
	});

	// Wait for child to finish running
	await child;
}
