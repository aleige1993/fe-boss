<template>
  <div>
    <div class="form-top-actions" style="padding-top: 0">
      <div v-if="!isFromDetail">
        <i-button type="success" @click="addModal=!addModal">添加</i-button>
      </div>
    </div>
    <i-table :loading="listLoading" :columns="spouseColumns" :data="spouseDatas"></i-table>
    <!--添加联系人模态框-->
    <pt-modal title="选择客户配偶" v-model="addModal" :width="1200">
      <table-customer-list ref="addCustomerSpouseModalTable" type="modal" @on-row-dbclick="selectSpouseRow">
        <div class="form-top-actions" slot="topAction">
          <i-button type="info" @click="addCustomerModal=!addCustomerModal"><i class="iconfont icon-xinzeng"></i> 新增</i-button>
        </div>
      </table-customer-list>
    </pt-modal>
    <!-- 新增联系人模态框 -->
    <pt-modal title="新增客户" v-model="addCustomerModal" :width="1200">
      <form-basic-info type="modal" @on-submit-success="addedNewCustomer"></form-basic-info>
    </pt-modal>
  </div>
</template>
<script>
  import FormBasicInfo from '@/components/form-private-customer-basic';
  import PTModal from '@/components/bs-modal';
  import MixinData from './mixin-data';
  import TableCustomerList from '@/components/table-customer-list';
  export default {
    name: 'tabCustomerSpouse',
    mixins: [MixinData],
    data() {
      return {
        addModal: false,
        memberNo: null,
        listLoading: false,
        addCustomerModal: false
      };
    },
    props: ['isFromDetail', 'customer'],
    components: {
      'pt-modal': PTModal,
      TableCustomerList,
      FormBasicInfo
    },
    methods: {
      gotoAddCustomer() {
        this.$router.go(0);
      },
      async selectSpouseRow(row, index) {
        this.$Message.loading('正在添加配偶信息');
        let spouseMemberNo = row.memberNo;
        let resp = await this.$http.post('/member/spo/save', {
          memberNo: this.$data.memberNo,
          spoMemberNo: spouseMemberNo
        });
        if (resp.success) {
          this.$Message.success('添加成功');
          this.$data.addModal = false;
          this.getSpouseList();
        }
      },
      // 删除配偶信息
      async removeSpouse(spouse) {
        const msg = this.$Message.loading('正在删除配偶', 0);
        let resp = await this.$http.post('/member/spo/delete', {
          memberNo: this.$data.memberNo,
          spoMemberNo: spouse.spoMemberNo
        });
        msg();
        if (resp.success) {
          this.getSpouseList();
        }
      },
      // 获取配偶信息列表
      async getSpouseList() {
        this.$data.listLoading = true;
        let resp = await this.$http.post('/member/spo/query', {
          memberNo: this.$data.memberNo
        });
        this.$data.listLoading = false;
        this.$data.spouseDatas = resp.body;
      },
      deleteSpouse(spouse) {
        Alertify.confirm('确定要删除当前配偶信息吗？', (conf) => {
          if (conf) {
            this.removeSpouse(spouse);
          }
        });
      },
      addedNewCustomer() {
        this.$refs['addCustomerSpouseModalTable'].getPrivateCustomerList();
        this.$data.addCustomerModal = false;
      }
    },
    mounted() {
      if (this.$route.query.id) {
        this.$data.memberNo = this.$route.query.id;
      } else {
        this.$data.memberNo = this.customer.mbMemberDTO.memberNo;
      }
      this.getSpouseList();
    }
  };
</script>
<style lang="scss">

</style>
