import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import Home from '@/pages/page-home';
import Form from '@/pages/page-form';
import Table from '@/pages/page-table';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/form',
      name: 'form',
      component: Form
    },
    {
      path: '/table',
      name: 'table',
      component: Table
    }
  ]
})
