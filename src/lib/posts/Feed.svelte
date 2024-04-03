<script lang="ts">
	import type { Post } from '$lib/types';
	import { onMount } from 'svelte';
	import PostCard from './PostCard.svelte';

	export let posts: Post[] = [];

	onMount(async () => {
		posts = await fetch('/api/posts').then((res) => res.json());
	});
</script>

<main>
	{#if posts}
		{#each posts as post}
			<PostCard {post} />
		{/each}
	{:else}
		<p>No Posts</p>
	{/if}
</main>

<style>
</style>
