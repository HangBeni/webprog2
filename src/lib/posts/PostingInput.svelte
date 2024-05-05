<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';

	let content: string;
	let url:string | null = $page.route.id;

	async function createPost() {
		await fetch('/api/posts', {
			method: 'Post',
			body: JSON.stringify({ content: content, url: url }),
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
	<label for="newPost">{url === '/myband/[band]' ? 'What is in the band\'s head?' : 'What\'s in your head?'}</label>
	<input
		type="text"
		name="newPost"
		id="newPost"
		minlength="1"
		autocomplete="off"
		bind:value={content}
		on:keypress={(e) => e.key === 'Enter' ?? createPost}
	/>
	<button type="submit" on:click={createPost}>--></button>
</form>

<style>
	form {
		position: fixed;
		right: 2rem;
		top: 5rem;
		padding: 1rem;
		border-radius: 1rem;
		background-color: var(--secondary-color);
	}
	form > label {
		display: block;
		font-style: oblique;
	}
	button {
		cursor: pointer;
		background: none;
		padding: 0.3rem;
		padding-inline: 0.75rem;
		border-radius: 5rem;
		transition: all 200ms;
	}
	button:hover {
		background: #a25d5d;
	}
	input {
		padding-inline: 1rem ;
		padding-top: 0.3rem;
		background: inherit;
		border: 2px solid;
		border-bottom-left-radius: 1rem;
		border-bottom-right-radius: 1rem;
	}
</style>
