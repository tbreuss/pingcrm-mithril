import m from 'mithril'
import Logo from '../Shared/Logo'
import MainMenu from './MainMenu'
import Dropdown from './Dropdown'
import Icon from './Icon'
import {InertiaLink} from '@tebe/inertia-mithril'
import FlashMessages from './FlashMessages'

export default {
  view: (v) => m('div', [
    m('.flex flex-col', [
      m('.h-screen flex flex-col', {
        onclick: (e) => {
          e.stopPropagation()
        },
      }, [
        m('.md:flex', [
          m('.bg-indigo-900 md:flex-shrink-0 md:w-56 px-6 py-4 flex items-center justify-between md:justify-center', [
            m(InertiaLink, {class: 'mt-1', href: '/'}, m(Logo, {class: 'fill-white', width: 120, height: 28})),
            m(Dropdown, {
              class: 'md:hidden',
              placement: 'bottom-end',
              default: m('svg.fill-white w-6 h-6[xmlns=http://www.w3.org/2000/svg][viewBox=0 0 20 20]', [
                m('path[d=M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z]'),
              ]),
              dropdown: m('.mt-2 px-8 py-4 shadow-lg bg-indigo-800 rounded', m(MainMenu)),
            }),
          ]),
          m('.bg-white border-b w-full p-4 md:py-0 md:px-12 text-sm md:text-md flex justify-between items-center', [
            m('.mt-1 mr-4', v.attrs.auth.user.account.name),
            m(Dropdown, {
              class: 'mt-1',
              placement: 'bottom-end',
              default: m('.flex items-center cursor-pointer select-none group', [
                m('.text-gray-700 group-hover:text-indigo-600 focus:text-indigo-600 mr-1 whitespace-no-wrap', [
                  m('span', v.attrs.auth.user.first_name),
                  m('span.hidden md:inline', ' ' + v.attrs.auth.user.last_name),
                ]),
                m(Icon, {
                  name: 'cheveronDown',
                  class: 'w-5 h-5 group-hover:fill-indigo-600 fill-gray-700 focus:fill-indigo-600',
                }),
              ]),
              dropdown: m('div.mt-2 py-2 shadow-xl bg-white rounded text-sm', [
                m(InertiaLink, {
                  href: '/users/' + v.attrs.auth.user.id + '/edit',
                  class: 'block px-6 py-2 hover:bg-indigo-500 hover:text-white',
                }, 'My Profile'),
                m(InertiaLink, {
                  href: '/users',
                  class: 'block px-6 py-2 hover:bg-indigo-500 hover:text-white',
                }, 'Manage Users'),
                m(InertiaLink, {
                  href: '/logout',
                  method: 'post',
                  class: 'block px-6 py-2 hover:bg-indigo-500 hover:text-white',
                }, 'Logout'),
              ]),
            }),
          ]),
        ]),
        m('.flex flex-grow overflow-hidden', [
          m(MainMenu, {class: 'bg-indigo-800 flex-shrink-0 w-56 p-12 hidden md:block overflow-y-auto'}),
          m('.flex-1 overflow-hidden px-4 py-8 md:p-12 overflow-y-auto', {scrollRegion: true}, [
            m(FlashMessages, {flash: v.attrs.flash, errors: v.attrs.errors}),
            v.children,
          ]),
        ]),
      ]),
    ]),
  ]),
}
