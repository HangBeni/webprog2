import { db } from '$lib/db/db.server';
import { bands, users, type InsertUser } from '$lib/db/schema';
import type { User } from '$lib/types';
import type { RequestEvent } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export async function POST(event: RequestEvent) {
	try {
		const formData: User = await event.request.json();

		const bandIdx = await db
			.select({ id: bands.id })
			.from(bands)
			.where(eq(bands.name, formData.band));

		if (!bandIdx) {
			return new Response(JSON.stringify({ success: false }), {
				status: 404,
				headers: { 'Content-Type': 'application/json' },
				statusText: 'There is no such a band!'
			});
		}

		const { id } = bandIdx[0];
        
		const theNewUser  = await db.insert(users).values({
            name: formData.name,
			password: formData.password,
			email: formData.email,
			band_id: id
        }).returning();

		return new Response(JSON.stringify({ user: theNewUser, success: true }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
			statusText: 'Successful registration!'
		});
	} catch (error) {
		console.error(error);
		return new Response(JSON.stringify({ success: false }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' },
			statusText: 'Auth problem!'
		});
	}
}
