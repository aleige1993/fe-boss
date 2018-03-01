<template>
<!--渠道商权限管理-->
  <div id="merchantModuleList">
    <i-breadcrumb separator=">">
      <i-breadcrumb-item href="/">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/customer/distributor">渠道商管理</i-breadcrumb-item>
      <i-breadcrumb-item>渠道商权限管理</i-breadcrumb-item>
    </i-breadcrumb>
    <div class="search-form-container">
      <i-form inline ref="formSearch" :model="formSearch">
        <i-form-item prop="moduleName">
          <i-input style="width: 240px;" type="text" placeholder="权限名称" v-model="formSearch.moduleName"></i-input>
        </i-form-item>
        <i-form-item prop="moduleType">
          <i-input style="width: 240px;" type="text" placeholder="权限类型" v-model="formSearch.moduleType"></i-input>
        </i-form-item>
        <i-form-item>
          <i-button @click="searchSubmit" type="primary"><i-icon type="ios-search-strong"></i-icon> 搜索</i-button>
        </i-form-item>
      </i-form>
    </div>
    <div class="form-top-actions">
      <i-button type="info" @click="openAddModal"><i class="iconfont icon-xinzeng"></i> 新增</i-button>
    </div>
    <i-table :loading="dataLoading" border ref="distributorModuleTable" :columns="moduleColumns" :data="moduleList"></i-table>
    <div class="page-container">
      <i-page @on-change="jumpPage" :total="total" :page-size="pageSize" :current="currentPage" size="small" show-elevator show-total></i-page>
    </div>
    <!--新增修改渠道商权限-->
    <bs-modal :title="isAdd ? '新增' : '修改'" v-model="showAddModal" :width="800">
      <i-form v-if="showAddModal" ref="formData" :model="formData" label-position="right" :label-width="100" style="padding: 30px 0;">
        <i-row>
          <i-col span="12">
            <i-form-item
              :rules="{required: true, message: '权限名称不能为空', trigger: 'blur'}"
              label="权限名称"
              prop="moduleName">
              <i-input v-model="formData.moduleName" placeholder=""></i-input>
            </i-form-item>
          </i-col>
          <i-col span="12">
            <i-form-item
              label="链接地址"
              prop="moduleUrl">
              <i-input v-model="formData.moduleUrl" placeholder=""></i-input>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row>
          <i-col span="12">
            <i-form-item
              :rules="{required: true, message: '权限类型不能为空', trigger: 'blur'}"
              label="权限类型"
              prop="moduleType">
              <i-input v-model="formData.moduleType" placeholder=""></i-input>
            </i-form-item>
          </i-col>
          <i-col span="12">
            <i-form-item
              label="排序"
              prop="sort">
              <i-input v-model="formData.sort" placeholder="同级排序序号"></i-input>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row>
          <i-col span="24">
            <i-form-item
              label="备注"
              prop="remark">
              <i-input type="textarea" :rows="3" v-model="formData.remark" placeholder=""></i-input>
            </i-form-item>
          </i-col>
        </i-row>
        <i-form-item
          class="required"
          label="权限列表"
          prop="moduleList">
          <Tree class="scrollBarStyle" :data="moduleList" :multiple="false" show-checkbox ref="authorityTree" @on-check-change="authorityCheck" style="max-height: 480px;overflow-y: auto; background: #fafafa; padding: 0 5px;"></Tree>
        </i-form-item>
        <div class="text-right">
          <i-button @click="saveAddSubimt" :loading="addFormLoading" type="success">
            <span v-if="!addFormLoading"><i class="iconfont icon-tijiao"></i> 提交</span>
            <span v-else> loading...</span>
          </i-button>
        </div>
      </i-form>
    </bs-modal>
  </div>
</template>

<script>
  import BsModal from '@/components/bs-modal';
  import MixinData from './mixin-data';
  export default {
    name: 'merchantModuleList',
    mixins: [MixinData],
    components: {
      BsModal
    },
    data() {
      return {
        isAdd: true,
        dataLoading: false,
        showAddModal: false,
        total: 0,
        pageSize: 15,
        currentPage: 1,
        formSearch: {
          moduleName: '',
          moduleType: ''
        },
        moduleListCheck: [], // 勾选的权限
        formData: {
          moduleId: '',
          moduleName: '',
          modulePid: '',
          modulePname: '',
          moduleUrl: '',
          moduleType: '',
          moduleIcon: '',
          sort: '',
          remark: ''
        }
      };
    },
    mounted() {
      this.getModuleList();
    },
    methods: {
      /**
       * 获取渠道商权限列表
       * @param id
       * @returns {Promise.<void>}
       */
      async getTree(id) {
        (typeof id === 'undefined') && (id = '');
        let resp = await this.$http.post('/merchant/module/getMenuTree', { moduleId: id });
        if (resp.success) {
          this.$data.moduleList = resp.body;
          this.authorityCheck();
        } else {
          this.$data.moduleList = [];
        }
      },
      // 查询列表数据
      async getModuleList(page) {
        if (page) {
          this.$data.currentPage = page;
        }
        this.$data.dataLoading = true;
        let resp = await this.$http.post('/merchant/module/list', {
          ...this.$data.formSearch,
          currentPage: this.$data.currentPage,
          pageSize: this.$data.pageSize
        });
        this.$data.dataLoading = false;
        if (resp.success) {
          this.$data.currentPage = resp.body.currentPage / 1;
          this.$data.pageSize = resp.body.pageSize / 1;
          this.$data.total = resp.body.totalNum / 1;
          this.$data.moduleList = resp.body.resultList;
        }
      },
      jumpPage(page) {
        this.getModuleList(page);
      },
      searchSubmit() {
        this.getModuleList(1);
      },
      openAddModal() {
        this.$data.isAdd = true;
        this.$data.showAddModal = true;
        this.$data.formData = {};
        this.getTree();
      },
      // 修改
      setRow(row) {
        this.$data.isAdd = false;
        this.$data.showAddModal = true;
        this.$data.formData = row;
        this.getTree(row.moduleId);
      },
      // 新增保存ajax
      async addSubimtFun() {
        let reps = await this.$http.post('/merchant/module/add', {
          ...this.$data.formData
        });
        this.$data.showAddModal = false;
        if (reps.success) {
          this.$Message.success('新增成功');
          this.getModuleList(); // 刷新列表
        }
      },
      // 修改保存ajax
      async setSubimtFun() {
        let reps = await this.$http.post('/merchant/module/update', {
          ...this.$data.formData
        });
        this.$data.showAddModal = false;
        if (reps.success) {
          this.$Message.success('修改成功');
          this.getModuleList(); // 刷新列表
        }
      },
      // 保存
      saveAddSubimt() {
        this.$data.addFormLoading = true;
        this.$refs['formData'].validate(async (valid) => {
          await this.authorityCheck();
          if (this.$data.moduleListCheck.length === 0) {
            this.$Message.error('请勾选上级权限');
            this.$data.addFormLoading = false;
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
          this.$data.addFormLoading = false;
        });
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
