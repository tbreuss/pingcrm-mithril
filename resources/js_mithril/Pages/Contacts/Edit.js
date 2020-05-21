import m from 'mithril'
import Layout from '../../Shared/Layout'
import {InertiaLink} from '@tebe/inertia-mithril'
import TrashedMessage from '../../Shared/TrashedMessage'
import {Inertia} from '@inertiajs/inertia'
import TextInput from '../../Shared/TextInput'
import SelectInput from '../../Shared/SelectInput'
import LoadingButton from '../../Shared/LoadingButton'

export default () => {

  let sending = false
  let contact = null

  const submit = (e) => {
    e.preventDefault()
    sending = true
    Inertia.put('/contacts/' + contact.id, contact).then(() => {
      sending = false
    })
  }

  const destroy = () => {
    if (confirm('Are you sure you want to delete this contact?')) {
      Inertia.delete('/contacts/' + contact.id)
    }
  }

  const restore = () => {
    if (confirm('Are you sure you want to delete this contact?')) {
      Inertia.put('/contacts/' + contact.id + '/restore')
    }
  }

  return {
    view: ({attrs}) => {
      contact = attrs.contact || null
      return m(Layout, attrs, m('div', [
        m('h1.mb-8 font-bold text-3xl', [
          m(InertiaLink, {class: 'text-indigo-400 hover:text-indigo-600', route: '/contacts'}, 'Contacts'),
          m('span.text-indigo-400 font-medium', ' / '),
          m('span', [
            contact.first_name,
            ' ',
            contact.last_name,
          ]),
        ]),
        contact.deleted_at ? m(TrashedMessage, {
          class: 'mb-6',
          restore: restore,
        }, 'This contact has been deleted.') : '',
        m('.bg-white rounded shadow overflow-hidden max-w-3xl', [
          m('form', {onsubmit: submit}, [
            m('div.p-8 -mr-6 -mb-8 flex flex-wrap', [
              m(TextInput, {
                class: 'pr-6 pb-8 w-full lg:w-1/2',
                label: 'First name',
                value: contact.first_name,
                error: attrs.errors.first_name || '',
                onchange: (e) => contact.first_name = e.target.value,
              }),
              m(TextInput, {
                class: 'pr-6 pb-8 w-full lg:w-1/2',
                label: 'Last name',
                value: contact.last_name,
                error: attrs.errors.last_name || '',
                onchange: (e) => contact.last_name = e.target.value,
              }),
              m(SelectInput, {
                class: 'pr-6 pb-8 w-full lg:w-1/2',
                label: 'Organization',
                selected: contact.organization_id,
                onchange: (e) => contact.organization_id = e.target.value,
              }, [m('option', {value: null})].concat(attrs.organizations.map((o) =>
                m('option', {value: o.id}, o.name),
              ))),
              m(TextInput, {
                class: 'pr-6 pb-8 w-full lg:w-1/2',
                label: 'Email',
                value: contact.email,
                error: attrs.errors.email || '',
                onchange: (e) => contact.email = e.target.value,
              }),
              m(TextInput, {
                class: 'pr-6 pb-8 w-full lg:w-1/2',
                label: 'Phone',
                value: contact.phone,
                error: attrs.errors.phone || '',
                onchange: (e) => contact.phone = e.target.value,
              }),
              m(TextInput, {
                class: 'pr-6 pb-8 w-full lg:w-1/2',
                label: 'Address',
                value: contact.address,
                error: attrs.errors.address || '',
                onchange: (e) => contact.address = e.target.value,
              }),
              m(TextInput, {
                class: 'pr-6 pb-8 w-full lg:w-1/2',
                label: 'City',
                value: contact.city,
                error: attrs.errors.city || '',
                onchange: (e) => contact.city = e.target.value,
              }),
              m(TextInput, {
                class: 'pr-6 pb-8 w-full lg:w-1/2',
                label: 'Province/State',
                value: contact.region,
                error: attrs.errors.region || '',
                onchange: (e) => contact.region = e.target.value,
              }),
              m(SelectInput, {
                class: 'pr-6 pb-8 w-full lg:w-1/2',
                label: 'Country',
                selected: contact.country,
                onchange: (e) => contact.country = e.target.value,
              }, [
                m('option', {value: null}),
                m('option[value=CA]', 'Canada'),
                m('option[value=US]', 'United States'),
              ]),
              m(TextInput, {
                class: 'pr-6 pb-8 w-full lg:w-1/2',
                label: 'Postal Code',
                value: contact.postal_code,
                error: attrs.errors.postal_code || '',
                onchange: (e) => contact.postal_code = e.target.value,
              }),
            ]),
            m('div.px-8 py-4 bg-gray-100 border-t border-gray-200 flex items-center', [
              !contact.deleted_at ? m('button.text-red-600 hover:underline[tabindex=-1][type=button]', {onclick: destroy}, 'Delete Contact') : '',
              m(LoadingButton, {class: 'btn-indigo ml-auto', loading: sending}, 'Update Contact'),
            ]),
          ]),
        ]),
      ]))
    },
  }
}
