<script lang="ts">
	import type { Post } from '$lib/types';

	export let post: Post;
</script>

<div>
	<h1>{post.author}</h1>
	<p>{post.content}</p>
	<i>{post.created_at}</i>
	<slot />
</div>
