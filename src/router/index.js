import Vue from 'vue';
import Router from 'vue-router';
import Config from '@/utils/Config';
import UserLogin from '@/utils/UserLogin';
/* eslint-disable */
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
                // 首页 > 渠道商管理 > 渠道商列表 > 新增授信额度信息
                { path: 'quota', name: 'quotaDistributor', component: resolve => require(['@/pages/customer-manage/distributor-manage/distributor-list/page-distributor-quota'], resolve)},
                // 首页 > 渠道商管理 > 渠道商列表 > 渠道操作员管理
                { path: 'admin', name: 'quotaDistributor', component: resolve => require(['@/pages/customer-manage/distributor-manage/distributor-list/page-distributor-admin'], resolve)},
                // 首页 > 渠道商管理 > 渠道商列表 > 渠道商详情
                { path: 'details', name: 'detailsDistributor', component: resolve => require(['@/pages/customer-manage/distributor-manage/distributor-list/page-distributor-details'], resolve)},
                // 首页 > 渠道商管理 > 渠道商列表 > 车型管理
                { path: 'car', name: 'carDistributor', component: resolve => require(['@/pages/customer-manage/distributor-manage/distributor-list/page-distributor-car'], resolve)},
                // 首页 > 渠道商管理 > 渠道商授信审核
                { path: 'credit', name: 'creditListDistributor', component: resolve => require(['@/pages/customer-manage/distributor-manage/distributor-credit-list'], resolve)},
                // 首页 > 渠道商管理 > 渠道商授信审核 > 审核
                { path: 'credit/examine', name: 'examineDistributor', component: resolve => require(['@/pages/customer-manage/distributor-manage/distributor-credit-list/distributor-credit-examine'], resolve)},
                // 首页 > 渠道商管理 > 渠道商授信审核 > 审核 > 审核历史意见信息
                { path: 'credit/examine/history', name: 'examineDistributor', component: resolve => require(['@/pages/customer-manage/distributor-manage/distributor-credit-list/table-examine-history'], resolve)}
              ]
            },
            // 黑名单管理
            { path: 'blacklist', component: resolve => { require(['@/pages/customer-manage/blacklist-manage'], resolve) }, name: 'customerBlacklist'}
          ]
        },
        // 配置管理
        { path: 'conf', name: 'ConfigurationManage', component: resolve => { require(['@/pages/configuration-manage'], resolve) },
          children: [
            // 配置管理-产品配置(设置其为根路径)
            { path: '/', name: 'confProduct', props: { aaa: 'bbb' }, component: resolve => { require(['@/pages/configuration-manage/manage-product/product-list/index.vue'], resolve) } },
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
                // 配置管理-产品配置-放款条件配置
                { path: 'lending', name: 'BasicsCar', component: resolve => { require(['@/pages/configuration-manage/manage-product/basics-lending'], resolve) } },
                // 配置管理-产品配置-归档材料配置
                { path: 'file', name: 'BasicsFile', component: resolve => { require(['@/pages/configuration-manage/manage-product/basics-file'], resolve) } },
                // 配置管理-产品配置-产品匹配配置
                { path: 'match', name: 'BasicsMatch', component: resolve => { require(['@/pages/configuration-manage/manage-product/basics-match'], resolve) } }
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
                { path:'contract', name: 'contract', component: resolve => { require(['@/pages/configuration-manage/manage-invest/contract'], resolve) } },
                // 配置管理-资方管理-合同模板参数配置
                { path:'contractsetting', name: 'contractSetting', component: resolve => { require(['@/pages/configuration-manage/manage-invest/contract-setting'], resolve) } },
              ]
            },// 配置管理-资方管理end
            // 车型管理
            {
              path: 'carmodelmanage', name: 'carModelManage', component: resolve => require(['@/pages/configuration-manage/carmodel-manage'], resolve),
              children: [
                // 品牌管理
                { path:'brand', name: 'carModelBrand', component: resolve => { require(['@/pages/configuration-manage/carmodel-manage/brand-manage'], resolve) } },
                // 推荐品牌管理
                { path:'topbrand', name: 'carModelTopBrand', component: resolve => { require(['@/pages/configuration-manage/carmodel-manage/topbrand-manage'], resolve) } },
                // 车型管理
                { path:'model', name: 'carModel', component: resolve => { require(['@/pages/configuration-manage/carmodel-manage/model-manage'], resolve) } },
              ]
            },
            // 车型管理 end
            // banner管理
            {
              path: 'bannermanage', name: 'bannerManage', component: resolve => require(['@/pages/configuration-manage/banner-manage'], resolve),
            },
            // banner管理 end
            // 短信管理
            {
              path: 'smsmanage', name: 'smsManage', component: resolve => require(['@/pages/configuration-manage/sms-manage'], resolve),
            }
            // 短信管理 end
          ]
        },// 配置管理end
        // 贷款业务
        {
          path: 'loanbusiness', name: 'loanBusiness', component: resolve => require(['@/pages/loan-business'], resolve),
          children: [
            // 贷款业务-业务审批
            { path: '/', name: 'loanBusinessList',  props: { 'taskNode': ''}, component: resolve => require(['@/pages/loan-business/business-list'], resolve)},
            { path: 'mypending', name: 'loanBusinessMyPendingList',  props: { 'taskNode': '1', status: '0;1;3'}, component: resolve => require(['@/pages/loan-business/business-list'], resolve)},
            { path: 'firstapprove', name: 'loanBusinessFirstApproveList', props: { 'taskNode': '3'}, component: resolve => require(['@/pages/loan-business/business-list'], resolve)},
            { path: 'firststageapprove', name: 'loanBusinessFirstStageApproveList', props: { 'taskNode': '4'}, component: resolve => require(['@/pages/loan-business/business-list'], resolve)},
            { path: 'secondstageapprove', name: 'loanBusinessSecondStageApproveList', props: { 'taskNode': '5'}, component: resolve => require(['@/pages/loan-business/business-list'], resolve)},
            { path: 'doapprove', name: 'loanBusinessApprove', component: resolve => require(['@/pages/loan-business/business-approve'], resolve)},
            { path: 'detail', name: 'loanBusinessApprove', component: resolve => require(['@/pages/loan-business/business-approve'], resolve)},
            // 贷款业务-业务受理
            { path: 'accept', name: 'loanBusinessAccept', props: { customerType: '1' }, component: resolve => require(['@/pages/loan-business/business-acceptance'], resolve)},
            // 贷款业务-业务受理-企业客户
            { path: 'companyaccept', name: 'companyLoanBusinessAccept', props: { customerType: '2' }, component: resolve => require(['@/pages/loan-business/business-acceptance'], resolve)},
            // 贷款业务-授信管理
            { path: 'credit', name: 'loanBusinessCredit', component: resolve => require(['@/pages/loan-business/credit-manage'], resolve),
              children: [
                // 贷款业务-授信管理-授信查询列表
                { path: '/', name: 'loanBusinessCreditList', component: resolve => require(['@/pages/loan-business/credit-manage/credit-list'], resolve)},
                // 贷款业务-授信管理-授信申请
                { path: 'apply', name: 'loanBusinessCreditApply', component: resolve => require(['@/pages/loan-business/credit-manage/credit-apply'], resolve)},
                // { path: 'update', name: 'loanBusinessCreditApply', component: resolve => require(['@/pages/loan-business/credit-manage/credit-apply'], resolve)},
                { path: 'pending', name: 'loanBusinessCreditPedding', props: { creditStatus: '3;4'},
                  component: resolve => require(['@/pages/loan-business/credit-manage/credit-list'], resolve)},
                { path: 'externalapprove', name: 'loanBusinessCreditExternalApprove', props: { creditStatus: '5;6'},
                  component: resolve => require(['@/pages/loan-business/credit-manage/credit-list'], resolve)},
                { path: 'approve', name: 'loanBusinessCreditApprove', props: { creditStatus: '7;8'},
                  component: resolve => require(['@/pages/loan-business/credit-manage/credit-list'], resolve)},
                { path: 'detail', name: 'loanBusinessCreditDetail', component: resolve => require(['@/pages/loan-business/credit-manage/credit-detail'], resolve)},
                // 贷款业务-授信管理-授信审批
                { path: 'doapprove', name: 'loanBusinessCreditApprove', component: resolve => require(['@/pages/loan-business/credit-manage/credit-approve'], resolve)}
              ]
            },
            // 客户意向订单查询
            { path: 'intentionorder', name: 'intentionOrder', component: resolve => require(['@/pages/loan-business/intention-order'], resolve),
              children: [
                { path: '/', name: 'intentionOrderList', component: resolve => require(['@/pages/loan-business/intention-order/order-list'], resolve)},
                { path: ':orderId', name: 'intentionOrderDetail', component: resolve => require(['@/pages/loan-business/intention-order/order-detail'], resolve)},
              ]
            }
          ]
        },
        // 贷款业务 end

        // 合同管理
        { path: 'contract', name: 'loanContractManage', component: resolve => require(['@/pages/contract-manage'], resolve),
          children: [
            // 合同管理->合同制作列表
            { path: '/', name: 'loanContractMakingList', component: resolve => require(['@/pages/contract-manage/contract-list'], resolve)},
            // 合同管理->个人业务合同制作
            { path: 'making', name: 'loanContractMakingTab', component: resolve => require(['@/pages/contract-manage/contract-making-tab'], resolve)},
            // 合同管理->合同复核
            { path: 'againExamine', name: 'againExamine', component: resolve => require(['@/pages/contract-manage/contract-again-examine'], resolve)},
            // 合同管理->合同签署确认
            { path: 'sign', name: 'loanContractSign', component: resolve => require(['@/pages/contract-manage/contract-signing'], resolve)},
            // 合同管理->合同签署确认-详情页面
            { path: 'signDetails', name: 'loanContractSignDetails', component: resolve => require(['@/pages/contract-manage/contract-signing-details-tab'], resolve)},
          ]
        },
        // 合同管理 end

        // 账务管理
        {
          path: 'financemanage', name: 'financeManage', component: resolve => require(['@/pages/finance-manage'], resolve),
          children: [
            // 代付管理
            { path: 'proxypay', name: 'financeProxypay', component: resolve => require(['@/pages/finance-manage/proxy-pay'], resolve)},
            // 代收管理
            { path: 'proxyreceive', name: 'financeProxyReceive', component: resolve => require(['@/pages/finance-manage/proxy-receive'], resolve)},
            // 应收账单
            { path: 'shouldreceiptorder', name: 'financeShouldReceiptOrder', component: resolve => require(['@/pages/finance-manage/shouldreceipt-order'], resolve)},
            // 实收账单
            { path: 'actualreceiptorder', name: 'financeActualReceiptOrder', component: resolve => require(['@/pages/finance-manage/actualreceipt-order'], resolve)},
            // 减免记录
            { path: 'deraterecord', name: 'financeDerateRecord', component: resolve => require(['@/pages/finance-manage/derate-record'], resolve)},
          ]
        },
        // 账务管理 end

        // 运营管理
        {
          path: 'operate', name: 'financeManage', component: resolve => require(['@/pages/operate-manage'], resolve),
          children: [
            { path: '/', name: 'loanManage', component: resolve => require(['@/pages/operate-manage/loan-manage/loan-condition-list'], resolve) },
            // 运营管理-放款管理
            { path: 'loan', name: 'loanManage', component: resolve => require(['@/pages/operate-manage/loan-manage'], resolve),
              children: [
                // 运营管理-放款管理-放款条件落实
                { path: '/', name: 'loanConditionList', component: resolve => require(['@/pages/operate-manage/loan-manage/loan-condition-list'], resolve)},
                // 运营管理-放款管理-放款条件落实-办理详情
                { path: 'handle', name: 'conditionHandleDetails', component: resolve => require(['@/pages/operate-manage/loan-manage/loan-condition-list/condition-handle-details'], resolve)},
                // 运营管理-放款管理-放款费用落实
                { path: 'fee', name: 'loanFeeList', component: resolve => require(['@/pages/operate-manage/loan-manage/loan-fee-list'], resolve)},
                // 运营管理-放款管理-放款费用落实-办理详情
                { path: 'fee/handle', name: 'feeHandleDetails', component: resolve => require(['@/pages/operate-manage/loan-manage/loan-fee-list/fee-handle-details'], resolve)},
                // 运营管理-放款管理-放款审批列表
                { path: 'approval', name: 'loanApprovalList', component: resolve => require(['@/pages/operate-manage/loan-manage/loan-approval-list'], resolve)},
                // 运营管理-放款管理-放款审批列表-办理详情
                { path: 'approval/handle', name: 'approvalHandleDetails', component: resolve => require(['@/pages/operate-manage/loan-manage/loan-approval-list/approval-handle-details'], resolve)}
              ]
            },
            // 运营管理-抵押物管理
            { path: 'pawn', name: 'pawnManage', component: resolve => require(['@/pages/operate-manage/pawn-manage'], resolve),
              children: [
                // 运营管理-抵押物管理-抵押物代办列表
                { path: '/', name: 'pawnList', component: resolve => require(['@/pages/operate-manage/pawn-manage/pawn-list'], resolve)},
                // 运营管理-放款管理-放款条件落实-办理详情
                { path: 'handle', name: 'pawnListHandle', component: resolve => require(['@/pages/operate-manage/pawn-manage/pawn-list/pawn-handle-details'], resolve)}
              ]
            }
          ]
        },
        // 运营管理 end
      ]
    }
  ],
  linkExactActiveClass: 'link-exact-active',
  linkActiveClass: 'link-active',
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});
const notNeddLoginPageRouteNames = ['login'];
MyRouter.beforeEach((to, from, next) => {
  if (Config.ENV === 'dev') {
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
/* eslint-disable */
