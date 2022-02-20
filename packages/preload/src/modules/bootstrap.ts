import { runCommand } from '~p/utils/command.js';
import { getPrompt, pressToContinue } from '~p/utils/prompt.js';

export async function startBootstrap() {
	await runCommand('echo "aloha"');

	const prompt = getPrompt();
	const { name } = await prompt<{ name: string }>({
		name: 'name',
		type: 'input',
		message: 'What is your name?',
	});

	await runCommand(`echo ${name}`);

	await pressToContinue();
	await pressToContinue();
}
