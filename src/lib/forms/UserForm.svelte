<script lang="ts">
	export let reqType = true;
	import { useForm } from 'svelte-use-form';

	import { enhance } from '$app/forms';

	const form = useForm({
		userName: {},

		userPassword: {},

		userEmail: {},

		userBand: {}
	});
</script>

<form method="POST" action="?/manageUser" use:form >
	<div class="inputPlaceholder">
		<label for="userName">User Name</label>
		<input
			autoComplete="nickname"
			required
			minLength={5}
			type="text"
			name="userName"
			id="userName"
		/>
		<span class="userNameError"></span>

		<label for="userEmail">Email</label>
		<input
			autoComplete="email"
			disabled={!reqType}
			required
			type="email"
			name="userEmail"
			id="userEmail"
		/>
		<span class="emailError"></span>

		<label for="userPassword">Password</label>
		<input
			autoComplete="off"
			required
			minLength={5}
			type="text"
			name="userPassword"
			id="userPassword"
		/>
		<span class="passwordError"></span>

		<label for="userBand">Banda</label>
		<input
			autoComplete="off"
			required
			type="text"
			name="userBand"
			id="userBand"
			disabled={!reqType}
		/>

		<input
			type="checkbox"
			name="reqTypeBox"
			id="reqTypeBox"
			checked
			on:change={(e) => (reqType = e.currentTarget.checked)}
		/>
		<input type="submit" value={reqType ? 'Regisztráció' : 'Bejentkezés'} id="submitB" />
	</div>
</form>
