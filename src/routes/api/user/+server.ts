import { db } from '$lib/db/db.server';
import { bands, users, type SelectUser } from '$lib/db/schema';
import { RegistrationStatus, type User } from '$lib/types';
import type { RequestEvent } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export async function POST(event: RequestEvent) {
	try {
		const formData: User = await event.request.json();
		let theNewUser : SelectUser;
		if(formData.band){
		const bandIdx = await db
			.select({ id: bands.id })
			.from(bands)
			.where(eq(bands.name, formData.band));
			
			const { id } = bandIdx[0];
			
			theNewUser = await db.insert(users).values({
				name: formData.name,
				password: formData.password,
				email: formData.email,
				band_id: id
			}).returning().get();
		}else{
			theNewUser = await db.insert(users).values({
				name: formData.name,
				password: formData.password,
				email: formData.email,
				band_id: null
			}).returning().get();
		}
		
		event.cookies.set('session', JSON.stringify({userID: theNewUser.id, bandID: theNewUser.band_id}), {
			path:'/',
			httpOnly: true,
			maxAge: 60*60*24*2 //2 napos bejentkezés
		});
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
export async function GET() {
	try {
        const allUser : SelectUser[] = await db.select().from(users);
        if(!allUser){
            return new Response(JSON.stringify(RegistrationStatus.ThereIs), { status: 422 });
        }
        return new Response(JSON.stringify(allUser), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify(RegistrationStatus.ServerFail), { status: 500 });
    }
}
