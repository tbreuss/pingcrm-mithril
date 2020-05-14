import m from 'mithril'
import {InertiaLink} from '../inertia/index'

export default {
  view: (v) => m('div.mt-6 -mb-1 flex flex-wrap',
    v.attrs.links.map((link) => (link.url === null)
      ? m('div', {
        //'key': index,
        class: 'mr-1 mb-1 px-4 py-3 text-sm border rounded text-gray-400' + (link.label === 'Next' ? ' ml-auto' : ''),
      }, link.label)
      : m(InertiaLink, {
          class: 'mr-1 mb-1 px-4 py-3 text-sm border rounded hover:bg-white focus:border-indigo-500 focus:text-indigo-500' + (link.active ? ' bg-white' : '') + (link.label === 'Next' ? ' ml-auto' : ''),
          url: link.url,
        },
        link.label),
    ),
  ),
}
