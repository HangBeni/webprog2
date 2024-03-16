import db from '../../../database/db';
import type { FormType } from '$lib/types';
import type { RequestEvent } from '@sveltejs/kit';

export async function POST(event: RequestEvent) {
    try {
        const formData: FormType = await event.request.json();
        const insert = 'INSERT INTO user (name, band, password) VALUES (?, ?, ?);';

        await new Promise<void>((resolve, reject) => {
            db.run(insert, [formData.userName, formData.userBand, formData.userPassword], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });

        return new Response(JSON.stringify({ success: true}), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ success: false}), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}
