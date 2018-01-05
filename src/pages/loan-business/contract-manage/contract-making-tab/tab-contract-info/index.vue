<template>
  <!--个人业务合同制作-合同信息-->
<div id="tab-contract-info">
  <i-form inline label-position="right" :label-width="100" style="padding-top: 20px">
    <i-row>
      <i-col span="8">
        <i-form-item label="项目编号">
          <span v-text="contractInfoForm.loanNo"></span>
        </i-form-item>
      </i-col>
      <i-col span="8">
        <i-form-item label="签约编号">
          <span v-text="contractInfoForm.signNo"></span>
        </i-form-item>
      </i-col>
      <i-col span="8">
        <i-form-item label="经销商">
          <span v-text="contractInfoForm.merchantName"></span>
        </i-form-item>
      </i-col>
    </i-row>
    <!--客户信息-->
    <bs-form-block :title="'客户信息'">
      <i-row>
        <i-col span="8">
          <i-form-item label="姓名">
            <span v-text="contractInfoForm.custName"></span>
          </i-form-item>
        </i-col>
        <i-col span="8">
          <i-form-item label="证件类型">
            <span v-text="enumCode2Name(contractInfoForm.certType, 'CertTypeEnum')"></span>
          </i-form-item>
        </i-col>
        <i-col span="8">
          <i-form-item label="证件号码">
            <span v-text="contractInfoForm.certNo"></span>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="8">
          <i-form-item label="联系电话">
            <span v-text="contractInfoForm.tel"></span>
          </i-form-item>
        </i-col>
        <i-col span="8">
          <i-form-item label="联系地址">
            <span v-text="contractInfoForm.addr"></span>
          </i-form-item>
        </i-col>
      </i-row>
    </bs-form-block>
  </i-form>
  <!--车辆信息-->
  <bs-form-block :title="'车辆信息'">
    <i-table border :loading="carListLoading" ref="proTable" :columns="carColumns" :data="carData"></i-table>
  </bs-form-block>
  <!--担保信息-->
  <bs-form-block :title="'担保信息'">
    <i-table border :loading="guaPersonListLoading" ref="proTable" :columns="guaPersonColumns" :data="guaPersonData"></i-table>
  </bs-form-block>
  <!--借款信息-->
  <bs-form-block :title="'借款信息'">
    <i-form inline label-position="right" :label-width="100">
      <i-row>
        <i-col span="8">
          <i-form-item label="车价总额">
            <span v-text="approveCredit.carTotalAmt"></span>
          </i-form-item>
        </i-col>
        <i-col span="8">
          <i-form-item label="贷款总额">
            <span v-text="approveCredit.approveLimitAmt"></span>
          </i-form-item>
        </i-col>
        <i-col span="8">
          <i-form-item label="车辆用途">
            <span v-text="enumCode2Name(approveCredit.carUse, 'CarUseTypeEnum')"></span>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="8">
          <i-form-item label="产品名称">
            <span v-text="approveCredit.productName"></span>
          </i-form-item>
        </i-col>
        <i-col span="8">
          <i-form-item label="期数">
            <span v-text="approveCredit.loanPeriods"></span>
          </i-form-item>
        </i-col>
        <i-col span="8">
          <i-form-item label="借款用途">
            <span v-text="enumCode2Name(approveCredit.loanRealUse, 'LoanApplyUseEnum')"></span>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="8">
          <i-form-item label="利率模式">
            <span v-text="approveCredit.interestType"></span>
          </i-form-item>
        </i-col>
        <i-col span="8">
          <i-form-item label="颂车利率">
            <span v-text="approveCredit.loanRealRate"></span>
          </i-form-item>
        </i-col>
        <i-col span="8">
          <i-form-item label="还款方式">
            <span v-text="enumCode2Name(approveCredit.repaymentMode, 'RepaymentTypeEnum')"></span>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="8">
          <i-form-item label="车辆保险费">
            <span v-text="approveCredit.carInsurance"></span>
          </i-form-item>
        </i-col>
        <i-col span="8">
          <i-form-item label="盗抢险">
            <span v-text="approveCredit.dqxInsurance"></span>
          </i-form-item>
        </i-col>
        <i-col span="8">
          <i-form-item label="运营模式">
            <span v-text="enumCode2Name(approveCredit.operatingMode, 'OperatingModeEnum')"></span>
          </i-form-item>
        </i-col>
      </i-row>
    </i-form>
  </bs-form-block>
  <!--费用收取方案-->
  <bs-form-block :title="'费用收取方案'">
    <i-table border :loading="feeTakeLoading" ref="proTable" :columns="feeTakeColumns" :data="feeTakeData"></i-table>
  </bs-form-block>
  <!--放款账户信息-->
  <bs-form-block :title="'放款账户信息'">
    <i-form inline label-position="right" :label-width="100">
      <i-row>
        <i-col span="8">
          <i-form-item label="账户名">
            <span v-text="contractInfoForm.loanAccount.loanAcctName"></span>
          </i-form-item>
        </i-col>
        <i-col span="8">
          <i-form-item label="账号">
            <span v-text="contractInfoForm.loanAccount.loanAcctNo"></span>
          </i-form-item>
        </i-col>
        <i-col span="8">
          <i-form-item label="开户银行">
            <span v-text="contractInfoForm.loanAccount.loanOpenBankName"></span>
          </i-form-item>
        </i-col>
      </i-row>
    </i-form>
  </bs-form-block>
  <!--还款账户信息-->
  <bs-form-block :title="'还款账户信息'">
    <i-form inline label-position="right" :label-width="100">
      <i-row>
        <i-col span="8">
          <i-form-item label="账户名">
            <span v-text="contractInfoForm.repayAccount.repayAcctName"></span>
          </i-form-item>
        </i-col>
        <i-col span="8">
          <i-form-item label="账号">
            <span v-text="contractInfoForm.repayAccount.repayAcctNo"></span>
          </i-form-item>
        </i-col>
        <i-col span="8">
          <i-form-item label="开户银行">
            <span v-text="contractInfoForm.repayAccount.repayOpenBankName"></span>
          </i-form-item>
        </i-col>
      </i-row>
    </i-form>
  </bs-form-block>
  <!--合同信息-->
  <bs-form-block :title="'合同信息'">
    <i-form inline ref="contractInfoForm" :model="contractInfoForm" :label-width="100" label-position="right">
      <i-row>
        <i-col span="4">
          <i-form-item
            v-if="!isDetails"
            :rules="{required: true, message: '请选择合同开始日期', trigger: 'change'}"
            prop="contractInfo.startDate"
            label="合同开始日期">
            <bs-datepicker v-model="contractInfoForm.contractInfo.startDate"></bs-datepicker>
          </i-form-item>
          <i-form-item
            v-else
            prop="startDate"
            label="合同开始日期">
            <span v-text="contractInfoForm.contractInfo.startDate"></span>
          </i-form-item>
        </i-col>
        <i-col span="4">
          <i-form-item
            v-if="!isDetails"
            :rules="{required: true, message: '请选择合同结束日期', trigger: 'change'}"
            prop="contractInfo.endDate"
            label="合同结束日期">
            <bs-datepicker v-model="contractInfoForm.contractInfo.endDate"></bs-datepicker>
          </i-form-item>
          <i-form-item
            v-else
            prop="endDate"
            label="合同结束日期">
            <span v-text="contractInfoForm.contractInfo.endDate"></span>
          </i-form-item>
        </i-col>
      </i-row>
    </i-form>
    <div class="form-top-actions" style="padding-top:0;">
      <i-button v-if="!isDetails" @click="contractGenerating" type="info"><i class="iconfont icon-xinzeng"></i> 生成合同</i-button>
    </div>
    <i-table border :loading="contractInfoListLoading" ref="contractInfoTable" :columns="contractInfoColumns" :data="contractInfoData">
    </i-table>
  </bs-form-block>
  <!--审核意见-->
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
</div>
</template>

<script>
  import MixinData from './mixin-data';
  export default {
    name: 'tabContractInfo',
    mixins: [MixinData],
    props: {
      CreateRepayPlan: {
        type: Object,
        default: {
          isCapital: false,
          isRental: false
        }
      }
    },
    data() {
      return {
        isDetails: false,
        carListLoading: false, // 车辆表loading
        guaPersonListLoading: false, // 担保信息表loading
        feeTakeLoading: false, // 费用收取表loading
        contractInfoListLoading: false, // 合同信息表loading
        // 借款信息
        approveCredit: {},
        // 合同信息
        contractInfoForm: {
          'certNo': '',
          'certType': '',
          'custNo': '',
          'loanNo': '',
          'signNo': '',
          'merchantNo': '',
          'custName': '',
          'tel': '',
          'addr': '',
          'merchantName': '',
          'contractInfo': {
            'endDate': '',
            'startDate': '',
            // 合同附件集合
            'loanContractFileList': [
              {
                'contractNo': '',
                'makeContractUrl': '',
                'contractName': '',
                'makeSystem': '',
                'signMode': ''
              }
            ]
          },
         /* // 租金还款计划集合
          'repayPlanRentalList': [
            {
              'repayTotalAmt': '',
              'repayRate': '',
              'nowPeriods': '',
              'repayDate': '',
              'repayAmt': ''
            }
          ],*/
          /* // 资金方还款计划集合
          'repayPlanCapitalList': [
            {
              'repayTotalAmt': '',
              'repayRate': '',
              'nowPeriods': '',
              'repayDate': '',
              'repayAmt': ''
            }
          ],*/
          // 放款账户信息
          'loanAccount': {
            'loanAcctNo': '',
            'loanAcctName': '',
            'loanOpenBankName': ''
          },
          // 还款账户信息
          'repayAccount': {
            'repayAcctNo': '',
            'repayAcctName': '',
            'repayOpenBankName': ''
          },
          // 审批参数信息
          'loanApprove': {
            'approveStatus': '',
            'opinion': ''
          }
        },
        loanApprove: {
          'approveStatus': '',
          'opinion': ''
        }
      };
    },
    async mounted() {
      if (this.$route.query.isDetails === 'false' || !this.$route.query.isDetails) {
        this.$data.isDetails = false;
      } else {
        this.$data.isDetails = true;
      }
      let loanNo = await this.$route.query.loanNo;
      this.$data.contractInfoForm.loanNo = loanNo;
      await this.getfindContractApproveInfo(); //  获取合同信息详情
      this.getApproveCredit(); //  获取借款信息详情
      this.getCarList(); // 获取车辆信息列表data
      this.getGuaPersonList(); // 获取担保信息列表data
      this.getFeeTakeList(); // 查询费用收取方案列表data
    },
    methods: {
      //  获取合同信息详情
      async getfindContractApproveInfo() {
        let resp = await this.$http.post('/biz/sign/contract/findContractApproveInfo', {
          loanNo: this.$data.contractInfoForm.loanNo
        });
        if (resp.success) {
          this.$data.contractInfoForm = resp.body;
          if (this.$data.contractInfoForm.contractInfo.loanContractFileList.length !== 0) {
            this.$data.contractInfoData = this.$data.contractInfoForm.contractInfo.loanContractFileList;
          } else {
            this.$data.contractInfoData = [];
          }
        }
      },
      //  获取借款信息详情
      async getApproveCredit() {
        let resp = await this.$http.post('biz/getApproveCredit', {
          loanNo: this.$data.contractInfoForm.loanNo
        });
        if (resp.success) {
          this.$data.approveCredit = resp.body;
        }
      },
      // 查询费用收取方案列表data
      async getFeeTakeList() {
        this.$data.feeTakeLoading = true;
        let resp = await this.$http.post('/biz/listApproveFeePlan', {
          loanNo: this.$data.contractInfoForm.loanNo
        });
        this.$data.feeTakeLoading = false;
        if (resp.success) {
          if (resp.body.length !== 0) {
            this.$data.feeTakeData = resp.body;
          } else {
            this.$data.feeTakeData = [];
          }
        }
      },
      // 获取车辆信息列表data
      async getCarList() {
        this.$data.carListLoading = true;
        let resp = await this.$http.post('/biz/listLoanCarByLoanNo', {
          currentPage: 1,
          pageSize: 9999,
          loanNo: this.$data.contractInfoForm.loanNo
        });
        this.$data.carListLoading = false;
        if (resp.success) {
          if (resp.body.resultList.length !== 0) {
            this.$data.carData = resp.body.resultList;
          } else {
            this.$data.carData = [];
          }
        }
      },
      // 获取担保信息列表data
      async getGuaPersonList() {
        this.$data.guaPersonListLoading = true;
        let resp = await this.$http.post('/biz/listGuaranteeByLoanNo', {
          loanNo: this.$data.contractInfoForm.loanNo
        });
        this.$data.guaPersonListLoading = false;
        if (resp.success) {
          if (resp.body.resultList.length !== 0) {
            this.$data.guaPersonData = resp.body.resultList;
          } else {
            this.$data.guaPersonData = [];
          }
        }
      },
      // 生成合同
      contractGenerating() {
        const formName = 'contractInfoForm';
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$data.contractInfoForm.loanApprove = this.$data.loanApprove;
            // console.log(this.CreateRepayPlan); // isCapital(资金方)，isRental(租金方)，
            if (!this.CreateRepayPlan.isCapital) {
              this.$Message.error({
                content: '请生成资金方还款计划',
                duration: 2
              });
              return;
            } else if (!this.CreateRepayPlan.isRental) {
              this.$Message.error({
                content: '请生成租金方还款计划',
                duration: 2
              });
              return;
            }
            alert('生成合同');
          } else {
            this.$Message.error('"<span style="color: red">*</span>"必填项不能为空');
          }
        });
      },
      // 点击提交审核 通过父组件来通知此事件触发
      loanApproveSumbit() {
        let returnRef = null;
        const formName = 'loanApprove';
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$data.contractInfoForm.loanApprove = this.$data.loanApprove;
            returnRef = this.$data.contractInfoForm;
          } else {
            this.$Message.error({
              content: '合同信息中审核意见的“结论”和“意见信息”项不能为空',
              duration: 2
            });
          }
        });
        return returnRef;
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
