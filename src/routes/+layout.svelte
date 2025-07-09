<script lang="ts">
	import '../app.css';

	import { ModeWatcher } from 'mode-watcher';

	import '@fontsource-variable/inter';
	import '@fontsource-variable/manrope';

	let { children } = $props();
</script>

<ModeWatcher modeStorageKey="1ce-theme" themeStorageKey="1ce-color-scheme" />

<div class="flex h-screen w-full flex-col items-center justify-center gap-8">
	<div class="absolute top-4 left-4 flex items-center gap-2">
		<img src="favicon.svg" width="32" height="32" alt="" />
		<span class="font-logo text-xl font-bold tracking-widest">1ce</span>
	</div>
	{@render children()}
</div>

<style>
	:global(body) {
		font-family: 'Inter Variable', sans-serif;
	}
</style>
