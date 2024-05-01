import { db } from '$lib/db/db.server';
import { posts, type InsertPost } from '$lib/db/schema';
import type { RequestEvent } from '@sveltejs/kit';

export async function GET() {
	try {
		const allPost = await db.select().from(posts);

		if (!allPost) {
			return new Response(JSON.stringify({}), {
				status: 404,
				statusText: 'No Posts!',
				headers: { 'Content-Type': 'application/json' }
			});
		}
		return new Response(JSON.stringify(allPost), {
			status: 200,
			statusText: 'Posts!',
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (error) {
		return new Response(JSON.stringify({}), {
			status: 500,
			statusText: 'Server fail!',
			headers: { 'Content-Type': 'application/json' }
		});
	}
}

export async function POST(event: RequestEvent) {
	try {
		const newPost: InsertPost = await event.request.json();
		const post = await db.insert(posts).values(newPost).returning();
		if (!post) {
			return new Response(JSON.stringify({}), {
				status: 500,
				statusText: 'No posting!',
				headers: { 'Content-Type': 'application/json' }
			});
		}
		return new Response(JSON.stringify(post), {
			status: 200,
			statusText: 'Posts!',
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (error) {
		console.error(error);
		return new Response(JSON.stringify({}), {
			status: 500,
			statusText: 'Server fail!',
			headers: { 'Content-Type': 'application/json' }
		});
	}
}
