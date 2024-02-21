import type { Actions } from '@sveltejs/kit';
import type { FormType } from '../../../utils/types';
import db from '../../../database/db';

export const actions = {
	login: async ({ request }) => {
		const data = await request.formData();
		const formData: FormType = {
			userName: data.get('userName')!.toString(),
			userPassword: data.get('userPassword')!.toString(),
			userBand: data.get('userBand')!.toString()
		};
		var query = 'SELECT * FROM user WHERE name = ? AND password = ? AND band = ?;';
		let response;
		db.serialize(() => {
			db.get(query, [formData.userName, formData.userPassword, formData.userBand], (err: Error, row) => {
				if (err || !row) {
					response = { res: false };
				}

				response = { res: true, user: row };
			});
		});

		return {
			success: true,
			message: 'Hello from the server',
			body: formData,
			res: response
		};
	},
	registration: async ({ request }) => {
		const data = await request.formData();
		const formData: FormType = {
			userName: data.get('userName')!.toString(),
			userBand: data.get('userBand')!.toString(),
			userEmail: data.get('userEmail')!.toString(),
			userPassword: data.get('userPassword')!.toString()
		};
		let response;
		db.serialize(() => {
			var insert = 'INSERT INTO user (name, band, password) VALUES (?, ?, ?);';

			db.serialize(() => {
				db.run(insert, [formData.userName, formData.userBand, formData.userPassword], (err) => {
					if (err) {
						response = {res: 'Smth went wrong! Maybe there is a same user as you XD'};
					}
					response = {res: `It's okay u good ${formData.userName}`};
				});
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
