import type * as bootstrapModule from '~p/modules/bootstrap';

export function useBootstrapModule() {
	return (window as unknown as { bootstrapModule: typeof bootstrapModule })
		.bootstrapModule;
}
