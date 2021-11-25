<script>
	import TableOfContents from './_TableOfContents.svelte';
</script>

<TableOfContents />
<slot />

<style lang="scss" global>
	html,
	body {
		box-sizing: border-box;
		// height: auto;
		min-height: 100vh;
		-webkit-overflow-scrolling: touch;
		// background-color: #97a1ac;
		font-size: 1rem;
		-webkit-text-size-adjust: 100%;
		-ms-overflow-style: -ms-autohiding-scrollbar;
		box-sizing: border-box;
		border-collapse: collapse;
		position: relative;
		margin: 0 auto;
		// padding: var(--nav-h) 0 0 0;
		overflow-x: hidden;
	}

	html {
		scroll-behavior: smooth;
	}

	:root {
		font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
			Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

		-webkit-tap-highlight-color: transparent;
		-webkit-font-smoothing: antialiased;
	}
	#svelte {
		overflow: hidden;
	}
	table {
		border-width: 1px;
		border-style: solid;
		// border-color: hsl(0deg 0% 67%);
		border-collapse: separate;
		border-spacing: 0;

		font-size: 1.1rem;
	}
	th {
		background-color: rgba(0, 0, 0, 0.438);
	}
	td,
	th {
		padding: 0.8rem;
	}
	tr {
		// padding: 1rem 0;
	}
	tr:nth-child(even) {
		background-color: rgba(242, 242, 242, 0.021);
		color: rgb(255, 255, 255);
	}
	*,
	*::before,
	*::after {
		box-sizing: inherit;
	}
</style>
