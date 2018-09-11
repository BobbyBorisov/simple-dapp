import Vue from 'vue'
import Router from 'vue-router'
import Contract from '@/components/Contract'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Contract',
      component: Contract
    }
  ]
})
