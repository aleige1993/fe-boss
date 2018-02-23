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
      <i-row>
        <i-col span="12">
          <i-form-item label="渠道商名称" prop="merchantName">
            <input type="hidden" v-model="formData.merchantName"/>
            <i-input v-model="formData.merchantName" :readonly="true" placeholder="选择渠道商">
              <i-button @click="merchantClick" slot="append">选择渠道商 <Icon type="ios-more"></Icon></i-button>
            </i-input>
            <p style="color:#FF6600;margin-top: -8px;">不填写，代表为所有渠道商创建角色和分配权限</p>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="12">
          <i-form-item
            :rules="{required: true, message: '角色名称不能为空', trigger: 'blur'}"
            label="角色名称"
            prop="coleName">
            <i-input v-model="formData.coleName" placeholder=""></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-form-item
        :rules="{required: true, message: '请选择权限', trigger: 'blur'}"
        label="权限列表"
        prop="authorityName">
        <input type="hidden" v-model="formData.authorityName">
        <Tree class="scrollBarStyle" :data="data2" show-checkbox ref="authorityTree" @on-check-change="authorityCheck" style="max-height: 480px;overflow-y: auto; background: #fafafa; padding: 0 5px;"></Tree>
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
        data2: [
          {
            title: 'parent 1',
            expand: true,
            children: [
              {
                title: 'parent 1-1',
                expand: true,
                children: [
                  {
                    title: 'leaf 1-1-1'
                  },
                  {
                    title: 'leaf 1-1-2'
                  }
                ]
              },
              {
                title: 'parent 1-2',
                expand: true,
                children: [
                  {
                    title: 'leaf 1-2-1'
                  },
                  {
                    title: 'leaf 1-2-1'
                  }
                ]
              }
            ]
          }
        ],
        formData: {
        }
      };
    },
    methods: {
      saveAddSubimt() {
        this.$refs['formData'].validate((valid) => {
          if (valid) {
          } else {
            this.$Message.error('<span style="color: red">*</span>项不能为空');
          }
        });
      },
      openAddRoleModal() {
        this.$data.isAdd = true;
        this.$data.showAddModal = true;
      },
      // 修改
      setRow(row) {
        this.$data.isAdd = false;
        this.$data.showAddModal = true;
        this.$data.formData = row;
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
      authorityCheck() {
        console.log(this.$refs.authorityTree.getCheckedNodes()); // 获取被勾选的节点
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
