<script lang="ts">
	import { enhance } from "$app/forms";

	export let reqType = true;

</script>
<form method="post" action={reqType ? 'user?/registration' : 'user?/login'} use:enhance>
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

		<label for="userPsswrd">Password</label>
		<input
			autoComplete="off"
			required
			minLength={5}
			type="text"
			name="userPsswrd"
			id="userPsswrd"
		/>
		<span class="passwordError"></span>

		<label for="userBand">Banda</label>
		<input autoComplete="off" required type="text" name="userBand" id="userBand" disabled={!reqType}/>

		<input type="checkbox" name="reqTypeBox" id="reqTypeBox" checked on:change={e => reqType = e.currentTarget.checked}>
		<input type="submit" value={reqType ? 'Regisztráció' : 'Bejentkezés'} id="submitB" />
		
	</div>
	
</form>