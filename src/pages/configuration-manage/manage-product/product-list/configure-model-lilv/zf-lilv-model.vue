<template>
  <div id="zf-lilv-model">
    <div class="form-top-actions">
      <i-button @click="addModal" type="info"><i class="iconfont icon-xinzeng"></i> 新增</i-button>
    </div>
    <i-table border ref="zfTable" :columns="columns1" :data="data1"></i-table>
    <br>
    <br>
    <bs-model :title="isAdd ? '新增' : '修改'" v-model="showAddModal">
      <i-form ref="rateForm" :model="rateForm" label-position="right" :label-width="100" style="padding-bottom:0;">
        <i-form-item label="资方" prop="capital">
          <i-select v-model="rateForm.capital" placeholder="请选择">
            <i-option value="1">海尔云贷</i-option>
            <i-option value="2">海乐行</i-option>
          </i-select>
        </i-form-item>
        <i-form-item label="名义利率" prop="nominal">
          <i-input placeholder="名义利率" v-model="rateForm.nominal">
            <span slot="append">%/年</span>
          </i-input>
        </i-form-item>

        <i-form-item label="实际利率" prop="actual">
          <i-input placeholder="实际利率" v-model="rateForm.actual">
            <span slot="append">%/年</span>
          </i-input>
        </i-form-item>
        <i-form-item class="text-right">
          <i-button type="primary" @click="formInSubmit">提交</i-button>
          <i-button type="ghost" style="margin-left: 8px" @click="formInCancel">取消</i-button>
        </i-form-item>
      </i-form>
    </bs-model>
  </div>
</template>

<script>
  import BSModal from '@/components/bs-modal';
  import MixinData from './zf-lilv-model-Mixin-data';
  export default {
    name: 'zf-lilv-model',
    components: {
      'bs-model': BSModal
    },
    mixins: [MixinData],
    data() {
      return {
        isAdd: true,
        showAddModal: false,
        rateForm: {
          capital: '',  // 资方
          nominal: '',  // 名义利率
          actual: ''  // 实际利率
        }
      };
    },
    methods: {
      addModal() {
        this.isAdd = true;
        this.showBtn = false;
        this.showAddModal = true;
        this.$data.rateForm = {};
        this.$data.rateForm.capital = '';
        this.$data.rateForm.nominal = '';
        this.$data.rateForm.actual = '';
        this.$data.rateForm = true;
      },
      formInSubmit() {},
      formInCancel() {}
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
