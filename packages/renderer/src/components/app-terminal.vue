<script setup lang="ts">
import { onMounted } from 'vue';
import { Terminal } from 'xterm';
import 'xterm/css/xterm.css';

const term = new Terminal();
const terminalEl = $ref<HTMLDivElement>();

onMounted(() => {
	term.open(terminalEl);

	window.addEventListener('message', (event) => {
		if (event.source === window) {
			try {
				const data = JSON.parse(event.data) as {
					type: string;
					payload: unknown;
				};

				if (data.type === 'command-output') {
					term.write(data.payload as string);
				}
			} catch {}
		}
	});
});
</script>

<template>
	<div ref="terminalEl"></div>
</template>
