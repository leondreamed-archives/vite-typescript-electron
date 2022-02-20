import stream from 'stream';
import readline from 'readline';
import onetime from 'onetime';

export const getStdin = onetime(() => {
	const duplex = new stream.Duplex({
		write() {
			/* Noop */
		},
		read() {
			/* Noop */
		},
	});

	readline.createInterface({
		input: duplex,
	});

	return duplex;
});

export function writeStdin(data: string) {
	console.log(`Writing ${JSON.stringify(data)} to stdin...`);
	getStdin().emit('keypress', String(data));
}
