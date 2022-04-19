# shadow-dom-element

is covering the typical UI tasks:
populate html slots into template. Slots content and template could be local in the page and remote accessible via URL.

* fetch via [fetch() api](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
* `promise` property resolved when template is applied.

[![git](https://cdnjs.cloudflare.com/ajax/libs/octicons/8.5.0/svg/mark-github.svg) GitHub](https://github.com/sashafirsov/shadow-dom-element)
| Demo: [shadow-dom-element](https://unpkg.com/shadow-dom-element@0.0.1/demo/index.html)
| [tests project](https://github.com/sashafirsov/light-dom-element-test)

[![NPM version][npm-image]][npm-url]
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/shadow-dom-element)
[![coverage][coverage-image]][coverage-url]

# Use
## install
    npm i -P shadow-dom-element
## or use from CDN
```js
    <script type="module" scr="https://unpkg.com/shadow-dom-element@0.0/shadow-dom-element.js"></script>
```
The size of [shadow-dom-element.js](https://unpkg.com/shadow-dom-element@0.0/shadow-dom-element.js) 
is 1.5Kb. 
 

## API
* `promise` resolved when template and slots loaded and rendered
* `slotsInit()` initiates template and slots reading and rendering, returns `Promise<this>`

### Attributes
all attributes reflected as component properties
* `srcset` id of container with slots
* `src` url for html with slots
* `for` id for html template
* `code` url for html template


# test and demo
reside in separate repository https://github.com/sashafirsov/ligh-dom-element-test to avoid unnecessary dependency in 
source repo and npm.

# Typescript
`import SlottedElement from 'shadow-dom-element'` code has [typings](shadow-dom-element.d.ts) along with JSDoc enabled. 

# dependencies
none

[npm-image]:      https://img.shields.io/npm/v/shadow-dom-element.svg
[npm-url]:        https://npmjs.org/package/shadow-dom-element
[coverage-image]: https://unpkg.com/light-dom-element-test@0.0.1/coverage/coverage.svg
[coverage-url]:   https://unpkg.com/light-dom-element-test@0.0.1/coverage/lcov-report/index.html
