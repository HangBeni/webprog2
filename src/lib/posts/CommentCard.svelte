<script lang="ts">
	import type { SelectComment } from '$lib/db/schema';

	export let comment: SelectComment;
</script>

<div>
	<h4>{comment.author}</h4>
	<p>{comment.content}</p>
	<i>{comment.created_at}</i>
</div>


<style>
	div{
		border: 1px dotted blue;
	}
	
</style>
