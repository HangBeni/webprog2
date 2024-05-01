<script lang="ts">
	import type { SelectBand } from "$lib/db/schema";


export let band: SelectBand;

</script>


<h1>{band.name}</h1>
<p>{band.story}</p>