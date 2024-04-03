<script lang="ts">
	import type { Comment } from '$lib/types';

	export let comment: Comment;
</script>

<div>
	<h4>{comment.author}</h4>
	<p>{comment.content}</p>
	<i>{Date.parse(comment.created_at)}</i>
</div>


<style>
	div{
		border: 1px dotted blue;
	}
	
</style>
