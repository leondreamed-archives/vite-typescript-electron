import inquirer from 'inquirer';

export async function askUser(message: string, fn: () => void | Promise<void>) {
	const { response } = await inquirer.prompt<{ response: boolean }>({
		name: 'response',
		type: 'confirm',
		message,
	});

	if (response) {
		await fn();
	}
}

export async function pressToContinue(message: string) {
	await inquirer.prompt({
		name: 'response',
		pressToContinueMessage: `${message}, press enter to continue...`,
		type: 'press-to-continue',
		enter: true,
	});
}
