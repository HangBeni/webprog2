<script lang="ts">
	import { RegistrationStatus, type User } from '$lib/types';
	import { emailValidator, nameValidator, passwordValidator } from '$lib/validators';
	import { onMount } from 'svelte';

	let nameErrorSpan: HTMLElement | null;
	let passwordErrorSpan: HTMLElement | null;
	let emailErrorSpan: HTMLElement | null;

	let nameValid: boolean | undefined = false;
	let passwordValid: boolean | undefined = false;
	let emailValid: boolean | undefined = false;

	let regStatus: RegistrationStatus;

	let form: User = {
		name: '',
		password: '',
		email: ''
	};

	onMount(() => {
		nameErrorSpan = document.getElementById('userNameError');
		passwordErrorSpan = document.getElementById('passwordError');
		emailErrorSpan = document.getElementById('emailError');
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
			window.location.href = '/'; // ahhoz kell így csinálni hogy újra töltsön
		} else if (regStatus == RegistrationStatus.NotFound) {
			nameErrorSpan!.textContent = 'Nincs ilyen user';
		} else if (regStatus == RegistrationStatus.ServerFail) {
			alert('Server fail!');
		}
	}
</script>

<form>
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

		<label for="userEmail">Email</label>
		<input
			autoComplete="email"
			required
			minLength={5}
			type="email"
			name="userPassword"
			id="userPassword"
			bind:value={form.email}
			on:change={() => (emailValid = emailValidator(form.email, emailErrorSpan))}
		/>
		<span id="emailError" class="error"></span>

		<button
			type="button"
			on:click={handleLogin}
			disabled={!passwordValid || !nameValid || !emailValid}
			id="submitB"
		>Bejentkezés</button>
	</div>
</form>

<style>
	@import '../../styles/login.css';
</style>
