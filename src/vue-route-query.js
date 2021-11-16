/**
 * 根据路由值设置 VNode data
 * @param routeValue
 * @param binding
 * @param vNode
 */
function setVNodeData(routeValue, binding, vNode) {
  if (!routeValue) return
  if (binding.modifiers.number || typeof binding.value === 'number') {
    routeValue = ~~routeValue
  } else if (binding.modifiers.boolean || typeof binding.value === 'boolean') {
    routeValue = routeValue === 'true'
  }
  const keys = binding.expression.split('.')
  const lastKey = keys.pop()
  let data = vNode.context
  for (const key of keys) {
    data = data[key]
  }
  vNode.context.$set(data, lastKey, routeValue)
}

/**
 * 路由钩子，监听变量并设置路由参数
 * 默认用法：<div v-rq="query.page" /> 根据传入的值支持自动转换为 string,number,boolean 不支持其它类型，可通过修饰符修改值类型
 * 多个参数：<div v-rq:page="query.page" v-rq:size="query.size">
 * 修饰符 replace: <div v-rq:page.replace="query.page" /> replace 路由而不是 push
 * 修饰符 number: <div v-rq:page.number="query.page" /> 指定数据类型为 number
 * 修饰符 boolean: <div v-rq:enable.boolean="query.enable" /> 指定数据类型为 boolean
 */
export default {
  bind: function (el, binding, vNode) {
    vNode.context.$watch(
      () => vNode.context.$route.query[binding.arg || binding.expression],
      (val) => {
        setVNodeData(val, binding, vNode)
      }
    )
    const routeValue = vNode.context.$route.query[binding.arg || binding.expression]
    setVNodeData(routeValue, binding, vNode)
  },
  update: function (el, binding, vNode) {
    if (binding.oldValue !== binding.value) {
      const route = { ...vNode.context.$route }
      if (route.query[binding.arg || binding.expression] === `${binding.value}`) return
      route.query = {
        ...route.query,
        [binding.arg || binding.expression]: binding.value,
      }
      if (binding.modifiers.replace) {
        vNode.context.$router.replace(route).finally(() => {})
      } else {
        vNode.context.$router.push(route).finally(() => {})
      }
    }
  },
}
