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
    { path: '/', name: 'login', component: resolve => { require(['@/pages/page-login'], resolve) } },
    { path: '/login', name: 'login', component: resolve => { require(['@/pages/page-login'], resolve) } },
    { path: '/test', name: 'test', component: resolve => { require(['@/pages/page-test'], resolve) } },
    { path: '/resetpwd', name: 'resetPwd', component: resolve => { require(['@/pages/page-resetpwd'], resolve) } },
    { path: '/home', name: 'home', component: resolve => { require(['@/pages/page-welcome'], resolve)} },
    { path: '/errors', name: 'errors', component: Errors },
    {
      path: '/index', name: 'main', component: resolve => { require(['@/pages/page-main'], resolve) },
      children: [
        // 贷前业务
        { path: 'orderregister', name: 'orderRegister', component: resolve => { require(['@/pages/beforeloan-manage/order-register'], resolve) } },
        // 客户管理
        { path: 'customer', name: 'customer', component: resolve => require(['@/pages/customer-manage'],resolve),
          children: [
            { path: '/', name: 'toleftnav', component: resolve => require(['@/pages/to-left-nav'], resolve)},
            { path: 'privatecustomer', name: 'privateCustomer', component: resolve => require(['@/pages/customer-manage/private-customer'],resolve),
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
                // 首页 > 渠道商管理 > 渠道商列表
                { path:'/', name: 'distributorList', component: resolve => require(['@/pages/customer-manage/distributor-manage/distributor-list'], resolve)},
                // 首页 > 渠道商管理 > 渠道商列表 > 授信额度信息
                { path: 'quota', name: 'quotaDistributor', component: resolve => require(['@/pages/customer-manage/distributor-manage/distributor-list/page-distributor-quota'], resolve)},
                // 首页 > 渠道商管理 > 渠道商列表 > 渠道操作员管理
                { path: 'admin', name: 'adminDistributor', component: resolve => require(['@/pages/customer-manage/distributor-manage/distributor-list/page-distributor-admin'], resolve)},
                // 首页 > 渠道商管理 > 渠道商列表 > 银行账号维护
                { path: 'bank', name: 'bankDistributor', component: resolve => require(['@/pages/customer-manage/distributor-manage/distributor-list/page-distributor-bank'], resolve)},
                // 首页 > 渠道商管理 > 渠道商列表 > 渠道商详情
                { path: 'details', name: 'detailsDistributor', component: resolve => require(['@/pages/customer-manage/distributor-manage/distributor-list/page-distributor-details'], resolve)},
                // 首页 > 渠道商管理 > 渠道商列表 > 车型管理
                { path: 'car', name: 'carDistributor', component: resolve => require(['@/pages/customer-manage/distributor-manage/distributor-list/page-distributor-car'], resolve)},
                // 首页 > 渠道商管理 > 渠道商授信审核
                { path: 'credit', name: 'creditListDistributor', component: resolve => require(['@/pages/customer-manage/distributor-manage/distributor-credit-list'], resolve)},
                // 首页 > 渠道商管理 > 渠道商授信审核 > 审核
                { path: 'credit/examine', name: 'examineDistributor', component: resolve => require(['@/pages/customer-manage/distributor-manage/distributor-credit-list/distributor-credit-examine'], resolve)},
                // 首页 > 渠道商管理 > 渠道商授信审核 > 审核 > 审核历史意见信息
                { path: 'credit/examine/history', name: 'examineDistributor', component: resolve => require(['@/pages/customer-manage/distributor-manage/distributor-credit-list/table-examine-history'], resolve)},
                // 首页 > 渠道商管理 > 渠道商角色管理
                { path: 'role', name: 'roleManage', component: resolve => require(['@/pages/customer-manage/distributor-manage/role-manage'], resolve)},
                // 首页 > 渠道商管理 > 渠道商权限管理
                { path: 'module', name: 'moduleManage', component: resolve => require(['@/pages/customer-manage/distributor-manage/module-manage'], resolve)}
              ]
            },
            // 黑名单管理
            { path: 'blacklist', component: resolve => { require(['@/pages/customer-manage/blacklist-manage'], resolve) }, name: 'customerBlacklist'},
            //客户解绑
            { path:'unbundl',name: 'unbundling',component: resolve => { require(['@/pages/customer-manage/unbundl-user'], resolve) }}
          ]
        },
        // 配置管理
        { path: 'conf', name: 'ConfigurationManage', component: resolve => { require(['@/pages/configuration-manage'], resolve) },
          children: [
            { path: '/', name: 'toleftnav', component: resolve => require(['@/pages/to-left-nav'], resolve)},
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
                { path: 'file', name: 'BasicsFile', component: resolve => { require(['@/pages/configuration-manage/manage-product/basics-file'], resolve) } }
                // 配置管理-产品配置-产品匹配配置
                /* { path: 'match', name: 'BasicsMatch', component: resolve => { require(['@/pages/configuration-manage/manage-product/basics-match'], resolve) } }*/
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
                // 配置管理-资方管理-合同字段
                {
                  path:'contractattr', name: 'contractAttr', component: resolve => { require(['@/pages/configuration-manage/manage-invest/contract-attr'], resolve) },
                  children: [
                    // 变量池
                    { path:'variable', name: 'contractAttrVariable', component: resolve => { require(['@/pages/configuration-manage/manage-invest/contract-attr/variable'], resolve) } },
                    // 常量池
                    { path:'constant', name: 'contractAttrConstant', component: resolve => { require(['@/pages/configuration-manage/manage-invest/contract-attr/constant'], resolve) } },
                  ]
                },
              ]
            },// 配置管理-资方管理end

            // 额度预估模型
            {
              path: 'limitestimate', name: 'limitEetimate', component: resolve => require(['@/pages/configuration-manage/limit-estimate'], resolve),
              children: [
                // 设置
                { path:'setting', name: 'limitEetimateSetting', component: resolve => { require(['@/pages/configuration-manage/limit-estimate/setting'], resolve) } },
                // 设置子项
                { path:'settingitem', name: 'limitEetimateSettingItem', component: resolve => { require(['@/pages/configuration-manage/limit-estimate/setting-item'], resolve) } },
                // 设置区间
                { path:'settingregion', name: 'limitEetimateSettingRegion', component: resolve => { require(['@/pages/configuration-manage/limit-estimate/setting-region'], resolve) } },
                // 预览
                { path:'view', name: 'limitEetimateView', component: resolve => { require(['@/pages/configuration-manage/limit-estimate/view'], resolve) } },
              ]
            },
            // 额度预估模型 end

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
            {path: 'bannermanage', name: 'bannerManage', component: resolve => require(['@/pages/configuration-manage/banner-manage'], resolve)},
            // banner管理 end
            // 短信管理
            {path: 'smsmanage', name: 'smsManage', component: resolve => require(['@/pages/configuration-manage/sms-manage'], resolve)},
            // 短信管理 end
            // 支持银行
            {path: 'supportbank', name: 'supportBank', component: resolve => require(['@/pages/configuration-manage/support-bank'], resolve)},
            // 支持银行 end
          ]
        },// 配置管理end
        // 贷款业务
        {
          path: 'loanbusiness', name: 'loanBusiness', component: resolve => require(['@/pages/loan-business'], resolve),
          children: [
            { path: '/', name: 'toleftnav', component: resolve => require(['@/pages/to-left-nav'], resolve)},
            // 贷款业务-业务审批
            { path: 'alllist', name: 'loanBusinessList',  props: { 'taskNode': '', status: '', breadcrumbName: '所有订单列表'}, component: resolve => require(['@/pages/loan-business/business-list'], resolve)},
            { path: 'orderlist', name: 'loanBusinessOrderList',  props: { 'taskNode': '', status: '', breadcrumbName: '订单列表', detailtabs: '不全部显示'}, component: resolve => require(['@/pages/loan-business/business-list'], resolve)},
            { path: 'mypending', name: 'loanBusinessMyPendingList',  props: { 'taskNode': '0;1', status: '0;1;3', breadcrumbName: '待提交订单列表'}, component: resolve => require(['@/pages/loan-business/business-list'], resolve)},
            { path: 'firstapprove', name: 'loanBusinessFirstApproveList', props: { 'taskNode': '3', status: '0;1;3', breadcrumbName: '业务初审'}, component: resolve => require(['@/pages/loan-business/business-list'], resolve)},
            { path: 'firststageapprove', name: 'loanBusinessFirstStageApproveList', props: { 'taskNode': '4', status: '0;1;3', breadcrumbName: '业务一级审批'}, component: resolve => require(['@/pages/loan-business/business-list'], resolve)},
            { path: 'secondstageapprove', name: 'loanBusinessSecondStageApproveList', props: { 'taskNode': '5', status: '0;1;3', breadcrumbName: '业务二级审批'}, component: resolve => require(['@/pages/loan-business/business-list'], resolve)},
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
            },
            // 手机验证码查询
            { path: 'querysmscode', name: 'querySmsCode', component: resolve => require(['@/pages/loan-business/query-smscode'], resolve)},
          ]
        },
        // 贷款业务 end

        // 合同管理
        { path: 'contract', name: 'loanContractManage', component: resolve => require(['@/pages/contract-manage'], resolve),
          children: [
            { path: '/', name: 'toleftnav', component: resolve => require(['@/pages/to-left-nav'], resolve)},
            // 合同管理->待制作合同列表
            { path: 'list', name: 'loanContractMakingList', component: resolve => require(['@/pages/contract-manage/contract-list'], resolve)},
            // 合同管理->个人业务合同制作
            { path: 'making', name: 'loanContractMakingTab', component: resolve => require(['@/pages/contract-manage/contract-making-tab'], resolve)},
            // 合同管理->待签署合同列表
            { path: 'sign', name: 'loanContractSign', component: resolve => require(['@/pages/contract-manage/contract-signing'], resolve)},
            // 合同管理->待签署合同查询
            { path: 'signQuery', name: 'loanContractSignQuery', props:{ query: true }, component: resolve => require(['@/pages/contract-manage/contract-signing'], resolve)},
            // 合同管理->待签署合同列表-详情页面 / 查看合同详情
            { path: 'signDetails', name: 'loanContractSignDetails', component: resolve => require(['@/pages/contract-manage/contract-signing-details-tab'], resolve)},
            // 合同管理->已签署合同列表
            { path: 'signSucceed', name: 'loanContractSignSucceed', props: { succeed: true }, component: resolve => require(['@/pages/contract-manage/contract-signing'], resolve)}
          ]
        },
        // 合同管理 end

        // 账务管理
        {
          path: 'financemanage', name: 'financeManage', component: resolve => require(['@/pages/finance-manage'], resolve),
          children: [
            { path: '/', name: 'toleftnav', component: resolve => require(['@/pages/to-left-nav'], resolve)},
            // 代付管理
            {
              path: 'proxypay', name: 'financeProxypay', component: resolve => require(['@/pages/finance-manage/proxy-pay'], resolve),
              children: [
                { path: '/', name: 'toleftnav', component: resolve => require(['@/pages/to-left-nav'], resolve)},
                { path: '1', name: 'financeProxypayFirst', props: {paymentType: '1', isDetail: false}, component: resolve => require(['@/pages/finance-manage/proxy-pay/info.vue'], resolve) },
                { path: '2', name: 'financeProxypaySecond', props: {paymentType: '2', isDetail: false}, component: resolve => require(['@/pages/finance-manage/proxy-pay/info.vue'], resolve) },
                { path: 'detail1', name: 'financeProxypayViewFirst', props: {paymentType: '1', isDetail: true}, component: resolve => require(['@/pages/finance-manage/proxy-pay/info.vue'], resolve) },
                { path: 'detail2', name: 'financeProxypayViewSecond', props: {paymentType: '2', isDetail: true}, component: resolve => require(['@/pages/finance-manage/proxy-pay/info.vue'], resolve) },
              ]
            },
            // 代扣管理
            {
              path: 'proxyreceive', name: 'financeProxyReceive', component: resolve => require(['@/pages/finance-manage/proxy-receive'], resolve),
              children: [
                { path: '/', name: 'financeProxyReceiveList', props: { isDetail: false}, component: resolve => require(['@/pages/finance-manage/proxy-receive/list.vue'], resolve)},
                { path: 'detail', name: 'financeProxyReceiveDetail', props: { isDetail: true}, component: resolve => require(['@/pages/finance-manage/proxy-receive/list.vue'], resolve)},
              ]
            },
            // // 应收账单
            // { path: 'shouldreceiptorder', name: 'financeShouldReceiptOrder', component: resolve => require(['@/pages/finance-manage/shouldreceipt-order'], resolve)},
            // // 实收账单
            // { path: 'actualreceiptorder', name: 'financeActualReceiptOrder', component: resolve => require(['@/pages/finance-manage/actualreceipt-order'], resolve)},
            // // 减免记录
            // { path: 'deraterecord', name: 'financeDerateRecord', component: resolve => require(['@/pages/finance-manage/derate-record'], resolve)},
          ]
        },
        // 账务管理 end

        // 运营管理
        {
          path: 'operate', name: 'financeManage', component: resolve => require(['@/pages/operate-manage'], resolve),
          children: [
            { path: '/', name: 'toleftnav', component: resolve => require(['@/pages/to-left-nav'], resolve)},
            // 运营管理-放款管理
            { path: 'loan', name: 'loanManage', component: resolve => require(['@/pages/operate-manage/loan-manage'], resolve),
              children: [
                // 运营管理-放款管理-放款条件落实
                { path: '/', name: 'loanConditionList', component: resolve => require(['@/pages/operate-manage/loan-manage/loan-condition-list'], resolve)},
                // 运营管理-放款管理-放款条件落实-办理详情
                { path: 'handle', name: 'conditionHandleDetails', component: resolve => require(['@/pages/operate-manage/loan-manage/loan-condition-list/condition-handle-details'], resolve)},
                // 运营管理-放款管理-GPS安装落实
                { path: 'GPS', name: 'loanGPSList', component: resolve => require(['@/pages/operate-manage/loan-manage/loan-GPS-list'], resolve)},
                // 运营管理-放款管理-GPS安装落实-办理详情
                { path: 'GPS/handle', name: 'GPSHandleDetails', component: resolve => require(['@/pages/operate-manage/loan-manage/loan-GPS-list/GPS-handle-details'], resolve)},
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
            // 运营管理-权证管理
            { path: 'pawn', name: 'pawnManage', component: resolve => require(['@/pages/operate-manage/pawn-manage'], resolve),
              children: [
                // 运营管理-权证待办列表
                { path: '/', name: 'pawnList', props: {status: '0'}, component: resolve => require(['@/pages/operate-manage/pawn-manage/pawn-list'], resolve)},
                // 运营管理-权证管已办列表
                { path: 'finished', name: 'pawnFinishedList',  props: {status: '2'}, component: resolve => require(['@/pages/operate-manage/pawn-manage/pawn-list'], resolve)},
                // 运营管理-放款管理-放款条件落实-办理详情
                { path: 'handle', name: 'pawnListHandle', component: resolve => require(['@/pages/operate-manage/pawn-manage/pawn-list/pawn-handle-details'], resolve)}
              ]
            }
          ]
        },
        // 运营管理 end

        //业务查询
        { path: 'query', name: 'queryService', component: resolve => require(['@/pages/query-service'], resolve),
          children: [
            { path: '/', name: 'toleftnav', component: resolve => require(['@/pages/to-left-nav'], resolve)},
            { path: 'repay', name: 'repayment', component: resolve => require(['@/pages/query-service/repay-ment'], resolve),
              children: [
                //还款计划查询
                { path: 'detatime', name: 'detatimeQuery',component: resolve => require(['@/pages/query-service/repay-ment/detatime-query'], resolve)},
                //应还款客户查询
                { path: 'person', name: 'personQuery',component: resolve => require(['@/pages/query-service/repay-ment/person-query'], resolve)},
                //应还款查询详情
                { path: 'persondetails', name: 'persondetailsQuery',component: resolve => require(['@/pages/query-service/repay-ment/person-query-details'], resolve)},
              ]
            },
          ]
        }
        //业务查询end

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
