# shadow-dom-element

is covering the typical UI tasks:
populate html slots into template using 
[Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM).
Slots content and template could be local in the page or pointed via URL.

[![git](https://cdnjs.cloudflare.com/ajax/libs/octicons/8.5.0/svg/mark-github.svg) GitHub](https://github.com/sashafirsov/shadow-dom-element)
| Try in [Sandbox][sandbox-url]
| Live Demo: [shadow-dom-element](https://unpkg.com/shadow-dom-element@0.0.9/index.html)
| [tests project](https://github.com/sashafirsov/light-dom-element-test)

[![NPM version][npm-image]][npm-url]
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/shadow-dom-element)
[![coverage][coverage-image]][coverage-url]

```html
<script type="module" src="https://unpkg.com/shadow-dom-element@0.0/shadow-dom-element.js"></script>
<shadow-dom-element tag="my-component" src="https://unpkg.com/light-dom-element-test@0.0/test/template.html"></shadow-dom-element>
<my-component>
    <h3 slot="slot1">heading 😌</h3>
</my-component>
```

## Where to use
`shadow-dom-element` is simplest web component to render HTML `template` and `slot`. Fully functional template and declarative events handling is done by another project: [@epa-wg/custom-element](https://github.com/EPA-WG/custom-element) 

It is meant for displaying the static content in the page or available during page load via URL. 

You do not need a [static site generator](https://www.cloudflare.com/learning/performance/static-site-generator/)
as most of "components" could be expressed via template in own file. 
[There is a live sample](https://unpkg.com/shadow-dom-element@0.0.9/demo/ananke/content/en/index.html) 
of `shadow-dom-element` based templates for Ananke site generator. 
While it is not a good example of shadow dom css styling, 
it gives enough for templates embedding and use of such for building the static web site. You could play  with this 
responsive template in [Sandbox][sandbox-url].   

[File the issue](https://github.com/sashafirsov/shadow-dom-element/issues) 
if need a site sample based on html templates or have your own to be shared. 


# Use
## install
    npm i -P shadow-dom-element
## or use from CDN
```js
    <script type="module" scr="https://unpkg.com/shadow-dom-element@0.0/shadow-dom-element.js"></script>
```
The size of [shadow-dom-element.js](https://unpkg.com/shadow-dom-element@0.0/shadow-dom-element.js) 
is 1.6Kb, [compiled](https://unpkg.com/shadow-dom-element-test@0.0/dist/src/shadow-dom-element.js) to 1Kb. 
 

## API
fetch implemented via [fetch() api](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API), can be overridden with 
any type.

* `promise` resolved when template and slots loaded and rendered
* `slotsInit()` initiates template and slots reading and rendering, returns `Promise<this>`
* `fetch( url )` override to load and process URL before returning a HTML string with data within slots.
Handy to use the JSON or XML as data source. Note, there is no error handling, you have to cover that case by template
and error slots. For that you could find [slotted-element](https://github.com/sashafirsov/slotted-element) handy as it 
is designed for loading life cycle.
* `applyTemplate( templateNode )` applies template to slots in sub-dom of this element as Shadow DOM. Internal method to be overridden 
by [light-dom-element](https://github.com/sashafirsov/light-dom-element) to render by Light DOM.

### Attributes
all attributes reflected as component properties
* `tag` tag name of declarative custom element
* `srcset` id of container with slots
* `src` url for html with slots
* `for` id for html template
* `code` url for html template

#### From slot to attribute
`<slot name=xxx attribute=abc for=id-in-shadow-dom>` is a special case of `slot` use within template: it would set the `abc` attribute of 
parent node to value taken either from `href`, `src`, or innerText of passed element with given name. 
It is needed to pass the attribute via slots. For example, link or image URL. It could be used to pass attribute to internal 
`shadow-dom-element` as within 
[summary-with-image template](https://github.com/sashafirsov/shadow-dom-element/blob/324d7de33464368c312e0bc6a9d8becc9b4dabf3/demo/ananke/content/en/index.html#L42)
for image URL.

* `slot attribute=abc` defines attribute which would be populated from slot `href`, `src`, or `innerText`
* `slot for=in-shadow-id` for slot with `attribute` defines the element where attribute would be applied. When omitted,
the attribute of container element where slot is located in template would be set:
```html
        <shadow-dom-element>
            <template>
                <img  id="image-2" alt="source from slot" />
                <slot name="image-src" attribute="src" for="image-2" hidden></slot>
            </template>
            <link slot="image-src" href="doc.png" />
        </shadow-dom-element>
```

# test and demo
reside in separate repository https://github.com/sashafirsov/ligh-dom-element-test to avoid unnecessary dependency in 
source repo and npm. 

Minimal functionality local demo is available in [demo/](demo/index.html) which could be run by
```bash
npm start
```

# Typescript
`import ShadowDomElement from 'shadow-dom-element'` code has [typings](shadow-dom-element.d.ts) along with JSDoc enabled. 

# dependencies
none

[npm-image]:      https://img.shields.io/npm/v/shadow-dom-element.svg
[npm-url]:        https://npmjs.org/package/shadow-dom-element
[coverage-image]: https://unpkg.com/light-dom-element-test@0.0.9/coverage/coverage.svg
[coverage-url]:   https://unpkg.com/light-dom-element-test@0.0.9/coverage/lcov-report/index.html
[sandbox-url]:    https://stackblitz.com/github/sashafirsov/shadow-dom-element
