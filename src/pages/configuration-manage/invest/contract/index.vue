<template>
  <!--合同模板维护-->
  <div id="invest-maintain">
    <i-breadcrumb separator="&gt;">
      <i-breadcrumb-item href="/">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/conf">配置管理</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/conf/invest">资方管理</i-breadcrumb-item>
      <i-breadcrumb-item>合同模板维护</i-breadcrumb-item>
    </i-breadcrumb>
    <div class="form-block-title">
      查询条件
    </div>
    <div class="search-form-container">
      <i-form inline label-position="left">
        <i-form-item prop="user" label="合同名称" :label-width="100">
          <i-input type="text" placeholder="合同名称"></i-input>
        </i-form-item>
        <i-form-item>
          <i-button type="primary">
            <i-icon type="ios-search-strong"></i-icon>
            搜索
          </i-button>
        </i-form-item>
      </i-form>
    </div>
    <div class="form-top-actions">
      <i-button @click="addModal" type="info"><i class="iconfont icon-xinzeng"></i> 新增</i-button>
    </div>
    <i-table highlight-row border :loading="loading" ref="proTable" :columns="columns1" :data="data1"></i-table>
    <div class="page-container">
      <i-page :current="1" :total="40" size="small" show-elevator show-total>
      </i-page>
    </div>
    <bs-modal :title="'新增合同模板'" v-model="ShowModal" :width="600">
      <i-form ref="formContract" :model="formContract" label-position="right" :label-width="120">
        <i-form-item label="合同类型" prop="protype">
          <i-select v-model="formContract.type">
            <i-option value="贷款合同01">贷款合同01</i-option>
            <i-option value="贷款合同02">贷款合同02</i-option>
            <i-option value="贷款合同03">贷款合同03</i-option>
          </i-select>
        </i-form-item>
        <i-form-item label="合同名称" prop="protype">
          <i-input v-model="formContract.name">
          </i-input>
        </i-form-item>
        <i-form-item label="合同名称" prop="protype">
          <i-input v-model="formContract.name" placeholder="非必填项">
          </i-input>
        </i-form-item>
        <i-form-item label="合同模板附件" prop="protype">
          <i-upload
            multiple
            type="drag"
            :action="uploadurl">
            <div style="padding: 20px 0">
              <i-icon type="ios-cloud-upload" size="52" style="color: #3399ff"></i-icon>
              <p>单击或拖动文件上传</p>
            </div>
          </i-upload>
        </i-form-item>
        <i-form-item class="text-right">
          <i-button type="primary" @click="formSubmit">提交</i-button>
          <i-button type="ghost" style="margin-left: 8px" @click="formCancel">取消</i-button>
        </i-form-item>
      </i-form>
    </bs-modal>
  </div>
</template>

<script>
  import BSModal from '@/components/bs-modal';
  export default {
    name: 'invest-maintain',
    components: {
      'bs-modal': BSModal
    },
    data() {
      return {
        ShowModal: false,
        formMaintain: {},
        iSsee: false,           // 是否是查看页面
        loading: true,
        uploadurl: '',
        formContract: {},
        columns1: [
          {
            title: '合同模板ID',
            width: 100,
            align: 'center',
            key: 'id'
          },
          {
            title: '合同名称',
            key: 'name'
          },
          {
            title: '合同类型',
            key: 'type'
          },
          {
            title: '模板附件',
            key: 'enclosure'
          },
          {
            title: '签约平台模板ID',
            key: 'SignId'
          },
          {
            title: '操作',
            key: 'action',
            width: 200,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                    }
                  }
                }, '详情'),
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.listIndex = params.index;
                      this.setList(params.row);
                    }
                  }
                }, '修改'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.remove1(params.index);
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ],
        data1: []
      };
    }, // end data
    async mounted() {
      const Vm = this;
      let response = await this.$http.post('/contract', {});
      try {
        Vm.$data.data1 = response.list;
        this.$data.loading = false;
      } catch (err) {
      }
    },
    methods: {
      // 新增弹窗
      addModal() {
        this.$data.iSsee = false;   // 不是查看状态
        this.$data.ShowModal = true;
      },
      // 合同模板维护列表的删除
      remove1(index) {
        this.data1.splice(index, 1);
      },
      // 修改弹窗
      setList() {
        this.$data.iSsee = false;   // 不是查看状态
      },
      // 提交 按钮
      formSubmit() {},
      // 取消 按钮
      formCancel() {
        this.$data.ShowModal = false;
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
