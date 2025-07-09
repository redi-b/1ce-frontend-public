<script lang="ts">
	import { LockKeyhole, LoaderCircle } from '@lucide/svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import type { Link } from '$lib/types';
	import { accessLink } from '$lib/utils/accessLink';

	interface AccessProps {
		slug: string;
		onSuccess: (data: Link) => void;
	}

	const { slug, onSuccess }: AccessProps = $props();

	let password = $state('');
	let loading = $state(false);
	let error = $state<string | null>(null);

	async function handleSubmit(e: Event) {
		e.preventDefault();
		if (loading) return;

		if (!password) {
			error = 'Password is required';
			return;
		}

		loading = true;
		error = null;

		const result = await accessLink(slug, password);

		if (result.success) {
			onSuccess(result.data);
		} else {
			error = result.message;
		}

		loading = false;
	}
</script>

<Card.Root class="min-h-56 w-[90vw] max-w-lg sm:w-[75vw] md:w-[50vw]">
	<Card.Header>
		<div class="mx-auto mb-2 w-fit">
			<LockKeyhole size={36} class="text-[#2ecc71]" />
		</div>
		<Card.Title class="text-lg">This link requires a password</Card.Title>
		<Card.Description>Please enter the password to continue.</Card.Description>
	</Card.Header>

	<Card.Content>
		<form class="flex flex-col gap-4" onsubmit={handleSubmit}>
			<Input
				type="password"
				placeholder="Enter password"
				bind:value={password}
				class="min-w-[240px]"
				required
			/>
			<Button type="submit" disabled={loading}>
				{#if loading}
					<LoaderCircle class="animate-spin" size={16} />
				{/if}
				<p>Access Link</p>
			</Button>

			{#if error}
				<p class="mx-auto w-fit text-sm text-red-500">{error}</p>
			{/if}
		</form>
	</Card.Content>
</Card.Root>
