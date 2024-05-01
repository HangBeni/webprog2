import { db } from '$lib/db/db.server';
import { bands, type InsertBand } from '$lib/db/schema';
import { RegistrationStatus, type Band } from '$lib/types';
import type { RequestEvent } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export async function POST(event: RequestEvent) {
	try {
		const newBand: InsertBand = await event.request.json();

		const thereIs = await db.query.bands.findFirst({ where: eq(bands.name, newBand.name) });

        if(thereIs){
            return new Response(JSON.stringify(RegistrationStatus.ThereIs), { status: 422 });
        }
        
        await db.insert(bands).values(newBand)
		return new Response(JSON.stringify(RegistrationStatus.OK), { status: 200 });

	} catch (error) {
        return new Response(JSON.stringify(RegistrationStatus.ServerFail), { status: 500 });

    }
}
