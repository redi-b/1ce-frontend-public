<script lang="ts">
	import { PUBLIC_API_URL } from '$env/static/public';
	import { onMount } from 'svelte';

	const { data } = $props();
	const { linkSummary } = data;

	let password = $state('');
	let accessLoading = $state(false);
	let accessError = $state<string | null>(null);
	let passwordError = $state<string | null>(null);

	let link: {
		type?: 'redirect' | 'message';
		message?: string;
		redirect_url?: string;
	} | null = $state(null);

	const needsPassword = $derived(linkSummary?.requires_password && !link);

	if (!linkSummary?.accessible) {
		accessError = 'This link is no longer accessible.';
	}

	async function accessLink() {
		if (accessLoading) return;

		accessLoading = true;
		accessError = null;
		passwordError = null;

		try {
			const response = await fetch(`${PUBLIC_API_URL}/links/access/${linkSummary?.slug}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ password: password })
			});
			const linkData = await response.json();

			if (!response.ok) {
				switch (response.status) {
					case 401:
						passwordError = 'Incorrect password. Please try again.';
						break;
					case 403:
						accessError = linkData.error || 'Access denied. You cannot view this link.';
						break;
					case 404:
						accessError = 'Link not found. It may have been deleted or does not exist.';
						break;
					default:
						accessError = 'An unexpected error occurred. Please try again later.';
				}
				accessLoading = false;
				return;
			}

			link = {
				type: linkData.type,
				message: linkData.message,
				redirect_url: linkData.redirect_url
			};
		} catch (err: any) {
			accessError = err.message;
		} finally {
			accessLoading = false;
		}
	}

	onMount(() => {
		if (linkSummary?.accessible && !linkSummary?.requires_password) {
			accessLink();
		}
	});
</script>

<div class="flex h-screen w-full flex-col items-center justify-center gap-8">
	{#if accessError}
		<h1 class="font-old text-xl text-red-600">{accessError}</h1>
	{:else if needsPassword}
		<h1 class="font-old text-xl">This link requires a password to access</h1>
		<form>
			<input
				type="password"
				name="password"
				placeholder="**********"
				bind:value={password}
				class="rounded-sm border border-gray-400 px-2 py-1 transition-all outline-none focus:border-gray-500"
			/>
			<button onclick={async () => await accessLink()} disabled={accessLoading}>
				{accessLoading ? 'Loading...' : 'Access Link'}
			</button>
		</form>
		{#if passwordError}
			<p class="mt-2 text-red-600">{passwordError}</p>
		{/if}
	{:else if link?.type === 'redirect'}
		<h1>This is a redirect link</h1>
		<a target="_blank" href={link.redirect_url} class="text-blue-500 underline">
			Click here to continue
		</a>
	{:else if link?.type === 'message'}
		<h1 class="font-old text-xl">{link.message}</h1>
	{:else}
		<h1 class="font-old text-xl">Loading...</h1>
	{/if}
</div>
