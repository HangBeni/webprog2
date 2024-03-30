<script lang="ts">
	import type { Comment, Post } from '$lib/types';
	import { onMount } from 'svelte';
	import PostCard from './PostCard.svelte';
	import CommentCard from './CommentCard.svelte';

	export let posts: Post[] = [];
	export let comments: Comment[] = [];
	async function getComments() {
		comments = await fetch('/api/comments').then((res) => res.json());
	}
	onMount(async () => {
		posts = await fetch('/api/posts').then((res) => res.json());
	});
</script>

<main>
	{#if posts}
		{#each posts as post}
			<PostCard {post}>
				{#each comments as comment}
					<CommentCard {comment} />
				{/each}
			</PostCard>
		{/each}
	{:else}
		<p>No Posts</p>
	{/if}
</main>

<style>
</style>
