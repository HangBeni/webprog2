<script lang="ts">
	// import { SERVER_URL } from "$env/static/private";
	import UserForm from '$lib/forms/UserForm.svelte';
	import type { ActionData } from './$types';

	let data: ActionData;
</script>

	<UserForm />

{#if data?.succes}
	<p>{data?.body} + {data?.message}</p>
{/if}
