import process from 'node:process';
import execa from 'execa';

try {
	execa.sync('pnpm run tc', { stdio: 'inherit' });
} catch {
	process.exit(1);
}
