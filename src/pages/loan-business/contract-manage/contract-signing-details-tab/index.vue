<template>
  <!--合同签署确认详情页面-->
<div id="contract-signing-details-tab">
  <i-breadcrumb separator=">">
    <i-breadcrumb-item href="/">首页</i-breadcrumb-item>
    <i-breadcrumb-item href="/index/loanbusiness">贷款业务</i-breadcrumb-item>
    <i-breadcrumb-item href="/index/loanbusiness/contract/sign">签约管理</i-breadcrumb-item>
    <i-breadcrumb-item>合同签署确认详情</i-breadcrumb-item>
  </i-breadcrumb>
  <i-tabs v-model="tabIndex" :animated="false" type="card">
    <i-tab-pane label="签约确认信息">
      <i-form inline ref="formData" :moedl="formData" label-position="right" :label-width="100" style="padding-top: 20px">
        <i-row>
          <i-col span="8">
            <i-form-item label="项目编号">
              <span v-text="formData.loanNo"></span>
            </i-form-item>
          </i-col>
          <i-col span="8">
            <i-form-item label="签约编号">
              <span v-text="formData.signNo"></span>
            </i-form-item>
          </i-col>
        </i-row>
        <!--客户信息-->
        <bs-form-block :title="'客户信息'">
          <i-row>
            <i-col span="8">
              <i-form-item label="姓名">
                <span v-text="formData.custName"></span>
              </i-form-item>
            </i-col>
            <i-col span="8">
              <i-form-item label="证件类型">
                <span v-text="enumCode2Name(formData.certType, 'CertTypeEnum')"></span>
              </i-form-item>
            </i-col>
            <i-col span="8">
              <i-form-item label="证件号码">
                <span v-text="formData.certNo"></span>
              </i-form-item>
            </i-col>
          </i-row>
          <i-row>
            <i-col span="8">
              <i-form-item label="联系电话">
                <span v-text="formData.tel"></span>
              </i-form-item>
            </i-col>
            <i-col span="8">
              <i-form-item label="联系地址">
                <span v-text="formData.addr"></span>
              </i-form-item>
            </i-col>
          </i-row>
        </bs-form-block>
        <!--合同信息-->
        <bs-form-block :title="'合同信息'">
          <i-table border :loading="contractInfoListLoading" ref="contractInfoTable" :columns="contractInfoColumns" :data="formData.contractList">
          </i-table>
        </bs-form-block>
      </i-form>
      <bs-form-block :title="'审核意见'">
        <i-form ref="loanApprove" :model="loanApprove" label-position="right" :label-width="100">
          <i-row>
            <i-col span="8">
              <i-form-item label="结论" prop="approveStatus" :rules="{required: true, message: '结论不能为空', trigger: 'change'}">
                <i-radio-group v-model="loanApprove.approveStatus">
                  <i-radio v-for="item in enumSelectData.get('ApproveStatusEnum')" :label="item.itemCode" :key="item.itemCode" style="margin-right: 20px; margin-top: -5px">{{item.itemName}}</i-radio>
                </i-radio-group>
              </i-form-item>
            </i-col>
          </i-row>
          <i-row>
            <i-col span="8">
              <i-form-item label="意见信息" prop="opinion" :rules="{required: true, message: '意见信息不能为空', trigger: 'blur'}">
                <i-input type="textarea" v-model="loanApprove.opinion" :rows="2" placeholder="">
                </i-input>
              </i-form-item>
            </i-col>
          </i-row>
        </i-form>
      </bs-form-block>
    </i-tab-pane>
    <i-tab-pane label="审批历史信息">
      <div  v-if="tabIndex===1">
        <i-table :loading="examineTableLoading" border ref="examineTable" :columns="examineColumns" :data="examineData"></i-table>
        <div class="page-container">
          <i-page @on-change="jumpPageExamine" :total="totalExamine" :page-size="pageSizeExamine" size="small" show-elevator show-total></i-page>
        </div>
      </div>
    </i-tab-pane>
    <div class="form-footer-actions">
      <i-button @click="saveSubimt" :loading="initFormLoading" type="success">
        <span v-if="!initFormLoading"><i class="iconfont icon-tijiao"></i> 提交</span>
        <span v-else> loading...</span>
      </i-button>
    </div>
  </i-tabs>
</div>
</template>

<script>
  import MixinData from './mixin-data';
  import examineMixinData from './examine-mixin-data';
  export default {
    name: 'contractSigningDetailsTab',
    mixins: [MixinData, examineMixinData],
    data() {
      return {
        tabIndex: 0,
        currentPageExamine: 1,
        pageSizeExamine: 15,
        totalExamine: 0,
        examineTableLoading: false,
        contractInfoListLoading: false,
        initFormLoading: false,
        formData: {
          'certNo': '',
          'custNo': '',
          'certType': '',
          'loanNo': '',
          'contractList': [
            {
              'signContractDate': '',
              'loanNo': '',
              'endDate': '',
              'contractNo': '',
              'makeContractUrl': '',
              'signStatus': '',
              'pkNo': '',
              'signMode': '',
              'signContractUrl': '',
              'contractName': '',
              'makeSystem': '',
              'onlineSignStatus': '',
              'startDate': ''
            }
          ],
          'tel': '',
          'signNo': '',
          'custName': '',
          'addr': ''
        },
        loanApprove: {
          'approveStatus': '',
          'opinion': ''
        }
      };
    },
    async mounted() {
      await this.getFindSignConfirmInfo(); // 获取合同签约确认详情
      this.examineGetlist(); // 获取审批历史信息列表data
    },
    methods: {
      // 获取合同签约确认详情
      async getFindSignConfirmInfo() {
        let reps = await this.$http.post('/biz/sign/findSignConfirmInfo', {
          signNo: this.$route.query.signNo
        });
        console.log(reps);
        if (reps.success) {
          this.$data.formData = reps.body;
        } else {
          this.$data.formData = {};
        }
      },
      // 获取审批信息列表的data
      async examineGetlist(page) {
        this.$data.examineTableLoading = true;
        if (page) {
          this.$data.currentPageExamine = page;
        }
        let reps = await this.$http.post('biz/listApproveHistory', {
          loanNo: this.$route.query.loanNo,
          currentPage: this.$data.currentPageExamine,
          pageSize: this.$data.pageSizeExamine
        });
        this.$data.examineTableLoading = false;
        if (reps.success) {
          if (reps.body.resultList.length !== 0) {
            this.$data.examineData = reps.body.resultList;
            this.$data.currentPageExamine = reps.body.currentPage;
            this.$data.totalExamine = reps.body.totalNum;
          } else {
            this.$data.examineData = [];
          }
        } else {
          this.$data.examineData = [];
        }
      },
      jumpPageExamine(page) {
        this.examineGetlist(page);
      },
      async saveAjax() {
        this.$data.initFormLoading = true;
        let resp = await this.$http.post('/biz/sign/signConfirm', {
          signNo: this.$route.query.signNo,
          contractSignConfirmStatusParams: this.$data.formData.contractList,
          loanApprove: this.$data.loanApprove
        });
        this.$data.initFormLoading = false;
        if (resp.success) {
          this.$Message.success('提交成功！');
        }
      },
      async saveSubimt() {
        this.$refs['loanApprove'].validate(async (valid) => {
          if (valid) {
            await this.saveAjax();
          } else {
            this.$Message.error('"<span style="color: red">*</span>"必填项不能为空');
          }
        });
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
