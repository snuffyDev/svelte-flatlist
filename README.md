# Svelte Flatlist

A mobile-friendly, simple, and customizable draggable menu.

**Documentation / Demo site**: https://svelte-flatlist.netlify.app/

[Find me on NPM!](https://www.npmjs.com/package/svelte-flatlist)

## Demo

[Demo/Docs](https://svelte-flatlist.netlify.app/)
[REPL](https://svelte.dev/repl/b1b6b42ca4c944ca99f0063d5ca1ccdb?version=3.44.2)

### Installation

`npm install -D svelte-flatlist`

## Usage

Using Svelte FlatList is very simple. Below are some usage examples.

### Each Block

```html
<script>
	import FlatList from 'svelte-flatlist';
	let visible;
	const items = [0, 1, 2, 3, 4, 5];

	function handleClose() {
		visible = false;
	}
</script>

<FlatList on:close="{handleClose}" bind:visible>
	{#each items as item}
	<span>{item}</span>
	{/each}
</FlatList>
```

### Manually list items

```html
<script>
	import FlatList from 'svelte-flatlist';

	let visible;
	function handleClose() {
		visible = false;
	}
</script>

<FlatList bind:visible on:close="{handleClose}">
	<span>item 1</span>
	<span>item 2</span>
	<span>item 3</span>
	<span>item 4</span>
</FlatList>
```

## Props

| Prop     | Description                                                                 |
| -------- | --------------------------------------------------------------------------- |
| visible  | (REQUIRED) visibility state                                                 |
| class    | Your custom CSS classes for styling.                                        |
| zIndex   | Same as CSS z-index (defaults to 9999)                                      |
| position | Position of the list on screen (defaults to 'center')                       |
| duration | Duration of the opening & closing transition (defaults to 400)              |
| maxWidth | Maximum width of the list - must include a CSS unit (defaults to 640px)     |
| gap      | Gap in between list items - must include a CSS unit (defaults to 0.8rem)    |
| overflow | Behavior for vertical overflow, same as CSS overflow-y (defaults to 'auto') |

## Events

| Event | Description                     |
| ----- | ------------------------------- |
| close | Event fires when list is closed |
