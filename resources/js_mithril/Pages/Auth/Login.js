import m from 'mithril'
import Logo from '../../Shared/Logo'
import TextInput from '../../Shared/TextInput'
import LoadingButton from '../../Shared/LoadingButton'
import {Inertia} from '@inertiajs/inertia'

// user input
let email = 'johndoe@example.com'
let password = 'secret'
let remember = false
let sending = false

const submit = (e) => {
  e.preventDefault()
  sending = true
  Inertia.post('login', {
    email: email,
    password: password,
    remember: remember,
  }).then(() => sending = false)
}

export default {
  view: ({attrs}) => {
    return m('div.p-6 bg-indigo-800 min-h-screen flex justify-center items-center',
      m('.w-full max-w-md', [
        m(Logo, {class: 'block mx-auto w-full max-w-xs fill-white', height: 50}),
        m('form.mt-8 bg-white rounded-lg shadow-xl overflow-hidden', {onsubmit: submit}, [
          m('div.px-10 py-12', [
            m('h1.text-center font-bold text-3xl', 'Welcome Back!'),
            m('div.mx-auto mt-6 w-24 border-b-2'),
            m(TextInput, {
              class: 'mt-10',
              label: 'Email',
              type: 'email',
              autofocus: true,
              autocapitalize: 'off',
              value: email,
              error: attrs.errors.email || '',
              onchange: (e) => email = e.target.value
            }),
            m(TextInput, {
              class: 'mt-6',
              label: 'Password',
              type: 'password',
              value: password,
              error: attrs.errors.password || '',
              onchange: (e) => password = e.target.value
            }),
            m('label.mt-6 select-none flex items-center[for=remember]', [
              m('input#remember.mr-1[type=checkbox]', {
                onchange: (e) => remember = e.target.checked
              }),
              m('span.text-sm', 'Remember Me')
            ])
          ]),
          m('div.px-10 py-4 bg-gray-100 border-t border-gray-200 flex justify-between items-center', [
            m('a.hover:underline[tabindex=-1][href=#reset-password]', 'Forget password?'),
            m(LoadingButton, {class: 'btn-indigo', type: 'submit', loading: sending}, 'Login')
          ])
        ])
      ])
    )
  }
}
