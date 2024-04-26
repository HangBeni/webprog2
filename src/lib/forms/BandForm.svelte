<form method="POST">
	<div class="inputPlaceholder">
		<label for="bandName">Banda neve</label>
		<input required type="text" name="bandName" id="bandName" />

		<label for="bandBirth">Banda alakulása</label>
		<input type="datetime" name="bandBirth" id="bandBirth" />

		<label for="genres">Zsanrák</label>
		<input required type="text" name="genres" id="genres" />

		<label for="backStory">A banda sztorija, története</label>
		<textarea
			required
			name="backStory"
			id="backStory"
			cols="20"
			rows="10"
			placeholder="     Your story"
		></textarea>
		<input type="file" accept="image/*" name="bandPicture" id="bandPicture" alt="Input file" />
	
		<button type="submit" id="submitB"> registration </button>
	</div>
</form>