import m from 'mithril'

export default {
  view: (v) => {

    const divArgs = {
      class: v.attrs.class || ''
    }

    const labelArgs = {
      class: 'form-label'
    }

    const selectArgs = {
      id: v.attrs.id || '',
      class: 'form-select',
      ref: v.attrs.ref || '',
      selected: v.attrs.selected || '',
      error: v.attrs.error || '',
      onchange: v.attrs.onchange || null,
      oncreate: ({dom}) => dom.querySelector('[value="' + v.attrs.selected + '"]').selected = true
    }

    if (selectArgs.error) selectArgs.class += ' error'

    return m('div', divArgs, [
      m('label', labelArgs, v.attrs.label + ':'),
      m('select', selectArgs, v.children),
      v.attrs.error ? m('div.form-error', v.attrs.error) : ''
    ])
  }
}
