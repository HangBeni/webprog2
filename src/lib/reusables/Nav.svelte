<script lang="ts">
	import type { Links } from '$lib/types';
	import type { LayoutData } from '../../routes/$types';
	import { type SelectBand, type SelectUser} from '$lib/db/schema';
	import { onMount } from 'svelte';
	import { goto, invalidateAll } from '$app/navigation';

	export const links: Links[] = [
		{ name: 'Főoldal', link: '/' },
		{ name: 'Bandák keresése', link: '/bandbrowser' },
		{ name: 'Bejelentkezés', link: '/login' }, //Ha be van jelentkezve akkor cserélje ki egy avatarral
		//Saját bandám bejelentkezés után ha van a usernek
		{ name: 'Banda regisztráció', link: '/registration/band' },
		{ name: 'User regisztráció', link: '/registration/user' }
	];

	export let data: LayoutData;
	let bandName: string | undefined;
	let userName: string | undefined;
	
	onMount(async () => {
		const allBand: SelectBand[] = await fetch('/api/band').then((res) => res.json());
		const allUser: SelectUser[] = await fetch('/api/user').then((res) => res.json());

		bandName = allBand.find((band) => band.id === data.userBand)?.name;
		userName = allUser.find((user) => user.id === data.userID)?.name;
	});
	const logOut = async () => {
		await fetch('/api/login', {
			method: 'DELETE'
		});
		invalidateAll();
		goto('/');
	};
	//<i class="fa-solid fa-person"></i> ---> avatar
</script>

<nav>
	<ul>
		{#each links as link}
			{#if link.link === '/login' && data.inSession}
				<li><a href={`/${userName}`}> <i class="fa-solid fa-person"></i> {userName}</a></li>
				{#if data.userBand}
					<li>
						<a href={`/${bandName}`}><i class="fa-brands fa-bandcamp"></i> {bandName}</a>
					</li>
				{/if}
			{:else}
				<li><a href={link.link}>{link.name}</a></li>
			{/if}
		{/each}
		{#if data.inSession}
			<li><a data-sveltekit-reload href="/" on:click={logOut}>Log out</a></li>
		{/if}
	</ul>
</nav>

<style>
</style>
