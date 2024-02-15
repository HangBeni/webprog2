import type { PageServerLoad, Actions } from './$types';
import {SERVER_URL} from '$env/static/private';

export const load: PageServerLoad = async () => {
	return {success: true, url : SERVER_URL};
};

export const actions = {
	registration: async ({ request }) => {
		const data = await request.formData();
		console.log(data);
		return {succes: true};
	},
	login: async ({ request }) => {
		const data = await request.formData();
		const res = await fetch(SERVER_URL+'/login/user', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
			.catch((err) => {
				throw new Error(err);
			});
			return res
	}
} satisfies Actions;
