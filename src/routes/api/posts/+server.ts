import { db } from '$lib/db/db.server';
import { bands, posts, users, type InsertPost } from '$lib/db/schema';
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
		const data: {content:string, url:string} = await event.request.json();
		const session = event.cookies.get('session');

		if (!session) {
			// This is not possible actually
			return new Response('Failed posting', {
				status: 500,
				statusText: 'No posting!',
				headers: { 'Content-Type': 'application/json' }
			});
		}

		const { userID, bandID } = JSON.parse(session) as { userID: number; bandID: number | null };
		let writer: { name: string; } | undefined;
		console.log(data.url);
		if (!bandID || data.url === '/' || data.url === '/[user]') {
			writer = await db.query.users.findFirst({
				where: eq(users.id, userID),
				columns: { name: true }
			});
		}else if(bandID){
			writer = await db.query.bands.findFirst({
				where: eq(bands.id, bandID),
				columns: { name: true }
			});
		}

		const newPost: InsertPost = { content: data.content, author: writer!.name };

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
