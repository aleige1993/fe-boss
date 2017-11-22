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
    <pt-modal title="选择客户配偶" v-model="addModal" :width="1000">
      <table-customer-list type="modal" @on-row-dbclick="selectSpouseRow"></table-customer-list>
    </pt-modal>
  </div>
</template>
<script>
  import PTModal from '@/components/bs-modal';
  import MixinData from './mixin-data';
  import TableCustomerList from '@/components/table-customer-list';
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
      'pt-modal': PTModal,
      TableCustomerList
    },
    methods: {
      gotoAddCustomer() {
        this.$router.go(0);
      },
      selectSpouseRow(row, index) {
        alert(index);
        // console.log(row);
      }
    }
  };
</script>
<style lang="scss">

</style>
