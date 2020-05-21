import m from 'mithril'
import Layout from '../../Shared/Layout'
import {Inertia} from '@inertiajs/inertia'
import {InertiaLink} from '@tebe/inertia-mithril'
import TextInput from '../../Shared/TextInput'
import SelectInput from '../../Shared/SelectInput'
import LoadingButton from '../../Shared/LoadingButton'

export default () => {

  let sending = false

  const organization = {
    name: '',
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
    Inertia.post('/organizations', organization).then(() => {
      sending = false
    })
  }

  return {
    view: ({attrs}) => m(Layout, attrs, m('div', [
      m('h1.mb-8 font-bold text-3xl', [
        m(InertiaLink, {class: 'text-indigo-400 hover:text-indigo-600', route: '/organizations'}, 'Organizations'),
        m('span.text-indigo-400 font-medium', ' / '),
        m('span', 'Create'),
      ]),
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
          m('div.px-8 py-4 bg-gray-100 border-t border-gray-200 flex justify-end items-center', [
            m(LoadingButton, {class: 'btn-indigo', loading: sending}, 'Create Organization'),
          ]),
        ]),
      ]),
    ])),
  }
}
