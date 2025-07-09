import { PUBLIC_DASHBOARD_URL } from '$env/static/public';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = ({ event, resolve }) => {
	// Check if the request does not have a slug
	if (!event.params.slug) {
		// Redirect to the app site
		return Response.redirect(PUBLIC_DASHBOARD_URL, 302);
	}

	// Continue with the request handling
	return resolve(event);
};
