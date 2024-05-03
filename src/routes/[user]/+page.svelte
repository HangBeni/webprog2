<script lang="ts">
	import PostingInput from "$lib/posts/PostingInput.svelte";
import type { PageServerData } from "./$types";



	export let data: PageServerData;
    const {myUser} = data;
</script>

<main>
<PostingInput/>
<h1>{myUser?.name}</h1>
</main>

<style>
</style>