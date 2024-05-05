<script lang="ts">
	import type { SelectComment } from '$lib/db/schema';

	export let comment: SelectComment;
	
</script>

<div>
	<div>
		<h3>{comment.author}</h3>
		<i>{comment.created_at}</i>
	</div>
	<p>{comment.content}</p>
</div>

<style>
	div {
		width: max-content;
		max-width: 12rem;
		background-color: #a18484;
		margin: 0.5rem;
		padding-inline: 3rem;
		padding-top: 0.5rem;
		padding-bottom: 0.5rem;
		margin-top: 2rem;
	}

	div > * {
		margin: 0;
		font-size: medium;
		font-style: oblique;
	}
	div > p {
		display: block;
		min-width: 11rem;
		padding-top: 0.25rem;
		padding-inline: 0.7rem;
		padding-bottom: 0.75rem;
		margin-top: 0.5rem;
		margin-left: -2.5rem;
		background-color: burlywood;
		font-size: large;
		font-style: normal;
	}
	div > div {
		display: flex;
		gap: 1rem;
		margin: 0;
		padding: 0;
	}
	h3 {
		margin-left: 0;
	}
	div, p{
		border-radius: 1rem;
	}
</style>
