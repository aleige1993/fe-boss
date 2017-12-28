<template>
<!--放款条件-办理详情-->
  <div id="condition-loan-handle-details">
    <i-breadcrumb separator=">">
      <i-breadcrumb-item href="/">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/components/breadcrumb">贷款业务</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/loanbusiness/loan">放款条件落实列表</i-breadcrumb-item>
      <i-breadcrumb-item>办理详情</i-breadcrumb-item>
    </i-breadcrumb>
    <br>
    <br>
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
                  <span v-text="enumCode2Name(formData.legalPersonCerttype, 'CertTypeEnum')"></span>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="证件号码">
                  <span v-text="formData.legalPersonCertno"></span>
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
            <i-row>
              <i-col span="8">
                <i-form-item label="产品">
                  <span v-text="formData.productName"></span>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="期数(月)">
                  <span v-text="formData.loanPeriods"></span>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="借款金额(元)">
                  <span v-text="formData.loanAmt"></span>
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
                  <span v-text="formData.startDate"></span>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="合同到期日">
                  <span v-text="formData.endDate"></span>
                </i-form-item>
              </i-col>
            </i-row>
          </bs-form-block>
          <bs-form-block :title="'车辆信息'">
            <i-table :loading="carDataLoading" border ref="selection" :columns="carColumns" :data="carData"></i-table>
          </bs-form-block>
          <bs-form-block :title="'担保信息'">
            <i-table :loading="assureDataLoading" border ref="selection" :columns="assureColumns" :data="assureData"></i-table>
          </bs-form-block>
          <bs-form-block :title="'放款条件'">
            <i-table :loading="conditionLoading" border ref="selection" :columns="conditionColumns" :data="conditionData"></i-table>
          </bs-form-block>
          <bs-form-block :title="'审核意见'">
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
                <i-form-item
                  label="结论" prop="auditStatus"
                  :rules="{required: true, message: '结论不能为空', trigger: 'change'}">
                  <i-radio-group v-model="formData.auditStatus">
                    <i-radio v-for="item in enumSelectData.get('ApproveStatusEnum')" :label="item.itemCode" :key="item.itemCode" style="margin-right: 20px; margin-top: -5px">{{item.itemName}}</i-radio>
                  </i-radio-group>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="8">
                <i-form-item
                  label="意见信息"
                  prop="auditOpinion"
                  :rules="{required: true, message: '意见信息不能为空', trigger: 'blur'}">
                  <i-input type="textarea" v-model="formData.auditOpinion" :rows="2" placeholder="">
                  </i-input>
                </i-form-item>
              </i-col>
            </i-row>
          </bs-form-block>
        </i-form>
      </i-tab-pane>
      <i-tab-pane label="审批信息">
        <i-table :loading="examineTableLoading" border ref="examineTable" :columns="examineColumns" :data="examineData"></i-table>
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
                     prop="handleTime"
                     :rules="{required: true, message: '办理时间不能为空', trigger: 'blur'}">
          <bs-datepicker v-model="formalities.handleTime" type="text" placeholder="办理时间"></bs-datepicker>
        </i-form-item>
        <i-form-item label="经办人"
                     prop="handleName"
                     :rules="{required: true, message: '经办人不能为空', trigger: 'blur'}">
          <i-input v-model="formalities.handleName" placeholder=""></i-input>
        </i-form-item>
        <i-form-item label="权证编号"
                     prop="warrantNo"
                     :rules="{required: true, message: '权证编号不能为空', trigger: 'blur'}">
          <i-input v-model="formalities.warrantNo" placeholder=""></i-input>
        </i-form-item>
        <i-form-item label="登记机关"
                     prop="registration"
                     :rules="{required: true, message: '登记机关不能为空', trigger: 'blur'}">
          <i-input v-model="formalities.registration" placeholder=""></i-input>
        </i-form-item>
        <i-form-item label="抵押状态"
                     prop="mortgageState"
                     :rules="{required: true, message: '请选择抵押状态', trigger: 'change'}">
          <i-select v-model="formalities.mortgageState">
            <i-option value="0">未抵押</i-option>
            <i-option value="1">已抵押</i-option>
          </i-select>
        </i-form-item>
        <i-form-item label="备注"
                     prop="remark">
          <i-input type="textarea" :rows="2" v-model="formalities.remark" placeholder=""></i-input>
        </i-form-item>
        <i-form-item
          label="办理文件"
          prop="attachPath"
          :rules="{required: true, message: '请上传办理文件', trigger: 'blur'}">
          <i-upload
            :show-upload-list="false"
            :on-success="uploadSuccessAlities"
            :on-error="uploadErrorAlities"
            type="drag"
            :action="$config.HTTPBASEURL + '/common/upload'">
            <div style="padding: 20px 0">
              <i-icon type="ios-cloud-upload" size="52" style="color: #3399ff"></i-icon>
              <p>单击或拖动文件上传</p>
            </div>
          </i-upload>
          <p v-if="formalities.attachPath===''" class="show-upload-text" v-text="formalities.uploadFileName"></p>
          <p v-else class="show-upload-text" v-text="formalities.attachPath"></p>
          <input type="hidden" v-model="formalities.attachPath" style="width: 100%;border: 0;">
        </i-form-item>
        <i-form-item class="text-right">
          <i-button type="primary" @click="formalitiesSubmit" :loading="formalitiesButtonLoading">
            <span v-if="!formalitiesButtonLoading">提交</span>
            <span v-else>Loading...</span>
          </i-button>
        </i-form-item>
      </i-form>
    </bs-modal>
    <!--GPS安装信息-->
    <bs-modal v-model="GPSinstallShowModal" title="GPS安装信息" :width="1200">
      <div class="form-top-actions">
        <i-button @click="addGPSModal" type="info"><i class="iconfont icon-xinzeng"></i>&nbsp;新增</i-button>
      </div>
      <i-table v-if="GPSinstallShowModal" :loading="GPSinstallTableLoading" border ref="examineTable" :columns="GPSinstallColumns" :data="GPSinstallData"></i-table>
    </bs-modal>
    <!--GPS安装信息新增和修改模态框-->
    <bs-modal v-model="GPSShowModal" :title="isAddGPS?'新增':'修改'" :width="520">
      <i-form v-if="GPSShowModal" ref="formAddGPS" :model="formAddGPS" label-position="right" :label-width="90">
        <i-form-item label="GPS型号"
                     prop="GPSModel"
                     :rules="{required: true, message: 'GPS型号不能为空', trigger: 'blur'}">
          <i-input v-model="formAddGPS.GPSModel" placeholder=""></i-input>
        </i-form-item>
        <i-form-item label="IMEI"
                     prop="IMEI"
                     :rules="{required: true, message: 'IMEI不能为空', trigger: 'blur'}">
          <i-input v-model="formAddGPS.IMEI" placeholder=""></i-input>
        </i-form-item>
        <i-form-item label="GPS合作商"
                     prop="GPScooperative"
                     :rules="{required: true, message: 'GPS合作商不能为空', trigger: 'blur'}">
          <i-input v-model="formAddGPS.GPScooperative" placeholder=""></i-input>
        </i-form-item>
        <i-form-item label="安装状态"
                     prop="installState"
                     :rules="{required: true, message: '请选择安装状态', trigger: 'change'}">
          <i-select v-model="formAddGPS.installState">
            <i-option value="0">未安装</i-option>
            <i-option value="1">已安装</i-option>
          </i-select>
        </i-form-item>
        <i-form-item label="办理人"
                     prop="handleName"
                     :rules="{required: true, message: '办理人不能为空', trigger: 'blur'}">
          <i-input v-model="formAddGPS.handleName" placeholder=""></i-input>
        </i-form-item>
        <i-form-item label="办理时间"
                     prop="handleTime"
                     :rules="{required: true, message: '办理时间不能为空', trigger: 'blur'}">
          <bs-datepicker v-model="formAddGPS.handleTime" type="text" placeholder="办理时间"></bs-datepicker>
        </i-form-item>
        <i-form-item class="text-right">
          <i-button type="primary" @click="addGPSSubmit" :loading="addGPSButtonLoading">
            <span v-if="!addGPSButtonLoading">提交</span>
            <span v-else>Loading...</span>
          </i-button>
        </i-form-item>
      </i-form>
    </bs-modal>
    <!--担保落实modal-->
    <bs-modal v-model="guaranteeShowModal" title="担保落实" :width="520">
      <i-form v-if="guaranteeShowModal" ref="formagGuarantee" :model="formagGuarantee" label-position="right" :label-width="80">
        <i-form-item label="办理时间"
                     prop="handleTime"
                     :rules="{required: true, message: '办理时间不能为空', trigger: 'blur'}">
          <bs-datepicker v-model="formagGuarantee.handleTime" type="text" placeholder="办理时间"></bs-datepicker>
        </i-form-item>
        <i-form-item label="经办人"
                     prop="handleName"
                     :rules="{required: true, message: '经办人不能为空', trigger: 'blur'}">
          <i-input v-model="formagGuarantee.handleName" placeholder=""></i-input>
        </i-form-item>
        <i-form-item label="落实状态"
                     prop="implementState"
                     :rules="{required: true, message: '请选择落实状态', trigger: 'change'}">
          <i-select v-model="formagGuarantee.implementState">
            <i-option value="0">未抵押</i-option>
            <i-option value="1">已抵押</i-option>
          </i-select>
        </i-form-item>
        <i-form-item label="备注"
                     prop="remark">
          <i-input type="textarea" :rows="2" v-model="formagGuarantee.remark" placeholder=""></i-input>
        </i-form-item>
        <i-form-item
          label="办理文件"
          prop="attachPath"
          :rules="{required: true, message: '请上传办理文件', trigger: 'blur'}">
          <i-upload
            :show-upload-list="false"
            :on-success="uploadSuccessGuarantee"
            :on-error="uploadErrorGuarantee"
            type="drag"
            :action="$config.HTTPBASEURL + '/common/upload'">
            <div style="padding: 20px 0">
              <i-icon type="ios-cloud-upload" size="52" style="color: #3399ff"></i-icon>
              <p>单击或拖动文件上传</p>
            </div>
          </i-upload>
          <p v-if="formagGuarantee.attachPath===''" class="show-upload-text" v-text="formagGuarantee.uploadFileName"></p>
          <p v-else class="show-upload-text" v-text="formagGuarantee.attachPath"></p>
          <input type="hidden" v-model="formagGuarantee.attachPath" style="width: 100%;border: 0;">
        </i-form-item>
        <i-form-item class="text-right">
          <i-button type="primary" @click="formagGuaranteeSubmit" :loading="formagGuaranteeButtonLoading">
            <span v-if="!formagGuaranteeButtonLoading">提交</span>
            <span v-else>Loading...</span>
          </i-button>
        </i-form-item>
      </i-form>
    </bs-modal>
  </div>
</template>

<script>
  import MixinData from './mixin-data';
  import BsModal from '@/components/bs-modal';
  export default {
    name: 'pageLoanHandleDetails',
    mixins: [MixinData],
    components: {
      BsModal
    },
    data() {
      return {
        clickRow: {},
        isAddGPS: true,
        tabIndex: 0,
        carDataLoading: false, // 车辆表loading
        assureDataLoading: false, // 担保表loading
        conditionLoading: false, // 放款条件loading
        examineTableLoading: false, // 审批信息loading
        initFormLoading: false, // 提交按钮loading
        formalitiesButtonLoading: false, // 办理抵质押物手续modal里的提交按钮loading
        formalitiesShowModal: false, // 办理抵质押物手续modal
        GPSinstallButtonLoading: false, // GPS安装信息modal里的提交按钮loading
        GPSinstallShowModal: false, // GPS安装信息modal
        GPSShowModal: false, // 显示GPS安装信息新增弹窗modal
        addGPSButtonLoading: false, // 显示GPS安装信息新增弹窗modal提交按钮的loading
        GPSinstallTableLoading: false, // GPS安装信息modal列表loading
        guaranteeShowModal: false, // 担保落实modal
        formagGuaranteeButtonLoading: false, // 担保落实modal的提交按钮loading
        formData: {
          'loanNo': '',
          'merchantName': '',
          'custName': '',
          'formData': '',
          'operatingMode': '',
          'auditStatus': '',
          'auditOpinion': ''
        },
        formalities: {
          'uploadFileName': '',
          'handleTime': '',
          'handleName': '',
          'warrantNo': '',
          'registration': '',
          'mortgageState': '',
          'attachPath': '',
          'remark': ''
        },
        formAddGPS: {},
        formagGuarantee: {
          'uploadFileName': '',
          'implementState': ''
        }
      };
    },
    mounted() {
      this.carGetlist(); // 执行获取车辆信息列表的data
      this.assureGtelist(); // 执行获取担保信息列表的data
      this.conditionGetlist(); // 执行获取放款条件列表的data
      this.examineGetlist(); // 执行获取审批信息列表的data
    },
    methods: {
      // 获取车辆信息列表的data
      async carGetlist() {
        this.$data.carDataLoading = true;
        let reps = await this.$http.post('/handle/car');
        this.$data.carDataLoading = false;
        if (reps.success) {
          this.$data.carData = reps.body.resultList;
        } else {
          this.$data.carData = [];
        }
      },
      // 获取担保信息列表的data
      async assureGtelist() {
        this.$data.assureDataLoading = true;
        let reps = await this.$http.post('/handle/assure');
        this.$data.assureDataLoading = false;
        if (reps.success) {
          this.$data.assureData = reps.body.resultList;
        } else {
          this.$data.assureData = [];
        }
      },
      // 获取放款条件列表的data
      async conditionGetlist() {
        this.$data.conditionLoading = true;
        let reps = await this.$http.post('/handle/condition');
        this.$data.conditionLoading = false;
        if (reps.success) {
          this.$data.conditionData = reps.body.resultList;
        } else {
          this.$data.conditionData = [];
        }
      },
      // 获取审批信息列表的data
      async examineGetlist() {
        this.$data.examineTableLoading = true;
        let reps = await this.$http.post('/handle/examine');
        this.$data.examineTableLoading = false;
        if (reps.success) {
          this.$data.examineData = reps.body.resultList;
        } else {
          this.$data.examineData = [];
        }
      },
      // 获取GPS安装信息列表的data
      async GPSinstallGetlist() {
        this.$data.GPSinstallTableLoading = true;
        let reps = await this.$http.post('/handle/GPSinstall', {
          ...this.$data.clickRow
        });
        this.$data.GPSinstallTableLoading = false;
        if (reps.success) {
          this.$data.GPSinstallData = reps.body.resultList;
        } else {
          this.$data.GPSinstallData = [];
        }
      },
      // 所有的提交
      saveSubimt() {
        let formName = 'formData';
        this.$refs[formName].validate(async (valid) => {
          this.$data.initFormLoading = true;
          const msg = await this.$Message.loading('正在提交...', 0);
          if (valid) {
            this.$Message.success('提交成功');
          } else {
            this.$Message.error('<span style="color: red">*</span>项不能为空');
          }
          await bsWait(1000);
          msg();
          this.$data.initFormLoading = false;
        });
      },
      // 办理抵质押物手续modal-提交按钮
      formalitiesSubmit() {
        this.$data.formagGuaranteeButtonLoading = true;
        let formName = 'formalities';
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            this.$Message.success('提交成功');
          } else {
            this.$Message.error('<span style="color: red">*</span>项不能为空');
          }
          await bsWait(1000);
          this.$data.formalitiesButtonLoading = false;
        });
      },
      // 担保落实modal-提交按钮
      formagGuaranteeSubmit() {
        this.$data.formalitiesButtonLoading = true;
        let formName = 'formagGuarantee';
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            this.$Message.success('提交成功');
          } else {
            this.$Message.error('<span style="color: red">*</span>项不能为空');
          }
          await bsWait(1000);
          this.$data.formalitiesButtonLoading = false;
        });
      },
      // GPS安装弹窗-打开新增弹窗
      addGPSModal() {
        this.$data.isAddGPS = true;
        this.$data.GPSShowModal = true;
        this.$data.formAddGPS = {};
      },
      // GPS安装弹窗-新增弹窗-提交按钮
      addGPSSubmit() {
        this.$data.addGPSButtonLoading = true;
        let formName = 'formAddGPS';
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            this.$Message.success('提交成功');
            this.$data.GPSShowModal = false;
          } else {
            this.$Message.error('<span style="color: red">*</span>项不能为空');
          }
          await bsWait(1000);
          this.$data.addGPSButtonLoading = false;
        });
      },
      // 办理抵质押物手续文件上传成功
      uploadSuccessAlities(res, file, fileList) {
        this.$data.formalities.uploadFileName = file.name;
        this.$data.formalities.attachPath = res.body.url;
      },
      // 办理抵质押物手续文件上传失败
      uploadErrorAlities(err, file, fileList) {
        this.$data.formalities.uploadFileName = '';
        this.$Notice.error({
          desc: err
        });
      },
      // 担保落实文件上传成功
      uploadSuccessGuarantee(res, file, fileList) {
        this.$data.formalities.uploadFileName = file.name;
        this.$data.formalities.attachPath = res.body.url;
      },
      // 担保落实文件上传失败
      uploadErrorGuarantee(err, file, fileList) {
        this.$data.formalities.uploadFileName = '';
        this.$Notice.error({
          desc: err
        });
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  #condition-loan-handle-details {
    & .show-upload-text {
      position: relative;
      padding-right: 36px;
      line-height: 20px;
      min-height: 20px;
      color: #666;
    }
  }
</style>
