<template>
  <div id="page-table-demo">
    <i-breadcrumb separator=">">
      <i-breadcrumb-item href="/">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/conf/toLeftNav">配置管理</i-breadcrumb-item>
      <i-breadcrumb-item>短信管理</i-breadcrumb-item>
    </i-breadcrumb>
    <div class="form-top-actions">
      <i-button type="info" @click="add"><i class="iconfont icon-xinzeng"></i> 新增</i-button>
    </div>
    <slot name="topAction"></slot>
    <i-table border :loading="dataLoading" ref="selection" @on-select="selectRow" :columns="resultCustomerColumns" :data="privateCustomerLoanList"></i-table>
    <div class="page-container">
      <i-page :total="total" :page-size="15" :current="currentPage" @on-change="jumpPage" size="small" show-elevator show-total></i-page>
    </div>
    <pt-modal :title="isAdd ? '添加' : '修改'" v-model="addModal" :width="600" :zIndex="200">
      <i-form ref="fromData" :model="fromData" label-position="left" :label-width="80">
        <i-form-item label="短信内容" prop="smsContent" :rules="{required: true, message: '短信内容不能为空', trigger: 'blur'}">
          <i-input type="textarea" v-model="fromData.smsContent" placeholder="" ></i-input>
        </i-form-item>
        <i-form-item label="触发点" prop="triggerPoint" :rules="{required: true, message: '请选择触发点', trigger: 'blur'}">
          <i-select v-model="fromData.triggerPoint">
            <i-option v-for="item in smsTriggerPointEnum" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
          </i-select>
        </i-form-item>
        <i-form-item label="阿里云模板ID" prop="aliSmsId" :rules="{required: true, message: '阿里云模板ID不能为空', trigger: 'blur'}">
          <i-input v-model="fromData.aliSmsId" placeholder="" ></i-input>
        </i-form-item>
        <i-form-item label="是否自动触发" prop="autoTrigger" :rules="{required: true, message: '请选择是否自动触发', trigger: 'blur'}">
          <i-select v-model="fromData.autoTrigger">
            <i-option v-for="item in certTypeEnum" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
          </i-select>
        </i-form-item>
        <i-form-item class="text-right">
          <i-button type="primary" @click="submitFun" :loading="buttonLoading">
            <span v-if="!buttonLoading">提交</span>
            <span v-else>loading...</span>
          </i-button>
          <i-button type="ghost" @click="cancelFun" style="margin-left: 8px">取消</i-button>
        </i-form-item>
      </i-form>
    </pt-modal>
  </div>
</template>

<script>
  import MixinData from './mixin-data';
  import PTModal from '@/components/bs-modal';
  export default {
    name: 'bannerManage',
    mixins: [MixinData],
    data() {
      return {
        isAdd: true,
        addModal: false,
        dataLoading: false,
        buttonLoading: false,
        total: 0,
        currentPage: 1,
        certTypeEnum: {},
        smsTriggerPointEnum: {},
        uploadFileName: '',
        searchForm: {
          'projectNo': '',
          'toAccName': '',
          'transCardId': '',
          'btime': '',
          'etime': '',
          'status': '',
          currentPage: 1,
          pageSize: 15
        },
        fromData: {
          'templateNo': '',
          'templateTitle': '',
          'smsContent': '',
          'triggerPoint': '',
          'aliSmsId': '',
          'autoTrigger': ''
        }
      };
    },
    components: {
      'pt-modal': PTModal
    },
    computed: {
      resultCustomerColumns() {
        if (this.type === 'modal') {
          return this.$data.customerColumns;
        } else {
          return [...this.$data.customerColumns, ...this.$data.customerActionColumns];
        }
      }
    },
    props: {
      type: String,
      default: 'page',
      required: false
    },
    methods: {
      selectRow(row, index) {
        this.$emit('on-row-dbclick', row, index);
      },
      jumpPage(page) {
        this.getProxyPayList(page);
      },
      search() {
        this.getProxyPayList(1);
      },
      add() {
        this.$data.isAdd = true;
        this.$data.addModal = true;
        this.$refs['fromData'].resetFields();
      },
      async getProxyPayList(page) {
        this.$data.dataLoading = true;
        if (page) {
          this.$data.searchForm.currentPage = page;
        }
        let resp = await this.$http.post('/cfg/smsTemplate/list', {
          ...this.$data.searchForm
        });
        this.$data.dataLoading = false;
        this.$data.privateCustomerLoanList = resp.body.resultList;
        this.$data.currentPage = resp.body.currentPage;
        this.$data.total = resp.body.totalNum;
      },
      async submitSuccess() {
        this.$data.buttonLoading = true;
        let url = this.$data.isAdd ? '/cfg/smsTemplate/add' : '/cfg/smsTemplate/modify';
        let resp = await this.$http.post(url, {
          ...this.$data.fromData
        });
        this.$data.buttonLoading = false;
        this.$data.addModal = false;
        if (resp.success) {
          let text = this.$data.isAdd ? '添加成功' : '修改成功';
          this.$Message.success(text);
          this.getProxyPayList();
        }
      },
      // 提交
      submitFun() {
        this.$refs['fromData'].validate((valid) => {
          if (valid) {
            this.submitSuccess();
          } else {
            this.$Message.error('"<span style="color: red">*</span>"必填项不能为空');
          }
        });
      },
      // 取消 按钮
      cancelFun() {
        this.$data.addModal = false;
      }
    },
    mounted() {
      this.getProxyPayList();
      let enumSelectData = this.$store.getters.enumSelectData;
      this.$data.smsTriggerPointEnum = enumSelectData.get('smsTriggerPointEnum');
      this.$data.certTypeEnum = [
        {
          'itemCode': '1',
          'itemName': '是'
        },
        {
          'itemCode': '0',
          'itemName': '否'
        }
      ];
    }
  };
</script>
<style lang="scss" scoped>
</style>
