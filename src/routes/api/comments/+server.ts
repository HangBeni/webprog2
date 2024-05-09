import { db } from '$lib/db/db.server';
import { bands, comments, users, type InsertComment, type SelectComment } from '$lib/db/schema';
import type { RequestEvent } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

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
		const commentForPost : {comment:InsertComment , url:string} = await event.request.json();
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

		if (!bandID || commentForPost.url === '/' || commentForPost.url === '/[user]') {
			const user = await db.query.users.findFirst({where: eq(users.id, userID), columns: {name:true}})
			commentForPost.comment.author = user!.name;
			await db.insert(comments).values(commentForPost.comment).execute();
		}else if(bandID){
			const band = await db.query.bands.findFirst({where: eq(bands.id, bandID), columns: {name:true}})
			commentForPost.comment.author = band!.name;
			await db.insert(comments).values(commentForPost.comment).execute();
		}

		
		return await new Response('Success', { status: 200 });
	} catch (error) {
		return await new Response('Internal Server Error', { status: 500 });
	}
}
