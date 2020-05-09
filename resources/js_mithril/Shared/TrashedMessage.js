import m from 'mithril'

export default {
  view: (v) => m('div.p-4 bg-yellow-400 rounded flex items-center justify-between max-w-3xl', {class: v.attrs.class}, [
    m('div.flex items-center', [
      m('div.text-sm font-medium text-yellow-800', v.children),
    ]),
    m('button.text-sm text-yellow-800 hover:underline[tabindex=-1][type=button]', {
      onclick: v.attrs.restore || null,
    }, 'Restore'),
  ]),
}
