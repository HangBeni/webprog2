<script lang="ts">
	import type { Links } from '$lib/types';
	import type { LayoutData } from '../../routes/$types';
	import { type SelectBand } from '$lib/db/schema';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	export const links: Links[] = [
		{ name: 'Főoldal', link: '/' },
		{ name: 'Bandák keresése', link: '/bandbrowser' },
		{ name: 'Bejelentkezés', link: '/login' }, //Ha be van jelentkezve akkor cserélje ki egy avatarral
		//Saját bandám bejelentkezés után ha van a usernek
		{ name: 'Banda regisztráció', link: '/registration/band' },
		{ name: 'User regisztráció', link: '/registration/user' }
	];

	export let data: LayoutData;
	let bandName:string | undefined;
	
	onMount(async () => {
		const allBand : SelectBand[] = await fetch("/api/band").then(res => res.json());
		bandName = allBand.find((band) => band.id === data.userBand)?.name;
	})
	const logOut = async () => {
		await fetch("/api/login", {
			method: 'DELETE'
		});
		goto('/')
	}
	//<i class="fa-solid fa-person"></i> ---> avatar
</script>

<nav>
	<ul>
		{#each links as link}
			{#if link.link === '/login' && data.inSession}
				<li><a href={`/${data.userID}`}> <i class="fa-solid fa-person"></i></a></li>
				{#if data.userBand}
					<li>
						<a href={`/${bandName}`}>{bandName}</a>
					</li>
				{/if}
			{:else}
				<li><a href={link.link}>{link.name}</a></li>
			{/if}
		{/each}
		<li><a data-sveltekit-reload href="/" on:click={logOut}>Log out</a></li>
	</ul>
</nav>

<style>
</style>
