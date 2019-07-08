import router from './router'
import store from './store/index'

// 全局放一个routlist
window.routeList = []
let SLICE_INDEX = 0

// 检查routeList上记录的路由列表是否含有name的route
let getRouteName4RouteList = (name) => {
  return window.routeList.some((x, index) => {
    SLICE_INDEX = index
    return x.name === name
  })
}

router.beforeEach((to, from, next) => {
  if (window.routeList.length > 1 && getRouteName4RouteList(to.name)) {
    store.commit('prevEffect') // 返回
    // window.routeList.splice(window.routeList.length - 1, 1)
    window.routeList = window.routeList.slice(0, SLICE_INDEX + 1)
    next()
    // return;
  } else {
    store.commit('nextEffect') // 前进
    window.routeList.push({
      name: to.name
    })
    next()
  }
})
