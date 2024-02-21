<script lang="ts">
	import UserForm from '$lib/forms/UserForm.svelte';
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<UserForm />
{console.log(form)}

{#if form?.success}
	<h2>Hi</h2>
	<p>{form.body} + {form.message}</p>
	<p>Response from the cool server: {form.res}</p>
{/if}
