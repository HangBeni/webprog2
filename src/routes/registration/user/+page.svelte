<script lang="ts">
	import UserForm from '$lib/forms/UserForm.svelte';
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<UserForm />

{#if form?.success}
	<h2>Hi</h2>
	<p>{JSON.stringify(form.body)} + {form.message}</p>
	<p>Response from the cool server: {JSON.stringify(form?.res)}</p>
{:else if !form?.success}
	<h2>Hi No Comprende</h2>
{/if}
