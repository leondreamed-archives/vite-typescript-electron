import open from 'open';
import { pressToContinue } from '~p/utils/prompt.js';

export async function downloadGoogleChrome() {
	await open('https://www.google.com/intl/en_ca/chrome/');
	await pressToContinue("Once you've downloaded Google Chrome");
}
