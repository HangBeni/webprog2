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
	let post = await event.request.json();
	let sql = 'INSERT INTO posts (author, content) VALUES (?, ?);';
	await db.run(sql, [post.author, post.content]);
	return await new Response('Success', { status: 200 });
}
