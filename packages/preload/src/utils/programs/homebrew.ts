import { runCommand } from '../command.js';

export async function installHomebrew() {
	await runCommand(
		'/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"'
	);
}
