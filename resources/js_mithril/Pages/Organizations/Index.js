import m from 'mithril'
import Layout from '../../Shared/Layout'
import SearchFilter from '../../Shared/SearchFilter'
import {InertiaLink} from '../../inertia'
import {Inertia} from '@inertiajs/inertia'
import Icon from '../../Shared/Icon'
import Pagination from '../../Shared/Pagination'

const form = {
  data: {
    search: '',
    trashed: '',
  },
  submit: () => {
    let query = m.buildQueryString(form.data)
    form.send(query)
  },
  reset: () => {
    form.data = {
      search: '',
      trashed: '',
    }
    let query = m.buildQueryString(form.data)
    form.send(query)
  },
  send: (query) => {
    Inertia.replace('/organizations?' + (query ? query : 'remember=forget'))
  },
}

const route = (organization) => {
  return '/organizations/' + organization.id + '/edit'
}

const rows = (organizations) => organizations.map((o) => m('tr.hover:bg-gray-100 focus-within:bg-gray-100', [
  m('td.border-t', [
    m(InertiaLink, {class: 'px-6 py-4 flex items-center focus:text-indigo-500', route: route(o)}, [
      o.name,
      o.deleted_at ? m(Icon, {name: 'trash', class: 'flex-shrink-0 w-3 h-3 fill-gray-400 ml-2'}) : '',
    ])],
  ),
  m('td.border-t', [
    m(InertiaLink, {class: 'px-6 py-4 flex items-center', route: route(o), tabindex: -1}, o.city),
  ]),
  m('td.border-t', [
    m(InertiaLink, {class: 'px-6 py-4 flex items-center', route: route(o), tabindex: -1}, o.phone),
  ]),
  m('td.border-t w-px', [
    m(InertiaLink, {class: 'px-4 flex items-center', route: route(o), tabindex: -1}, [
      m(Icon, {name: 'cheveronRight', class: 'block w-6 h-6 fill-gray-400'}),
    ]),
  ]),
]))

const empty = () => m('tr', [
  m('td.border-t px-6 py-4[colspan=4]', 'No Organizations found.'),
])

export default {
  view: (v) => m(Layout, v.attrs, m('div', [
    m('h1.mb-8 font-bold text-3xl', 'Organizations'),
    m('div.mb-6.flex.justify-between.items-center', [
      m(SearchFilter, {class: 'w-full.max-w-md.mr-4', form: form}, [
        m('label.mt-4.block.text-gray-700', 'Trashed:'),
        m('select.mt-1.w-full.form-select', {
          value: form.data.trashed,
          onchange: (e) => {
            form.data.trashed = e.target.selectedOptions[0].value
            form.submit()
          },
        }, [
          m('option', {value: null}),
          m('option[value=with]', 'With Trashed'),
          m('option[value=only]', 'Only Trashed'),
        ]),
      ]),
      m(InertiaLink, {class: 'btn-indigo', route: '/organizations/create'}, [
        m('span', 'Create'),
        ' ',
        m('span.hidden.md:inline', 'Organization'),
      ]),
    ]),
    m('div.bg-white rounded shadow overflow-x-auto', [
      m('table.w-full whitespace-no-wrap', [
        m('tr.text-left font-bold', [
          m('td.px-6 pt-6 pb-4', 'Name'),
          m('td.px-6 pt-6 pb-4', 'City'),
          m('td.px-6 pt-6 pb-4[colspan=2]', 'Phone'),
        ]),
        v.attrs.organizations.data.length > 0 ? rows(v.attrs.organizations.data) : empty(),
      ]),
    ]),
    m(Pagination, {links: v.attrs.organizations.links}),
  ]))
}
