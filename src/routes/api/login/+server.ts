import db from '../../../database/db';
import type { FormType, User } from '$lib/types';
import type { RequestEvent } from '@sveltejs/kit';

export async function POST(event: RequestEvent) {
	try {
		const formData: FormType = await event.request.json();
		let res = {};

		const user: User | undefined = await new Promise((resolve, reject) => {
			db.get<User>(
				'SELECT * FROM user WHERE name = ? AND password = ? AND band = ?;',
				[formData.userName, formData.userPassword, formData.userBand],
				(err, row) => {
					if (err) {
						console.error(err);
						reject(err);
					} else {
						resolve(row);
					}
				}
			);
		});

		if (!user) {
			res = {
				success: false,
				user: null
			};
			return new Response(JSON.stringify(res), {
				status: 404,
				headers: { 'Content-Type': 'application/json' }
			});
		}

		res = {
			success: true,
			user: user
		};
		return new Response(JSON.stringify(res), {
			status: 200,
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (error) {
		console.error(error);
		return new Response(JSON.stringify({ success: false, user: null }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}
}
