<template>
  <div id="page-table-demo">
    <i-breadcrumb separator=">">
      <i-breadcrumb-item href="/home">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/conf">配置管理</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/conf/limitestimate">额度预估</i-breadcrumb-item>
      <i-breadcrumb-item>二级指标设置</i-breadcrumb-item>
    </i-breadcrumb>
    <!--<div class="search-form-container">-->
      <!--<i-form inline>-->
        <!--<i-form-item prop="user">-->
          <!--指标名称-->
        <!--</i-form-item>-->
        <!--<i-form-item prop="user">-->
          <!--<i-input type="text" v-model="searchForm.projectNo" placeholder=""></i-input>-->
        <!--</i-form-item>-->
        <!--<i-form-item>-->
          <!--<i-button @click="search" type="primary"><i-icon type="ios-search-strong"></i-icon> 搜索</i-button>-->
        <!--</i-form-item>-->
      <!--</i-form>-->
    <!--</div>-->
    <div class="form-top-actions">
      <i-button type="info" @click="add"><i class="iconfont icon-xinzeng"></i> 新增二级指标</i-button>
    </div>
    <slot name="topAction"></slot>
    <i-table :height="tableFixHeight+98" border :loading="dataLoading" ref="selection" @on-select="selectRow" :columns="resultCustomerColumns" :data="privateCustomerLoanList"></i-table>
    <div class="page-container">
      <i-page :total="total" :page-size="15" :current="currentPage" @on-change="jumpPage" size="small" show-elevator show-total></i-page>
    </div>
    <pt-modal :title="isAdd ? '添加' : '修改'" v-model="addModal" :width="600" :zIndex="200">
      <i-form ref="fromData" :model="fromData" label-position="left" :label-width="80">
        <i-form-item label="二级指标名称" prop="secondLevelTarget" :rules="{required: true, message: '二级指标名称不能为空', trigger: 'blur'}">
          <i-input v-model="fromData.secondLevelTarget" placeholder="" ></i-input>
        </i-form-item>
        <i-form-item label="一级指标" prop="firstLevelNo" :rules="{required: true, message: '请选择一级指标', trigger: 'blur'}">
          <i-select v-model="fromData.firstLevelNo">
            <i-option v-for="item in QualificationAssessTypeEnum" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
          </i-select>
        </i-form-item>
        <i-form-item label="满分" prop="score" :rules="{required: true, message: '满分不能为空', trigger: 'blur'}">
          <i-input v-model="fromData.score" placeholder="" ></i-input>
        </i-form-item>
        <i-form-item label="备注" prop="remark">
          <i-input type="textarea" v-model="fromData.remark" placeholder="" ></i-input>
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
        certTypeEnum: {},
        QualificationAssessTypeEnum: {},
        uploadFileName: '',
        searchForm: {
          currentPage: 1,
          pageSize: 15
        },
        fromData: {
          'firstLevelNo': '',
          'firstLevelTarget': '',
          'secondLevelNo': '',
          'secondLevelTarget': '',
          'score': '',
          'remark': ''
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
        let resp = await this.$http.post('/cfg/qualificationAssess/listTarget', {
          ...this.$data.searchForm
        });
        this.$data.dataLoading = false;
        this.$data.privateCustomerLoanList = resp.body.resultList;
        this.$data.currentPage = resp.body.currentPage;
        this.$data.total = resp.body.totalNum;
      },
      async submitSuccess() {
        this.$data.buttonLoading = true;
        let url = this.$data.isAdd ? '/cfg/qualificationAssess/addTarget' : '/cfg/qualificationAssess/modifyTarget';
        if (this.$data.isAdd) {
          this.$data.fromData.firstLevelTarget = this.enumCode2Name(this.$data.fromData.firstLevelNo, 'QualificationAssessTypeEnum');
        }
        let resp = await this.$http.post(url, {
          ...this.$data.fromData
        });
        this.$data.buttonLoading = false;
        if (resp.success) {
          this.$data.addModal = false;
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
      this.$data.QualificationAssessTypeEnum = enumSelectData.get('QualificationAssessTypeEnum');
    }
  };
</script>
<style lang="scss" scoped>
</style>
