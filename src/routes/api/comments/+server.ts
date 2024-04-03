import db from '../../../database/db';
import type { Comment } from '$lib/types';
import type { RequestEvent } from '@sveltejs/kit';

export async function GET() {
	try {
		let sql = 'SELECT * FROM comments;';
		let comments = await new Promise((resolve, reject) => {
			db.all<Comment[]>(sql, (err, rows: Comment[]) => {
				if (err) {
					console.error(err);
					reject(err);
				} else {
					resolve(rows);
				}
			});
		});
		return await new Response(JSON.stringify(comments), { status: 200 });
	} catch (error) {
		console.error(error);
		return await new Response(JSON.stringify('Error'), { status: 500 });
	}
}

export async function POST(event: RequestEvent) {
	try {
		let comment = await event.request.json();
		let sql = 'INSERT INTO comments (author, content, post_id) VALUES (?,?,?);';
		db.run(sql, [comment.author, comment.content, comment.post_id]);
		return await new Response('Success', { status: 200 });
	} catch (error) {
		return await new Response('Internal Server Error', { status: 500 });
	}
}
