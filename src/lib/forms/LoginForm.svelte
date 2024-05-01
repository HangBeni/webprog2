<script lang="ts">
	import type { User } from '$lib/types';
	import { nameValidator, passwordValidator } from '$lib/validators';
	import { onMount } from 'svelte';


	let nameErrorSpan: HTMLElement | null;
	let passwordErrorSpan: HTMLElement | null;

	let nameValid: boolean | undefined = false;
	let passwordValid: boolean | undefined = false;
	let bandValid: boolean | undefined = false;
	let loginRes = {
		success: false,
		user: null
	};

	let form: User = {
		name: '',
		band: '',
		password: '',
		email: ''	};

	onMount(() => {
		nameErrorSpan = document.getElementById('userNameError');
		passwordErrorSpan = document.getElementById('passwordError');
	});


	async function handleLogin() {
		loginRes = await fetch('/api/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(form)
		}).then((res) => res.json());
	}
</script>

<form on:submit|preventDefault={()=> console.log('Submit')}>
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
			on:change={() => nameValid = nameValidator(form.name, nameErrorSpan)}
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
			on:change={() => passwordValid = passwordValidator(form.password, passwordErrorSpan)}
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
			on:change={() => bandValid = form.band !== ""}
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

{#if loginRes.success && nameValid && passwordValid && bandValid}
	<p>Login successful. User: {JSON.stringify(loginRes.user)}</p>
{:else if loginRes.success === false}
	<p>Login failed.</p>
{/if}

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
