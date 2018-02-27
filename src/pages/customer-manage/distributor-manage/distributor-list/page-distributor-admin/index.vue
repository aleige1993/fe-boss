<template>
<!--渠道商管理员-->
  <div id="pageDistributorAdmin">
    <i-breadcrumb separator=">">
      <i-breadcrumb-item href="/">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/customer/distributor">渠道商管理</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/customer/distributor">渠道商列表</i-breadcrumb-item>
      <i-breadcrumb-item>渠道商操作员管理</i-breadcrumb-item>
    </i-breadcrumb>
    <div class="form-top-actions">
      <i-button @click="addModal" type="info"><i class="iconfont icon-xinzeng"></i>&nbsp;新增</i-button>
    </div>
    <i-table border :loading="dataLoading" ref="tableAdmin" :columns="columns1" :data="data1"></i-table>
    <div class="page-container">
      <i-page :current="currentPage" :total="total" size="small" show-elevator show-total @on-change="jumpPage" :page-size="pageSize"></i-page>
    </div>
    <!--操作员新增-->
    <bs-modal :title="isAdd?'操作员新增':'操作员修改'" :width="600" v-model="showAddModal">
      <i-form v-if="showAddModal" ref="formAdmin" :model="formAdmin" label-position="right" :label-width="120">
        <!--<i-form-item label="渠道商" prop="merchantName">
          <input type="hidden" v-model="formAdmin.merchantName"/>
          <i-input v-model="formAdmin.merchantName" :readonly="true" placeholder="选择渠道商">
            <i-button @click="merchantClick" slot="append">选择渠道商 <Icon type="ios-more"></Icon></i-button>
          </i-input>
        </i-form-item>-->
        <i-form-item
          label="手机号"
          :rules="{required: true, message: '手机号不能为空', trigger: 'blur'}"
          prop="userMobile">
          <i-input v-model="formAdmin.userMobile"></i-input>
        </i-form-item>
        <i-form-item
          label="身份证号码"
          :rules="{required: true, message: '身份证号码不能为空', trigger: 'blur'}"
          prop="idCardNo">
          <i-input v-model="formAdmin.idCardNo"></i-input>
        </i-form-item>
        <i-form-item
          label="用户名称"
          prop="userName">
          <i-input v-model="formAdmin.userName"></i-input>
        </i-form-item>
        <i-form-item
          label="角色名称"
          :rules="{required: true, message: '请选择角色', trigger: 'change'}"
          prop="roleId">
          <input type="hidden" v-model="formAdmin.roleName">
          <i-select v-model="formAdmin.roleId" :label-in-value="true" @on-change="roleSelect">
            <i-option v-for="item in roleList" :key="item.roleId" :value="item.roleId">{{item.roleName}}</i-option>
          </i-select>
        </i-form-item>
        <i-form-item
          label="启停状态"
          :rules="{required: true, message: '请选择启停状态', trigger: 'change'}"
          prop="useStatus">
          <i-select v-model="formAdmin.useStatus">
            <i-option v-for="item in enumSelectData.get('EnableStatusEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
          </i-select>
        </i-form-item>
        <i-form-item
          label="操作员等级"
          :rules="{required: true, message: '请选择操作员等级', trigger: 'change'}"
          prop="userLevel">
          <i-select v-model="formAdmin.userLevel">
            <i-option v-for="item in enumSelectData.get('MerchantOperatorLevelEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
          </i-select>
        </i-form-item>
        <i-form-item class="text-right">
          <i-button type="primary" @click="formSubmit" :loading="buttonLoading">
            <span v-if="!buttonLoading">提交</span>
            <span v-else>Loading...</span>
          </i-button>
          <i-button type="ghost" @click="handleCancel" style="margin-left: 8px">取消</i-button>
        </i-form-item>
      </i-form>
    </bs-modal>
    <!--选择渠道商-->
    <bs-modal :title="'选择渠道商'" v-model="showSelectDistributor" :width="1300">
      <table-distributor-list v-if="showSelectDistributor" ref="distributorTable" type="modal" :status="''" @on-row-dbclick="selectDistributor"></table-distributor-list>
    </bs-modal>
  </div>
</template>

<script>
  import MixinData from './mixin-data';
  import BsModal from '@/components/bs-modal';
  import TableDistributorList from '@/components/table-distributor-list/index.vue';
  export default {
    name: '',
    mixins: [MixinData],
    components: {
      BsModal,
      TableDistributorList
    },
    data() {
      return {
        isAdd: false,
        dataLoading: false,
        buttonLoading: false,
        showAddModal: false,
        showSelectDistributor: false,
        currentPage: 1,
        total: 0,
        pageSize: 15,
        roleList: [],
        formAdmin: {
          userMobile: '',
          idCardNo: '',
          useStatus: '',
          roleName: '',
          roleId: '',
          qrCodeUrl: '',
          userNo: '',
          userLevel: '',
          operatorPassword: '',
          operatorType: ''
        }
      };
    },
    mounted() {
      this.getRoleList();
      this.getList();
    },
    methods: {
      roleSelect(val) {
        this.$data.formAdmin.roleName = val.label;
        this.$data.formAdmin.roleId = val.value;
      },
      async getRoleList() {
        let reps = await this.$http.post('/merchant/role/getList');
        if (reps.success && (reps.body.length !== 0)) {
          reps.body.map((item) => {
            item.roleId = item.roleId + '';
            return item;
          });
          this.$data.roleList = reps.body;
        } else {
          this.$data.roleList = [];
        }
      },
      // 删除渠道商
      adminRomove(row) {
        Alertify.confirm('确定要删除吗？', async(ok) => {
          if (ok) {
            const loadingMsg = this.$Message.loading('删除中...', 0);
            let resp = await this.$http.post('/merchant/operator/delete', {
              merchantNo: this.$route.query.merchantNo,
              userNo: row.userNo
            });
            loadingMsg();
            if (resp.success) {
              this.$Message.success('删除成功');
              this.getList();
            }
          }
        });
      },
      /**
       * 选择渠道商
       * @param row
       * @param index
       */
      selectDistributor(row, index) {
        this.$data.formAdmin.merchantNo = row.merchantNo;
        this.$data.formAdmin.merchantName = row.corpName;
        this.$data.showSelectDistributor = false;
      },
      // 点击的时“选择渠道商”按钮
      merchantClick() {
        this.$data.showSelectDistributor = true;
      },
      addModal() {
        this.$data.isAdd = true;
        this.$data.showAddModal = true;
        this.$data.formAdmin = {};
      },
      adminSet(row) {
        this.$data.isAdd = false;
        this.$data.showAddModal = true;
        row.roleId = row.roleId + '';
        this.$data.formAdmin = row;
      },
      async getList(page) {
        this.$data.dataLoading = true;
        if (page) {
          this.$data.currentPage = page;
        }
        let resp = await this.$http.post('/merchant/operator/list', {
          currentPage: this.$data.currentPage,
          pageSize: this.$data.pageSize,
          merchantNo: this.$route.query.merchantNo
        });
        this.$data.dataLoading = false;
        if (resp.success && resp.body.resultList.length !== 0) {
          this.$data.data1 = resp.body.resultList;
          this.$data.currentPage = resp.body.currentPage / 1;
          this.$data.total = resp.body.totalNum / 1;
          this.$data.pageSize = resp.body.pageSize / 1;
        } else {
          this.$data.data1 = [];
        }
      },
      jumpPage(page) {
        this.getList(page);
      },
      // 新增
      async addSuccess() {
        this.$data.buttonLoading = true;
        let _text = '';
        _text = this.$data.isAdd ? '新增' : '修改';
        let _url = this.$data.isAdd ? '/merchant/operator/add' : '/merchant/operator/update';
        let resp = await this.$http.post(_url, {
          merchantNo: this.$route.query.merchantNo,
          useStatus: '1', // 0冻结，1激活
          ...this.$data.formAdmin
        });
        this.$data.buttonLoading = false;
        this.$data.showAddModal = false;
        if (resp.success) {
          this.$Message.success(_text + '成功');
          this.getList();
        }
      },
      formSubmit() {
        const formName = 'formAdmin';
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.addSuccess();
          } else {
            this.$Message.error('"<span style="color: red">*</span>"必填项不能为空');
          }
        });
      },
      handleCancel() {
        this.$data.showAddModal = false;
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
