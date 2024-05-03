import { db } from '$lib/db/db.server';
import { posts, users, type InsertPost } from '$lib/db/schema';
import type { RequestEvent } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export async function GET() {
	try {
		const allPost = await db.select().from(posts);

		if (!allPost) {
			return new Response('No Posts!', {
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
		return new Response('Server fail!', {
			status: 500,
			statusText: 'Server fail!',
			headers: { 'Content-Type': 'application/json' }
		});
	}
}

export async function POST(event: RequestEvent) {
	try {

		const content: string = await event.request.json();
		const session = event.cookies.get('session');

		if (!session) { // This is not possible actually
			return new Response('Failed posting', {
				status: 500,
				statusText: 'No posting!',
				headers: { 'Content-Type': 'application/json' }
			});
		}

		const { userID } = JSON.parse(session) as { userID: number; bandID: number };
		const writer = await db.query.users.findFirst({
			where: eq(users.id, userID),
			columns: { name: true }
		});

		const newPost: InsertPost = { content: content, author: writer!.name };

		const post = await db.insert(posts).values(newPost).returning();
		
		if (!post) {
			return new Response('Failed posting', {
				status: 500,
				statusText: 'No posting!',
				headers: { 'Content-Type': 'application/json' }
			});
		}

		return new Response('Successful posting', {
			status: 200,
			statusText: 'Posts!',
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (error) {
		console.error(error);
		return new Response('Failed posting', {
			status: 500,
			statusText: 'Server fail!',
			headers: { 'Content-Type': 'application/json' }
		});
	}
}
