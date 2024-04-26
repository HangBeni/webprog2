<script lang="ts">
	import type { Band } from '$lib/types';
	import { birthValidator, nameValidator } from '$lib/validators';
	import { onMount } from 'svelte';

	let band: Band = {
		id: 0,
		name: '',
		birth: new Date(),
		genre: '',
		story: ''
	};
	let photos: File[] = [];

	let nameError:Element|null;
	let birthError:Element|null;
	let genreError:Element|null;


	onMount(() => {
		nameError = document.getElementById("nameError")
		birthError = document.getElementById("birthError")
		genreError = document.getElementById("genreError")

	});
	const handleRegistration = async () => {

		
	};

	$:if(photos){
		if ( photos.length > 3) {
			alert("Nem lehet 3 képnél többet feltölteni!")
			photos = [];
		}
	}
</script>

<form method="POST" on:submit|preventDefault={handleRegistration}>
	<div class="inputPlaceholder">

		<label for="bandName">Banda neve</label>
		<input required type="text" name="bandName" id="bandName" bind:value={band.name}  on:change={ () => nameValidator(band.name, nameError) }/>
		<span id="nameError"></span>

		<label for="bandBirth">Banda alakulása</label>
		<input required type="date" name="bandBirth" id="bandBirth" bind:value={band.birth} on:change={() => birthValidator(band.birth, birthError)} />
		<span id="birthError"></span>

		<label for="genres">Zsanrák</label>
		<input required type="text" name="genres" id="genres" bind:value={band.genre} on:change={ () => nameValidator(band.genre, genreError) } />
		<span id="genreError"></span>

		<label for="backStory">A banda sztorija, története</label>
		<textarea
			required
			name="backStory"
			id="backStory"
			cols="20"
			rows="10"
			minlength="50"
			maxlength="200"
			placeholder="     Your story"
			bind:value={band.story}
		></textarea>
		<span>(Maximum 200 karakter)</span>

		<input type="file" accept="image/*" name="bandPicture" id="bandPicture" alt="Input file" 
		bind:value={photos} multiple required 
		/>

		<button type="submit" id="submitB"> Registration </button>
	</div>
</form>
