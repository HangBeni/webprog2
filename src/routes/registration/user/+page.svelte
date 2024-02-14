<script lang="ts">
	import type { ActionData, PageData } from './$types';
	import UserForm from '$lib/forms/UserForm.svelte';
	export let form: ActionData;
	export let data: PageData;
	console.log('page.svelte actiondata= ', form);
	console.log('page.svelte pagedata= ', data);

</script>

{#if form}
	It's a successful registration
{:else}
	<UserForm />
{/if}
