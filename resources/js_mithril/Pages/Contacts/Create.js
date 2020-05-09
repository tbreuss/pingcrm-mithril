import m from 'mithril'
import Layout from '../../Shared/Layout'

export default {
  view: (v) => m(Layout, v.attrs, m('div', [
    m('h1.mb-8 font-bold text-3xl', 'Contacts / Create')
  ]))
}
