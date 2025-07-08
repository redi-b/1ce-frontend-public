import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { PUBLIC_API_URL } from '$env/static/public';

interface LinkSummary {
	slug: string;
	accessible: boolean;
	requires_password: boolean;
}

export const load: PageServerLoad = async ({ params }) => {
	const { slug } = params;

	if (!slug) {
		error(400, 'Slug is required');
	}

	const response = await fetch(`${PUBLIC_API_URL}/links/summary/${slug}`);

	if (!response.ok) {
		if (response.status === 404) {
			error(404, 'Link not found');
		}
		error(response.status, 'Failed to fetch link');
	}

	const data: LinkSummary = await response.json();

	return { linkSummary: data };
};
