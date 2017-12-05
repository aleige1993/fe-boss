<template>
<!--资方维护-->
  <div id="invest-maintain">
    <i-breadcrumb separator="&gt;">
      <i-breadcrumb-item href="/">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/conf">配置管理</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/conf/invest">资方管理</i-breadcrumb-item>
      <i-breadcrumb-item>资方维护</i-breadcrumb-item>
    </i-breadcrumb>
    <div class="form-top-actions">
      <i-button @click="addModal" type="info"><i class="iconfont icon-xinzeng"></i> 新增</i-button>
    </div>

    <i-table :loading="dataLoading" border ref="proTable" :columns="columns1" :data="data1"></i-table>
    <div class="page-container">
      <i-page :page-size="pageSize" :current="currentPage" :total="total" size="small" show-elevator show-total @on-change="jumpPage">
      </i-page>
    </div>
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
  import MixinData from './mixin-data';
  import ModelUser from './maintain-user-modal'; // 用户信息模态框
  import ModalAddSet from './maintain-add-set-modal'; // 新增删除的模态框
  export default {
    name: 'manageInvestMaintain',
    mixins: [MixinData],
    components: {
      'bs-modal': BSModal,
      'modal-add-set': ModalAddSet,
      'modal-user': ModelUser
    },
    data() {
      return {
        isAdd: true,
        dataLoading: false,
        showUserMoadl: false,
        pageSize: 5,
        total: 0,
        currentPage: 1,
        ShowModal: false, // 是否是新增修改
        clickRow: {
          isAdd: true
        },
        userClickRow: {}
      };
    }, // end data
    mounted() {
      this.getPrivateCustomerList();
    },
    methods: {
      // 获取资方维护列表数据
      async getPrivateCustomerList(page) {
        this.$data.dataLoading = true;
        if (page) {
          this.$data.currentPage = page;
        }
        let resp = await this.$http.get('/pms/capital/accBaseInfoList', {
          currentPage: this.$data.currentPage,
          pageSize: this.$data.pageSize
        });
        this.$data.dataLoading = false;
        if (resp.body.resultList.length !== 0) {
          this.$data.data1 = resp.body.resultList;
          this.$data.currentPage = resp.body.currentPage;
          this.$data.total = resp.body.totalNum;
        } else {
          this.$Notice.warning({
            title: '没有数据可加载',
            duration: 2
          });
          this.$data.data1 = [];
        }
      },
      // 分页跳转
      jumpPage(page) {
        this.getPrivateCustomerList(page);
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
        this.getPrivateCustomerList(pages);
      },
      // 资方维护列表的删除
      removeZf(row) {
        Alertify.confirm('确定要删除吗？', async (ok) => {
          if (ok) {
            let capitalNo = row.capitalNo;
            const loadingMsg = this.$Message.loading('删除中...', 0);
            let respDel = await this.$http.post('/pms/capital/accBaseInfoRemove', {
              capitalNo: capitalNo
            });
            if (respDel.success) {
              loadingMsg();
              this.$Message.success('删除成功');
              let goCurrentPage = this.$data.currentPage;
              if (
                this.$data.total % this.$data.pageSize === 1 &&
                this.$data.currentPage !== 1 &&
                (this.$data.total - 1) / this.$data.pageSize !== this.$data.currentPage
              ) {
                goCurrentPage = this.$data.currentPage - 1;
              }
              this.getPrivateCustomerList(goCurrentPage);
            }
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
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  #invest-maintain {
  }
</style>
