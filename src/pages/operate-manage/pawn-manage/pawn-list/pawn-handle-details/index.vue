<template>
<!--抵押物办理详情-->
  <div id="pawnHanleDetails">
    <i-breadcrumb separator=">">
      <i-breadcrumb-item href="/home">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/operate">运营管理</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/operate/pawn">抵押物待办列表</i-breadcrumb-item>
      <i-breadcrumb-item>抵押物办理详情</i-breadcrumb-item>
    </i-breadcrumb>
    <i-tabs v-model="tabIndex" :animated="false" type="card">
      <i-tab-pane label="基本信息">
        <i-form ref="formData" :model="formData" label-position="right" :label-width="120">
          <bs-form-block :title="'借款信息'">
            <i-row>
              <i-col span="8">
                <i-form-item label="项目编号">
                  <span v-text="formData.loanNo"></span>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="经销商">
                  <span v-text="formData.merchantName"></span>
                </i-form-item>
              </i-col>
            </i-row>
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
                  <span v-text="formData.telPhone"></span>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="联系地址">
                  <span v-text="formData.addr"></span>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="8">
                <i-form-item label="产品">
                  <span v-text="formData.productName"></span>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="期数(月)">
                  <span v-text="formData.totalPeriods"></span>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="借款金额(元)">
                  <span v-text="formData.loanTotalAmt"></span>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="8">
                <i-form-item label="运营模式">
                  <span v-text="enumCode2Name(formData.operatingMode, 'OperatingModeEnum')"></span>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="合同起始日">
                  <span v-text="formData.contractStartDate"></span>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="合同到期日">
                  <span v-text="formData.contractEndDate"></span>
                </i-form-item>
              </i-col>
            </i-row>
          </bs-form-block>
          <bs-form-block :title="'车辆信息'">
            <i-table :loading="carDataLoading" border ref="selection" :columns="carColumns" :data="carData"></i-table>
          </bs-form-block>
        </i-form>
      </i-tab-pane>
      <div class="form-footer-actions">
        <i-button @click="saveSubimt" :loading="initFormLoading" type="success">
          <span v-if="!initFormLoading"><i class="iconfont icon-tijiao"></i> 提交</span>
          <span v-else> loading...</span>
        </i-button>
      </div>
    </i-tabs>
    <!--办理抵质押物手续-->
    <bs-modal v-model="formalitiesShowModal" title="办理抵质押物手续" :width="520">
      <i-form v-if="formalitiesShowModal" ref="formalities" :model="formalities" label-position="right" :label-width="80">
        <i-form-item label="办理时间"
                     prop="makeDate"
                     :rules="{required: true, message: '办理时间不能为空', trigger: 'blur'}">
          <bs-datepicker v-model="formalities.makeDate" type="text" placeholder="办理时间"></bs-datepicker>
        </i-form-item>
        <i-form-item label="经办人"
                     prop="makeUser"
                     :rules="{required: true, message: '经办人不能为空', trigger: 'blur'}">
          <i-input v-model="formalities.makeUser" placeholder=""></i-input>
        </i-form-item>
        <i-form-item label="权证编号"
                     prop="warrantNo"
                     :rules="{required: true, message: '权证编号不能为空', trigger: 'blur'}">
          <i-input v-model="formalities.warrantNo" placeholder=""></i-input>
        </i-form-item>
        <i-form-item label="登记机关"
                     prop="registerCompany"
                     :rules="{required: true, message: '登记机关不能为空', trigger: 'blur'}">
          <i-input v-model="formalities.registerCompany" placeholder=""></i-input>
        </i-form-item>
        <i-form-item label="抵押状态"
                     prop="mortgageStatus"
                     :rules="{required: true, message: '请选择抵押状态', trigger: 'change'}">
          <i-select v-model="formalities.mortgageStatus">
            <i-option v-for="item in enumSelectData.get('MortgageStatusEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
          </i-select>
        </i-form-item>
        <i-form-item label="备注"
                     prop="remark">
          <i-input type="textarea" :rows="2" v-model="formalities.remark" placeholder=""></i-input>
        </i-form-item>
        <i-form-item
          label="办理文件"
          prop="makeUrl"
          :rules="{required: true, message: '请上传办理文件', trigger: 'blur'}">
          <i-upload
            :show-upload-list="false"
            :on-success="uploadSuccessAlities"
            :before-upload="uploadBefore"
            :on-error="uploadErrorAlities"
            type="drag"
            :action="$config.HTTPBASEURL + '/common/upload'">
            <div style="padding: 20px 0">
              <i-icon type="ios-cloud-upload" size="52" style="color: #3399ff"></i-icon>
              <p>单击或拖动文件上传</p>
              <i-spin fix v-if="fileUploading">
                <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                <div style="margin-top: 10px">正在上传中，请勿关闭...</div>
              </i-spin>
            </div>
          </i-upload>
          <p class="show-upload-text" v-text="formalities.makeName"></p>
          <input type="hidden" v-model="formalities.makeUrl" style="width: 100%;border: 0;">
        </i-form-item>
        <i-form-item class="text-right">
          <i-button type="primary" @click="formalitiesSubmit">提交</i-button>
        </i-form-item>
      </i-form>
    </bs-modal>
  </div>
</template>

<script>
  import BsModal from '@/components/bs-modal';
  import MixinData from './mixin-data';
  export default {
    name: 'pawnHanleDetails',
    mixins: [MixinData],
    components: {
      BsModal
    },
    data() {
      return {
        tabIndex: 0,
        carDataLoading: false,
        initFormLoading: false,
        formalitiesShowModal: false,
        fileUploading: false,
        clickRow: {},
        formData: {
          'gmtModified': '',
          'loanNo': '',
          'productName': '',
          'totalPeriods': '',
          'merchantName': '',
          'telPhone': '',
          'backDate': '',
          'modifiedUserCode': '',
          'id': '',
          'addr': '',
          'productNo': '',
          'custNo': '',
          'operatingMode': '',
          'handleUserName': '',
          'contractStartDate': '',
          'createUserCode': '',
          'contractEndDate': '',
          'custName': '',
          'gmtCreate': '',
          'surplusBackDays': '',
          'paymentNo': '',
          'certNo': '',
          'handleUserCode': '',
          'loanTotalAmt': '',
          'paymentDate': '',
          'backDays': '',
          'merchantNo': '',
          'status': ''
        },
        // 办理抵质押物手续
        formalities: {
          'makeName': '',
          'makeUrl': '',
          'makeDate': '',
          'makeUser': '',
          'warrantNo': '',
          'registerCompany': '',
          'mortgageStatus': '',
          'remark': ''
        }
      };
    },
    mounted() {
      this.findPaymentWaitDonePawnById(); // 执行获取抵押物处理详情
      this.carGetlist(); // 执行获取车辆信息列表的data
    },
    methods: {
      // 获取抵押物处理详情
      async findPaymentWaitDonePawnById() {
        let reps = await this.$http.post('/biz/payment/findPaymentWaitDonePawnById', {
          id: this.$route.query.id
        });
        if (reps.success) {
          this.$data.formData = reps.body;
        } else {
          this.$data.formData = {};
        }
      },
      // 获取车辆信息列表的data
      async carGetlist() {
        this.$data.carDataLoading = true;
        let reps = await this.$http.post('/biz/listLoanCarByLoanNo', {
          loanNo: this.$route.query.loanNo
        });
        this.$data.carDataLoading = false;
        if (reps.success) {
          this.$data.carData = reps.body.resultList;
        } else {
          this.$data.carData = [];
        }
      },
      // 办理抵质押物手续modal-提交按钮
      formalitiesSubmit() {
        let ind = this.$data.clickRow._index; // 车辆列表的索引index
        this.$refs['formalities'].validate(async (valid) => {
          if (valid) {
            this.$data.formalitiesShowModal = false;
            this.$set(this.$data.carData, ind, this.$data.formalities);
            this.$Message.success('提交成功');
          } else {
            this.$Message.error('<span style="color: red">*</span>项不能为空');
          }
        });
      },
      // 提交的ajax
      async allSubimt() {
        let rep = await this.$http.post('/biz/payment/handlePawn', {
          id: this.$route.query.id,
          loanCarList: this.$data.carData // 车辆信息表集合
        });
        if (rep.success) {
          this.$Message.success('提交成功');
          this.$router.push({
            path: '/index/operate/pawn',
            query: {
              currentPage: this.$route.query.currentPage || 1
            }
          });
        }
      },
      // 所有的提交按钮
      async saveSubimt() {
        // 车辆信息中的抵押状态必须都是“已抵押”状态！
        let isMortgageStatus = this.$data.carData.some(item => {
          return item.mortgageStatus === '0' || (typeof item.mortgageStatus === 'undefined');
        });
        if (isMortgageStatus) {
          this.$Message.error({
            content: '车辆信息中的抵押状态必须都是“已抵押”状态！',
            duration: 2
          });
          return;
        }
        this.$data.initFormLoading = true;
        await this.allSubimt();
        this.$data.initFormLoading = false;
      },
      // 上传文件之前的回掉
      uploadBefore() {
        this.$data.fileUploading = true;
      },
      // 办理抵质押物手续文件上传成功
      uploadSuccessAlities(res, file, fileList) {
        this.$data.formalities.makeName = file.name;
        this.$data.formalities.makeUrl = res.body.url;
        this.$data.fileUploading = false;
      },
      // 办理抵质押物手续文件上传失败
      uploadErrorAlities(err, file, fileList) {
        this.$data.formalities.makeName = '';
        this.$Notice.error({
          title: '错误提示', desc: err
        });
        this.$data.fileUploading = false;
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  #pawnHanleDetails {
    & .show-upload-text {
      position: relative;
      padding-right: 36px;
      line-height: 20px;
      min-height: 20px;
      color: #666;
    }
  }
</style>
