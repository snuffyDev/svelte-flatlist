<script>
	import TableOfContents from './_TableOfContents.svelte';
</script>

<svelte:head>
	<title>Svelte-Flatlist docs</title>
</svelte:head>
<TableOfContents />
<slot />

<style lang="scss" global>
	html,
	body {
		box-sizing: border-box;
		// height: 100%;
		position: relative;
		min-height: 100vh;
		// background-color: #97a1ac;
		font-size: 1rem;
		-webkit-text-size-adjust: 100%;
		-ms-overflow-style: -ms-autohiding-scrollbar;
		box-sizing: border-box;
		margin: 0 auto;
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

	a.link {
		color: cornflowerblue;
	}
	a.wikilink {
		color: #1a1a1a;
		text-decoration: none;
		&:visited {
			color: inherit;
		}
		&:hover {
			text-decoration: underline 0.0625rem solid;
		}
		@media (prefers-color-scheme: dark) {
			color: #f1f1f1;
		}
	}
	table {
		border-width: 1px;
		border-style: solid;
		// border-color: hsl(0deg 0% 67%);
		border-collapse: separate;
		border-spacing: 0;
		border-color: #333;
		font-size: 1.1rem;
	}
	th {
		background-color: rgba(141, 141, 141, 0.171);
	}
	td,
	th {
		border: 1px solid rgba(102, 102, 102, 0.11);
		padding: 0.5rem;
	}
	tr {
		// padding: 1rem 0;
	}
	tr:nth-child(even) {
		background-color: rgba(145, 145, 145, 0.185);
	}
	pre {
		padding: 0.8rem;

		overflow: auto;
	}
	*,
	*::before,
	*::after {
		box-sizing: inherit;
	}
</style>
