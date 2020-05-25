import m from 'mithril'
import Layout from '../../Shared/Layout'
import {InertiaLink} from '@tebe/inertia-mithril'

export default {
  view: (v) => m(Layout, v.attrs, m('div', [
    m('h1.mb-8 font-bold text-3xl', 'Dashboard'),
    m('p.mb-12 leading-normal', [
      'Hey there! Welcome to Ping CRM, a demo app designed to help illustrate how ',
      m('a.text-indigo-500 underline hover:text-orange-600', {href: 'https://inertiajs.com'}, 'Inertia.js'),
      ' works with ',
      m('a.text-indigo-500 underline hover:text-orange-600', {href: 'https://mithril.js.org'}, 'Mithril.js'),
      '.',
    ]),
    m('div', [
      m(InertiaLink, {href: '/500', class: 'btn-indigo'}, '500 error'),
      ' ',
      m(InertiaLink, {href: '/404', class: 'btn-indigo'}, '404 error'),
    ]),
  ])),
}
