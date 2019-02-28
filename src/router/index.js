import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import wrapper from '@/views/wrapper'
import home from '@/views/home'
import upload from '@/views/upload'
import analysis from '@/views/analysis'
import cutting from '@/views/cutting'
import setName from '@/views/setName'
import result from '@/views/result'
import information from '@/views/information'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/wrapper/',
      // hidden: true,
    },
    {
      path: '/wrapper/',
      name: 'wrapper',
      component: wrapper,
      children: [
        {
          path: '/',
          redirect: 'home',
          // hidden: true,
        },
        {
          path: 'home',
          name: 'home',
          background: 'bg-home.png',
          component: home
        },
        {
          path: 'upload',
          name: 'upload',
          component: upload
        },
        {
          path: 'analysis',
          name: 'analysis',
          component: analysis
        },
        {
          path: 'setName',
          name: 'setName',
          component: setName
        },
        {
          path: 'result',
          name: 'result',
          component: result
        },
        {
          path: 'cutting',
          name: 'cutting',
          component: cutting
        },
        {
          path: 'information',
          name: 'information',
          component: information
        }
      ]
    },

  ]
})
