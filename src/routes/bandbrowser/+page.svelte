
<script lang="ts">
	import BandCard from "$lib/bandbrowsing/BandCard.svelte";
	import type { SelectBand } from "$lib/db/schema";
	import { onMount } from "svelte";

    let bands : SelectBand[] = [];

onMount(async () => {
    bands = await fetch('api/band').then(res => res.json())
} )
</script>


<main>
    {#each bands as band}
        <BandCard {band}/>
    {/each}
</main>


<style>

</style>