import Vue from 'vue';
import Router from 'vue-router';
import Config from '@/utils/Config';
import UserLogin from '@/utils/UserLogin';
import HelloWorld from '@/components/HelloWorld';
import Login from '@/pages/page-login';
import MainPage from '@/pages/page-main';
import Home from '@/pages/page-home';
import Form from '@/pages/page-form';
import Table from '@/pages/page-table';
import Errors from '@/pages/errors';
// 贷前业务
import OrderRegister from '@/pages/beforeloan-manage/order-register';
// 配置管理
import ConfigurationManage from '@/pages/configuration-manage';
// 配置管理-产品管理
import Product from '@/pages/configuration-manage/product';
// 配置管理-产品管理-产品列表
import ProductList from '@/pages/configuration-manage/product/product-list';

Vue.use(Router)

let MyRouter = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/errors',
      name: 'errors',
      component: Errors
    },
    {
      path: '/index',
      name: 'main',
      component: MainPage,
      children: [
        {
          path: 'form',
          name: 'form',
          component: Form
        },
        {
          path: 'table',
          name: 'table',
          component: Table
        },
        {
          path: 'orderregister',
          name: 'orderRegister',
          component: OrderRegister
        },
        // 配置管理
        {
          path: 'conf',
          name: 'ConfigurationManage',
          component: ConfigurationManage,
          children: [
            // 配置管理-产品管理
            {
              path: 'product',
              name: 'Product',
              component: Product,
              children: [
                // 配置管理-产品管理-产品列表
                {
                  path: '/',
                  name: 'ProductList',
                  component: ProductList,

                }
              ]
            }
          ]
        }
      ]
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
});
const notNeddLoginPageRouteNames = ['login'];
MyRouter.beforeEach((to, from, next) => {
  if ('dev' === Config.ENV) {
    next();
    return;
  }
  // 如果要跳转的页面需要登录，验证登录
  if (!notNeddLoginPageRouteNames.includes(to.name)) {
    if (UserLogin.isLogin()) {
      next();
    } else {
      next({
        path: '/login',
        query: {
          redirect_url: to.name
        }
      });
    }
  } else {
    next();
  }
});
export default MyRouter;
