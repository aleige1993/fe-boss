<template>
  <!--费用收取配置-->
<div id="conf-model-fee">
  <div class="form-top-actions">
    <i-button @click="addModal" type="info"><i class="iconfont icon-xinzeng"></i> 新增</i-button>
  </div>
  <i-table :loading="dataLoading" border ref="FyTable" :columns="columns1" :data="data1"></i-table>
  <br>
  <br>
  <div class="text-right">
    <i-button type="primary" @click="formInSubmit">确认</i-button>
    <i-button type="ghost" style="margin-left: 8px" @click="formCancel">取消</i-button>
  </div>
  <pt-modal title="新增" v-model="showAdd" :width="520">
    <i-form ref="formInModel" :model="formInModel" label-position="left" :label-width="100">
      <i-form-item
        :rules="{required: true, message: '费用类型不能为空', trigger: 'change'}"
        label="费用类型"
        prop="feeTypeNo">
        <i-select v-model="formInModel.feeTypeNo" placeholder="请选择" @on-change="feeTypeCodeChange">
          <i-option v-for="item in costTypeSelect" :key="item.feeTypeNo" :value="item.feeTypeNo">{{item.feeTypeName}}</i-option>
        </i-select>
      </i-form-item>
      <i-form-item
        :rules="{required: true, message: '费用类型代码不能为空', trigger: 'blur'}"
        label="费用类型代码"
        prop="feeTypeCode">
        <i-input :readonly="true" placeholder="费用类型代码" v-model="formInModel.feeTypeCode"></i-input>
      </i-form-item>
      <i-form-item
        :rules="{required: true, message: '计算方式不能为空', trigger: 'change'}"
        label="计算方式"
        prop="incomeType">
        <i-select transfer v-model="formInModel.incomeType" placeholder="请选择" @on-change="selpro">
          <i-option v-for="item in enumSelectData.get('ReceiveTypeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
        </i-select>
      </i-form-item>
      <i-form-item
        :rules="{required: true, message: '收支方向不能为空', trigger: 'change'}"
        label="收支方向"
        prop="feeType">
        <i-select v-model="formInModel.feeType" placeholder="请选择">
          <i-option v-for="item in enumSelectData.get('FeeTypeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
        </i-select>
      </i-form-item>
      <i-form-item
        :rules="{required: true, message: '利率标准不能为空', trigger: 'blur'}"
        label="利率标准"
        prop="ratio"
        v-if="formInModel.incomeType === '1'">
        <i-input placeholder="利率标准" v-model="formInModel.ratio">
          <span slot="append">%</span>
        </i-input>
      </i-form-item>
      <i-form-item
        :rules="{required: true, message: '固定金额不能为空', trigger: 'blur'}"
        label="固定金额"
        prop="fixedAmount"
        v-if="formInModel.incomeType === '2'">
        <i-input placeholder="固定金额" v-model="formInModel.fixedAmount">
          <span slot="append">元</span>
        </i-input>
      </i-form-item>
      <i-form-item class="text-right">
        <i-button type="primary" @click="formInSubmit" :loading="buttonLoading">
          <span v-if="!buttonLoading">提交</span>
          <span v-else>Loading...</span>
        </i-button>
        <i-button type="ghost" style="margin-left: 8px" @click="formInCancel">取消</i-button>
      </i-form-item>
    </i-form>
  </pt-modal>
</div>
</template>

<script>
  import PTModal from '@/components/bs-modal';
  import MixinData from './mixin-data';
  export default {
    name: 'confmodelfee',
    components: {
      'pt-modal': PTModal
    },
    props: {
      childMsg: Object
    },
    mixins: [MixinData],
    data() {
      return {
        isAdd: true,
        showAdd: false,
        dataLoading: false,
        buttonLoading: false,
        costTypeSelect: [], // 费用类型的下拉数据
        formInModel: {
          feeTypeNo: '',  // 费用类型编号
          feeTypeCode: '',  // 费用类型代码
          incomeType: '',  // 收取类型
          feeTypeName: '',  // 费用类型名称
          feeType: '',  // 收支方向
          productName: '',  // 产品名称
          fixedAmount: '',  // 固定金额
          productNo: '',  // 产品编号
          ratio: '',  // 标准比例
          productId: ''  // 产品ID
        }
      };
    },
    mounted() {
      this.getCostSelectData(); // 费用类型的下拉数据
      this.getPrivateCustomerList();  // 获取模态框列表数据
    },
    methods: {
      // 费用类型代码随费用类型变化
      feeTypeCodeChange(value) {
        this.$data.costTypeSelect.forEach((item) => {
          if (item.feeTypeNo === value) {
            this.$data.formInModel.feeTypeCode = item.feeTypeCode;
          }
        });
      },
      // 获取模态框列表数据
      async getPrivateCustomerList() {
        this.$data.dataLoading = true;
        let productNo = this.childMsg.productNo;
        let resp = await this.$http.get('/pms/productFeeDetail/queryByProductNo', {
          productNo
        });
        this.$data.dataLoading = false;
        if (resp.body.resultList.length !== 0) {
          this.$data.data1 = resp.body.resultList;
        } else {
          this.$data.data1 = [];
        }
      },
      // 获取 基础配置-费用类型配置的数据
      async getCostSelectData() {
        let SelectResp = await this.$http.get('/pms/cfgFeeType/list', {
          currentPage: 1,
          pageSize: 99999
        });
        if (SelectResp.body.resultList.length !== 0) {
          this.$data.costTypeSelect = SelectResp.body.resultList;
        } else {
          this.$Notice.warning({
            title: '基础配置-费用类型：无数据加载',
            duration: 2
          });
        }
      },
      getFeeTypeName() {
        let selectSize = this.$data.costTypeSelect.length;
        let feeTypeName = '';
        for (let i = 0; i < selectSize; i++) {
          if (this.$data.costTypeSelect[i].feeTypeNo === this.$data.formInModel.feeTypeNo) {
            feeTypeName = this.$data.costTypeSelect[i].feeTypeName;
          }
        }
        return feeTypeName;
      },
      // 新增的保存请求方法
      async addSuBmit() {
        this.$data.buttonLoading = true;
        let feeTypeName = this.getFeeTypeName();
        let resAdd = await this.$http.post('/pms/productFeeDetail/save', {
          feeTypeNo: this.$data.formInModel.feeTypeNo,  // 费用类型编号
          feeTypeCode: this.$data.formInModel.feeTypeCode,  // 费用类型代码
          incomeType: this.$data.formInModel.incomeType, // 收取类型
          feeTypeName,  // 费用类型名称
          feeType: this.$data.formInModel.feeType,  // 收支方向
          productName: this.childMsg.productName,  // 产品名称
          fixedAmount: this.$data.formInModel.fixedAmount,  // 固定金额
          productNo: this.childMsg.productNo,  // 产品编号
          ratio: this.$data.formInModel.ratio,  // 标准比例
          productId: this.childMsg.id // 产品ID
        });
        this.$data.buttonLoading = false; // 关闭按钮的loading状态
        this.$data.showAdd = false;
        if (resAdd.success) {
          this.$Message.success('添加费用类型成功');
          this.getPrivateCustomerList();
        }
      },
      addModal() {
        this.$data.isAdd = true;
        this.$data.showAdd = true;   // 增删的模态框
        this.$data.formInModel = {};
      },
      setList(row) {
        this.isAdd = false;
        this.$data.showAdd = true;
        this.formInModel = row;
      },
      // 修改情况下的提交数据
      async setSubmit() {
        this.$data.buttonLoading = true;
        let feeTypeName = this.getFeeTypeName();
        let resModify = await this.$http.post('/pms/productFeeDetail/modify', {
          feeTypeNo: this.$data.formInModel.feeTypeNo,  // 费用类型编号
          feeTypeCode: this.$data.formInModel.feeTypeCode,  // 费用类型代码
          incomeType: this.$data.formInModel.incomeType, // 收取类型
          feeTypeName,  // 费用类型名称
          feeType: this.$data.formInModel.feeType,  // 收支方向
          productName: this.childMsg.productName,  // 产品名称
          fixedAmount: this.$data.formInModel.fixedAmount,  // 固定金额
          productNo: this.childMsg.productNo,  // 产品编号
          ratio: this.$data.formInModel.ratio  // 标准比例
        });
        this.$data.showAdd = false;
        this.$data.buttonLoading = false;
        if (resModify.success) {
          this.$Message.success('修改费用类型成功');
          this.getPrivateCustomerList();
        }
      },
      // 删除数据的请求
      async remove(row) {
        Alertify.confirm('确定要删除吗？', async (ok) => {
          if (ok) {
            let feeTypeNo = row.feeTypeNo;
            const loadingMsg = this.$Message.loading('删除中...', 0);
            let respDel = await this.$http.post('/pms/productFeeDetail/remove', {
              feeTypeNo,
              productNo: this.childMsg.productNo  // 产品编号
            });
            loadingMsg();
            if (respDel.success) {
              this.$Message.success('删除费用类型成功');
              this.getPrivateCustomerList();
            }
          }
        });
      },
      // 新增模态框的保存按钮点击事件
      formInSubmit() {
        let formName = 'formInModel';
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 如果是新增
            if (this.isAdd) {
              this.addSuBmit();
            } else {
              this.setSubmit();
            }
          } else {
            this.$Message.error('"<span style="color: red">*</span>"必填项不能为空');
          }
        });
      },
      formCancel() {
        this.$emit('notice-cost');// 通知其父组件执行自定义事件“notice-cost”
      },
      formInCancel() {
        this.$data.showAdd = false;
      },
      // 在新增状态下 下拉菜单清空相应显示的输入框
      selpro() {
        if (this.$data.isAdd) {
          this.$data.formInModel.ratio = '';
          this.$data.formInModel.fixedAmount = '';
        }
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
