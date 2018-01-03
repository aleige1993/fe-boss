<template>
<!--渠道商授信审核-审核-->
  <div id="distributorCreditExamine">
    <i-breadcrumb separator=">">
      <i-breadcrumb-item href="/">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/customer/distributor">渠道商管理</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/customer/distributor/credit">渠道商授信审核</i-breadcrumb-item>
      <i-breadcrumb-item>审核</i-breadcrumb-item>
    </i-breadcrumb>
    <br>
    <br>
    <i-tabs v-model="tabIndex" :animated="false" type="card">
      <i-tab-pane label="额度信息">
        <bs-form-block :title="'额度信息'">
          <i-form ref="formQuota" :model="formQuota" label-position="right" :label-width="120" style="padding: 30px 0;">
            <i-row>
              <i-col span="8">
                <i-form-item label="客户名称">
                  <span v-text="formQuota.corpName"></span>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="8">
                <i-form-item label="客户经理">
                  <span v-text="formQuota.custMgrName"></span>
                </i-form-item>
              </i-col>
            </i-row>
            <!--授信总额度-->
            <br>
            <br>
            <i-row>
              <i-col span="8">
                <i-form-item label="授信总额度" prop="creditTotalLimit">
                  <i-input v-model="formQuota.creditTotalLimit" placeholder="">
                    <span slot="append">元</span>
                  </i-input>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="8">
                <!--可用额度-->
                <i-form-item label="可用额度"><!--currentUsableLimit-->
                  <i-input v-model="formQuota.creditTotalLimit" :readonly="true" placeholder="">
                    <span slot="append">元</span>
                  </i-input>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="8">
                <!--单笔最大额度-->
                <i-form-item label="单笔最大额度" prop="singleUsableLimit">
                  <i-input v-model="formQuota.singleUsableLimit" placeholder="">
                    <!--<span slot="append">元</span>-->
                  </i-input>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="8">
                <!--授信起始日期-->
                <i-form-item label="授信起始日期" prop="creditStartDate">
                  <bs-datepicker v-model="''+formQuota.creditStartDate"></bs-datepicker>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="8">
                <!--授信到期日期-->
                <i-form-item label="授信到期日期" prop="creditEndDate">
                  <bs-datepicker v-model="''+formQuota.creditEndDate"></bs-datepicker>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="8">
                <!--额度释放方式-->
                <i-form-item label="额度释放方式" prop="creditReleaseType">
                  <i-select v-model="formQuota.creditReleaseType">
                    <i-option v-for="item in enumSelectData.get('CreditReleaseTypeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
            </i-row>
          </i-form>
        </bs-form-block>
        <bs-form-block :title="'审核意见'">
          <i-form ref="approveDto" :model="approveDto" label-position="right" :label-width="120">
            <i-row>
              <!--<i-col span="8">
                <i-form-item label="处理人" prop="auditUserName">
                  <i-input v-model="formQuota.auditUserName" :readonly="true" placeholder="">
                  </i-input>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="处理时间" prop="auditEndTime">
                  <bs-datepicker v-model="formQuota.auditEndTime" type="text" placeholder="申请时间"></bs-datepicker>
                </i-form-item>
              </i-col>-->
              <i-col span="8">
                <i-form-item label="结论" prop="auditStatus"
                             :rules="{required: true, message: '结论不能为空', trigger: 'change'}">
                  <i-radio-group v-model="approveDto.auditStatus">
                    <i-radio v-for="item in enumSelectData.get('ApproveStatusEnum')" :label="item.itemCode" :key="item.itemCode" style="margin-right: 20px; margin-top: -5px">{{item.itemName}}</i-radio>
                  </i-radio-group>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="8">
                <i-form-item label="意见信息" prop="auditOpinion" :rules="{required: true, message: '意见信息不能为空', trigger: 'blur'}">
                  <i-input type="textarea" v-model="approveDto.auditOpinion" :rows="2" placeholder="">
                  </i-input>
                </i-form-item>
              </i-col>
            </i-row>
          </i-form>
        </bs-form-block>
      </i-tab-pane>
      <i-tab-pane label="审核历史信息">
        <table-examine-history if="tabIndex===1"></table-examine-history>
      </i-tab-pane>
      <div class="form-footer-actions">
        <i-button type="primary" @click="submitFun" :loading="btnLoading">
          <span v-if="!btnLoading">提交审核</span>
          <span v-else>正在提交审核...</span>
        </i-button>
        <i-button type="ghost" @click="cancelFun" style="margin-left: 8px">取消</i-button>
      </div>
    </i-tabs>
  </div>

</template>

<script>
  import tableExamineHistory from '../table-examine-history';
  export default {
    name: 'distributorCreditExamine',
    components: {
      tableExamineHistory
    },
    data() {
      return {
        tabIndex: 0,
        btnLoading: false,
        formQuota: {
          corpName: '',
          custMgrName: '',
          custMgrNo: '',
          CreditMoney: '', // 授信总额度
          currentUsableLimit: '', // 可用额度（自动带入授信总额度）
          startDate: '', // 授信起始日期
          endDate: '', // 授信起始日期
          CreditOpenModel: '' // 额度释放方式
        },
        approveDto: {
          auditStatus: '',
          auditOpinion: ''
        }
      };
    },
    mounted() {
      this.getCreditData();
    },
    methods: {
      // 获取渠道商授信申请信息
      async getCreditData() {
        let resp = await this.$http.post('merchant/credit/get', {
          merchantNo: this.$route.query.merchantNo,
          applyNo: this.$route.query.applyNo
        });
        if (resp.success) {
          this.$data.formQuota = resp.body;
        } else {
          this.$Message.error('获取渠道商授信申请信息失败！');
        }
      },
      // 审核提交
      async submiting() {
        this.$data.btnLoading = true;
        let resp = await this.$http.post('merchant/credit/approveSubmit', {
          applyDto: this.$data.formQuota,
          approveDto: this.$data.approveDto
        });
        this.$data.btnLoading = false;
        if (resp.success) {
          this.$Message.success('已提交审核');
          await bsWait(1000);
          this.$router.push({
            path: '/index/customer/distributor/credit',
            query: {
              currentPage: 1
            }
          });
        }
      },
      submitFun() {
        this.$refs['approveDto'].validate((valid) => {
          if (valid) {
            this.submiting();
          } else {
            this.$Message.error('"<span style="color: red">*</span>"必填项不能为空');
          }
        });
      },
      cancelFun() {
        this.$router.push({
          path: '/index/customer/distributor/credit',
          query: {
            currentPage: 1
          }
        });
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
