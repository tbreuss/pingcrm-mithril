import m from 'mithril'
import {InertiaLink} from '@tebe/inertia-mithril'
import Icon from './Icon'

const isUrl = () => false
const iconClass = () => isUrl() ? 'w-4 h-4 mr-2 fill-white' : 'w-4 h-4 mr-2 fill-indigo-400 group-hover:fill-white'
const labelClass = () => isUrl() ? 'text-white' : 'text-indigo-300 group-hover:text-white'

export default {
  view: v => m('div', {class: v.attrs.class}, [
    m('.mb-4', [
      m(InertiaLink, {class: 'flex items-center group py-3', route: '/'}, [
        m(Icon, {name: 'dashboard', class: iconClass()}),
        m('div', {class: labelClass()}, 'Dashboard'),
      ]),
    ]),
    m('.mb-4', [
      m(InertiaLink, {class: 'flex items-center group py-3', route: '/organizations'}, [
        m(Icon, {name: 'office', class: iconClass()}),
        m('div', {class: labelClass()}, 'Organizations'),
      ]),
    ]),
    m('.mb-4', [
      m(InertiaLink, {class: 'flex items-center group py-3', route: '/contacts'}, [
        m(Icon, {name: 'users', class: iconClass()}),
        m('div', {class: labelClass()}, 'Contacts'),
      ]),
    ]),
    m('.mb-4', [
      m(InertiaLink, {class: 'flex items-center group py-3', route: '/reports'}, [
        m(Icon, {name: 'printer', class: iconClass()}),
        m('div', {class: labelClass()}, 'Reports'),
      ]),
    ]),
  ]),
}
