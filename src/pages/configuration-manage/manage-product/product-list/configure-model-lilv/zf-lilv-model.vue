<template>
  <div id="zf-lilv-model">
    <div class="form-top-actions">
      <i-button @click="addModal" type="info"><i class="iconfont icon-xinzeng"></i> 新增</i-button>
    </div>
    <i-table :loading="dataLoading" border ref="zfTable" :columns="columns1" :data="data1"></i-table>
    <br>
    <br>
    <bs-model :title="isAdd ? '新增' : '修改'" v-model="showAddModal">
      <i-form ref="rateForm" :model="rateForm" label-position="right" :label-width="100" style="padding-bottom:0;">
        <i-form-item
          label="资方"
          prop="fund">
          <input type="hidden" v-model="rateForm.fund"/>
          <i-input v-model="rateForm.fund" :readonly="true" placeholder="选择资方">
            <i-button @click="showSelectCapital=!showSelectCapital" slot="append">选择资方 <Icon type="ios-more"></Icon></i-button>
          </i-input>
        </i-form-item>
        <i-form-item label="名义利率" prop="nominalRate">
          <i-input placeholder="名义利率" v-model="rateForm.nominalRate">
            <span slot="append">%/年</span>
          </i-input>
        </i-form-item>
        <i-form-item label="实际利率" prop="realRate">
          <i-input placeholder="实际利率" v-model="rateForm.realRate">
            <span slot="append">%/年</span>
          </i-input>
        </i-form-item>
        <i-form-item class="text-right">
          <i-button type="primary" @click="formSubmit" :loading="btnLoading">
            <span v-if="!btnLoading">提交</span>
            <span v-else>loading...</span>
          </i-button>
          <i-button type="ghost" style="margin-left: 8px" @click="formCancel">取消</i-button>
        </i-form-item>
      </i-form>
    </bs-model>
    <!--选择资方的弹窗-->
    <bs-modal title="选择资方" :width="1200" v-model="showSelectCapital">
      <table-invest-list type="modal" v-if="showSelectCapital" ref="tableInvestList" @on-row-dbclick="selectCapital"></table-invest-list>
    </bs-modal>
  </div>
</template>

<script>
  import BSModal from '@/components/bs-modal';
  import MixinData from './zf-lilv-model-Mixin-data';
  import TableInvestList from '@/components/table-invest-list'; // 选择资方
  export default {
    name: 'zfLilvModel',
    components: {
      'bs-model': BSModal,
      TableInvestList
    },
    props: {
      zfMsg: Object
    },
    mixins: [MixinData],
    data() {
      return {
        isAdd: true,
        btnLoading: false,
        dataLoading: false,
        showAddModal: false,
        showSelectCapital: false,
        rateForm: {
          fund: '', // 出资方
          capitalNo: '',
          nominalRate: '', // 名义利率
          realRate: '' // 实际利率
        }
      };
    },
    mounted() {
      this.getPrivateCustomerList();
    },
    methods: {
      // 选择资方
      selectCapital(row, index) {
        this.$data.rateForm.capitalNo = row.capitalNo;
        this.$data.rateForm.fund = row.capitalName;
        this.$data.showSelectCapital = false;
      },
      // 查询列表数据
      async getPrivateCustomerList() {
        this.$data.dataLoading = true;
        let resp = await this.$http.get('/pms/productRate/fundRateList', {
          packageRateNo: this.zfMsg.packageRateNo
        });
        this.$data.dataLoading = false;
        if (resp.body.length !== 0) {
          this.$data.data1 = resp.body;
        } else {
          this.$Notice.warning({
            title: '没有数据可加载',
            duration: 2
          });
          this.$data.data1 = [];
        }
      },
      // 新增的保存请求方法
      async addSuBmit() {
        let resAdd = await this.$http.post('/pms/productRate/fundRateSave', {
          packageRateNo: this.zfMsg.packageRateNo,
          fund: this.$data.rateForm.fund, // 出资方
          nominalRate: this.$data.rateForm.nominalRate, // 名义利率
          realRate: this.$data.rateForm.realRate // 名义利率
        });
        this.$data.buttonLoading = false; // 关闭按钮的loading状态
        this.$data.showAddModal = false;
        if (resAdd.success) {
          this.$Message.success('新增成功');
          this.getPrivateCustomerList();
        }
      },
      addModal() {
        this.isAdd = true;
        this.$data.rateForm = {};
        this.$data.showAddModal = true;
      },
      setList(row) {
        this.isAdd = false;
        this.$data.showAddModal = true;
        this.rateForm = row;
      },
      // 修改情况下的提交数据
      async setSubmit() {
        let fundRateNo = this.rateForm.fundRateNo;
        let resModify = await this.$http.post('/pms/productRate/fundRateModify', {
          fundRateNo,
          packageRateNo: this.zfMsg.packageRateNo,
          fund: this.$data.rateForm.fund, // 出资方
          nominalRate: this.$data.rateForm.nominalRate, // 名义利率
          realRate: this.$data.rateForm.realRate // 名义利率
        });
        this.$data.showAddModal = false;
        this.$data.buttonLoading = false;
        if (resModify.success) {
          this.$Message.success('修改成功');
          this.getPrivateCustomerList();
        }
      },
      // 删除数据的请求
      async remove(row) {
        Alertify.confirm('确定要删除吗？', async (ok) => {
          if (ok) {
            let fundRateNo = row.fundRateNo;
            const loadingMsg = this.$Message.loading('删除中...', 0);
            let respDel = await this.$http.post('/pms/productRate/fundRateRemove', {
              fundRateNo
            });
            if (respDel.success) {
              loadingMsg();
              this.$Message.success('删除成功');
              this.getPrivateCustomerList();
            }
          }
        });
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
      formCancel() {
        this.$data.showAddModal = false;
        this.$data.rateForm = {};
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
