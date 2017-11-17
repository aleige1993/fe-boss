<template>
  <div>
    <div class="form-top-actions" style="padding-top: 0">
      <i-button type="success" @click="addModal=!addModal">从客户中选择</i-button>
      <i-button type="primary" @click="gotoAddCustomer">去添加配偶为客户</i-button>
    </div>
    <i-table :loading="false" :columns="spouseColumns" :data="spouseDatas"></i-table>
    <!--添加联系人模态框-->
    <pt-modal :title="addContactModalTitle" v-model="addBankModal" width="1000">
      <i-table border ref="selection" :columns="columns4" :data="data1"></i-table>
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
    components: {
      'pt-modal': PTModal
    },
    methods: {
      gotoAddCustomer() {
        this.$router.go(0);
      }
    }
  };
</script>
<style lang="scss">

</style>
