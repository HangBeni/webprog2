import type { Post } from '$lib/types';
import type { RequestEvent } from '@sveltejs/kit';
import db from '../../../database/db';

export async function GET() {
	try {
		let sql = 'SELECT * FROM posts;';
		let posts = await new Promise((resolve, reject) => {
			db.all<Post[]>(sql, (err, rows) => {
				if (err) {
					reject(err);
				} else {
					resolve(rows);
				}
			});
		});

		return await new Response(JSON.stringify(posts), { status: 200 });
	} catch (error) {
		return await new Response('Server Error', { status: 500 });
	}
}

export async function POST(event: RequestEvent) {
	try {
		let post = await event.request.json();
		let insert = 'INSERT INTO posts (author, content) VALUES (?, ?);';
		await new Promise<void>((resolve, reject) => {
			db.run(insert, [post.author, post.content], (err) => {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
		});
		return await new Response('Success', { status: 200 });
	} catch (error) {
		return await new Response('Internal Server Error', { status: 500 });
	}
}
