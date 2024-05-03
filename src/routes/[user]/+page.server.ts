import { db } from '$lib/db/db.server';
import { users } from '$lib/db/schema';
import { eq } from 'drizzle-orm';

export async function load({ params, parent}) {
	const myUser = await db.query.users.findFirst({ where: eq(users.name, params.user) });
	
		return {
			 myUser
		};
	
    
}