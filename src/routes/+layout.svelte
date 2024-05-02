<script lang="ts">
import Nav from '$lib/reusables/Nav.svelte';
import type { LayoutData } from './$types';

export let data:LayoutData;

</script>

<Nav {data}/>
<slot/>
