import m from 'mithril'

const button = (v) => {

  let className = v.attrs.class ? 'flex items-center ' + v.attrs.class : ''
  let type = v.attrs.type || 'submit'

  return {
    view: (v) => m('button', {class: className, type: type}, [
      v.attrs.loading ? m('div.btn-spinner mr-2') : '',
      v.children,
    ]),
  }
}

export default button
