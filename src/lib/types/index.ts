export interface Link {
	type?: 'redirect' | 'message';
	message?: string;
	redirect_url?: string;
}
