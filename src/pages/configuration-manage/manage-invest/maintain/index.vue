<template>
<!--资方维护-->
  <div id="invest-maintain">
    <i-breadcrumb separator="&gt;" v-if="!isModal">
      <i-breadcrumb-item href="/">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/conf">配置管理</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/conf/invest">资方管理</i-breadcrumb-item>
      <i-breadcrumb-item>资方维护</i-breadcrumb-item>
    </i-breadcrumb>
    <!--组件：资方维护列表table-invest-list-->
    <table-invest-list ref="tableInvestList" type="page" @on-row-dbclick="selectRow" @on-set-row="setListZf" @on-remove-row="removeZf" @on-show-userModal="showUser">
      <div class="form-top-actions" slot="topAction">
        <i-button @click="addModal" type="info"><i class="iconfont icon-xinzeng"></i> 新增</i-button>
      </div>
    </table-invest-list>
    <bs-modal :title="isAdd ? '新增' : '修改'" v-model="ShowModal" :width="1200" @on-close="closeModelAddSet">
      <modal-add-set v-if="ShowModal" @model-addSet="closeModelAddSet" :child-msg="clickRow"></modal-add-set>
    </bs-modal>
    <bs-modal :title="'账户信息'" v-model="showUserMoadl" :width="1200">
      <modal-user v-if="showUserMoadl" :userData="userClickRow"></modal-user>
    </bs-modal>
  </div>
</template>

<script>
  import BSModal from '@/components/bs-modal';
  import ModelUser from './maintain-user-modal'; // 用户信息模态框
  import ModalAddSet from './maintain-add-set-modal'; // 新增删除的模态框
  import TableInvestList from '@/components/table-invest-list'; // 资方列表的公共组件
  export default {
    name: 'manageInvestMaintain',
    components: {
      'modal-user': ModelUser,
      TableInvestList,
      'bs-modal': BSModal,
      'modal-add-set': ModalAddSet
    },
    data() {
      return {
        isAdd: true,
        isModal: false,
        showUserMoadl: false,
        ShowModal: false, // 是否是新增修改
        clickRow: {
          isAdd: true
        },
        userClickRow: {}
      };
    }, // end data
    mounted() {
      // this.getPrivateCustomerList();
    },
    methods: {
      // 删除
      // 资方维护列表的删除
      removeZf(row, jumpPage) {
        Alertify.confirm('确定要删除吗？', async (ok) => {
          if (ok) {
            let capitalNo = row.capitalNo;
            const loadingMsg = this.$Message.loading('删除中...', 0);
            let respDel = await this.$http.post('/pms/capital/accBaseInfoRemove', {
              capitalNo
            });
            loadingMsg();
            if (respDel.success) {
            }
            this.$Message.success('删除成功');
            this.$refs.tableInvestList.getPrivateCustomerList(jumpPage);
          }
        });
      },
      // 修改弹窗
      setListZf(row) {
        this.$data.isAdd = false;
        this.$data.clickRow = {
          isAdd: false,
          total: this.$data.total,
          currentPage: this.$data.currentPage,
          ...row
        };
        this.$data.ShowModal = true;
      },
      // 显示用户信息
      showUser(row) {
        this.$data.showUserMoadl = true;
        this.$data.userClickRow = row;
      },
      // 新增弹窗打开
      addModal() {
        this.$data.isAdd = true;
        this.$data.clickRow.isAdd = true;
        this.$data.ShowModal = true;
      },
      // 通过子组件通知，关闭新增修改弹窗
      closeModelAddSet() {
        this.$data.clickRow = {};
        this.$data.clickRow.isAdd = true;
        this.$data.ShowModal = false;
        let pages = this.$data.currentPage;
        this.$refs.tableInvestList.getPrivateCustomerList(pages);
      },
      // 双击时的回调 （此页面用不到此功能）
      selectRow(row, index) {
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  #invest-maintain {
  }
</style>
