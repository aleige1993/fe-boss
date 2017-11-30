<template>
  <!--资方合同模板配置-->
  <div id="contract-configuration">
    <div class="form-top-actions">
      <i-button @click="addModal" type="info"><i class="iconfont icon-xinzeng"></i> 新增</i-button>
    </div>
    <i-table border ref="ContractTable" :columns="columns1" :data="data1"></i-table>
    <br>
    <br>
    <!--/////////////////////////////////////////////////////////////////////////////////////-->
    <bs-modal :title="'新增'" v-model="ShowModal" :width="600">
      <i-form ref="dataForm" :model="dataForm" label-position="right" :label-width="120">
        <!--产品名称-->
        <i-form-item prop="proName" label="产品名称">
          <i-input type="text" placeholder="" v-model="dataForm.proName" readonly></i-input>
        </i-form-item>
        <!--资方名称-->
        <i-form-item prop="zfName" label="资方名称">
          <i-input type="text" placeholder="" v-model="dataForm.zfName" readonly></i-input>
        </i-form-item>
        <!--合同模板-->
        <i-form-item prop="contract" label="合同模板">
          <Select v-model="dataForm.contract">
            <Option value="1">合同模板01</Option>
            <Option value="2">合同模板02</Option>
            <Option value="3">合同模板03</Option>
          </Select>
        </i-form-item>
        <!--合同模板-->
        <i-form-item prop="signMode" label="签订方式">
          <Select v-model="dataForm.signMode">
            <Option value="1">线上</Option>
            <Option value="2">线下</Option>
          </Select>
        </i-form-item>
        <i-form-item class="text-right">
          <i-button type="primary" @click="formSubmit" :loading="btnLoading">
            <span v-if="!btnLoading">提交</span>
            <span v-else>loading...</span>
          </i-button>
          <i-button type="ghost" style="margin-left: 8px" @click="formCancel">取消</i-button>
        </i-form-item>
      </i-form>
    </bs-modal>
  </div>
</template>

<script>
  import MixinData from './mixin-data';
  import BSModal from '@/components/bs-modal';
  export default {
    name: 'contractConfiguration',
    mixins: [MixinData],
    components: {
      'bs-modal': BSModal
    },
    data() {
      return {
        ShowModal: false,
        buttonLoading: false, //
        btnLoading: false,
        dataLoading: false,
        dataForm: {}
      };
    },
    methods: {
      // 打开弹窗
      addModal() {
        this.$data.ShowModal = true;
      },
      formSubmit() {
      },
      formCancel() {
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
