<script lang="ts">
	import type { Links } from '$lib/types';
	import type { LayoutData } from '../../routes/$types';
	import { type SelectBand, type SelectUser } from '$lib/db/schema';
	import { onMount } from 'svelte';
	import { goto, invalidateAll } from '$app/navigation';

	export const links: Links[] = [
		{ name: 'Főoldal', link: '/' },
		{ name: 'Bandák keresése', link: '/bandbrowser' },
		{ name: 'Bejelentkezés', link: '/login' },
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
		goto('/');
		invalidateAll();
	};
</script>

<nav>
	<ul>
		{#each links as link}
			<!-- svelte-ignore empty-block -->
			{#if link.link === '/login' && data.inSession}
				<li><a href={`/${userName}`}> <i class="fa-solid fa-person"></i> {userName}</a></li>
				{#if data.userBand}
					<li>
						<a href={`/myband/${bandName}`}><i class="fa-brands fa-bandcamp"></i> {bandName}</a>
					</li>
				{/if}
			{:else if link.link.includes('/registration') && data.inSession}{:else}
				<li><a href={link.link}>{link.name}</a></li>
			{/if}
		{/each}
		{#if data.inSession}
			<li><a data-sveltekit-reload href="/" on:click={logOut}>Log out</a></li>
		{/if}
	</ul>
</nav>

<style>
	ul {
		display: flex;
		gap: 2rem;
		margin-left: 5rem;
	}
	li {
		list-style: none;
	}
	a {
		color: hsl(39, 81%, 75%);
		text-decoration: none;
		transition: all 200ms;
	}
	a:hover {
		color: hsl(39, 58%, 61%);
	}
</style>
