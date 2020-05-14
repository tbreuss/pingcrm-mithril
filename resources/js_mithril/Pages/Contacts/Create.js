import m from 'mithril'
import Layout from '../../Shared/Layout'
import {InertiaLink} from '../../inertia'
import TextInput from '../../Shared/TextInput'
import SelectInput from '../../Shared/SelectInput'
import LoadingButton from '../../Shared/LoadingButton'
import {Inertia} from '@inertiajs/inertia'

export default () => {

  let sending = false

  const contact = {
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    city: '',
    region: '',
    postal_code: '',
  }

  const submit = (e) => {
    e.preventDefault()
    sending = true
    Inertia.post('/contacts', contact).then(() => {
      sending = false
    })
  }

  return {
    view: ({attrs}) => m(Layout, attrs, m('div', [
      m('h1.mb-8 font-bold text-3xl', [
        m(InertiaLink, {class: 'text-indigo-400 hover:text-indigo-600', route: '/contacts'}, 'Contacts'),
        m('span.text-indigo-400 font-medium', ' / '),
        m('span', 'Create'),
      ]),
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
              selected: 'false',
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
              selected: 'false',
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
          m('div.px-8 py-4 bg-gray-100 border-t border-gray-200 flex justify-end items-center', [
            m(LoadingButton, {class: 'btn-indigo', loading: sending}, 'Create User'),
          ]),
        ]),
      ]),
    ])),
  }
}
