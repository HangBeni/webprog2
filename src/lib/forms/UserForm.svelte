<script lang="ts">
	import type { FormType } from '$lib/types';
	import { emailValidator, nameValidator, passwordValidator } from '$lib/validators';
	import { onMount } from 'svelte';

	let reqType = true;
	let nameErrorSpan: HTMLElement | null;
	let emailErrorSpan: HTMLElement | null;
	let passwordErrorSpan: HTMLElement | null;
	let loginRes = {
		success: false,
		user: null
	};

	let form: FormType = {
		userName: '',
		userEmail: '',
		userPassword: '',
		userBand: ''
	};

	onMount(() => {
		nameErrorSpan = document.getElementById('userNameError');
		emailErrorSpan = document.getElementById('emailError');
		passwordErrorSpan = document.getElementById('passwordError');
	});

	async function handleReg() {
		await fetch('/api/registration', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(form)
		});
	}

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

<div>
	<div class="inputPlaceholder">
		<label for="userName">User Name</label>
		<input
			autoComplete="nickname"
			required
			minLength={5}
			type="text"
			name="userName"
			id="userName"
			bind:value={form.userName}
			on:change={() => nameValidator(form.userName, nameErrorSpan)}
		/>
		<span id="userNameError"></span>

		<label for="userEmail">Email</label>
		<input
			autoComplete="email"
			disabled={!reqType}
			required
			type="email"
			name="userEmail"
			id="userEmail"
			bind:value={form.userEmail}
			on:change={() => emailValidator(form.userEmail, emailErrorSpan)}
		/>
		<span id="emailError"></span>

		<label for="userPassword">Password</label>
		<input
			autoComplete="off"
			required
			minLength={5}
			type="password"
			name="userPassword"
			id="userPassword"
			bind:value={form.userPassword}
			on:change={() => passwordValidator(form.userPassword, passwordErrorSpan)}
		/>
		<span id="passwordError"></span>

		<label for="userBand">Banda</label>
		<input
			autoComplete="off"
			required
			type="text"
			name="userBand"
			id="userBand"
			bind:value={form.userBand}
		/>

		<input type="checkbox" name="reqTypeBox" id="reqTypeBox" bind:checked={reqType} />
		<input
			type="button"
			value={reqType ? 'Regisztráció' : 'Bejentkezés'}
			on:click={reqType ? handleReg : handleLogin}
			id="submitB"
		/>
	</div>
</div>

{#if loginRes.success && nameErrorSpan?.className
		.toString()
		.includes('error') && emailErrorSpan?.className
		.toString()
		.includes('error') && passwordErrorSpan?.className.toString().includes('error')}
	<p>Login successful. User: {JSON.stringify(loginRes.user)}</p>
{:else if loginRes.success === false}
	<p>Login failed.</p>
{/if}

<style>
	.error {
		visibility: visible;
		display: block;
		font-weight: bold;
		color: red;
	}
</style>
