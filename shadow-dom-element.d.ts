/// <reference lib="dom" />
export default class ShadowDomElement extends HTMLElement {
    /**
     * resolved when template and slots payload is rendered
     */
    promise: Promise<ShadowDomElement>;

    /**
     * applies template content and renders slots
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
     * @returns promise resolved when template and payload is rendered
     */
    slotsInit(): Promise<ShadowDomElement>;
}
