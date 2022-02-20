import fs from 'fs';
import os from 'os';
import path from 'path';
import { outdent } from 'outdent';
import open from 'open';
import { runCommand } from '../command.js';
import { getPrompt } from '../prompt.js';

export async function createGitHubSshKey() {
	await runCommand(`ssh-keygen -t ed25519 -C 'contact@leonzalion.com'`, {
		stdio: 'inherit',
	});

	await runCommand(`eval "$(ssh-agent -s)"`, { shell: true });

	await fs.promises.writeFile(
		path.join(os.homedir(), '.ssh/config'),
		outdent`
			Host *
			  AddKeysToAgent yes
			  UseKeychain yes
			  IdentityFile ~/.ssh/id_ed25519
		`
	);

	await runCommand('ssh-add -K ~/.ssh/id_ed25519', { shell: true });
	await open('https://github.com/settings/ssh/new');

	const prompt = getPrompt();
	for (;;) {
		// eslint-disable-next-line no-await-in-loop
		const input = await prompt<{ response: string }>([
			{
				type: 'input',
				name: 'response',
				message: 'Enter c to copy SSH key to clipboard, q to quit:',
			},
		]);
		if (input.response === 'c') {
			// eslint-disable-next-line no-await-in-loop
			await runCommand('pbcopy < ~/.ssh/id_ed25519.pub', { shell: true });
			console.info('SSH key was copied to clipboard.');
		} else if (input.response === 'q') {
			break;
		} else {
			console.info('Invalid input.');
		}
	}
}
