import m from 'mithril'
import Layout from '../../Shared/Layout'
import {InertiaLink} from '../../inertia'

export default {
  view: (v) => m(Layout, v.attrs, m('div', [
    m('h1.mb-8 font-bold text-3xl', [
      m(InertiaLink, {class: 'text-indigo-400 hover:text-indigo-600', href: '/users'}, 'Users'),
      m('span.text-indigo-400 font-medium', ' / '),
      m('span', [
        v.attrs.user.first_name,
        ' ',
        v.attrs.user.last_name,
      ])
    ])
  ]))
}
