<script lang="ts">
	import clickOutside from '$lib/_actions/clickOutside';
	import { fly } from 'svelte/transition';

	let width;
	let isHidden = true;
	$: hidden = isHidden;
</script>

<svelte:window bind:innerWidth={width} />
{#if !hidden}
	<aside
		use:clickOutside
		in:fly={{ x: -50 }}
		out:fly={{ x: -50 }}
		on:outside={() => (isHidden = true)}
	>
		<ul>
			<li><a href="#usage">Usage</a></li>
			<li><a href="#props">Props</a></li>
			<li><a href="#events">Events</a></li>
		</ul>
	</aside>
{:else}
	<button
		class="top-right"
		on:click={() => {
			isHidden = !isHidden;
		}}>&equiv;</button
	>
{/if}

<style lang="scss">
	.top-right {
		position: fixed;
		z-index: 5;
		right: 0;
		top: 0;
		background: rgba(31, 31, 31, 0.288);
		width: 3rem;
		height: 3rem;
		font-size: 2rem;
		display: inline-flex;
		place-items: center;
		justify-content: center;
		border: none;
	}
	aside {
		position: fixed;
		left: 0;
		top: 0;
		width: 12rem;
		height: 100%;
		z-index: 1;
		background: #302b36;
	}
	ul {
		padding: 0 0 0 0.8rem;
		// text-align: center;
		list-style: none;
	}
	li {
		margin-bottom: 0.8rem;
		font-size: medium;
	}
	a {
		font-size: large;
		color: #f2f2f2;
		text-underline-offset: 0.075rem;
	}
</style>
