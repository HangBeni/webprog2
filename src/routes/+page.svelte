<script lang="ts">
	import Feed from '$lib/posts/Feed.svelte';
	import Footer from '$lib/reusables/Footer.svelte';
	import type { PageData } from './$types';

	export let data : PageData;
	$: ({all} = data)
	
</script>
<Feed {all}/>
<Footer/>