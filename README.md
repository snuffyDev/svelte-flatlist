# Svelte FlatList

A mobile-friendly, simple, and customizable draggable menu.

**Documentation / Demo site**: https://svelte-flatlist.netlify.app/

[Find me on NPM!](https://www.npmjs.com/package/svelte-flatlist)

## Demo

[Demo/Docs](https://svelte-flatlist.netlify.app/)
[REPL](https://svelte.dev/repl/b1b6b42ca4c944ca99f0063d5ca1ccdb?version=3.44.2)

### Installation

`npm install -D svelte-flatlist`

# Usage

Using Svelte FlatList is very simple. Below are some usage examples.

## Each Block

_See this in action at the Svelte REPL!_
[Link](https://svelte.dev/repl/2cfb8d8b8ff2447688874a2e0dacb731?version=3.44.2)

```html
<script>
  import FlatList from 'svelte-flatlist';
  let visible;
  const items = [0,1,2,3,4,5];

  function handleClose(){
    visible = false;
  }
</script>

<button on:click={()=>(visible=true)}>
	Click me!
</button>

<FlatList on:close={handleClose} bind:visible>
  {#each items as item}
    <span>{item}</span>
  {/each}
</FlatList>
```

## Customize the theme

_See this in action at the Svelte REPL!_
[Link](https://svelte.dev/repl/dbe96ccc7e974dee80ce57a45d17ae2e?version=3.44.2)

```html
<script>
  import FlatList from 'svelte-flatlist';
  let visible;
  const items = [0,1,2,3,4,5];

  function handleClose(){
    visible = false;
  }
</script>

<button on:click={()=>(visible=true)}>
	Click me!
</button>

<FlatList style={{bgColor: '#424242', handle: {fgColor:'#f2f2f2', height: '2rem', bgColor: '#000000'}}} on:close={handleClose} bind:visible>
    <span>item 1</span>
    <span>item 2</span>
    <span>item 3</span>
    <span>item 4</span>
    <span>item 5</span>
</FlatList>
```

## Manually list items

_See this in action at the Svelte REPL!_
[Link](https://svelte.dev/repl/dbe96ccc7e974dee80ce57a45d17ae2e?version=3)

```html
<script>
  import FlatList from 'svelte-flatlist';

  let visible;
  function handleClose(){
    visible = false;
	}
</script>

<button on:click={()=>(visible=true)}>
	Click me!
</button>

<FlatList bind:visible on:close={handleClose}>
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
| style    | (See below for options) Customize the colors to fit your needs.             |
| zIndex   | Same as CSS z-index (defaults to 9999)                                      |
| position | Position of the list on screen (defaults to 'center')                       |
| duration | Duration of the opening & closing transition (defaults to 400)              |
| maxWidth | Maximum width of the list - must include a CSS unit (defaults to 640px)     |
| gap      | Gap in between list items - must include a CSS unit (defaults to 0.8rem)    |
| overflow | Behavior for vertical overflow, same as CSS overflow-y (defaults to 'auto') |

## Style Properties

<br/>

| Style Props | Description                                          |
| ----------- | ---------------------------------------------------- |
| bgColor     | Base background color                                |
| handle      | (see below for options) Color options for the handle |

<br/>

| Handle Properties | Description                |
| ----------------- | -------------------------- |
| bgColor           | Handle background color    |
| fgColor           | Handle foreground color    |
| height            | Handle height (ex: '5rem') |

## Events

| Event | Description                     |
| ----- | ------------------------------- |
| close | Event fires when list is closed |

## Events

| Event | Description                     |
| ----- | ------------------------------- |
| close | Event fires when list is closed |
