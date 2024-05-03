<script lang="ts">

	import PostCard from './PostCard.svelte';
	import type { SelectPost } from '$lib/db/schema';

	export let all: SelectPost[];
	

</script>

<main>
	{#if all}
		{#each all as post}
			<PostCard {post} />
		{/each}
	{:else}
		<p>No Posts</p>
	{/if}
</main>

<style>
</style>
