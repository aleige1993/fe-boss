<template>
  <!--套餐配置-->
<div id="conf-model-package">
  <div class="form-top-actions">
    <i-button @click="addModal" type="info"><i class="iconfont icon-xinzeng"></i> 新增</i-button>
  </div>
  <i-table :loading="dataLoading" border ref="PackageTable" :columns="columns1" :data="data1"></i-table>
  <br>
  <br>
  <pt-modal :title="isAdd?'新增':'修改'" v-model="showAdd" :width="1200" @on-close="noticeLilvFun">
    <conf-model-lilv @notice-lilv="noticeLilvFun" :isParentAdd="isAdd" :child-msg="clickRow" v-if="showAdd"></conf-model-lilv>
  </pt-modal>
</div>
</template>

<script>
  import ConfModelLilv from './configure-model-lilv'; // 利率方案
  import PTModal from '@/components/bs-modal';
  import MixinData from './mixin-data';
  export default {
    name: 'confmodelpackage',
    components: {
      ConfModelLilv,
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
        clickRow: {}
      };
    },
    mounted() {
      this.getPrivateCustomerList(); // 获取套餐数据列表
    },
    methods: {
      // 获取套餐数据列表
      async getPrivateCustomerList() {
        this.$data.dataLoading = true;
        let productNo = this.childMsg.productNo;
        let resp = await this.$http.get('/pms/productPackage/list', {
          productNo
        });
        this.$data.dataLoading = false;
        if (resp.success) {
          this.$data.data1 = resp.body;
        } else {
          this.$data.data1 = [];
        }
      },
      // 删除套餐
      async remove(row) {
        Alertify.confirm('确定要删除吗？', async (ok) => {
          if (ok) {
            const loadingMsg = this.$Message.loading('删除中...', 0);
            let respDel = await this.$http.get('/pms/productPackage/remove', {
              packageNo: row.packageNo
            });
            loadingMsg();
            if (respDel.success) {
              this.$Message.success('删除成功');
              this.getPrivateCustomerList();
            }
          }
        });
      },
      // 打开新增窗口
      addModal() {
        this.$data.isAdd = true;
        this.$data.showAdd = true;   // 打开利率方案
        this.$data.clickRow = {
          productNo: this.childMsg.productNo,
          productName: this.childMsg.productName
        };
      },
      // 点击修改按钮
      setList(row) {
        this.isAdd = false;
        this.$data.showAdd = true;
        this.$data.clickRow = row;
      },
      // 修改情况下的提交数据
      async setSubmit() {
        this.$data.buttonLoading = true;
        this.$data.showAdd = false;
        this.$data.buttonLoading = false;
      },
      // 利率配置弹窗传参
      noticeLilvFun() {
        this.$data.showAdd = false;
        this.getPrivateCustomerList(); // 获取套餐数据列表
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
