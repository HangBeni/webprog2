import { db } from '$lib/db/db.server';
import { users } from '$lib/db/schema';
import { RegistrationStatus, type User } from '$lib/types';
import { redirect, type RequestEvent } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export async function POST(event: RequestEvent) {
	try {
		const loggerUser: User = await event.request.json();
		
		const isThere = await db.query.users.findFirst({
			where:
				eq(users.name, loggerUser.name) &&
				eq(users.email, loggerUser.email) &&
				eq(users.password, loggerUser.password)
		});

		if (!isThere) {
			return new Response(JSON.stringify(RegistrationStatus.NotFound), { status: 422 });
		}

		event.cookies.set('session', JSON.stringify({userID: isThere.id, bandID: isThere.band_id}), {
			path:'/',
			httpOnly: true,
			sameSite:true,
			maxAge: 60*60*24*2 //2 napos bejentkezés
		});

		return new Response(JSON.stringify(RegistrationStatus.ThereIs), { status: 200 });
	} catch (error) {
		return new Response(JSON.stringify(RegistrationStatus.ServerFail), { status: 500 });
	}
}

export async function DELETE({cookies}) {
	try {
		await cookies.delete('session', {path:'/'})
		throw redirect(303,'/')
	} catch (error) {
		throw redirect(303,'/')
	}
}
