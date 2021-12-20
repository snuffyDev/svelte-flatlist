<h1><a id="props" class="wikilink" href="#props">Props</a></h1>

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

Svelte-Flatlist allows you to modify the styles to fit your needs best using `style` prop.

Example:

```html
<Flatlist 
  style={{ 
    bgColor: "#424242", 
    handle: {
      height: "3rem",
      bgColor: "#121212",
      fgColor: "#fefefe"
    }
  }}
>
```

### ```style``` Type

The type of the ```style``` prop:

```typescript
type ListStyle = {
  bgColor?: string;
  handle?: HandleStyle;
};

type HandleStyle = {
  bgColor?: string;
  fgColor?: string;
  height?: string;
};
```

### More Info


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

<h1><a id="events" class="wikilink"  href="#events">Events</a></h1>

| Event | Description                     |
| ----- | ------------------------------- |
| close | Event fires when list is closed |
