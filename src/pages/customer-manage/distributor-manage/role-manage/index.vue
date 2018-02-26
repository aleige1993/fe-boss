<template>
<!--渠道商角色管理-->
<div id="roleManage">
  <i-breadcrumb separator=">">
    <i-breadcrumb-item href="/">首页</i-breadcrumb-item>
    <i-breadcrumb-item href="/index/customer/distributor">渠道商管理</i-breadcrumb-item>
    <i-breadcrumb-item>渠道商角色管理</i-breadcrumb-item>
  </i-breadcrumb>
  <!--渠道商角色列表公共组件-->
  <table-distributor-role-list :type="'page'" ref="tableRoleList" @on-row-dbclick="selectRow" @on-set-row="setRow">
    <div class="form-top-actions" slot="topAction">
      <i-button type="info" @click="openAddRoleModal"><i class="iconfont icon-xinzeng"></i> 新增</i-button>
    </div>
  </table-distributor-role-list>
  <!--新增修改渠道商角色-->
  <bs-modal :title="isAdd ? '新增' : '修改'" v-model="showAddModal" :width="800">
    <i-form v-if="showAddModal" ref="formData" :model="formData" label-position="right" :label-width="100" style="padding: 30px 0;">
      <!--<i-row>
        <i-col span="12">
          <i-form-item label="渠道商名称" prop="merchantName">
            <input type="hidden" v-model="formData.merchantName"/>
            <i-input v-model="formData.merchantName" :readonly="true" placeholder="选择渠道商">
              <i-button @click="merchantClick" slot="append">选择渠道商 <Icon type="ios-more"></Icon></i-button>
            </i-input>
            <p style="color:#FF6600;margin-top: -8px;">不填写，代表为所有渠道商创建角色和分配权限</p>
          </i-form-item>
        </i-col>
      </i-row>-->
      <i-row>
        <i-col span="12">
          <i-form-item
            :rules="{required: true, message: '角色名称不能为空', trigger: 'blur'}"
            label="角色名称"
            prop="roleName">
            <i-input v-model="formData.roleName" placeholder=""></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-form-item
        class="required"
        label="权限列表"
        prop="moduleList">
        <Tree class="scrollBarStyle" :data="formData.moduleList" show-checkbox ref="authorityTree" @on-check-change="authorityCheck" style="max-height: 480px;overflow-y: auto; background: #fafafa; padding: 0 5px;"></Tree>
      </i-form-item>
      <div class="text-right">
        <i-button @click="saveAddSubimt" :loading="authorityFormLoading" type="success">
          <span v-if="!authorityFormLoading"><i class="iconfont icon-tijiao"></i> 提交</span>
          <span v-else> loading...</span>
        </i-button>
      </div>
    </i-form>
  </bs-modal>
  <!--选择渠道商-->
  <bs-modal :title="'选择渠道商'" v-model="showSelectDistributor" :width="1200">
    <table-distributor-list v-if="showSelectDistributor" ref="distributorTable" type="modal" @on-row-dbclick="selectDistributor"></table-distributor-list>
  </bs-modal>
</div>
</template>

<script>
  import tableDistributorRoleList from '@/components/table-distributor-role-list';
  import TableDistributorList from '@/components/table-distributor-list/index.vue';
  import BsModal from '@/components/bs-modal';
  export default {
    name: 'roleManageList',
    components: {
      BsModal,
      TableDistributorList,
      tableDistributorRoleList
    },
    data() {
      return {
        isAdd: true,
        showAddModal: false,
        showSelectDistributor: false,
        authorityFormLoading: false,
        formData: {
          roleId: '',
          roleName: '',
          moduleList: []
        },
        moduleListCheck: [] // 勾选的权限
      };
    },
    mounted() {
    },
    methods: {
      /**
       * 获取渠道商权限列表
       * @param id
       * @returns {Promise.<void>}
       */
      async getTree(id) {
        (typeof id === 'undefined') && (id = '');
        let resp = await this.$http.post('/merchant/module/getTree', { roleId: id });
        if (resp.success) {
          this.$data.formData.moduleList = resp.body;
          this.authorityCheck();
        } else {
          this.$data.formData.moduleList = [];
        }
      },
      async addSubimtFun() {
        let reps = await this.$http.post('/merchant/role/addRoleAndModule', {
          roleName: this.$data.formData.roleName,
          moduleList: this.$data.moduleListCheck
        });
        this.$data.showAddModal = false;
        if (reps.success) {
          this.$refs.tableRoleList.getPrivateCustomerList(); // 刷新列表
        }
      },
      async setSubimtFun() {
        let reps = await this.$http.post('/merchant/role/updateRoleAndModule', {
          roleId: this.$data.formData.roleId,
          roleName: this.$data.formData.roleName,
          moduleList: this.$data.moduleListCheck
        });
        this.$data.showAddModal = false;
        if (reps.success) {
          this.$refs.tableRoleList.getPrivateCustomerList(); // 刷新列表
        }
      },
      saveAddSubimt() {
        this.$data.authorityFormLoading = true;
        this.$refs['formData'].validate(async (valid) => {
          await this.authorityCheck();
          if (this.$data.moduleListCheck.length === 0) {
            this.$Message.error('请勾选权限列表');
            this.$data.authorityFormLoading = false;
            return;
          }
          if (valid) {
            if (this.$data.isAdd) {
              this.addSubimtFun();
            } else {
              this.setSubimtFun();
            }
          } else {
            this.$Message.error('<span style="color: red">*</span>项不能为空');
          }
          this.$data.authorityFormLoading = false;
        });
      },
      openAddRoleModal() {
        this.$data.isAdd = true;
        this.$data.showAddModal = true;
        this.getTree();
      },
      // 修改
      setRow(row) {
        this.$data.isAdd = false;
        this.$data.showAddModal = true;
        this.$data.formData = row;
        this.getTree(row.roleId);
      },
      // 双击时的回调
      selectRow(row, index) {},
      // 点击的时“选择渠道商”按钮
      merchantClick() {
        this.$data.showSelectDistributor = true;
        this.$data.isDistributor = false;
      },
      // 选择渠道商的回调
      selectDistributor(row, index) {
        this.$data.formData.merchantNo = row.corpNo;
        this.$data.formData.merchantName = row.corpName;
        this.$data.showSelectDistributor = false;
      },
      /**
       * 权限列表勾选的集合
       * @returns {Promise.<{moduleList: *}>}
       */
      async authorityCheck() {
        let checkRoleList = this.$refs.authorityTree.getCheckedNodes();
        let RoleList = await checkRoleList.map((item) => {
          return {
            moduleId: item.moduleId,
            parentId: item.parentId
          };
        });
        this.$data.moduleListCheck = RoleList;
        return { moduleList: RoleList };
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
