<script lang="ts">
	import { onMount } from 'svelte';
	import CommentCard from './CommentCard.svelte';
	import type { InsertComment, SelectComment, SelectPost } from '$lib/db/schema';
	import { page } from '$app/stores';

	export let post: SelectPost;

	let comments: SelectComment[] = [];
	
	let url:string | null = $page.route.id;

	let newComment: InsertComment = {
		author: post.author, 
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
			body: JSON.stringify({comment: newComment, url:url}),
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
	input {
		color: white;
		padding-inline: 1rem ;
		padding-top: 0.3rem;
		background: inherit;
		border: 2px solid black;
		border-bottom-left-radius: 1rem;
		border-bottom-right-radius: 1rem;
	}

	::placeholder {
  color:  #c4a2a2;
  opacity: 1; /* Firefox */
}

::-ms-input-placeholder { /* Edge 12 -18 */
  color:  #c4a2a2;
}

	button {
		cursor: pointer;
		background: none;
		padding: 0.3rem;
		padding-inline: 0.75rem;
		border-radius: 5rem;
		transition: all 200ms;
	}
	button:hover {
		background: #a25d5d;
	}
</style>
