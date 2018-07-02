<template>
  <!--合同签署确认详情页面-->
<div id="contract-signing-details-tab">
  <i-breadcrumb separator=">">
    <i-breadcrumb-item href="/home">首页</i-breadcrumb-item>
    <i-breadcrumb-item href="/index/contract">合同管理</i-breadcrumb-item>
    <i-breadcrumb-item>{{isDetails?'合同详情':'合同签署确认详情'}}</i-breadcrumb-item>
  </i-breadcrumb>
  <br>
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
          <div class="scrollBarStyle">
            <div v-if="!this.$data.isDetails" class="form-top-actions" style="padding-top:0;">
              <i-button @click="backChannelFun" :loading="backChannelLoading">
                <span v-if="!backChannelLoading"><Icon type="backspace"></Icon> 退回至渠道商</span>
                <span v-else>loading...</span>
              </i-button>
            </div>
            <i-table border :loading="contractInfoListLoading" ref="contractInfoTable" :columns="contractInfoColumns" :data="formData.contractList"></i-table>
          </div>
        </bs-form-block>
      </i-form>
      <bs-form-block v-if="!isDetails" :title="'审核意见'">
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
              <i-form-item
                v-if="loanApprove.approveStatus === 'R'"
                :rules="{required: true, message: '拒绝原因不能为空', trigger: 'change'}"
                label="拒绝原因"
                prop="rejectCause">
                <i-select v-model="loanApprove.rejectCause">
                  <i-option v-for="item in enumSelectData.get('BizApproveRejectEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
                </i-select>
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
        <i-table :height="tableFixHeight" :loading="examineTableLoading" border ref="examineTable" :columns="examineColumns" :data="examineData"></i-table>
        <div class="page-container">
          <i-page @on-change="jumpPageExamine" :total="totalExamine" :page-size="pageSizeExamine" size="small" show-elevator show-total></i-page>
        </div>
      </div>
    </i-tab-pane>
    <div class="form-footer-actions">
      <i-button v-if="!isDetails" @click="saveSubimt" :loading="initFormLoading" type="success">
        <span v-if="!initFormLoading"><i class="iconfont icon-tijiao"></i> 提交</span>
        <span v-else> loading...</span>
      </i-button>
      <i-button v-else @click="goBackBtnFun" type="success"><Icon type="chevron-left"></Icon> 返回</i-button>
    </div>
  </i-tabs>
  <!--上传/查看车辆文件-->
  <bs-modal :title="isDetails?'查看合同文件':'上传/查看合同文件'" v-model="seePictureModal" :width="1200" @on-close="emptyRowPic">
    <contract-picture-list v-if="seePictureModal" :details="isDetails||isDetails==='true'" :picData="loanPicVOListModalData" @on-data-remove="picDataRomove"  @on-data-add="picDataAdd"></contract-picture-list>
  </bs-modal>
</div>
</template>

<script>
  import MixinData from './mixin-data';
  import examineMixinData from './examine-mixin-data';
  import BsModal from '@/components/bs-modal';
  import ContractPictureList from '@/components/file-picture-list';
  export default {
    name: 'contractSigningTab',
    mixins: [MixinData, examineMixinData],
    components: {
      BsModal,
      ContractPictureList
    },
    data() {
      return {
        tabIndex: 0,
        loanPicVOListModalData: [
          {
            'attachmentUrl': '',
            'attachmentName': ''
          }
        ],
        seePictureModal: false,
        backChannelLoading: false,
        isDetails: false,
        currentPageExamine: 1,
        pageSizeExamine: 15,
        totalExamine: 0,
        examineTableLoading: false,
        contractInfoListLoading: false,
        initFormLoading: false,
        contractRowIndex: 0,
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
              'signConfirmStatus': '',
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
          'rejectCause': '',
          'opinion': ''
        }
      };
    },
    async mounted() {
      if (this.$route.query.isDetails === 'true') {
        this.$data.isDetails = true;
      }
      await this.getFindSignConfirmInfo(); // 获取合同签约确认详情
      this.examineGetlist(); // 获取审批历史信息列表data
    },
    methods: {
      // 退回至渠道商
      backChannelFun() {
        Alertify.confirm('确定要退回至渠道商吗？', async ok => {
          if (ok) {
            this.$data.backChannelLoading = true;
            let reps = await this.$http.post('/biz/sign/rebackToMerchant', {
              loanNo: this.$route.query.loanNo
            });
            this.$data.backChannelLoading = false;
            if (reps.success) {
              this.$Message.success('成功退回至渠道商');
            } else {
              this.$Message.error('退回至渠道商失败！');
            }
          }
        });
      },
      // 模态框关闭后清楚组件内车辆图片数据
      emptyRowPic() {
        this.$data.loanPicVOListModalData = [];
      },
      // 删除车辆图片
      picDataRomove(index) {
        let ind = this.$data.contractRowIndex;
        this.$data.formData.contractList[ind].loanContractAttachmentList.splice(index, 1);
      },
      // 添加车辆图片
      picDataAdd(dataList) {
        let ind = this.$data.contractRowIndex;
        if (!this.$data.formData.contractList[ind].loanContractAttachmentList) {
          this.$data.formData.contractList[ind].loanContractAttachmentList = [];
        }
        this.$data.formData.contractList[ind].loanContractAttachmentList.push({
          'attachmentName': dataList.attachmentName,
          'attachmentUrl': dataList.attachmentUrl
        });
      },
      // 获取合同签约确认详情
      async getFindSignConfirmInfo() {
        let reps = await this.$http.post('/biz/sign/findSignConfirmInfo', {
          signNo: this.$route.query.signNo
        });
        if (reps.success) {
          this.$data.formData = reps.body;
          this.$data.formData.contractList = reps.body.contractList;
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
          this.$data.examineData = reps.body.resultList;
          this.$data.currentPageExamine = reps.body.currentPage / 1;
          this.$data.totalExamine = reps.body.totalNum / 1;
        } else {
          this.$data.examineData = [];
        }
      },
      jumpPageExamine(page) {
        this.examineGetlist(page);
      },
      async saveAjax() {
        // 合同信息中只要有一项“未签署” isNSignStatus就为true。 在“结论为同意”时
        let isNSignStatus = this.$data.formData.contractList.some(item => {
          return item.signStatus === '0' || (typeof item.signStatus === 'undefined');
        });
        if (isNSignStatus && (this.$data.loanApprove.approveStatus === 'A')) {
          this.$Message.error('合同信息中的合同必须是“已签署”状态！');
          return;
        }
        // 转换字段“signStatus”为“signConfirmStatus”
        await this.$data.formData.contractList.map((item) => {
          item.signConfirmStatus = item.signStatus;
          return item;
        });
        this.$data.initFormLoading = true;
        let resp = await this.$http.post('/biz/sign/signConfirm', {
          signNo: this.$route.query.signNo,
          contractSignConfirmStatusParams: this.$data.formData.contractList,
          loanApprove: this.$data.loanApprove
        });
        this.$data.initFormLoading = false;
        if (resp.success) {
          this.$Message.success('提交成功！');
          // 初审 回到合同签署确认列表
          this.$router.push({
            path: '/index/contract/sign',
            query: {
              currentPage: this.$route.query.currentPage
            }
          });
        }
      },
      saveSubimt() {
        this.$refs['loanApprove'].validate((valid) => {
          if (valid) {
            this.$AuditPrompt.auditPromptFun(this.$data.loanApprove.approveStatus, () => {
              this.saveAjax();
            });
          } else {
            this.$Message.error('"<span style="color: red">*</span>"必填项不能为空');
          }
        });
      },
      goBackBtnFun() {
        // 初审 回到已签署合同列表
        this.$router.push({
          path: '/index/contract/signSucceed',
          query: {
            currentPage: this.$route.query.currentPage
          }
        });
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
