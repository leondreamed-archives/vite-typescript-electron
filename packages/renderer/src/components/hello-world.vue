<script setup lang="ts">
import { useMyModule } from '~r/use/modules';

const { helloWorld } = useMyModule();
</script>

<template>
	<p class="text-center">{{ helloWorld() }}</p>
</template>
