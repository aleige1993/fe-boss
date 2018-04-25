<template>
<!--抵押物办理详情-->
  <div id="pawnHanleDetails">
    <i-breadcrumb separator=">">
      <i-breadcrumb-item href="/home">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/operate">运营管理</i-breadcrumb-item>
      <i-breadcrumb-item v-if="!detail" href="/index/operate/pawn">权证待办列表</i-breadcrumb-item>
      <i-breadcrumb-item v-else="" href="/index/operate/pawn/finished">权证已办列表</i-breadcrumb-item>
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
            <div class="scrollBarStyle" style="width: 100%; overflow-x: auto">
              <i-table :loading="carDataLoading" border ref="selection" :columns="carColumns" :data="carData"></i-table>
            </div>
          </bs-form-block>
        </i-form>
      </i-tab-pane>
      <div v-if="!details" class="form-footer-actions">
        <i-button @click="saveSubimt" :loading="initFormLoading" type="success">
          <span v-if="!initFormLoading"><i class="iconfont icon-tijiao"></i> 提交</span>
          <span v-else> loading...</span>
        </i-button>
      </div>
    </i-tabs>
    <!--办理抵质押物手续-->
    <bs-modal v-model="formalitiesShowModal" title="办理抵质押物手续" :width="1200" @on-close="emptyRowPic">
      <i-form v-if="formalitiesShowModal" ref="formalities" :model="formalities" label-position="right" :label-width="80">
        <i-row>
          <i-col span="12">
            <i-form-item label="抵押状态">
              <span v-text="enumCode2Name('1', 'MortgageStatusEnum')"></span>
            </i-form-item>
          </i-col>
          <i-col span="12">
            <i-form-item label="经办人"
                         prop="makeUser"
                         :rules="{required: true, message: '经办人不能为空', trigger: 'blur'}">
              <span v-if="details" v-text="formalities.makeUser"></span>
              <i-input v-else v-model="formalities.makeUser" placeholder=""></i-input>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row>
          <i-col span="12">
            <i-form-item label="办理时间"
                         prop="makeDate"
                         :rules="{required: true, message: '办理时间不能为空', trigger: 'blur'}">
              <span v-if="details" v-text="formalities.makeDate"></span>
              <bs-datepicker v-else v-model="formalities.makeDate" type="text" placeholder="办理时间"></bs-datepicker>
            </i-form-item>
          </i-col>
          <i-col span="12">
            <i-form-item label="权证编号"
                         prop="warrantNo"
                         :rules="{required: true, message: '权证编号不能为空', trigger: 'blur'}">
              <span v-if="details" v-text="formalities.warrantNo"></span>
              <i-input  v-else v-model="formalities.warrantNo" placeholder=""></i-input>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row>
          <i-col span="12">
            <i-form-item label="登记机关"
                         prop="registerCompany"
                         :rules="{required: true, message: '登记机关不能为空', trigger: 'blur'}">
              <span v-if="details" v-text="formalities.registerCompany"></span>
              <i-input v-else v-model="formalities.registerCompany" placeholder=""></i-input>
            </i-form-item>
          </i-col>
          <i-col span="12">
            <i-form-item label="备注"
                         prop="remark">
              <span v-if="details" v-text="formalities.remark"></span>
              <i-input v-else type="textarea" :rows="2" v-model="formalities.remark" placeholder=""></i-input>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row>
          <i-col span="24">
            <i-form-item
              label="办理文件"
              :rules="{required: true, message: '至少上传一份办理文件！', trigger: 'blur'}"
              prop="mortgageUrl">
              <input type="hidden" v-model="formalities.mortgageUrl">
              <mortgage-picture-list :details="details" ref="mortgagePictureList" :regularText="'@'" :picData="mortgageList" @on-data-remove="picDataRomove"  @on-data-add="picDataAdd"></mortgage-picture-list>
            </i-form-item>
          </i-col>
        </i-row>
        <i-form-item v-if="!details" class="text-right">
          <i-button :loading="uploadState" type="primary" @click="formalitiesSubmit">提交</i-button>
        </i-form-item>
      </i-form>
    </bs-modal>
  </div>
</template>

<script>
  import BUS from '@/bus/index.js';
  import BsModal from '@/components/bs-modal';
  import MixinFilePicUpload from '../../../file-pic-upload-mixin'; // 抵押物办理文件 单张变多张上传
  import MixinData from './mixin-data';
  export default {
    name: 'pawnHanleDetails',
    mixins: [MixinData, MixinFilePicUpload],
    components: {
      BsModal,
      MixinFilePicUpload
    },
    data() {
      return {
        details: this.$route.query.details,
        tabIndex: 0,
        carDataLoading: false,
        initFormLoading: false,
        formalitiesShowModal: false,
        uploadState: false,
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
          'mortgageName': '',
          'mortgageUrl': '',
          'makeDate': '',
          'makeUser': '',
          'warrantNo': '',
          'registerCompany': '',
          'mortgageStatus': '1',
          'remark': ''
        }
      };
    },
    mounted() {
      this.findPaymentWaitDonePawnById(); // 执行获取抵押物处理详情
      this.carGetlist(); // 执行获取车辆信息列表的data
      BUS.$on('uploadState', (e) => {
        this.$data.uploadState = e;
      });
    },
    methods: {
      // 添加车辆图片
      picDataAdd(dataList) {
        if (this.$data.formalities.mortgageUrl === '') {
          this.$data.formalities.mortgageUrl += dataList.attachmentUrl;
        } else {
          this.$data.formalities.mortgageUrl += '@' + dataList.attachmentUrl;
        }
        if (this.$data.formalities.mortgageName === '') {
          this.$data.formalities.mortgageName += dataList.attachmentName;
        } else {
          this.$data.formalities.mortgageName += '@' + dataList.attachmentName;
        }
      },
      // 删除车辆图片
      picDataRomove(index) {
        // 转数组
        let mortgageAry = this.mortgageStrToArray('' + this.$data.formalities.mortgageUrl, '' + this.$data.formalities.mortgageName);
        mortgageAry.splice(index, 1);
        this.$data.mortgageList = mortgageAry;
        let newtgageObj = this.mortgageArrayToObj(mortgageAry);
        this.$set(this.$data.formalities, 'mortgageUrl', newtgageObj.mortgageUrl);
        this.$set(this.$data.formalities, 'mortgageName', newtgageObj.mortgageName);
      },
      // 办理抵押模态框关闭后清楚组件内文件数据
      emptyRowPic() {
        this.$data.mortgageList = [];
        this.$data.formalities = {};
        this.$refs['mortgagePictureList'].closeUploading();
      },
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
            this.$set(this.$data.carData[ind], 'mortgageStatus', '1');
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
