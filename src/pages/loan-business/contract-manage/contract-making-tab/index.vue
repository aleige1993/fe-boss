<template>
  <!--个人业务合同制作-->
  <div id="contract-making-tab">
    <i-breadcrumb separator=">">
      <i-breadcrumb-item href="/">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/loanbusiness">贷款业务</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/loanbusiness/contract">签约管理</i-breadcrumb-item>
      <i-breadcrumb-item>个人业务合同制作</i-breadcrumb-item>
    </i-breadcrumb>
    <br>
    <br>
    <i-tabs v-model="tabIndex" :animated="false" type="card">
      <i-tab-pane label="基本信息">
        基本信息0001
      </i-tab-pane>
      <i-tab-pane label="合同信息">
        <tab-contract-info v-if="tabIndex===1"></tab-contract-info>
      </i-tab-pane>
      <i-tab-pane label="审批信息">
        <i-form v-if="tabIndex===2" ref="formApproval" :model="formApproval" label-position="right" :label-width="100">
          <bs-form-block :title="'审核意见'">
            <i-row>
              <i-col span="8">
                <i-form-item label="处理人" prop="name">
                  <i-input v-model="formApproval.name" :readonly="true" placeholder="">
                  </i-input>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="处理时间" prop="date">
                  <i-input v-model="formApproval.date" :readonly="true" placeholder="">
                  </i-input>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="结论" prop="conclusion" :rules="{required: true, message: '结论不能为空', trigger: 'change'}">
                  <i-select v-model="formApproval.conclusion">
                    <i-option value="1">通过</i-option>
                    <i-option value="2">拒绝</i-option>
                    <i-option value="3">退回</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="意见信息" prop="opinion" :rules="{required: true, message: '意见信息不能为空', trigger: 'blur'}">
                  <i-input type="textarea" v-model="formApproval.opinion" :rows="2" placeholder="">
                  </i-input>
                </i-form-item>
              </i-col>
            </i-row>
          </bs-form-block>
          <bs-form-block :title="'审核历史意见'">
            <i-table :loading="examineTableLoading" border ref="examineTable" :columns="examineColumns" :data="examineData"></i-table>
          </bs-form-block>
        </i-form>
      </i-tab-pane>
    </i-tabs>
    <div class="form-footer-actions">
      <i-button @click="saveSubimt" :loading="initFormLoading" type="success">
        <span v-if="!initFormLoading"><i class="iconfont icon-tijiao"></i> 提交</span>
        <span v-else> loading...</span>
      </i-button>
    </div>
  </div>
</template>

<script>
  import TabContractInfo from './tab-contract-info';
  import examineMixinData from './examine-mixin-data';
  export default {
    name: 'contractMakingTab',
    mixins: [examineMixinData],
    components: {
      TabContractInfo
    },
    data() {
      return {
        tabIndex: 0,
        initFormLoading: false,
        examineTableLoading: false,
        formApproval: {}
      };
    },
    methods: {
      saveSubimt() {}
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
