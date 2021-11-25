<script context="module" lang="ts">
	export const ssr = false;
</script>

<script lang="ts">
	import FlatList from '$lib/components/FlatList.svelte';
	import Codeblock from './_Codeblock.svx';
	import Props from './_Props.md';

	let visible;
	let items = [
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		''
	];
	let position;
</script>

<main>
	<h1>svelte-flatlist</h1>
	<p>A mobile-friendly, simple, and customizable draggable menu.</p>
	<br />
	<h2>Installation:</h2>
	<code><pre>npm install -D svelte-flatlist</pre></code>
	<h2>Demo</h2>
	<div class="wrap">
		<FlatList
			class=""
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
	}
	main {
		display: flex;
		flex-direction: column;
		margin: 0 auto;
		max-width: 720px;
		// background-color: #f2f2f2f2;
		padding: 0 1rem 1rem 1rem;
		// min-height: 100%;
		position: relative;
		margin: 0 auto;
		// padding: var(--nav-h) 0 0 0;
		overflow-x: hidden;
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
