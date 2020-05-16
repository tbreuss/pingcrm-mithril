import m from 'mithril'
import Dropdown from './Dropdown'

export default {
  view: (v) => m('.flex items-center', [
    m('.flex w-full bg-white shadow rounded', [
      m(Dropdown, {
        autoClose: false,
        class: 'px-4 md:px-6 rounded-l border-r hover:bg-gray-100 focus:border-white focus:shadow-outline focus:z-10',
        placement: 'bottom-start',
        default: m('.flex items-baseline', [
          m('span.text-gray-700 hidden md:inline', 'Filter'),
          m('svg.w-2 h-2 fill-gray-700 md:ml-2[xmlns=http://www.w3.org/2000/svg][viewBox=0 0 961.243 599.998]', [
            m('path[d=M239.998 239.999L0 0h961.243L721.246 240c-131.999 132-240.28 240-240.624 239.999-.345-.001-108.625-108.001-240.624-240z]'),
          ]),
        ]),
        dropdown: m('.mt-2 px-4 py-6 w-screen shadow-xl bg-white rounded', {style: {maxWidth: '300px'}}, v.children),
      }),
      m('input.relative w-full px-6 py-3 rounded-r focus:shadow-outline[autocomplete=off][type=text][name=search][placeholder=Search…]', {
        value: v.attrs.form.data.search,
        onkeyup: (e) => {
          v.attrs.form.data.search = e.target.value
          v.attrs.form.submit()
        },
      }),
    ]),
    m('button.ml-3 text-sm text-gray-500 hover:text-gray-700 focus:text-indigo-500[type=button]', {
      onclick: () => v.attrs.form.reset(),
    }, 'Reset'),
  ]),
}
