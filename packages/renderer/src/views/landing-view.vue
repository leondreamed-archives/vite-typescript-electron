<script setup lang="ts">
import AppTerminal from '~r/components/app-terminal.vue';
import { useBootstrapModule } from '~r/use/modules';

const { startBootstrap } = useBootstrapModule();
</script>

<template>
	<AppTerminal />
	<button @click="startBootstrap">Start bootstrap!</button>
</template>
