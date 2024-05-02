import { db } from '$lib/db/db.server';
import { users, type SelectUser } from '$lib/db/schema';
import { RegistrationStatus, type User } from '$lib/types';
import type { RequestEvent } from '@sveltejs/kit';
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
		return new Response(JSON.stringify(RegistrationStatus.ThereIs), { status: 200 });
	} catch (error) {
		return new Response(JSON.stringify(RegistrationStatus.ServerFail), { status: 500 });
	}
}
