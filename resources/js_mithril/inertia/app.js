import {Inertia} from '@inertiajs/inertia'
import m from 'mithril'

const empty = {
  view: () => {
    return m('div')
  },
}

const state = {
  component: empty,
  props: {},
  key: null,
}

const app = {
  initialPage: {
    type: Object,
    required: true,
  },
  resolveComponent: {
    type: Function,
    required: true,
  },
  transformProps: props => props,
  oncreate: () => Inertia.init({
    initialPage: app.initialPage,
    resolveComponent: app.resolveComponent,
    updatePage: (component, props, {preserveState}) => {
      state.component = component
      state.props = app.transformProps(props)
      state.key = preserveState ? state.key : Date.now()
      m.redraw()
    },
  }),
  view: () => m(state.component, state.props),
}

export default app
