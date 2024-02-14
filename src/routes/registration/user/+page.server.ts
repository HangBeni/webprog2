import type { PageServerLoad, Actions } from './$types';
import PUBLIC_SERVER_URL from '$env/static/public';

export const load: PageServerLoad = async () => {};

export const actions = {
	registration: async ({ request }) => {
		const data = await request.formData();
		console.log(data);
	},
	login: async ({ request }) => {
		const data = await request.formData();
		await fetch('http://localhost:42069/login/user', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
			.then((res) => {
				if (res.status !== 200) throw new Error(res.statusText);
				return res.json();
			})
			.catch((err) => {
				throw new Error(err);
			});
	}
} satisfies Actions;
