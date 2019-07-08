import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'
import layout from '@/components/layout'
import commonRouter from './routers/commonRouter'

Router.prototype.go = function () {
  this.isBack = true
  window.history.go(-1)
}

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: App,
      redirect: 'layout',
      children: [
        {
          path: '',
          component: layout,
          redirect: 'test',
          children: [
            ...commonRouter
          ]
        }
      ]
    }
  ]
})
