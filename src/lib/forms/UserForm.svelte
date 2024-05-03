<script lang="ts">
	import { RegistrationStatus, type User } from '$lib/types';
	import { emailValidator, nameValidator, passwordValidator } from '$lib/validators';
	import { onMount } from 'svelte';

	let nameErrorSpan: HTMLElement | null;
	let emailErrorSpan: HTMLElement | null;
	let passwordErrorSpan: HTMLElement | null;

	let nameValid: boolean | undefined = false;
	let emailValid: boolean | undefined = false;
	let passwordValid: boolean | undefined = false;

	let form: User = {
		name: '',
		password: '',
		email: '',
		band: ''
	};

	onMount(() => {
		nameErrorSpan = document.getElementById('userNameError');
		emailErrorSpan = document.getElementById('emailError');
		passwordErrorSpan = document.getElementById('passwordError');
	});

	async function handleReg() {
		const loginRes : RegistrationStatus = await fetch('/api/user', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(form)
		}).then((res) => res.json());

		if (loginRes == RegistrationStatus.OK) {
			window.location.href = '/' // ahhoz kell így csinálni hogy újra töltsön
		}else if (loginRes == RegistrationStatus.ServerFail) {
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
			maxlength={20}
			type="text"
			name="userName"
			id="userName"
			bind:value={form.name}
			on:change={() => (nameValid = nameValidator(form.name, nameErrorSpan))}
		/>
		<span id="userNameError" class="error"></span>

		<label for="userEmail">Email</label>
		<input
			autoComplete="email"
			required
			type="email"
			name="userEmail"
			id="userEmail"
			bind:value={form.email}
			on:change={() => (emailValid = emailValidator(form.email, emailErrorSpan))}
		/>
		<span id="emailError" class="error"></span>

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
			type="text"
			name="userBand"
			id="userBand"
			bind:value={form.band}
		/>

		<input
			type="button"
			value={'Regisztráció'}
			on:click={handleReg}
			disabled={!passwordValid || !nameValid || !emailValid}
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
