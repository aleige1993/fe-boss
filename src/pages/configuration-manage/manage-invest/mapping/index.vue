<template>
<!--资方映射配置-->
  <div id="invest-mapping">
    <i-breadcrumb separator="&gt;">
      <i-breadcrumb-item href="/">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/conf">配置管理</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/conf/invest">资方管理</i-breadcrumb-item>
      <i-breadcrumb-item>资方映射配置</i-breadcrumb-item>
    </i-breadcrumb>
    <div class="form-block-title">查询条件</div>
    <div class="search-form-container">
      <i-form inline label-position="left" ref="formSearch" :model="formSearch">
        <i-form-item prop="capitalName" label="资方名称" :label-width="80">
          <i-input type="text" placeholder="资方名称" v-model="formSearch.capitalName"></i-input>
        </i-form-item>
        <i-form-item>
          <i-button type="primary" @click="search">
            <i-icon type="ios-search-strong"></i-icon>
            搜索
          </i-button>
        </i-form-item>
      </i-form>
    </div>
    <div class="form-top-actions">
      <i-button @click="addModal" type="info"><i class="iconfont icon-xinzeng"></i> 新增</i-button>
    </div>
    <i-table :loading="dataLoading" border ref="zfycTable" :columns="columns1" :data="data1"></i-table>
    <div class="page-container">
      <i-page :page-size="pageSize" :current="currentPage" :total="total" size="small" show-elevator show-total @on-change="junmpPage">
      </i-page>
    </div>
    <bs-modal :title="'资方映射配置'" v-model="ShowModel" :width="600">
      <i-form v-if="ShowModel" ref="formMapping" :model="formMapping" label-position="right" :label-width="150">
        <i-form-item
          label="产品"
          :rules="{required: true, message: '产品不能为空', trigger: 'blur'}"
          prop="capitalName">
          <input type="hidden" v-model="formMapping.productName"/>
          <i-input v-model="formMapping.productName" :disabled="true" placeholder="选择产品">
            <i-button @click="showSelectProduct=!showSelectProduct" slot="append">选择产品 <Icon type="ios-more"></Icon></i-button>
          </i-input>
        </i-form-item>
        <i-form-item
          label="资方"
          :rules="{required: true, message: '资方不能为空', trigger: 'blur'}"
          prop="capitalName">
          <input type="hidden" v-model="formMapping.capitalName"/>
          <i-input v-model="formMapping.capitalName" :disabled="true" placeholder="选择资方">
            <i-button @click="showSelectCapital=!showSelectCapital" slot="append">选择资方 <Icon type="ios-more"></Icon></i-button>
          </i-input>
        </i-form-item>
        <i-form-item
          label="资方产品编号"
          prop="capitalProductNo">
          <i-input v-model="formMapping.capitalProductNo"></i-input>
        </i-form-item>
        <i-form-item label="渠道编号" prop="channelNo">
          <i-input v-model="formMapping.channelNo"></i-input>
        </i-form-item>
        <!--<i-form-item
          label="客户经理编号"
          prop="custMgrName">
          <input type="hidden" v-model="formMapping.custMgrNo"/>
          <i-input v-model="formMapping.custMgrNo" :readonly="true" placeholder="选择客户经理编号">
            <i-button @click="showSelectEmployer=!showSelectEmployer" slot="append">客户经理编号 <Icon type="ios-more"></Icon></i-button>
          </i-input>
        </i-form-item>-->
        <i-form-item label="客户经理编号" prop="custMgrNo">
          <i-input v-model="formMapping.custMgrNo"></i-input>
        </i-form-item>
        <i-form-item
          :rules="{required: true, message: '贴息方式不能为空', trigger: 'change'}"
          label="贴息方式"
          prop="subsidyType">
          <i-select v-model="formMapping.subsidyType">
            <i-option v-for="item in enumSelectData.get('SubsidyTypeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
          </i-select>
        </i-form-item>
        <i-form-item
          :rules="{required: true, message: '是否查询人行征信不能为空', trigger: 'change'}"
          label="是否查询人行征信"
          prop="ynCreditQuery">
          <i-select v-model="formMapping.ynCreditQuery">
            <i-option v-for="item in enumSelectData.get('YesNoEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
          </i-select>
        </i-form-item>
        <i-form-item class="text-right">
          <i-button type="primary" @click="formSubmit" :loading="buttonLoading">
            <span v-if="!buttonLoading">提交</span>
            <span v-else>Loading...</span>
          </i-button>
          <i-button type="ghost" style="margin-left: 8px" @click="addformCancel">取消</i-button>
        </i-form-item>
      </i-form>
    </bs-modal>
    <bs-modal :title="'资方合同模板配置'" v-model="ContractModel" :width="1200">
      <modal-contract v-if="ContractModel" :getRowData="clickRow"></modal-contract>
    </bs-modal>
    <!-- 选择客户经理的弹窗 -->
    <!--<bs-modal title="选择客户经理" :width="1200" v-model="showSelectEmployer">
      <table-employer-list @on-row-dbclick="selectEmployer"></table-employer-list>
    </bs-modal>-->
    <!--选择产品的弹窗-->
    <bs-modal title="选择产品" :width="1200" v-model="showSelectProduct">
      <table-product-list :type="'modal'" @on-row-dbclick="selectProduct"></table-product-list>
    </bs-modal>
    <!--选择资方的弹窗-->
    <bs-modal title="选择资方" :width="1200" v-model="showSelectCapital">
      <table-capital-list type="modal" v-if="showSelectCapital" @on-row-dbclick="selectCapital"></table-capital-list>
    </bs-modal>
  </div>
</template>

<script>
  import MixinData from './mixin-data';
  import BSModal from '@/components/bs-modal';
  import ContractConf from './contract-configuration';
  // import TableEmployerList from '@/components/table-employer-list'; // 选择客户经理
  import GetProductModal from '@/pages/configuration-manage/manage-product/product-list'; // 选择产品
  import GetCapitalModal from '@/pages/configuration-manage/manage-invest/maintain'; // 选择资方
  export default {
    name: 'investMapping',
    mixins: [MixinData],
    components: {
      'bs-modal': BSModal,
      'modal-contract': ContractConf,
      // 'table-employer-list': TableEmployerList,
      'table-product-list': GetProductModal,
      'table-capital-list': GetCapitalModal
    },
    data() {
      return {
        isAdd: true,
        dataLoading: false,
        buttonLoading: false,
        ShowModel: false,         // 新增和修改弹窗
        ContractModel: false,      // 资方合同模板配置弹窗
        showSelectEmployer: false,      // 选择客户经理的弹窗
        showSelectProduct: false,      // 选择产品的弹窗
        showSelectCapital: false,      // 选择资方的弹窗
        currentPage: 1,
        total: 0,
        pageSize: 10,
        formSearch: {
          capitalName: '',
          currentPage: 1,
          pageSize: 15
        },
        formMapping: {
          productNo: '', // 产品编号
          productName: '', // 产品名称
          capitalNo: '', // 资方编号
          capitalName: '', // 资方名称
          capitalProductNo: '', // 资方产品编号
          channelNo: '', // 渠道编号
          custMgrNo: '', // 客户经理编号
          custMgrName: '', // 客户经理名称
          subsidyType: '',  // 贴息方式(1-全贴,2-全不贴)
          ynCreditQuery: ''  // 是否查询人行征信
        },
        clickRow: {}     // 资方合同模板配置已选的数据
      };
    },
    mounted() {
      this.getPrivateCustomerList();
    },
    methods: {
      search() {
        this.getPrivateCustomerList(1);
      },
      junmpPage(page) {
        this.getPrivateCustomerList(page);
      },
      // 查询列表数据
      async getPrivateCustomerList(page) {
        this.$data.dataLoading = true;
        if (page) {
          this.$data.formSearch.currentPage = page;
          this.$data.currentPage = page;
        }
        let resp = await this.$http.post('/pms/capital/listCapitalMapcfg', {
          currentPage: this.$data.currentPage,
          pageSize: this.$data.pageSize,
          capitalName: this.$data.formSearch.capitalName
        });
        this.$data.dataLoading = false;
        if (resp.body.resultList.length !== 0) {
          this.$data.data1 = resp.body.resultList;
          this.$data.currentPage = resp.body.currentPage;
          this.$data.total = resp.body.totalNum;
        } else {
          this.$Notice.warning({
            title: '没有数据可加载',
            duration: 2
          });
          this.$data.data1 = [];
        }
      },
      // 新增按钮的弹窗
      addModal() {
        this.isAdd = true;
        this.$data.ShowModel = true;
        this.$data.formMapping = {};
        this.$data.formMapping.productName = '';
        this.$data.formMapping.capitalName = '';
        this.$data.formMapping.custMgrNo = '';
      },
      // 修改
      setList(row) {
        this.isAdd = false;
        this.$data.ShowModel = true;
        this.formMapping = row;
      },
      // 新增的保存请求方法
      async addSetSuBmit(tit) {
        this.$data.buttonLoading = true;
        let resAdd = await this.$http.post('/pms/capital/saveCapitalMapcfg', this.$data.formMapping);
        this.$data.ShowModel = false;
        this.$data.buttonLoading = false; // 关闭按钮的loading状态
        if (resAdd.success) {
          this.$Message.success(tit);
          this.getPrivateCustomerList();
        }
      },
      // 新增模态框的保存按钮点击事件
      formSubmit() {
        let formName = 'formMapping';
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 如果是新增
            let tit = this.isAdd ? '新增成功' : '修改成功';
            this.addSetSuBmit(tit);
          } else {
            this.$Message.error('<span style="color: red">*</span>项不能为空');
          }
        });
      },
      // 删除数据的请求
      async remove(row) {
        Alertify.confirm('确定要删除吗？', async (ok) => {
          if (ok) {
            const loadingMsg = this.$Message.loading('删除中...', 0);
            let respDel = await this.$http.get('/pms/capital/deleteCapitalMapcfg', {
              productNo: row.productNo,
              capitalNo: row.capitalNo
            });
            if (respDel.success) {
              loadingMsg();
              this.$Message.success('删除成功');
              let goCurrentPage = this.$data.currentPage;
              if (
                this.$data.total % this.$data.pageSize === 1 &&
                this.$data.currentPage !== 1 &&
                (this.$data.total - 1) / this.$data.pageSize !== this.$data.currentPage
              ) {
                goCurrentPage = this.$data.currentPage - 1;
              }
              this.getPrivateCustomerList(goCurrentPage);
            }
          }
        });
      },
      // 新增里的 取消按钮
      addformCancel() {
        this.$data.ShowModel = false;
      },
      // 打开合同模板配置弹窗
      contractModelOpen(row) {
        this.$data.clickRow = row;
        this.$data.ContractModel = true;
      },
      // 选择客户经理
      /* selectEmployer(row, index) {
        this.$data.formMapping.custMgrNo = row.userCode;
        this.$data.formMapping.custMgrName = row.userName;
        this.$data.showSelectEmployer = false;
      },*/
      // 选择产品
      selectProduct(row, index) {
        this.$data.formMapping.productNo = row.productNo;
        this.$data.formMapping.productName = row.productName;
        this.$data.showSelectProduct = false;
      },
      // 选择资方
      selectCapital(row, index) {
        this.$data.formMapping.capitalNo = row.capitalNo;
        this.$data.formMapping.capitalName = row.capitalName;
        this.$data.showSelectCapital = false;
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
#invest-mapping {
  & .row-inline {
    &>.ivu-col {
      & span {
        width: 100%;
        display: inline-block;
        line-height: 34px;
        text-align: center;
        font-size: 18px;
      }
    }
  }
}
</style>
