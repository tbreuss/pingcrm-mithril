import m from 'mithril'
import {Inertia, shouldIntercept} from '@inertiajs/inertia'

export default {
  view: v => {

    let cls = v.attrs.class || ''
    let href = (v.attrs.route || (v.attrs.url || ''))
    let data = v.attrs.data || {}
    let method = v.attrs.method || 'get'
    let replace = v.attrs.replace || false
    let preserveScroll = v.attrs.preserveScroll || false
    let preserveState = v.attrs.preserveState || false
    let only = v.attrs.only || []

    return m('a', {
      class: cls,
      href: href,
      onclick: event => {
        if (shouldIntercept(event)) {
          event.preventDefault()

          Inertia.visit(href, {
            data: data,
            method: method,
            replace: replace,
            preserveScroll: preserveScroll,
            preserveState: preserveState,
            only: only,
          })
        }

      },
    }, v.children)
  },
}
