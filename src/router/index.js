import Vue from 'vue';
import Router from 'vue-router';
import Config from '@/utils/Config';
import UserLogin from '@/utils/UserLogin';
// page
import Errors from '@/pages/errors';
import PageNotFound from '@/pages/errors';
Vue.use(Router);
let MyRouter = new Router({
  routes: [
    { path: '*', component: PageNotFound },
    { path: '/login', name: 'login', component: resolve => { require(['@/pages/page-login'], resolve) } },
    { path: '/home', name: 'home', component: resolve => { require(['@/pages/page-home'], resolve)} },
    { path: '/errors', name: 'errors', component: Errors },
    {
      path: '/index', name: 'main', component: resolve => { require(['@/pages/page-main'], resolve) },
      children: [
        { path: 'form', name: 'form', component: resolve => { require(['@/pages/page-form'], resolve) } },
        { path: 'table', name: 'table', component: resolve => { require(['@/pages/page-table'], resolve )} },
        // 贷前业务
        { path: 'orderregister', name: 'orderRegister', component: resolve => { require(['@/pages/beforeloan-manage/order-register'], resolve) } },
        // 客户管理
        { path: 'customer', name: 'customer', component: resolve => require(['@/pages/customer-manage'],resolve),
          children: [
            { path: '/', name: 'privateCustomer', component: resolve => require(['@/pages/customer-manage/private-customer'],resolve),
              children: [
                { path: '/', component: resolve => require(['@/pages/customer-manage/private-customer/customer-list'],resolve), meta: {keepAlive: false} },
                { path: 'add', name: 'addPrivateCustomer', component: resolve => require(['@/pages/customer-manage/private-customer/customer-add'],resolve), meta: {keepAlive: false} },
                { path: 'update', name: 'updatePrivateCustomer', component: resolve => require(['@/pages/customer-manage/private-customer/customer-add/update.vue'],resolve), meta: {keepAlive: false} },
                { path: 'detail', name: 'detailPrivateCustomer', component: resolve => require(['@/pages/customer-manage/private-customer/customer-add/detail.vue'],resolve), meta: {keepAlive: false} }
              ]
            },
            // 客户管理 == 企业客户
            { path: 'companycustomer', name: 'companyCustomer', component: resolve => require(['@/pages/customer-manage/company-customer'], resolve),
              children: [
                { path:'/', name: 'companyCustomerList', component: resolve => require(['@/pages/customer-manage/company-customer/company-list'], resolve) },
                { path: 'modify', name: 'addCompanyCustomer', component: resolve => require(['@/pages/customer-manage/company-customer/company-add'], resolve) }
              ]
            },
            // 客户管理 == 渠道商管理
            { path: 'distributor', name: 'distributor', component: resolve => require(['@/pages/customer-manage/distributor-manage'], resolve),
              children: [
                { path:'/', name: 'distributorList', component: resolve => require(['@/pages/customer-manage/distributor-manage/distributor-list'], resolve)},
                { path: 'add', name: 'addDistributor', component: resolve => require(['@/pages/customer-manage/distributor-manage/distributor-list/page-distributor-add'], resolve)},
                { path: 'quota', name: 'addDistributor', component: resolve => require(['@/pages/customer-manage/distributor-manage/distributor-list/page-distributor-quota'], resolve)}
                // { path: 'modify', name: 'addCompanyCustomer', component: resolve => require(['@/pages/customer-manage/company-customer/company-add'], resolve) }
              ]
            },
            // 黑名单管理
            { path: 'blacklist', component: resolve => { require(['@/pages/customer-manage/blacklist-manage'], resolve) }, name: 'customerBlacklist'}
          ]
        },
        // 配置管理
        { path: 'conf', name: 'ConfigurationManage', component: resolve => { require(['@/pages/configuration-manage'], resolve) },
          children: [
            // 配置管理-产品配置
            { path: 'product', name: 'Product', component: resolve => { require(['@/pages/configuration-manage/manage-product'], resolve) },
              children: [
                // 配置管理-产品配置-产品列表
                { path: '/', name: 'ProductList', component: resolve => { require(['@/pages/configuration-manage/manage-product/product-list'], resolve) } },
                // 配置管理-产品配置-贷款材料配置
                { path: 'loan', name: 'BasicsLoan', component: resolve => { require(['@/pages/configuration-manage/manage-product/basics-loan'], resolve) } },
                // 配置管理-产品配置-费用类型配置
                { path: 'cost', name: 'BasicsCost', component: resolve => { require(['@/pages/configuration-manage/manage-product/basics-cost'], resolve) } },
                // 配置管理-产品配置-准入规则配置
                { path: 'rule', name: 'BasicsRule', component: resolve => { require(['@/pages/configuration-manage/manage-product/basics-rule'], resolve) } },
                // 配置管理-产品配置-车辆材料配置
                { path: 'car', name: 'BasicsCar', component: resolve => { require(['@/pages/configuration-manage/manage-product/basics-car'], resolve) } },
                // 配置管理-产品配置-归档材料配置
                { path: 'file', name: 'BasicsFile', component: resolve => { require(['@/pages/configuration-manage/manage-product/basics-file'], resolve) } }
              ]
            },// 配置管理-产品配置end
            // 配置管理-资方管理
            {
              path: 'invest', name: 'invest', component: resolve => { require(['@/pages/configuration-manage/manage-invest'], resolve) } ,
              children: [
                // 配置管理-资方管理-资方维护
                { path:'/', name: 'maintain', component: resolve => { require(['@/pages/configuration-manage/manage-invest/maintain'], resolve) } },
                // 配置管理-资方管理-资方映射配置
                { path:'mapping', name: 'mapping', component: resolve => { require(['@/pages/configuration-manage/manage-invest/mapping'], resolve) } },
                // 配置管理-资方管理-合同模板维护
                { path:'contract', name: 'contract', component: resolve => { require(['@/pages/configuration-manage/manage-invest/contract'], resolve) } }
              ]
            }// 配置管理-资方管理end
          ]
        },// 配置管理end
        // 贷款业务
        {
          path: 'loanbusiness', name: 'loanBusiness', component: resolve => require(['@/pages/loan-business'], resolve),
          children: [
            // 贷款业务-业务审批
            { path: '/', name: 'loanBusinessExamination', component: resolve => require(['@/pages/loan-business/business-examination/examination-first'], resolve),
              children: [
                // 贷款业务-业务审批-业务初审
                { path: '/', name: 'loanBusinessExaminationFirst', component: resolve => require(['@/pages/loan-business/business-examination/examination-first'], resolve)}
              ]
            },
            // 贷款业务-业务受理
            { path: 'accept', name: 'loanBusinessAccept', component: resolve => require(['@/pages/loan-business/business-acceptance'], resolve),
              children: [
                // 贷款业务-业务受理-个人业务登记-基本信息
                { path: '/', name: 'PersonalRegistration', component: resolve => require(['@/pages/loan-business/business-acceptance/personal-business-registration'], resolve)}
              ]
            },
            // 贷款业务-业务受理-企业客户
            { path: 'companyaccept', name: 'loanBusinessAccept', component: resolve => require(['@/pages/loan-business/business-acceptance'], resolve),
              children: [
                // 贷款业务-业务受理-个人业务登记-基本信息
                { path: '/', name: 'CompanyRegistration', component: resolve => require(['@/pages/loan-business/business-acceptance/company-business-registration'], resolve)}
              ]
            },
            // 贷款业务-授信管理
            { path: 'credit', name: 'loanBusinessCredit', component: resolve => require(['@/pages/loan-business/credit-manage'], resolve),
              children: [
                // 贷款业务-授信管理-授信查询列表
                { path: '/', name: 'loanBusinessCreditList', component: resolve => require(['@/pages/loan-business/credit-manage/credit-list'], resolve)},
                // 贷款业务-授信管理-授信申请
                { path: 'apply', name: 'loanBusinessCreditApply', component: resolve => require(['@/pages/loan-business/credit-manage/credit-apply'], resolve)},
                // { path: 'update', name: 'loanBusinessCreditApply', component: resolve => require(['@/pages/loan-business/credit-manage/credit-apply'], resolve)},
                { path: 'pending', name: 'loanBusinessCreditPedding', props: { creditStatus: '3'},
                  component: resolve => require(['@/pages/loan-business/credit-manage/credit-list'], resolve)},
                { path: 'externalapprove', name: 'loanBusinessCreditExternalApprove', props: { creditStatus: '4'},
                  component: resolve => require(['@/pages/loan-business/credit-manage/credit-list'], resolve)},
                { path: 'approve', name: 'loanBusinessCreditApprove', props: { creditStatus: '5'},
                  component: resolve => require(['@/pages/loan-business/credit-manage/credit-list'], resolve)},
                { path: 'detail', name: 'loanBusinessCreditDetail', component: resolve => require(['@/pages/loan-business/credit-manage/credit-detail'], resolve)},
                // 贷款业务-授信管理-授信审批
                { path: 'doapprove', name: 'loanBusinessCreditApprove', component: resolve => require(['@/pages/loan-business/credit-manage/credit-approve'], resolve)}
              ]
            }
          ]
        }
        // 贷款业务 end
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
