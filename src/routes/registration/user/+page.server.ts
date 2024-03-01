import type { Actions } from '@sveltejs/kit';
import type { FormType, User } from '../../../utils/types';
import db from '../../../database/db';

export const actions = {
	login: async ({ request,fetch }) => {
		const data = await request.formData();
		const formData: FormType = {
			userName: data.get('userName')!.toString(),
			userPassword: data.get('userPassword')!.toString(),
			userBand: data.get('userBand')!.toString()
		};
		let res = await fetch("/api/login", {
			method: 'POST',
			body: JSON.stringify(formData),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then((res) => {
		 res.json();
		})

		return{res}
	},

	registration: async ({ request }) => {
		const data = await request.formData();
		const formData: FormType = {
			userName: data.get('userName')!.toString(),
			userBand: data.get('userBand')!.toString(),
			userEmail: data.get('userEmail')!.toString(),
			userPassword: data.get('userPassword')!.toString()
		};
		let response = { res : "It' happened something -- Initial value" };
		var insert = 'INSERT INTO user (name, band, password) VALUES (?, ?, ?);';

		db.run(insert, [formData.userName, formData.userBand, formData.userPassword], (err) => {
			if (err) {
				return {
					success: false,
					message: 'Hello from the server --Error',
					body: formData,
					res: response
				};
			}
			response.res = `It\' okay u good, ${formData.userName}`
			return {
				success: true,
				message: 'Hello from the server',
				body: formData,
				res: response
			};
		});
	}
} satisfies Actions;
