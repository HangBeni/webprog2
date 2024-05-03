import { db } from "$lib/db/db.server";
import { posts, type SelectPost } from "$lib/db/schema";

export async function load() {
    const all : SelectPost[] = await db.select().from(posts);
    return {
        all
    }
}