import type {  User } from '$lib/types';
import type { RequestEvent } from '@sveltejs/kit';
import db from '../../../database/db';

export async function POST(event: RequestEvent) {
    try {
        const formData: User = await event.request.json();
        await new Promise<void>((resolve, reject) => {
            const insert = 'INSERT INTO user (name, band_id, password, email) VALUES (?, ?, ?,?);';
            db.run(insert, [formData.name, result, formData.password, formData.email], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });

        return new Response(JSON.stringify({user:formData, success: true}), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ success: false}), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}
