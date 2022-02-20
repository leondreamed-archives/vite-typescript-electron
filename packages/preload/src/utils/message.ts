export function sendMessage(type: string, payload: unknown) {
	window.postMessage(
		JSON.stringify({
			type,
			payload,
		})
	);
}
