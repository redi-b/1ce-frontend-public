<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';

	import { MessageCircle, Copy } from '@lucide/svelte';
	import { toast } from 'svelte-sonner';

	interface MessageProps {
		message: string | undefined;
	}

	let { message }: MessageProps = $props();

	function copyMessage() {
		if (!message) return;
		navigator.clipboard.writeText(message);
		toast.success('Message copied!');
	}
</script>

<Card.Root class="mx-2 max-w-2xl min-w-sm">
	<Card.Header>
		<Card.Title class="mb-2 flex flex-col items-center justify-center gap-2 text-2xl font-medium">
			<MessageCircle class="text-[#2ecc71]" />
			<span>Message</span>
		</Card.Title>
		<Card.Description class="text-center text-sm">
			This message was attached to the link.
		</Card.Description>
	</Card.Header>

	<Card.Content
		class="bg-accent relative mx-3 flex flex-col items-center justify-center gap-2 rounded-xl border px-4 py-2 sm:px-6 md:px-10"
	>
		{#if message}
			<p class="text-center text-lg leading-relaxed break-words whitespace-pre-line">
				{message}
			</p>

			<Tooltip.Root>
				<Tooltip.Trigger>
					<button
						onclick={copyMessage}
						class="text-muted-foreground hover:text-primary cursor-pointer rounded-md p-1"
						aria-label="Copy message"
					>
						<Copy size={20} />
					</button>
				</Tooltip.Trigger>
				<Tooltip.Content side="bottom">Copy message</Tooltip.Content>
			</Tooltip.Root>
		{:else}
			<p class="text-center font-medium text-red-500">No message provided.</p>
		{/if}
	</Card.Content>
</Card.Root>
