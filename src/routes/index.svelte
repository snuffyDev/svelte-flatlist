<script context="module" lang="ts">
	export const ssr = false;
</script>

<script lang="ts">
	import FlatList from '$lib/FlatList.svelte';
	import Codeblock from './_Codeblock.svx';
	import GHLink from './_GHLink.svelte';
	import Props from './_Props.svelte.md';
	import Installation from './_Install.svelte.md';
	let visible = false;
	let items = new Array(32).fill(false).map((item, i) => i);
	let position;
</script>

<main>
	<h1>svelte-flatlist</h1>
	<p>A mobile-friendly, simple, and customizable draggable menu.</p>
	<GHLink />

	<br />
	<Installation />

	<h2>Demo</h2>
	<div class="wrap">
		<FlatList
			overflow="auto"
			zIndex={2}
			{position}
			on:close={({ detail }) => {
				// visible = false;
				visible = false;
			}}
			bind:visible
		>
			{#each items as item, i}
				<span>{i}</span>
				<!-- <hr /> -->
			{/each}
		</FlatList>
		<div class="button-row">
			<button
				on:click={() => {
					position = 'left';
					visible = !visible;
				}}>Show left menu</button
			>
			<button
				on:click={() => {
					position = 'center';
					visible = !visible;
				}}>Show center menu</button
			>
			<button
				on:click={() => {
					position = 'right';
					visible = !visible;
				}}>Show right menu</button
			>
		</div>
	</div>
	<Codeblock />
	<Props />
</main>

<style lang="scss">
	.button-row {
		display: inline-flex;
		justify-content: space-between;
		width: 100%;
	}
	main {
		margin: 0 auto;
		max-width: 720px;
		padding: 0 1rem 1rem 1rem;
	}
	.wrap {
		position: relative;
	}
	span {
		border-bottom: #aaa solid 1px;
		padding: 0.8rem 1rem;
		display: block;
		background-color: #8d8d8d73;
	}
	button {
		padding: 0.8rem 1.5rem;
		font-family: inherit;
		font-size: 1rem;
		font-weight: 600;
	}
	.items {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		overflow-y: scroll;
	}
	ul {
		display: flex;
		flex-direction: column;
	}
	li {
		padding: 1rem;
		background: #46464673;
	}

	h1 {
		border-bottom: 1px #ddd solid;
		padding-bottom: 1rem;
	}
	p {
		// background: #f2f2f2;
		max-width: fit-content;
		// padding: 1rem;
		// margin-left: 0.9rem;
	}
</style>
