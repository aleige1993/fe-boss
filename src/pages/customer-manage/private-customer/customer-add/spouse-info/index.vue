<template>
  <div>
    <div class="form-top-actions" style="padding-top: 0">
      <div v-if="!isFromDetail">
        <i-button type="success" @click="addModal=!addModal">添加</i-button>
        <i-button type="primary" @click="gotoAddCustomer">维护配偶信息</i-button>
      </div>
    </div>
    <i-table :loading="false" :columns="spouseColumns" :data="spouseDatas"></i-table>
    <!--添加联系人模态框-->
    <pt-modal title="选择客户配偶" v-model="addModal" width="1000">
      <div class="search-form-container">
        <i-form inline>
          <i-form-item prop="user">
            <i-input type="text" placeholder="客户姓名"></i-input>
          </i-form-item>
          <i-form-item prop="password">
            <i-select placeholder="证件类型">
              <i-option>身份证</i-option>
            </i-select>
          </i-form-item>
          <i-form-item prop="password">
            <i-input type="password" placeholder="证件号码"></i-input>
          </i-form-item>
          <i-form-item prop="password">
            <i-input type="password" placeholder="手机号码"></i-input>
          </i-form-item>
          <i-form-item>
            <i-button type="primary"><i-icon type="ios-search-strong"></i-icon> 搜索</i-button>
          </i-form-item>
        </i-form>
      </div>
      <i-table @on-row-dblclick="selectRow"  border ref="selection" :columns="columns4" :data="data1"></i-table>
      <div class="page-container">
        <i-page :total="40" size="small" show-elevator show-sizer show-total></i-page>
      </div>
    </pt-modal>
  </div>
</template>
<script>
  import PTModal from '@/components/bs-modal';
  import MixinData from './mixin-data';
  export default {
    name: '',
    mixins: [MixinData],
    data() {
      return {
        addModal: false
      };
    },
    props: ['isFromDetail'],
    components: {
      'pt-modal': PTModal
    },
    methods: {
      gotoAddCustomer() {
        this.$router.go(0);
      },
      selectRow(row, index) {
        alert(index);
        // console.log(row);
      }
    }
  };
</script>
<style lang="scss">

</style>
