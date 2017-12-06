<template>
<!--合同模板配置-->
  <div id="configure-model-contract">
    <div class="form-top-actions">
      <i-button @click="addModal" type="info"><i class="iconfont icon-xinzeng"></i> 新增</i-button>
    </div>
    <i-table border ref="zfTable" :columns="columns1" :data="data1"></i-table>
    <br>
    <br>
    <bs-modal :title="'新增'" v-model="showAddModal">
      <i-form ref="formCustom" :model="formCustom" label-position="right" :label-width="100" style="padding-bottom:0;">
        <i-form-item label="产品名称" prop="productName">
          <p>{{formCustom.productName}}</p>
        </i-form-item>
        <!--合同模板-->
        <i-form-item
          label="合同模板"
          prop="contractTemplateName">
          <input type="hidden" v-model="formCustom.contractTemplateName"/>
          <i-input v-model="formCustom.contractTemplateName" :disabled="true" placeholder="选择合同模板">
            <i-button @click="showSelectContractTemplate=!showSelectContractTemplate" slot="append">选择合同模板 <Icon type="ios-more"></Icon></i-button>
          </i-input>
        </i-form-item>
        <i-form-item label="签订方式" prop="signType">
          <i-select v-model="formCustom.signType">
            <i-option v-for="item in enumSelectData.get('SinTypeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
          </i-select>
        </i-form-item>
        <i-form-item label="适用类型" prop="applicableType">
          <i-select v-model="formCustom.applicableType">
            <i-option value="1">云易行</i-option>
            <i-option value="2">海乐行</i-option>
          </i-select>
        </i-form-item>
        <i-form-item class="text-right">
          <i-button type="primary" @click="addSuBmit" :loading="buttonLoading">
            <span v-if="!buttonLoading">提交</span>
            <span v-else>loading...</span>
          </i-button>
          <i-button type="ghost" style="margin-left: 8px" @click="formCancel">取消</i-button>
        </i-form-item>
      </i-form>
    </bs-modal>
    <!--选择合同模板的弹窗-->
    <bs-modal title="选择合同模板" :width="1200" v-model="showSelectContractTemplate">
      <table-contracttemplate-list @on-row-dbclick="selectContractTemplate"></table-contracttemplate-list>
    </bs-modal>
  </div>
</template>

<script>
  import BSModal from '@/components/bs-modal';
  import GetContractTemplateModal from '@/components/table-contract-template-list'; // 选择合同模板
  export default {
    name: 'configureModelContract',
    components: {
      'bs-modal': BSModal,
      'table-contracttemplate-list': GetContractTemplateModal
    },
    props: {
      childMsg: Object
    },
    data() {
      return {
        showAddModal: false,
        buttonLoading: false,
        showSelectContractTemplate: false,
        formCustom: {
          productNo: '',
          productName: '',
          contractTemplateName: '',
          contractTemplateNo: '',
          signType: '',
          applicableType: ''
        },
        columns1: [
          {
            title: '模板ID',
            width: 200,
            key: 'contractTemplateNo'
          },
          {
            title: '合同名称',
            key: 'contractTemplateName'
          },
          {
            title: '适用类型',
            key: 'applicableType'
          },
          {
            title: '签订方式',
            key: 'signType',
            render: (h, params) => {
              return h('span', {}, this.enumCode2Name(params.row.signType, 'SinTypeEnum'));
            }
          },
          {
            title: '操作',
            key: 'action',
            width: 150,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.remove($.extend({}, params.row));
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ],
        data1: []
      };
    },
    mounted() {
      this.$data.formCustom.productName = this.childMsg.productName;
      this.getPrivateCustomerList();
    },
    methods: {
      // 查询列表数据
      async getPrivateCustomerList() {
        this.$data.formCustom.dataLoading = true;
        let resp = await this.$http.post('/pms/capital/listContractTemplateCfg', {
          productNo: this.childMsg.productNo
        });
        this.$data.dataLoading = false;
        if (resp.body.resultList.length !== 0) {
          this.$data.data1 = resp.body.resultList;
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
        this.$data.buttonLoading = true;
        let resAdd = await this.$http.post('/pms/capital/saveContractTemplateCfg', {
          productNo: this.childMsg.productNo,
          productName: this.childMsg.productName,
          contractTemplateNo: this.$data.formCustom.contractTemplateNo,
          contractTemplateName: this.$data.formCustom.contractTemplateName,
          signType: this.$data.formCustom.signType,
          applicableType: this.$data.formCustom.applicableType
        });
        this.$data.buttonLoading = false; // 关闭按钮的loading状态
        this.$data.showAddModal = false;
        if (resAdd.success) {
          this.$Message.success('新增成功');
          this.getPrivateCustomerList();
        }
      },
      addModal() {
        this.$data.showAddModal = true;
        this.$data.formCustom = {};
        this.$data.formCustom.productName = this.childMsg.productName;
      },
      // 删除数据的请求
      async remove(row) {
        Alertify.confirm('确定要删除吗？', async (ok) => {
          if (ok) {
            const loadingMsg = this.$Message.loading('删除中...', 0);
            let respDel = await this.$http.post('/pms/capital/deleteContractTemplateCfg', {
              productNo: row.productNo,
              contractTemplateNo: row.contractTemplateNo
            });
            if (respDel.success) {
              loadingMsg();
              this.$Message.success('删除成功');
              this.getPrivateCustomerList();
            }
          }
        });
      },
      formCancel() {
        this.$data.showAddModal = false;
      },
      // 选择合同模板
      selectContractTemplate(row, index) {
        this.$data.formCustom.contractTemplateNo = row.contractTemplateNo;
        this.$data.formCustom.contractTemplateName = row.contractTemplateName;
        this.$data.showSelectContractTemplate = false;
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
