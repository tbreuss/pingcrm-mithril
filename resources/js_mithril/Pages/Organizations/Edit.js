import m from 'mithril'
import Layout from '../../Shared/Layout'
import {InertiaLink} from '@tebe/inertia-mithril'
import TrashedMessage from '../../Shared/TrashedMessage'
import {Inertia} from '@inertiajs/inertia'
import TextInput from '../../Shared/TextInput'
import SelectInput from '../../Shared/SelectInput'
import LoadingButton from '../../Shared/LoadingButton'
import Icon from '../../Shared/Icon'

export default () => {

  let sending = false
  let organization = null

  const submit = (e) => {
    e.preventDefault()
    sending = true
    Inertia.put('/organizations/' + organization.id, organization).then(() => {
      sending = false
    })
  }

  const destroy = () => {
    if (confirm('Are you sure you want to delete this organization?')) {
      Inertia.delete('/organizations/' + organization.id)
    }
  }

  const restore = () => {
    if (confirm('Are you sure you want to delete this organization?')) {
      Inertia.put('/organizations/' + organization.id + '/restore')
    }
  }

  const route = (contact) => {
    return '/contacts/' + contact.id + '/edit'
  }

  const rows = (contacts) => contacts.map((c) => m('tr.hover:bg-gray-100 focus-within:bg-gray-100', [
    m('td.border-t', [
      m(InertiaLink, {class: 'px-6 py-4 flex items-center focus:text-indigo-500', route: route(c)}, [
        c.name,
        c.deleted_at ? m(Icon, {name: 'trash', class: 'flex-shrink-0 w-3 h-3 fill-gray-400 ml-2'}) : '',
      ])],
    ),
    m('td.border-t', [
      m(InertiaLink, {class: 'px-6 py-4 flex items-center', route: route(c), tabindex: -1}, c.city),
    ]),
    m('td.border-t', [
      m(InertiaLink, {class: 'px-6 py-4 flex items-center', route: route(c), tabindex: -1}, c.phone),
    ]),
    m('td.border-t w-px', [
      m(InertiaLink, {class: 'px-4 flex items-center', route: route(c), tabindex: -1}, [
        m(Icon, {name: 'cheveronRight', class: 'block w-6 h-6 fill-gray-400'}),
      ]),
    ]),
  ]))

  const empty = () => m('tr', [
    m('td.border-t px-6 py-4[colspan=4]', 'No contacts found.'),
  ])

  return {
    view: ({attrs}) => {
      organization = attrs.organization || null
      return m(Layout, attrs, m('div', [
        m('h1.mb-8 font-bold text-3xl', [
          m(InertiaLink, {class: 'text-indigo-400 hover:text-indigo-600', route: '/organizations'}, 'Organizations'),
          m('span.text-indigo-400 font-medium', ' / '),
          m('span', organization.name),
        ]),
        organization.deleted_at ? m(TrashedMessage, {
          class: 'mb-6',
          restore: restore,
        }, 'This organization has been deleted.') : '',
        m('.bg-white rounded shadow overflow-hidden max-w-3xl', [
          m('form', {onsubmit: submit}, [
            m('div.p-8 -mr-6 -mb-8 flex flex-wrap', [
              m(TextInput, {
                class: 'pr-6 pb-8 w-full lg:w-1/2',
                label: 'Name',
                value: organization.name,
                error: attrs.errors.name || '',
                onchange: (e) => organization.name = e.target.value,
              }),
              m(TextInput, {
                class: 'pr-6 pb-8 w-full lg:w-1/2',
                label: 'Email',
                value: organization.email,
                error: attrs.errors.email || '',
                onchange: (e) => organization.email = e.target.value,
              }),
              m(TextInput, {
                class: 'pr-6 pb-8 w-full lg:w-1/2',
                label: 'Phone',
                value: organization.phone,
                error: attrs.errors.phone || '',
                onchange: (e) => organization.phone = e.target.value,
              }),
              m(TextInput, {
                class: 'pr-6 pb-8 w-full lg:w-1/2',
                label: 'Address',
                value: organization.address,
                error: attrs.errors.address || '',
                onchange: (e) => organization.address = e.target.value,
              }),
              m(TextInput, {
                class: 'pr-6 pb-8 w-full lg:w-1/2',
                label: 'City',
                value: organization.city,
                error: attrs.errors.city || '',
                onchange: (e) => organization.city = e.target.value,
              }),
              m(TextInput, {
                class: 'pr-6 pb-8 w-full lg:w-1/2',
                label: 'Province/State',
                value: organization.region,
                error: attrs.errors.region || '',
                onchange: (e) => organization.region = e.target.value,
              }),
              m(SelectInput, {
                class: 'pr-6 pb-8 w-full lg:w-1/2',
                label: 'Country',
                selected: organization.country,
                onchange: (e) => organization.country = e.target.value,
              }, [
                m('option', {value: null}),
                m('option[value=CA]', 'Canada'),
                m('option[value=US]', 'United States'),
              ]),
              m(TextInput, {
                class: 'pr-6 pb-8 w-full lg:w-1/2',
                label: 'Postal Code',
                value: organization.postal_code,
                error: attrs.errors.postal_code || '',
                onchange: (e) => organization.postal_code = e.target.value,
              }),
            ]),
            m('div.px-8 py-4 bg-gray-100 border-t border-gray-200 flex items-center', [
              !organization.deleted_at ? m('button.text-red-600 hover:underline[tabindex=-1][type=button]', {onclick: destroy}, 'Delete Organization') : '',
              m(LoadingButton, {class: 'btn-indigo ml-auto', loading: sending}, 'Update Organization'),
            ]),
          ]),
        ]),
        m('h2.mt-12 font-bold text-2xl', 'Contacts'),
        m('div.mt-6 bg-white rounded shadow overflow-x-auto', [
          m('table.w-full whitespace-no-wrap', [
            m('tr.text-left font-bold', [
              m('td.px-6 pt-6 pb-4', 'Name'),
              m('td.px-6 pt-6 pb-4', 'City'),
              m('td.px-6 pt-6 pb-4[colspan=2]', 'Phone'),
            ]),
            organization.contacts.length > 0 ? rows(organization.contacts) : empty(),
          ]),
        ]),
      ]))
    },
  }
}
