<script lang="ts">
	import { onMount } from 'svelte';

	import { accessLink } from '$lib/utils/accessLink';
	import type { Link } from '$lib/types';

	import PasswordAccess from './PasswordAccess.svelte';
	import Redirect from './Redirect.svelte';
	import Message from './Message.svelte';

	const { data } = $props();
	const { linkSummary } = data;

	let accessError = $state<string | null>(null);

	let link: Link | null = $state(null);

	const needsPassword = $derived(linkSummary?.requires_password && !link);

	if (!linkSummary?.accessible) {
		accessError = 'This link is no longer accessible.';
	}

	onMount(async () => {
		if (linkSummary?.accessible && !linkSummary?.requires_password) {
			const result = await accessLink(linkSummary.slug);
			if (result.success) {
				link = result.data;
			} else {
				accessError = result.message;
			}
		}
	});
</script>

{#if accessError}
	<h1 class="text-xl font-bold text-red-500">{accessError}</h1>
{:else if needsPassword}
	<PasswordAccess
		slug={linkSummary.slug}
		onSuccess={(data) => {
			link = data;
		}}
	/>
{:else if !link}
	<h1 class="text-xl font-bold">Loading...</h1>
{:else if link?.type === 'redirect'}
	<Redirect url={link.redirect_url} />
{:else if link?.type === 'message'}
	<Message message={link.message} />
{:else}
	<h1 class="text-xl font-bold">Error</h1>
{/if}
