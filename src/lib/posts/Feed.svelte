<script lang="ts">
	import type { Post } from "$lib/types";
	import { onMount } from "svelte";

export let posts : Post[] = [];
async function getComments(id : number) {
    
}
onMount( async () => {
    posts = await fetch("/api/posts").then(res => res.json());
})
</script>

<main>
{#each posts as post }
    <h1>{post.author}</h1>
    <p>{post.content}</p>
    <i>{Date.parse(post.created_at)}</i>
    {#await getComments then comment }
        
    {/await}
    {/each}
</main>


<style>


</style>