import { PUBLIC_API_URL } from '$env/static/public';
import type { Link } from '$lib/types';

type AccessLinkResult =
	| { success: true; data: Link }
	| { success: false; status: number; message: string };

export async function accessLink(slug: string, password?: string): Promise<AccessLinkResult> {
	try {
		const response = await fetch(`${PUBLIC_API_URL}/links/access/${slug}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ password })
		});

		const data = await response.json();

		if (!response.ok) {
			let msg = 'An unexpected error occurred. Please try again later.';
			switch (response.status) {
				case 401:
					msg = 'Incorrect password. Please try again.';
					break;
				case 403:
					msg = data.error || 'Access denied. You cannot view this link.';
					break;
				case 404:
					msg = 'Link not found. It may have been deleted or does not exist.';
					break;
			}

			return { success: false, status: response.status, message: msg };
		}

		return { success: true, data };
	} catch (err: any) {
		return {
			success: false,
			status: 500,
			message: err?.message || 'Network error'
		};
	}
}
