<script lang="ts">
	import type { Post } from '$lib/types';
	import { onMount } from 'svelte';
	import CommentCard from './CommentCard.svelte';
	import type { InsertComment, SelectComment } from '$lib/db/schema';

	export let post: Post;

	let comments: SelectComment[] = [];
	let newComment: InsertComment = {
		author: post.author, //Ezt majd a cookies-ból kell tudni
		content:'',
		created_at: new Date().toDateString(),
		post_id: post.id
	};

	async function getComments() {
		comments = await fetch('/api/comments').then((res) => res.json());
	}

	async function handleComment() {
		await fetch('api/comments', {
			method: 'POST',
			body: JSON.stringify(newComment),
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			}
		});
	getComments();
	}

	onMount(async () => {
		comments = await fetch('/api/comments').then((res) => res.json());
	});
</script>

<div class="post">
	<h1>{post.author}</h1>
	<i>{post.created_at}</i>
	<p>{post.content}</p>
	<div class="comment">
		<input type="text" placeholder="Comment Here" bind:value={newComment.content} />
		<button on:click={handleComment}>--></button>
	</div>
	{#await getComments}
		<span>Loading comments...</span>
	{:then _}
		{#each comments as comment}
			{#if comment.post_id === post.id}
				<CommentCard {comment} />
			{/if}
		{/each}
	{:catch error}
		<p>Something went wrong</p>
	{/await}
</div>

<style>
	input {
		display: block;
	}
	.post {
		width: 30rem;
		margin-inline: auto;
		border: 2px solid;
		border-radius: 2rem;
		padding: 1.5rem;
	}

	.comment {
		display: flex;
		gap: 1rem;
	}
	p {
		max-width: 25ch;
		-webkit-hyphens: auto;
		-moz-hyphens: auto;
		-ms-hyphens: auto;
		-o-hyphens: auto;
		hyphens: auto;
	}
</style>
