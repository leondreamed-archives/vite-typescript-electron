import process from 'node:process';
import execa from 'execa';

try {
	execa.sync('pnpm exec lint-staged', { stdio: 'inherit' });
} catch {
	process.exit(1);
}
