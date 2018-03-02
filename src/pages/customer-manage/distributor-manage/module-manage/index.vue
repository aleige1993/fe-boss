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
        <i-form-item prop="modulePname">
          <i-input style="width: 240px;" type="text" placeholder="上级权限名称" v-model="formSearch.modulePname"></i-input>
        </i-form-item>
        <i-form-item prop="moduleType">
          <i-select v-model="formSearch.moduleType" placeholder="权限类型">
            <i-option value="" style="height: 26px; color: #bbbec4">-请选择-</i-option>
            <i-option v-for="item in enumSelectData.get('ModuleTypeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
          </i-select>
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
              <i-input v-model="formData.moduleUrl" placeholder="如: /index"></i-input>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row>
          <i-col span="12">
            <i-form-item
              :rules="{required: true, message: '权限类型不能为空', trigger: 'blur'}"
              label="权限类型"
              prop="moduleType">
              <i-select v-model="formData.moduleType">
               <i-option v-for="item in enumSelectData.get('ModuleTypeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
              </i-select>
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
          <i-col span="12">
            <i-form-item
              label="备注"
              prop="remark">
              <i-input type="textarea" :rows="3" v-model="formData.remark" placeholder=""></i-input>
            </i-form-item>
          </i-col>
          <i-col span="12">
            <i-form-item
              label="上级权限"
              :rules="{required: true, message: '请选择上级权限', trigger: 'change'}"
              prop="modulePname">
              <i-input v-model="formData.modulePname" :readonly="true" placeholder="选择上级权限">
                <i-button @click="showSelectModule=!showSelectModule" slot="append">选择上级权限 <Icon type="ios-more"></Icon></i-button>
              </i-input>
            </i-form-item>
          </i-col>
        </i-row>
        <div class="text-right">
          <i-button @click="saveAddSubimt" :loading="addFormLoading" type="success">
            <span v-if="!addFormLoading"><i class="iconfont icon-tijiao"></i> 提交</span>
            <span v-else> loading...</span>
          </i-button>
        </div>
      </i-form>
    </bs-modal>
    <!-- 选择上级权限-->
    <bs-modal :width="880" v-model="showSelectModule" title="选择上级权限">
      <tree-module v-if="showSelectModule" @on-row-dblclick="selectModule" :columns="treeModuleColumns" :data="treeModuleData"></tree-module>
    </bs-modal>
  </div>
</template>

<script>
  import TreeModule from '@/components/bs-tree-grid'; // 选择上级渠道商
  import BsModal from '@/components/bs-modal';
  import MixinData from './mixin-data';
  export default {
    name: 'merchantModuleList',
    mixins: [MixinData],
    components: {
      TreeModule,
      BsModal
    },
    data() {
      return {
        isAdd: true,
        dataLoading: false,
        showAddModal: false,
        addFormLoading: false,
        showSelectModule: false,
        total: 0,
        pageSize: 15,
        currentPage: 1,
        treeModuleColumns: [
          {
            headerText: '',
            headerAlign: 'center',
            dataAlign: 'center',
            width: '20'
          },
          {
            headerText: '上级权限（双击选择）',
            dataField: 'title',
            headerAlign: 'center',
            handler: ''
          }
        ],
        treeModuleData: [],
        formSearch: {
          moduleName: '',
          modulePname: '',
          moduleType: ''
        },
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
      this.getModuleTreeData(); // 获取权限树形结构数据
    },
    methods: {
      selectModule(id, index, treeData) {
        this.$data.formData.modulePname = treeData.title;
        this.$data.formData.modulePid = treeData.moduleId;
        this.$data.showSelectModule = false;
      },
      /**
       * 获取权限树形结构数据
       * @param id
       * @returns {Promise.<void>}
       */
      async getModuleTreeData() {
        let resp = await this.$http.post('/merchant/module/getMenuTree', {});
        if (resp.success) {
          this.$data.treeModuleData = resp.body;
        } else {
          this.$data.treeModuleData = [];
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
      },
      // 修改
      setRow(row) {
        this.$data.isAdd = false;
        this.$data.showAddModal = true;
        this.$data.formData = row;
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
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
