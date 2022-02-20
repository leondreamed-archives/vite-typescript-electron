<script setup lang="ts">
import { onMounted } from 'vue';
import { Terminal } from 'xterm';
import { useStdinModule } from '~r/use/modules';
import 'xterm/css/xterm.css';

const term = new Terminal();
const terminalEl = $ref<HTMLDivElement>();

const { writeStdin } = useStdinModule();
onMounted(() => {
	term.open(terminalEl);

	term.onKey((e: { key: string; domEvent: KeyboardEvent }) => {
		const ev = e.domEvent;
		const printable = !ev.altKey && !ev.ctrlKey && !ev.metaKey;

		if (ev.keyCode === 13) {
			term.write('\r\n$ ');
		} else if (ev.keyCode === 8) {
			term.write('\b \b');
		} else if (printable) {
			term.write(e.key);
		}
	});

	term.onData((data) => {
		if (data.codePointAt(0) !== 127) {
			writeStdin(data);
		}
	});

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
