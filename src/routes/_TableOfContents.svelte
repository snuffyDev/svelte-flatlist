<script lang="ts">
	let width;
	let isHidden;
	$: mobile = width < 900;
	$: hidden = mobile === true ? true : isHidden;
	function clickOutside(node) {
		function clickhandler(event) {
			if (!node.contains(event.target)) {
				node.dispatchEvent(new CustomEvent('outside'));
			}
		}
		window.addEventListener('click', clickhandler, { capture: true, passive: true });
		return {
			destroy: () => {
				window.removeEventListener('click', clickhandler);
			}
		};
	}
</script>

<svelte:window bind:innerWidth={width} />
{#if !hidden}
	<aside use:clickOutside on:outside={() => (isHidden = true)}>
		<ul>
			<li><a href="#usage">Usage</a></li>
			<li><a href="#props">Props</a></li>
			<li><a href="#events">Events</a></li>
		</ul>
	</aside>
{:else}
	<button
		class="top-left"
		on:click={() => {
			isHidden = !isHidden;
		}}>&equiv;</button
	>
{/if}

<style lang="scss">
	.top-left {
		position: fixed;
		z-index: 5;
		left: 0;
		top: 0;
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
		width: 8rem;
		height: 100%;
	}
	ul,
	li {
		padding: 0;
		text-align: center;
		list-style: none;
	}
	li {
		margin-bottom: 0.8rem;
		font-size: medium;
	}
	a {
		font-size: large;
	}
</style>
