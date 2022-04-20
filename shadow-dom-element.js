export default class ShadowDomElement extends HTMLElement
{
    promise;

    constructor()
    {
        super();
        this.promise = this.slotsInit();
    }
    async fetch( url ){ return ( await fetch( url ) ).text() }

    applyTemplate( t )
    {
        // @ts-ignore
        this.shadowRoot.appendChild( t.content.cloneNode( true ) );
        return this;
    }

    async slotsInit()
    {
        const getText = async url => this.fetch( url );
        const onAttr = async( attr, cb ) =>
        {
            await ( async a => ( a ? cb( a ) : 0 ) )( this.getAttribute( attr ) );
        };
        const embeddedTemplates = [ ...this.getElementsByTagName( 'template' ) ];
        await onAttr(
            'srcset',
            id => ( this.innerHTML = `${ document.getElementById( id )?.innerHTML }` )
        );
        await onAttr( 'src', async url => ( this.innerHTML = await getText( url ) ) );

        this.attachShadow( { mode: 'open' } );
        const applyTemplate = t => this.applyTemplate( t );
        // @ts-ignore
        embeddedTemplates.forEach( applyTemplate );

        await onAttr( 'for', id => applyTemplate( document.getElementById( id ) ) );
        await onAttr( 'code', async url =>
        {
            const d = document.createElement( 'div' );
            d.innerHTML = await getText( url );
            const t = document.createElement( 'template' );
            d.childNodes.forEach( n => t.content.append( n ) );
            applyTemplate( t );
        } );
        return this;
    }
}

window.customElements.get('shadow-dom-element') || window.customElements.define('shadow-dom-element', ShadowDomElement);
