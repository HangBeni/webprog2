import type { Post } from '$lib/types';
import type { RequestEvent } from '@sveltejs/kit';
import db from '../../../database/db';

export async function GET() {
	let sql = 'SELECT * FROM posts;';
	let posts = await db.all<Post[]>(sql);
    return await new Response(JSON.stringify(posts), {status: 200});
}

export async function POST(event : RequestEvent) {
    let post = await event.request.json();
	let sql = 'INSERT INTO posts (author, content, created_at) VALUES (?, ?, ?);';
	await db.run(sql, [post.author, post.content, Date.now()]);
    return await new Response("", {status: 200});
}
