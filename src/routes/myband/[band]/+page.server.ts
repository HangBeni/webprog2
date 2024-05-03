import { db } from '$lib/db/db.server';
import { bands } from '$lib/db/schema';
import { eq } from 'drizzle-orm';

export async function load({ params }) {
	const myBand = await db.query.bands.findFirst({ where: eq(bands.name, params.band) });
		return {
			myBand
		};
	
}
