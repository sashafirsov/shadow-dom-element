/// <reference lib="dom" />
/**
 * @summary Web Component to populate html slots into template using Shadow DOM.
 * Declarative Custom Element when `tag` attribute is presented.
 * Slots content and template could be local in the page or pointed via URL.
 *
 * @tagname shadow-dom-element
 * @attribute {string} tag - custom element tag name
 * @attribute {string} tag - custom element tag name
 * @attribute {string} srcset - ID of slots payload, usually a template with slots element
 * @attribute {string} src - URL to slots payload
 * @attribute {string} for - ID of template element
 * @attribute {string} for - URL of template html, no template should be in retrieved file
 */
export default class ShadowDomElement extends HTMLElement {
    /**
     * resolved when template and slots payload is rendered
     */
    promise: Promise<ShadowDomElement>;

    /**
     * applies template content and renders slots, called from `slotsInit()`
     * @param templateElement
     * @returns this
     */
    applyTemplate(templateElement: HTMLTemplateElement): this;

    /**
     * override to load and process URL before returning a HTML string with data within slots.
     * @param url: string
     * @returns Promise<string>
     */
    fetch( url:string ): Promise<string>;

    /**
     * reads payload and template from body or by attributes, apply template and renders slots
     * , called from constructor
     * @returns promise resolved when template and payload is rendered
     */
    slotsInit(): Promise<ShadowDomElement>;
}
interface HTMLElementTagNameMap {
    'shadow-dom-element': ShadowDomElement;
}
