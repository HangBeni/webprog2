<script lang="ts">
	import type { SelectBand } from "$lib/db/schema";


export let band: SelectBand;

</script>

<div>
	<h1>{band.name}</h1>
	<p>{band.story}</p>
</div>


<style>
	p{
		max-width: 20rem;
	}
	div{
		padding: 1rem;
		padding-right:0rem;
		margin-top: 1.5rem;
		width: 27rem;
		margin-inline: auto;
		border-radius: 1.5rem;
		background-color: var(--secondary-color);
	}
</style>