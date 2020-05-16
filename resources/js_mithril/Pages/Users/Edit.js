import m from 'mithril'
import Layout from '../../Shared/Layout'
import {InertiaLink} from '../../inertia'
import TrashedMessage from '../../Shared/TrashedMessage'
import {Inertia} from '@inertiajs/inertia'
import TextInput from '../../Shared/TextInput'
import SelectInput from '../../Shared/SelectInput'
import FileInput from '../../Shared/FileInput'
import LoadingButton from '../../Shared/LoadingButton'

export default () => {

  let sending = false
  let user = null

  const submit = (e) => {
    e.preventDefault()
    sending = true
    Inertia.put('/users/' + user.id, user).then(() => {
      sending = false
    })
  }

  const destroy = () => {
    if (confirm('Are you sure you want to delete this user?')) {
      Inertia.delete('/users/' + user.id)
    }
  }

  const restore = () => {
    if (confirm('Are you sure you want to delete this user?')) {
      Inertia.put('/users/' + user.id + '/restore')
    }
  }

  return {
    view: (v) => {
      user = v.attrs.user || null
      return m(Layout, v.attrs, m('div', [
        m('h1.mb-8 font-bold text-3xl', [
          m(InertiaLink, {class: 'text-indigo-400 hover:text-indigo-600', route: '/users'}, 'Users'),
          m('span.text-indigo-400 font-medium', ' / '),
          m('span', [
            user.first_name,
            ' ',
            user.last_name,
          ]),
        ]),
        user.deleted_at ? m(TrashedMessage, {class: 'mb-6', restore: restore}, 'This user has been deleted.') : '',
        m('div.bg-white rounded shadow overflow-hidden max-w-3xl', [
          m('form', {onsubmit: submit}, [
            m('div.p-8 -mr-6 -mb-8 flex flex-wrap', [
              m(TextInput, {
                class: 'pr-6 pb-8 w-full lg:w-1/2',
                label: 'First name',
                value: user.first_name,
                error: v.attrs.errors.first_name || '',
                onchange: (e) => user.first_name = e.target.value,
              }),
              m(TextInput, {
                class: 'pr-6 pb-8 w-full lg:w-1/2',
                label: 'Last name',
                value: user.last_name,
                error: v.attrs.errors.last_name || '',
                onchange: (e) => user.last_name = e.target.value,
              }),
              m(TextInput, {
                class: 'pr-6 pb-8 w-full lg:w-1/2',
                label: 'Email',
                value: user.email,
                error: v.attrs.errors.email || '',
                onchange: (e) => user.email = e.target.value,
              }),
              m(TextInput, {
                class: 'pr-6 pb-8 w-full lg:w-1/2',
                label: 'Password',
                type: 'password',
                value: user.password,
                error: v.attrs.errors.password || '',
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
            m('div.px-8 py-4 bg-gray-100 border-t border-gray-200 flex items-center', [
              !user.deleted_at ? m('button.text-red-600 hover:underline[tabindex=-1][type=button]', {onclick: destroy}, 'Delete User') : '',
              m(LoadingButton, {class: 'btn-indigo ml-auto', loading: sending}, 'Update User'),
            ]),
          ]),
        ]),
      ]))
    },
  }
}
