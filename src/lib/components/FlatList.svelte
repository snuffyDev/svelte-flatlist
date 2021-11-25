<script lang="ts">
	import { createEventDispatcher, onMount, tick } from 'svelte';
	import draggable from '$lib/actions/draggable';
	import { fly } from 'svelte/transition';

	type Position = 'left' | 'center' | 'right';
	type Overflow = 'auto' | 'scroll' | 'hidden' | 'visible';
	let className = '';
	/** @type {boolean}
	 *  visibility state */
	export let visible;
	/** @type {number}
	 *  z-index of the list*/
	export let zIndex = 9999;
	/** @type {string}
	 *  position of the list*/
	export let position: Position = 'center';
	/** @type {string}
	 *  duration of opening & closing transitions*/
	export let duration = 400;
	/** @type {string}
	 *  maximum width of the list -- must include CSS unit*/
	export let maxWidth = '640px';
	/** @type {string}
	 *  gap between list items -- must include CSS unit*/
	export let gap = '0.8rem';
	/** @type {string}
	 *  equivalent to standard CSS Overflow*/
	export let overflow: Overflow = 'auto';
	/** @type {string}
	 *  your custom classes*/
	export { className as class };
	const hideEvent = () => dispatch('close', visible);
	let listHeight;
	let sliding;
	let posY = 0;
	let popper = undefined;
	let popperHeight;

	function startHandler({ detail }) {
		sliding = true;
	}
	function release(e) {
		if (sliding) {
			if (posY < height * 1.5) {
				open();
			} else {
				close();
			}
		}
		sliding = false;
	}
	function trackMovement({ y }) {
		if (y <= listHeight && y >= 0) {
			posY = y;
		} else if (y <= listHeight) {
			trackOpen();
		}
	}
	function trackOpen() {
		posY = posY;
	}
	function open() {
		posY = 0;
	}
	async function close() {
		sliding = false;
		await tick();
		hideEvent();
		posY = 0;
	}
	const dispatch = createEventDispatcher();

	$: height = popper
		? listHeight - parseInt(getComputedStyle(popper).height.split('px')[0])
		: listHeight - popperHeight;
	// $: console.log(` height: ${height}, height*1.5: ${height * 3}`);
	$: console.log(
		`listHeight: ${listHeight},posY: ${posY},popperHeight: ${height}, height*1.5: ${height * 1.5}`
	);
</script>

<svelte:window bind:innerHeight={listHeight} />
{#if visible}
	<div class="backdrop" on:click={() => dispatch('close')} />
	<div
		in:fly={{ duration: duration, y: listHeight }}
		out:fly={{ duration: duration * 2, y: listHeight }}
		class={`${position} svelte-draggable-menu ${className}`}
		bind:clientHeight={popperHeight}
		bind:this={popper}
		style="--depth: {zIndex}; max-width: {maxWidth}; transform: translateY({posY}px); top:{height}px; {sliding
			? ''
			: 'transition: transform 400ms cubic-bezier(0.895, 0.03, 0.685, 0.22)'}; "
	>
		<div
			class="handle"
			use:draggable
			on:dragstart={startHandler}
			on:dragmove={(e) => {
				trackMovement({ y: e.detail.y });
			}}
			on:dragend={release}
		>
			<span class="line" />
		</div>
		<div class="items" style="--gap: {gap}; --overflow: {overflow};">
			<slot />
		</div>
	</div>
{/if}

<style lang="scss">
	.backdrop {
		z-index: 2;
		position: fixed;
		top: 0;
		left: 0;
		background: rgba(255, 255, 255, 0);
		min-height: 100vh;
		max-height: 100vh;
		min-width: 100vw;
		max-width: 100vw;
	}
	.svelte-draggable-menu {
		border-top-left-radius: 1rem;
		border-top-right-radius: 1rem;
		box-shadow: 0 0 0.5em 0 rgba(0, 0, 0, 0.623);
		display: flex;
		flex-direction: column;
		height: auto;
		isolation: isolate;
		max-height: 80vh;
		max-width: 640px;
		min-height: 8rem;
		min-width: 0;
		position: fixed !important;
		top: 0;
		transform: translateY(0px);
		width: 90%;
		z-index: var(--depth) !important;
		overscroll-behavior: contain;
		-webkit-user-drag: none;
		&.center {
			right: 0;
			left: 0;
			margin: 0 auto;
		}
		&.left {
			left: 0;
		}
		&.right {
			right: 0;
		}
		@media (prefers-color-scheme: 'light') {
			background-color: #f1f1f1;
		}
		@media (prefers-color-scheme: 'dark') {
			background-color: #121212;
		}
	}

	.items {
		display: flex;
		flex-direction: column;
		gap: var(--gap);
		padding: 0.8em 0.8em;
		overflow-y: var(--overflow);
		width: calc(100%-40px);
	}

	.handle {
		top: 0;
		cursor: pointer;
		width: 100%;
		height: 2rem;
		pointer-events: all;
		position: sticky;
		display: flex;
		justify-content: center;
		place-items: center;
		left: 0;
		right: 0;
		border-top-left-radius: 1rem;
		border-top-right-radius: 1rem;
	}
	.line {
		background: hsla(0, 0%, 70%, 1);
		height: 0.5rem;
		width: 60%;
		border-radius: 999999rem;
	}
</style>
