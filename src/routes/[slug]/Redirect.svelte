<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card/index.js';
	import { AlertCircle, ArrowRight, TriangleAlert } from '@lucide/svelte';

	interface RedirectProps {
		url: string | undefined;
	}

	let { url }: RedirectProps = $props();
	let isConfirmed = $state(false);

	function handleConfirm() {
		isConfirmed = true;
		if (!url) {
			console.error('No URL provided for redirection.');
			return;
		}
		window.location.href = url;
	}
</script>

<Card.Root class="mx-2 max-w-2xl">
	<Card.Header>
		<Card.Title class="mb-2 flex flex-col items-center justify-center gap-2 text-2xl font-bold">
			<AlertCircle class="text-amber-500" />
			<span>Redirect Warning</span>
		</Card.Title>
		<Card.Description class="text-center text-base">
			You are about to be redirected to:
			<span class="break-all text-[#2ecc71]">{url}</span>
		</Card.Description>
	</Card.Header>
	<Card.Content class="px-2 sm:px-6 md:px-10">
		<div class="mb-6 flex items-center justify-center gap-4 rounded-md border px-2.5 py-2">
			<TriangleAlert class="text-red-500" size={42} />
			<p class="text-sm font-light tracking-wide">
				Please be aware that external websites may contain harmful content or pose security risks.
				Only proceed if you trust the shared link or destination.
			</p>
		</div>
		<div class="flex justify-center space-x-4">
			<Button
				onclick={handleConfirm}
				disabled={isConfirmed}
				class="rounded-sm bg-green-500 hover:bg-green-600"
			>
				<ArrowRight class="h-4 w-4" />
				{isConfirmed ? 'Redirecting...' : 'Proceed'}
			</Button>
		</div>
	</Card.Content>
</Card.Root>
