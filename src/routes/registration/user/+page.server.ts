import type { Actions } from '@sveltejs/kit';
import type { FormType, User } from '../../../utils/types';
import db from '../../../database/db';

export const actions = {
	login: async ({ request }) => {
		
	},

	registration: async ({ request }) => {
		const data = await request.formData();
		const formData: FormType = {
			userName: data.get('userName')!.toString(),
			userBand: data.get('userBand')!.toString(),
			userEmail: data.get('userEmail')!.toString(),
			userPassword: data.get('userPassword')!.toString()
		};
		let response: Object = { res: '' };
		db.serialize(() => {
			var insert = 'INSERT INTO user (name, band, password) VALUES (?, ?, ?);';

			db.run(insert, [formData.userName, formData.userBand, formData.userPassword], (err) => {
				if (err) {
					response = { res: 'Error' };
				}
				response = { res: `It's okay u good ${formData.userName}` };
			});
		});

		return {
			success: true,
			message: 'Hello from the server',
			body: formData,
			res: response
		};
	}
} satisfies Actions;
