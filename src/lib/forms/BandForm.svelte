<script lang="ts">
	import { RegistrationStatus, type Band } from '$lib/types';
	import { birthValidator, nameValidator } from '$lib/validators';
	import { redirect } from '@sveltejs/kit';
	import { onMount } from 'svelte';

	let band: Band = {
		name: '',
		birth: new Date(),
		genre: '',
		story: ''
	};
	let regStatus: RegistrationStatus;
	let photos: File;

	let nameError: Element | null;
	let birthError: Element | null;
	let genreError: Element | null;

	onMount(() => {
		nameError = document.getElementById('nameError');
		birthError = document.getElementById('birthError');
		genreError = document.getElementById('genreError');
	});

	const handleRegistration = async () => {
		regStatus = await fetch('api/registration/band', {
			method: 'POST',
			body: JSON.stringify(band),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then((res) => res.json());

		if (regStatus == RegistrationStatus.OK) {
			redirect(308, '/');
		} else if (regStatus == RegistrationStatus.ServerFail) {
			alert('Server Fail');
			band.name = '';
		} else if (regStatus == RegistrationStatus.ThereIs) {
			nameError!.textContent = 'Van már ilyen nevű banda, bocsesz!';

			band = {
				name: '',
				birth: new Date(),
				genre: '',
				story: ''
			};
		}
	};
</script>

<form method="POST" on:submit|preventDefault={handleRegistration}>
	<div class="inputPlaceholder">
		<label for="bandName">Banda neve</label>
		<input
			required
			type="text"
			name="bandName"
			id="bandName"
			bind:value={band.name}
			on:change={() => nameValidator(band.name, nameError)}
		/>
		<span id="nameError" class="error"></span>

		<label for="bandBirth">Banda alakulása</label>
		<input
			required
			type="date"
			name="bandBirth"
			id="bandBirth"
			bind:value={band.birth}
			on:change={() => birthValidator(band.birth, birthError)}
		/>
		<span id="birthError" class="error"></span>

		<label for="genres">Zsanrák</label>
		<input
			required
			type="text"
			name="genres"
			id="genres"
			bind:value={band.genre}
			on:change={() => nameValidator(band.genre, genreError)}
		/>
		<span id="genreError" class="error"></span>

		<label for="backStory">A banda sztorija, története</label>
		<textarea
			required
			name="backStory"
			id="backStory"
			cols="20"
			rows="10"
			minlength="30"
			maxlength="200"
			placeholder="     Your story"
			bind:value={band.story}
		></textarea>
		<span>(Maximum 200 karakter)</span>

		<!-- <input
			type="file"
			accept="image/*"
			name="bandPicture"
			id="bandPicture"
			alt="Input file"
			bind:value={photos}
			required
		/> -->

		<button type="submit" id="submitB"> Registration </button>
	</div>
</form>

<style>
	.error {
		display: block;
		font-weight: bold;
		color: red;
	}
	form > .inputPlaceholder {
		width: 40%;
		margin-inline: auto;
	}
	.inputPlaceholder {
		display: grid;
		grid-template-columns: 1fr;
	}
</style>
