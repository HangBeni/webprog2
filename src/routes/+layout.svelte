<script lang="ts">
	import { page } from '$app/stores';
	import PostingInput from '$lib/posts/PostingInput.svelte';
	import Nav from '$lib/reusables/Nav.svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
    
	import '../styles/index.css'
</script>

<Nav {data} />
{#if data.inSession && $page.url.pathname === '/'}
	<PostingInput />
{/if}
<slot />
