<script lang="ts">
	import { db } from '$lib/db/db.server';
	import type { Links } from '$lib/types';
	import { eq } from 'drizzle-orm';
	import type { LayoutData } from '../../routes/$types';
	import { bands } from '$lib/db/schema';

	export const links: Links[] = [
		{ name: 'Főoldal', link: '/' },
		{ name: 'Bandák keresése', link: '/bandbrowser' },
		{ name: 'Bejelentkezés', link: '/login' }, //Ha be van jelentkezve akkor cserélje ki egy avatarral
		//Saját bandám bejelentkezés után ha van a usernek
		{ name: 'Banda regisztráció', link: '/registration/band' },
		{ name: 'User regisztráció', link: '/registration/user' }
	];
	export let data: LayoutData;
	async function getBandName(bandId: number) {
		return await db.query.bands.findFirst({ where: eq(bands.id, bandId), columns: { name: true } });
	}
	//<i class="fa-solid fa-person"></i> ---> avatar
</script>

<nav>
	<ul>
		{#each links as link}
			{#if link.link === '/login' && data.inSession}
				<li><a href={`/${data.userID}`}> <i class="fa-solid fa-person"></i> </a></li>
				{#if data.userBand}
					<li>
						<a href={`/${data.userBand}`}>{getBandName(data.userBand)}</a>
					</li>
				{/if}
			{:else}
				<li><a href={link.link}>{link.name}</a></li>
			{/if}
		{/each}
	</ul>
</nav>

<style>
</style>
