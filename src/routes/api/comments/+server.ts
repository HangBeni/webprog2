import db from "../../../database/db";
import type { Comment } from "$lib/types";


export async function GET() {
    try {
        let sql = 'SELECT * FROM comments;';
        let comments = await db.all<Comment[]>(sql);
        return await new Response(JSON.stringify(comments), {status: 200});


    } catch (error ) {
        console.error(error)
        return await new Response(JSON.stringify(""), {status: 500});
    }
}