<script lang="ts">
	import { invalidateAll } from "$app/navigation";
	import { page } from "$app/stores";


	let content: string;

	async function createPost() {
		let url = $page.route.id;
		await fetch('/api/posts', {
			method: 'Post',
			body: JSON.stringify({content: content, url:url}),
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			}
		});
		content = '';
		invalidateAll();
	}

</script>

<form>
	<label for="newPost">What's in your head?</label>
	<input
		type="text"
		name="newPost"
		id="newPost"
		minlength="1"
		autocomplete="off"
		bind:value={content}
		on:keypress={(e) => e.key ==='Enter' ?? createPost}
	/>
	<button type="submit" on:click={createPost}>--></button>
</form>

<style>
</style>
