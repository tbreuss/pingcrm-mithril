import m from 'mithril'
import {Inertia} from '@inertiajs/inertia'

export default {
  view: v => {
    let cls = v.attrs.class || ''
    let href = (v.attrs.route || (v.attrs.url || ''))
    return m('a', {
      class: cls,
      href: href,
      onclick: e => {
        e.preventDefault()
        Inertia.visit(href, {
          data: {},
          method: v.attrs.method || 'get',
          replace: true,
          preserveScroll: false,
          preserveState: false,
        })
      },
    }, v.children)
  },
}
