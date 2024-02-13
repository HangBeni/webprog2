<form method="post">
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
		<input autoComplete="email" required type="email" name="userEmail" id="userEmail" />
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
		<input autoComplete="off" required type="text" name="userBand" id="userBand" />

		<input type="submit" value="Submit" id="submitB" />
	</div>
</form>
