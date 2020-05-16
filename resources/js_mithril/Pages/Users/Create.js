import m from 'mithril'
import Layout from '../../Shared/Layout'
import {InertiaLink} from '../../inertia'
import LoadingButton from '../../Shared/LoadingButton'
import FileInput from '../../Shared/FileInput'
import TextInput from '../../Shared/TextInput'
import SelectInput from '../../Shared/SelectInput'
import {Inertia} from '@inertiajs/inertia'

// closure component
export default () => {

  let sending = false

  const user = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    owner: false,
    photo: '',
  }

  const submit = (e) => {
    e.preventDefault()
    sending = true
    Inertia.post('/users', user).then(() => {
      sending = false
    })
  }

  return {
    view: ({attrs}) => m(Layout, attrs, m('div', [
      m('h1.mb-8 font-bold text-3xl', [
        m(InertiaLink, {class: 'text-indigo-400 hover:text-indigo-600', route: '/users'}, 'Users'),
        m('span.text-indigo-400 font-medium', ' / '),
        m('span', 'Create'),
      ]),
      m('div.bg-white rounded shadow overflow-hidden max-w-3xl', [
        m('form', {onsubmit: submit}, [
          m('div.p-8 -mr-6 -mb-8 flex flex-wrap', [
            m(TextInput, {
              class: 'pr-6 pb-8 w-full lg:w-1/2',
              label: 'First name',
              value: user.first_name,
              error: attrs.errors.first_name || '',
              onchange: (e) => user.first_name = e.target.value,
            }),
            m(TextInput, {
              class: 'pr-6 pb-8 w-full lg:w-1/2',
              label: 'Last name',
              value: user.last_name,
              error: attrs.errors.last_name || '',
              onchange: (e) => user.last_name = e.target.value,
            }),
            m(TextInput, {
              class: 'pr-6 pb-8 w-full lg:w-1/2',
              label: 'Email',
              value: user.email,
              error: attrs.errors.email || '',
              onchange: (e) => user.email = e.target.value,
            }),
            m(TextInput, {
              class: 'pr-6 pb-8 w-full lg:w-1/2',
              label: 'Password',
              type: 'password',
              value: user.password,
              error: attrs.errors.password || '',
              onchange: (e) => user.password = e.target.value,
            }),
            m(SelectInput, {
              class: 'pr-6 pb-8 w-full lg:w-1/2',
              label: 'Owner',
              selected: 'false',
              onchange: (e) => user.owner = e.target.value,
            }, [
              m('option[value=true]', 'Yes'),
              m('option[value=false]', 'No'),
            ]),
            m(FileInput),
          ]),
          m('div.px-8 py-4 bg-gray-100 border-t border-gray-200 flex justify-end items-center', [
            m(LoadingButton, {class: 'btn-indigo', loading: sending}, 'Create Contact'),
          ]),
        ]),
      ]),
    ])),
  }
}
