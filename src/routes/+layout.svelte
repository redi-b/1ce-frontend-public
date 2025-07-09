<script lang="ts">
	import '../app.css';

	import { ModeWatcher } from 'mode-watcher';

	let { children } = $props();
</script>

<ModeWatcher />

<div class="flex h-screen w-full flex-col items-center justify-center gap-8">
	<div class="absolute top-4 left-4 flex items-center gap-2">
		<img src="favicon.svg" width="32" height="32" alt="" />
	</div>
{@render children()}
