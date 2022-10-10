const attr = (el, name)=>el.getAttribute(name)|| el.sde?.getAttribute(name);
const TAG = 'shadow-dom-element';
export default class ShadowDomElement extends HTMLElement
{
    promise;

    constructor()
    {
        super();
        const tag = attr(this,'tag');
        if( tag && this.tagName.toLowerCase() === TAG  )
        {   const sde = this;
            this.templates = [...this.getElementsByTagName( 'template' )];
            this.templates.map( t=>t.remove() );
            customElements.define( tag, class ShadowDomElementDCE extends ShadowDomElement{
                async slotsInit()
                {   this.sde = sde;
                    await sde.promise;
                    return super.slotsInit();
                }
            } );
            if( this.childElementCount )
            {   const html = this.outerHTML.replace('<'+TAG, '<'+tag);
                this.innerHTML='';
                this.insertAdjacentHTML('afterend',html);
            }
        }else
        {   this.templates = [];
            this.promise = this.slotsInit();
        }
    }
    async fetch( url ){ return ( await fetch( url ) ).text() }

    applyTemplate( t )
    {
        const s = this.shadowRoot;
        s.appendChild( t.content.cloneNode( true ) );
        this.postTemplateCallback( s );
        return this;
    }
    postTemplateCallback(s)
    {
        s.querySelectorAll('slot[attribute]').forEach( a =>
        {   let f = attr(a,'for')
            ,   s = f ? a.getRootNode().querySelector('#'+f) : a.parentElement;

            s.setAttribute( attr( a, 'attribute' )
                ,   a.assignedElements().map( l=>attr( l, 'href')
                                             ||  attr( l, 'src')
                                             ||  l.innerText).join(''))
        });
    }
    async slotsInit()
    {
        const getText = async url => this.fetch( url );
        const onAttr = async( att, cb ) =>
        {
            await ( async a => ( a ? cb( a ) : 0 ) )( attr(this, att ) );
        };
        const embeddedTemplates = [ ...this.getElementsByTagName( 'template' )
                                  , ...( this.sde ? this.sde.templates : [] ) ];
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
            this.templates.push(t);
            applyTemplate( t );
        } );
        return this;
    }
}

window.customElements.define(TAG, ShadowDomElement);
