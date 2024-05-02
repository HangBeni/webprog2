<script lang="ts">
	import { goto } from '$app/navigation';
	import { RegistrationStatus, type User } from '$lib/types';
	import { nameValidator, passwordValidator } from '$lib/validators';
	import { onMount } from 'svelte';

	let nameErrorSpan: HTMLElement | null;
	let passwordErrorSpan: HTMLElement | null;

	let nameValid: boolean | undefined = false;
	let passwordValid: boolean | undefined = false;
	let bandValid: boolean | undefined = false;

	let regStatus: RegistrationStatus;

	let form: User = {
		name: '',
		password: '',
		email: '',
		band: ''
	};

	onMount(() => {
		nameErrorSpan = document.getElementById('userNameError');
		passwordErrorSpan = document.getElementById('passwordError');
	});

	async function handleLogin() {
		regStatus = await fetch('/api/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(form)
		}).then((res) => res.json());

		form = {
			name: '',
			password: '',
			email: '',
			band: ''
		};

		if (regStatus == RegistrationStatus.ThereIs) {
			goto('/');
		} else if (regStatus == RegistrationStatus.NotFound) {
			nameErrorSpan!.textContent = 'Nincs ilyen user';
		} else if (regStatus == RegistrationStatus.ServerFail) {
			alert('Server fail!');
		}
	}
</script>

<form on:submit|preventDefault={() => console.log('Submit')}>
	<div class="inputPlaceholder">
		<label for="userName">User Name</label>
		<input
			autoComplete="nickname"
			required
			minLength={5}
			type="text"
			name="userName"
			id="userName"
			bind:value={form.name}
			on:change={() => (nameValid = nameValidator(form.name, nameErrorSpan))}
		/>
		<span id="userNameError" class="error"></span>

		<label for="userPassword">Password</label>
		<input
			autoComplete="off"
			required
			minLength={5}
			type="password"
			name="userPassword"
			id="userPassword"
			bind:value={form.password}
			on:change={() => (passwordValid = passwordValidator(form.password, passwordErrorSpan))}
		/>
		<span id="passwordError" class="error"></span>

		<label for="userBand">Banda</label>
		<input
			autoComplete="off"
			required
			type="text"
			name="userBand"
			id="userBand"
			bind:value={form.band}
			on:change={() => (bandValid = form.band !== '')}
		/>

		<input
			type="button"
			value={'Bejentkezés'}
			on:click={handleLogin}
			disabled={!passwordValid || !nameValid || !bandValid}
			id="submitB"
		/>
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
