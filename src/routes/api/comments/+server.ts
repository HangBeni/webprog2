import { db } from '$lib/db/db.server';
import { comments, type InsertComment, type SelectComment } from '$lib/db/schema';
import type { RequestEvent } from '@sveltejs/kit';

export async function GET() {
	try {
		
		const commentForPost : SelectComment[] = await db.select().from(comments);

		return await new Response(JSON.stringify(commentForPost), { status: 200 });
	} catch (error) {
		console.error(error);
		return await new Response(JSON.stringify({}), { status: 500 });
	}
}

export async function POST(event: RequestEvent) {
	try {
		const commentForPost : InsertComment = await event.request.json();

		await db.insert(comments).values(commentForPost).execute();
		return await new Response('Success', { status: 200 });
	} catch (error) {
		return await new Response('Internal Server Error', { status: 500 });
	}
}
