export function postMessage(type: string, payload: unknown) {
	window.postMessage(
		JSON.stringify({
			type,
			payload,
		})
	);
}
