import m from 'mithril'

export default {
  view: ({attrs}) => {

    const divArgs = {
      class: attrs.class || '',
    }

    const labelArgs = {
      class: 'form-label',
    }

    const inputArgs = {
      class: 'form-input',
      type: attrs.type || 'text',
      value: attrs.value || '',
      error: attrs.error || '',
      autofocus: attrs.autofocus || false,
      autocapitalize: attrs.autocapitalize || 'off',
      onchange: attrs.onchange || null,
      onclick: attrs.onclick || null,
    }

    if (inputArgs.error) inputArgs.class += ' error'

    return m('div', divArgs, [
      m('label', labelArgs, attrs.label + ':'),
      m('input', inputArgs),
      attrs.error ? m('div.form-error', attrs.error) : '',
    ])
  },
}
