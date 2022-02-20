import open from 'open';
import { runCommand } from '../command.js';
import { pressToContinue } from '~p/utils/prompt.js';

export async function installLatex() {
	console.info('Opening the MacTeX download page...');

	// Open the browser for the user to manually download MacTeX
	await open('https://tug.org/mactex/mactex-download.html');
	await pressToContinue("Once you've installed MacTeX");

	// Install some missing perl dependencies for latexindent to work
	await runCommand('cpan File::HomeDir');
	await runCommand('cpan YAML::Tiny');

	// Upgrade all LaTeX packages using tlgmr
	await runCommand('tlmgr update --self');
	await runCommand('tlmgr update --all');
}
