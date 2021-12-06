<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import draggable from '$lib/_actions/draggable';
	import { fly } from 'svelte/transition';

	type HandleStyle = {
		bgColor?: string;
		fgColor?: string;
		height?: string;
	};

	type ListStyle = {
		bgColor?: string;
		handle?: HandleStyle;
	};

	type Position = 'left' | 'center' | 'right';
	type Overflow = 'auto' | 'scroll' | 'hidden' | 'visible';

	export let style: ListStyle = {
		bgColor: '#f2f2f2',
		handle: {
			bgColor: 'transparent',
			fgColor: 'hsl(0deg 0% 67%)',
			height: '3rem'
		}
	};

	export let visible = false;
	export let zIndex = 9999;
	export let position: Position = 'center';
	export let duration = 400;
	export let maxWidth = '640px';
	export let gap = '0.8rem';
	export let overflow: Overflow = 'auto';

	const hideEvent = () => dispatch('close', visible);

	let listHeight;
	let sliding;

	let posY = 0;
	let popperHeight = 0;

	function startHandler() {
		sliding = true;
	}

	function release() {
		if (sliding) {
			if (posY < listHeight * 0.4) {
				open();
			} else {
				close();
			}
			sliding = false;
		}
	}
	function trackMovement({ y }) {
		if (y <= listHeight && y >= 0) {
			posY = y;
		} else if (y < listHeight * 0.4 && y >= -50) {
			open();
		} else {
			close();
		}
	}

	function open() {
		posY = 0;
	}
	function close() {
		sliding = false;
		posY = 0;
		hideEvent();
	}
	const dispatch = createEventDispatcher();

	// Get the estimated position of the Top of the list element
	$: height = listHeight - popperHeight;
</script>

<svelte:window bind:innerHeight={listHeight} />
{#if visible}
	<div
		class="backdrop"
		on:click={close}
		on:scroll|preventDefault|stopPropagation|capture={() => {}}
	/>
	<div
		in:fly={{ duration: duration, y: listHeight }}
		out:fly={{ duration: duration * 2, y: listHeight }}
		class="svelte-draggable-menu-wrapper"
		style="z-index:{zIndex};"
		on:scroll|preventDefault|stopPropagation|capture={() => {}}
	>
		<div
			class={`svelte-draggable-menu ${position}`}
			bind:clientHeight={popperHeight}
			style="--depth: {zIndex +
				1}; --bg: {style.bgColor}; max-width: {maxWidth}; transform: translateY({posY}px); top:{height}px; {sliding
				? ''
				: 'transition: transform 400ms cubic-bezier(0.755, 0.05, 0.855, 0.06)'}; "
		>
			<div
				class="handle"
				style="--bg: {style.handle.bgColor}; --height: {style.handle.height};"
				use:draggable
				on:dragstart={startHandler}
				on:dragmove={(e) => {
					trackMovement({ y: e.detail.y });
				}}
				on:dragend={release}
			>
				<span class="line" style="--fg: {style.handle.fgColor};" />
			</div>
			<div class="items" style="--gap: {gap}; --overflow: {overflow};">
				<slot />
			</div>
		</div>
	</div>
{/if}

<style lang="scss">
	.svelte-draggable-menu-wrapper {
		// transition: cubic-bezier(0.895, 0.03, 0.685, 0.22) cubic-bezier(0.755, 0.05, 0.855, 0.06)
		// pointer-events: none;
		position: fixed;
		inset: 0;
		pointer-events: none;
		background: rgba(255, 255, 255, 0);
		overscroll-behavior: none;
	}

	.backdrop {
		position: fixed;
		inset: 0;
		background: rgba(255, 255, 255, 0);
		min-height: 100%;
		max-height: 100%;
		min-width: 100%;
		max-width: 100%;
		width: 100%;
		height: 100%;

		z-index: 2;
		isolation: isolate;
	}
	.svelte-draggable-menu {
		pointer-events: auto;
		border-top-left-radius: 1rem;
		border-top-right-radius: 1rem;
		box-shadow: 0 0 0.5em 0 rgba(0, 0, 0, 0.623);
		background-color: var(--bg);

		display: flex;
		flex-direction: column;
		height: auto;
		isolation: isolate;
		max-height: 80vh;
		max-width: 640px;
		min-height: 0;
		min-width: 0;
		position: absolute !important;
		width: 90%;
		z-index: var(--depth) !important;
		overscroll-behavior: none;

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
	}

	.items {
		display: flex;
		flex-direction: column;
		gap: var(--gap);
		padding: 0.8em 0.8em;
		// height: inherit;
		overflow-y: var(--overflow);
		// width: calc(100%);
	}

	.handle {
		top: 0;
		cursor: pointer;
		width: 100%;
		height: var(--height, 5rem);
		pointer-events: all;
		position: sticky;
		background-color: var(--bg);
		display: flex;
		justify-content: center;
		place-items: center;
		-webkit-user-select: none;
		-moz-user-select: none;

		user-select: none;

		left: 0;
		right: 0;
		border-top-left-radius: 1rem;
		border-top-right-radius: 1rem;
	}
	.line {
		background: var(--fg);
		height: 0.5rem;
		width: 60%;
		border-radius: 999999rem;
		pointer-events: none;
		-webkit-user-select: none;
		-moz-user-select: none;

		user-select: none;
	}
</style>
