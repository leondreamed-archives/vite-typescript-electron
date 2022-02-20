import type * as myModule from '~p/modules/my-module';

export function useMyModule() {
	return (window as unknown as { myModule: typeof myModule }).myModule;
}
