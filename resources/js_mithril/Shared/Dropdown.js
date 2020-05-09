import m from 'mithril'
import Popper from 'popper.js'

// closure component
export default () => {
  let show = false
  let popper = null
  return {
    view: ({attrs}) => {
      return m('button[type=button', {
        class: attrs.class || '',
        style: attrs.style || '',
        onclick: (e) => {
          e.stopPropagation()
          show = true
        }
      }, [
        attrs.default,
        show ? m('div', [
          m('div[style=position: fixed; top: 0; right: 0; left: 0; bottom: 0; z-index: 99998; background: black; opacity: .2]', {
            onclick: (e) => {
              e.stopPropagation()
              show = false
            }
          }),
          m('div[style=position: absolute; z-index: 99999;][ref=dropdown]', {
            onclick: (e) => {
              e.stopPropagation()
              show = attrs.autoClose ? false : true
            },
            oncreate: ({dom}) => {
              popper = new Popper(dom.closest('button'), dom, {
                placement: attrs.placement || 'bottom-end',
                modifiers: {
                  preventOverflow: {
                    boundariesElement: attrs.boundary || 'scrollParent'
                  },
                },
              })
            }
          }, attrs.dropdown)
        ]) : ''
      ])
    }
  }
}
