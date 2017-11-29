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
import PageNotFound from '@/pages/errors';
// 贷前业务
import OrderRegister from '@/pages/beforeloan-manage/order-register';
// 配置管理
import ConfigurationManage from '@/pages/configuration-manage';
// 配置管理-产品配置
import Product from '@/pages/configuration-manage/manage-product';
// 配置管理-产品配置-产品列表
import ProductList from '@/pages/configuration-manage/manage-product/product-list';
// 配置管理-产品配置-贷款材料配置
import BasicsLoan from '@/pages/configuration-manage/manage-product/basics-loan';
// 配置管理-产品配置-费用类型配置
import BasicsCost from '@/pages/configuration-manage/manage-product/basics-cost';
// 配置管理-产品配置-准入规则配置
import BasicsRule from '@/pages/configuration-manage/manage-product/basics-rule';
// 配置管理-产品配置-车辆材料配置
import BasicsCar from '@/pages/configuration-manage/manage-product/basics-car';
// 配置管理-产品配置-归档材料配置
import BasicsFile from '@/pages/configuration-manage/manage-product/basics-file';
// 配置管理-资方管理
import Invest from '@/pages/configuration-manage/manage-invest';
// 配置管理-资方管理-资方维护
import Maintain from '@/pages/configuration-manage/manage-invest/maintain';
// 配置管理-资方管理-资方映射配置
import Mapping from '@/pages/configuration-manage/manage-invest/mapping';
// 配置管理-资方管理-Contract
import Contract from '@/pages/configuration-manage/manage-invest/contract';
// 客户管理--个人客户
// 客户管理--企业客户
import CustomerBlacklist from '@/pages/customer-manage/blacklist-manage';

Vue.use(Router);

let MyRouter = new Router({
  routes: [
    {
      path: '*',
      component: PageNotFound
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
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
        // 客户管理
        {
          path: 'customer',
          name: 'customer',
          component: resolve => require(['@/pages/customer-manage'],resolve),
          children: [
            {
              path: '/',
              name: 'privateCustomer',
              component: resolve => require(['@/pages/customer-manage/private-customer'],resolve),
              children: [
                {
                  path:'/',
                  component: resolve => require(['@/pages/customer-manage/private-customer/customer-list'],resolve), //PrivateCustomerList
                  meta: {keepAlive: false}
                },
                {
                  path: 'add',
                  name: 'addPrivateCustomer',
                  component: resolve => require(['@/pages/customer-manage/private-customer/customer-add'],resolve),
                  meta: {keepAlive: false}
                },
                {
                  path: 'update',
                  name: 'updatePrivateCustomer',
                  component: resolve => require(['@/pages/customer-manage/private-customer/customer-add/update.vue'],resolve),
                  meta: {keepAlive: false}
                },
                {
                  path: 'detail',
                  name: 'detailPrivateCustomer',
                  component: resolve => require(['@/pages/customer-manage/private-customer/customer-add/detail.vue'],resolve),
                  meta: {keepAlive: false}
                }
              ]
            },
            // 客户管理 == 企业客户
            {
              path: 'companycustomer',
              name: 'companyCustomer',
              component: resolve => require(['@/pages/customer-manage/company-customer'], resolve),
              children: [
                {
                  path:'/',
                  name: 'companyCustomerList',
                  component: resolve => require(['@/pages/customer-manage/company-customer/company-list'], resolve)
                },
                {
                  path: 'modify',
                  name: 'addCompanyCustomer',
                  component: resolve => require(['@/pages/customer-manage/company-customer/company-add'], resolve)
                }/*,
                {
                  path: 'update',
                  name: 'addCompanyCustomer',
                  component: resolve => require(['@/pages/customer-manage/company-customer/company-add/update.vue'], resolve)
                },
                {
                  path: 'detail',
                  name: 'addCompanyCustomer',
                  component: resolve => require(['@/pages/customer-manage/company-customer/company-add/detail.vue'], resolve)
                }*/
              ]
            },
            // 黑名单管理
            {
              path: 'blacklist',
              component: CustomerBlacklist,
              name: 'customerBlacklist'
            }

          ]
        },
        // 配置管理
        {
          path: 'conf',
          name: 'ConfigurationManage',
          component: ConfigurationManage,
          children: [
            // 配置管理-产品配置
            {
              path: 'product',
              name: 'Product',
              component: Product,
              children: [
                // 配置管理-产品配置-产品列表
                {
                  path: '/',
                  name: 'ProductList',
                  component: ProductList
                },
                // 配置管理-产品配置-贷款材料配置
                {
                  path: 'loan',
                  name: 'BasicsLoan',
                  component: BasicsLoan
                },
                // 配置管理-产品配置-费用类型配置
                {
                  path: 'cost',
                  name: 'BasicsCost',
                  component: BasicsCost
                },
                // 配置管理-产品配置-准入规则配置
                {
                  path: 'rule',
                  name: 'BasicsRule',
                  component: BasicsRule
                },
                // 配置管理-产品配置-车辆材料配置
                {
                  path: 'car',
                  name: 'BasicsCar',
                  component: BasicsCar
                },
                // 配置管理-产品配置-归档材料配置
                {
                  path: 'file',
                  name: 'BasicsFile',
                  component: BasicsFile
                }
              ]
            },// 配置管理-产品配置end
            // 配置管理-资方管理
            {
              path: 'invest',
              name: 'invest',
              component: Invest,
              children: [
                {
                  // 配置管理-资方管理-资方维护
                  path:'/',
                  name: 'maintain',
                  component: Maintain
                },
                {
                  // 配置管理-资方管理-资方映射配置
                  path:'mapping',
                  name: 'mapping',
                  component: Mapping
                },
                {
                  // 配置管理-资方管理-合同模板维护
                  path:'contract',
                  name: 'contract',
                  component: Contract
                }
              ]
            }// 配置管理-资方管理end
          ]
        }// 配置管理end
      ]
    }
  ],
  linkExactActiveClass: 'link-exact-active',
  linkActiveClass: 'link-active',
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
