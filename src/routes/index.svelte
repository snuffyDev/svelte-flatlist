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
	let style = {
		bgColor: '#f2f2f2',
		handle: {
			bgColor: 'transparent',
			fgColor: 'hsl(0deg 0% 67%)',
			height: '5rem'
		}
	};
	let position;
	let value;
	let height;
	$: console.log(value);
</script>

<main>
	<h1>svelte-flatlist</h1>
	<p>A mobile-friendly, simple, and customizable draggable menu.</p>
	<GHLink />

	<br />
	<Installation />

	<h2>Demo</h2>
	<div class="wrap">
		<div class="style-demo">
			<label>Base Background Color: <input type="color" bind:value={style.bgColor} /></label>
			<label
				>Handle Background Color: <input type="color" bind:value={style.handle.bgColor} /></label
			>
			<label
				>Handle Foreground Color: <input type="color" bind:value={style.handle.fgColor} /></label
			>
			<label>
				Handle Height (req. CSS size unit): <form on:submit|preventDefault={() => {}}>
					<input
						type="text"
						pattern="[-+]?[0-9]*[.,]?[0-9]+?(rem|px|em|vh|vw|vmax|vmin|%|pt|ch)"
						placeholder="5rem"
						bind:value={style.handle.height}
					/>
				</form>
			</label>
		</div>
		<FlatList
			overflow="auto"
			zIndex={2}
			bind:style
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
	<br />
	<br />
	<Codeblock />
	<Props />
</main>

<style lang="scss">
	input[type='text'] {
		padding: 0.5rem 0.8rem;
		font-size: 1.1rem;
	}
	label {
		line-height: 1.5;
		margin-bottom: 0.25em;
	}
	.style-demo {
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		background: rgba(88, 88, 88, 0.199);
		padding: 0.8rem;
		border-radius: 1rem;
		gap: 0.8rem;
		border: 1px #666 solid;
		margin-bottom: 1.2rem;
	}
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
