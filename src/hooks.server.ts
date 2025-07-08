import type { Handle } from '@sveltejs/kit';

export const handle: Handle = ({ event, resolve }) => {
	// Check if the request does not have a slug
	if (!event.params.slug) {
		// Redirect to the app site
		return Response.redirect('https://app.1ce.dev', 302);
	}

	// Continue with the request handling
	return resolve(event);
};
