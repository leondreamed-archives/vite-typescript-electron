import type * as bootstrapModule from '~p/modules/bootstrap';
import type * as stdinModule from '~p/modules/stdin';

export function useBootstrapModule() {
	return (window as unknown as { bootstrapModule: typeof bootstrapModule })
		.bootstrapModule;
}

export function useStdinModule() {
	return (window as unknown as { stdinModule: typeof stdinModule }).stdinModule;
}
