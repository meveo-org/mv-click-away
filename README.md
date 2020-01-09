# mv-click-away

MvClickAway is a Meveo component (based on lit-element) that registers a click event on the document allowing child components to listen to a custom event when a click outside the component is triggered.

## Quick Start

To experiment with the MvClickAway component.

1. Clone this repo.

2. Serve the project from the root directory with some http server (best served with meveo itself)

3. Update the click-away demo component in demo.js file

## Sample usage

```html
<mv-click-away @clicked-away="${() => {console.log("something else was clicked")}}">
  <child-component></child-component>
</mv-click-away>
```

You can also check this [demo](https://manaty.net/mv-click-away/)
