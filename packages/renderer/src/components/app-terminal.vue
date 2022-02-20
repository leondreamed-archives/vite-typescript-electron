<script setup lang="ts">
import { onMounted } from 'vue';
import { Terminal } from 'xterm';
import 'xterm/css/xterm.css';

const term = new Terminal();
const terminalEl = $ref<HTMLDivElement>();

window.addEventListener('message', (event) => {
	if (event.source === window) {
		event.data
	}

})

onMounted(() => {
	term.open(terminalEl);
});
</script>

<template>
	<div ref="terminalEl"></div>
</template>
