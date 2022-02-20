import process from 'process';
import type { WriteStream } from 'tty';
import inquirer from 'inquirer';
import onetime from 'onetime';
import PressToContinuePrompt from 'inquirer-press-to-continue';
import { sendMessage } from '~p/utils/message.js';
import { getStdin } from '~p/modules/stdin.js';

export const getPrompt = onetime(() => {
	const stdout = Object.create(process.stdout) as WriteStream;
	stdout.write = (data) => {
		sendMessage('command-output', data.toString());
		return true;
	};

	const prompt = inquirer.createPromptModule({
		input: getStdin(),
		output: stdout,
	});
	prompt.registerPrompt('press-to-continue', PressToContinuePrompt);
	return prompt;
});

export async function askUser(message: string, fn: () => void | Promise<void>) {
	const prompt = getPrompt();

	const { response } = await prompt<{ response: boolean }>({
		name: 'response',
		type: 'confirm',
		message,
	});

	if (response) {
		await fn();
	}
}

export async function pressToContinue(message?: string) {
	const prompt = getPrompt();

	if (message === undefined) {
		await prompt({
			name: 'response',
			type: 'press-to-continue',
			enter: true,
		});
	} else {
		await prompt({
			name: 'response',
			pressToContinueMessage: `${message}, press enter to continue...`,
			type: 'press-to-continue',
			enter: true,
		});
	}
}
