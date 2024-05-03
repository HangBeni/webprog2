<script lang="ts">
	import PostingInput from '$lib/posts/PostingInput.svelte';
import type { PageServerData } from './$types';

	export let data: PageServerData;
    const {myBand} = data;
</script>

<main>
<PostingInput/>
<h1>{myBand?.name}</h1>
<p><em>{myBand?.story}</em></p>
</main>

<style>
</style>
