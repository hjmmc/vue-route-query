import directive from './vue-route-query'

const plugin = {
  install(Vue) {
    Vue.directive('rq', directive)
  },
  directive,
}

export default plugin
