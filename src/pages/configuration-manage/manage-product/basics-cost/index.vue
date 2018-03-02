<template>
<!--费用类型配置-->
  <div id="page-cost">
    <i-breadcrumb separator="&gt;">
      <i-breadcrumb-item href="/">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/conf/toLeftNav">配置管理</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/conf/product">产品配置</i-breadcrumb-item>
      <i-breadcrumb-item>费用类型配置</i-breadcrumb-item>
    </i-breadcrumb>
    <div class="form-top-actions">
      <i-button @click="addModal" type="info"><i class="iconfont icon-xinzeng"></i>&nbsp;新增</i-button>
    </div>
    <i-table :loading="dataLoading" border ref="selection" :columns="columns1" :data="data1"></i-table>
    <div class="page-container">
      <i-page :current="currentPage" :total="total" size="small" show-elevator show-total @on-change="jumpPage" :page-size="pageSize"></i-page>
    </div>
    <pt-modal :title="isAdd ? '新增' : '修改'" v-model="showAddModal">
      <i-form  ref="formCustom" :model="formCustom" label-position="left" :label-width="100">
        <i-form-item label="费用类型名称" prop="feeTypeName">
          <i-input placeholder="请输入费用类型名称" v-model="formCustom.feeTypeName"></i-input>
        </i-form-item>
        <i-form-item label="费用类型代码" prop="feeTypeCode">
          <i-input placeholder="请输入费用类型代码" v-model="formCustom.feeTypeCode"></i-input>
        </i-form-item>
        <!--<i-form-item label="收支方向" prop="feeType">
          <i-select v-model="formCustom.feeType">
            <i-option v-for="item in enumSelectData.get('FeeTypeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
          </i-select>
        </i-form-item>-->
        <i-form-item class="text-right">
          <i-button type="primary" @click="formSubmit" :loading="buttonLoading">
            <span v-if="!buttonLoading">提交</span>
            <span v-else>Loading...</span>
          </i-button>
          <i-button type="ghost" @click="handleCancel" style="margin-left: 8px">取消</i-button>
        </i-form-item>
      </i-form>
    </pt-modal>
  </div>
</template>

<script>
  import PTModal from '@/components/bs-modal';
  import MixinData from './mixin-data';
  export default {
    name: 'basics-cost',
    components: {
      'pt-modal': PTModal
    },
    mixins: [MixinData],
    data() {
      return {
        isAdd: true,
        dataLoading: false,
        buttonLoading: false,
        showAddModal: false,
        currentPage: 1,
        total: 0,
        pageSize: 15,
        formCustom: {
          feeTypeName: '',
          feeTypeCode: '',
          feeType: ''
        }
      };
    },
    mounted() {
      this.getPrivateCustomerList();
    },
    methods: {
      // 查询列表数据
      async getPrivateCustomerList(page) {
        this.$data.dataLoading = true;
        if (page) {
          this.$data.currentPage = page;
        }
        let resp = await this.$http.get('/pms/cfgFeeType/list', {
          currentPage: this.$data.currentPage,
          pageSize: this.$data.pageSize
        });
        this.$data.dataLoading = false;
        if (resp.success) {
          this.$data.data1 = resp.body.resultList;
          this.$data.currentPage = resp.body.currentPage / 1;
          this.$data.total = resp.body.totalNum / 1;
        } else {
          this.$data.data1 = [];
        }
      },
      // 新增的保存请求方法
      async addSuBmit() {
        let resAdd = await this.$http.post('/pms/cfgFeeType/save', {
          feeTypeName: this.$data.formCustom.feeTypeName,
          feeTypeCode: this.$data.formCustom.feeTypeCode
        });
        this.$data.buttonLoading = false; // 关闭按钮的loading状态
        this.$data.showAddModal = false;
        if (resAdd.success) {
          this.$Message.success('添加费用类型成功');
          this.getPrivateCustomerList();
        }
      },
      jumpPage(page) {
        this.getPrivateCustomerList(page);
      },
      addModal() {
        this.isAdd = true;
        this.$data.formCustom = {};
        this.$data.showAddModal = true;
      },
      // 删除数据的请求
      async remove(row) {
        Alertify.confirm('确定要删除吗？', async (ok) => {
          if (ok) {
            let feeTypeNo = row.feeTypeNo;
            const loadingMsg = this.$Message.loading('删除中...', 0);
            let respDel = await this.$http.get('/pms/cfgFeeType/remove', {
              feeTypeNo
            });
            loadingMsg();
            if (respDel.success) {
              this.$Message.success('删除费用类型成功');
              this.getPrivateCustomerList(
                this.$JumpPage.getPageRemove(this.$data.currentPage, this.$data.pageSize, this.$data.total)
              );
            }
          }
        });
      },
      setList(row) {
        this.isAdd = false;
        this.$data.showAddModal = true;
        this.formCustom = row;
      },
      // 修改情况下的提交数据
      async setSubmit() {
        let resModify = await this.$http.post('/pms/cfgFeeType/modify', {
          feeTypeName: this.$data.formCustom.feeTypeName,
          feeTypeCode: this.$data.formCustom.feeTypeCode,
          feeTypeNo: this.$data.formCustom.feeTypeNo
        });
        this.$data.showAddModal = false;
        this.$data.buttonLoading = false;
        if (resModify.success) {
          this.$Message.success('修改费用类型成功');
          let jumpPage = this.$JumpPage.getPageRemove(this.$data.currentPage, this.$data.pageSize, this.$data.total);
          this.getPrivateCustomerList(jumpPage);
        }
      },
      // 新增模态框的保存按钮点击事件
      formSubmit() {
        this.$data.buttonLoading = true;
        // 如果是新增
        if (this.isAdd) {
          this.addSuBmit();
        } else {
          this.setSubmit();
        }
      },
      handleCancel() {
        this.$data.showAddModal = false;
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  #page-cost {
    & .bs-form-block .block-body {
      border: 0;
    }
    & .form-top-actions {
      font-size: 0;
      padding-left: 10px;
      & button {
        margin-right: 10px;
      }
    }
  }
</style>
