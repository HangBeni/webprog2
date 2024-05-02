import { db } from '$lib/db/db.server';
import { bands, type InsertBand, type SelectBand } from '$lib/db/schema';
import { RegistrationStatus } from '$lib/types';
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
        console.error(error)
        return new Response(JSON.stringify(RegistrationStatus.ServerFail), { status: 500 });

    }
}

export async function GET() {

    try {
        const allBand : SelectBand[] = await db.select().from(bands);
        if(!allBand){
            return new Response(JSON.stringify(RegistrationStatus.ThereIs), { status: 422 });
        }
        return new Response(JSON.stringify(allBand), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify(RegistrationStatus.ServerFail), { status: 500 });
    }
}
