<template>
  <div id="page-table-demo">
    <i-breadcrumb separator=">">
      <i-breadcrumb-item href="/">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/conf">配置管理</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/conf/limitestimate">额度预估</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/conf/limitestimate/setting">二级指标设置</i-breadcrumb-item>
      <i-breadcrumb-item>子选项设置</i-breadcrumb-item>
    </i-breadcrumb>
    <div class="form-top-actions">
      <i-form inline>
        <i-form-item>
          <i-button type="info" @click="goback">返回</i-button>
        </i-form-item>
        <i-form-item>
          <i-button type="info" @click="add"><i class="iconfont icon-xinzeng"></i> 新增子项</i-button>
        </i-form-item>
      </i-form>
    </div>
    <slot name="topAction"></slot>
    <i-table border :loading="dataLoading" ref="selection" @on-select="selectRow" :columns="resultCustomerColumns" :data="privateCustomerLoanList"></i-table>
    <div class="page-container">
      <i-page :total="total" :page-size="15" :current="currentPage" @on-change="jumpPage" size="small" show-elevator show-total></i-page>
    </div>
    <pt-modal :title="isAdd ? '添加' : '修改'" v-model="addModal" :width="600" :zIndex="200">
      <i-form ref="fromData" :model="fromData" label-position="left" :label-width="80">
        <i-form-item label="子项名称" prop="scoreName" :rules="{required: true, message: '子项名称不能为空', trigger: 'blur'}">
          <i-input v-model="fromData.scoreName" placeholder="" ></i-input>
        </i-form-item>
        <i-form-item label="评分方案" prop="type" :rules="{required: true, message: '评分方案不能为空'}">
          <i-select v-model="fromData.type">
            <i-option v-for="item in QualificationAssessTypeEnum" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
          </i-select>
        </i-form-item>
        <i-form-item label="评分值" prop="scoreRatio" :rules="{required: true, message: '评分值不能为空', trigger: 'blur'}">
          <i-input v-model="fromData.scoreRatio" placeholder="" ></i-input>
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
    name: 'limiteStimateVM',
    mixins: [MixinData],
    data() {
      return {
        isAdd: true,
        addModal: false,
        dataLoading: false,
        buttonLoading: false,
        total: 0,
        currentPage: 1,
        QualificationAssessTypeEnum: '',
        uploadFileName: '',
        searchForm: {
          currentPage: 1,
          pageSize: 15
        },
        fromData: {
          'targetNo': this.$route.query.id,
          'scoreNo': '',
          'scoreName': '',
          'scoreRatio': '',
          'type': ''
        },
        id: this.$route.query.id,
        name: this.$route.query.name
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
      goback() {
        this.$router.go(-1);
      },
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
        if (!this.id) {
          return;
        }
        this.$data.dataLoading = true;
        if (page) {
          this.$data.searchForm.currentPage = page;
        }
        let resp = await this.$http.post('/cfg/qualificationAssess/listScore', {
          targetNo: this.id
        });
        this.$data.dataLoading = false;
        this.$data.privateCustomerLoanList = resp.body;
        this.$data.currentPage = resp.body.currentPage;
        this.$data.total = resp.body.totalNum;
      },
      async submitSuccess() {
        this.$data.buttonLoading = true;
        let url = this.$data.isAdd ? '/cfg/qualificationAssess/addScore' : '/cfg/qualificationAssess/modifyScore';
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
      this.$data.QualificationAssessTypeEnum = [
        {
          itemCode: 0,
          itemName: '固定值'
        },
        {
          itemCode: 1,
          itemName: '比例*满分'
        }
      ];
    }
  };
</script>
<style lang="scss" scoped>
</style>
