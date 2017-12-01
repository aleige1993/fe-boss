<template>
<div id="maintain-add-set-modal">
  <bs-form-block :title="'基本信息'" padding="20px 0" borderWidth="0px">
    <i-form ref="formMaintain" :model="formMaintain" label-position="right" :label-width="120">
      <i-row :gutter="16">
        <!--资方名称-->
        <i-col span="8">
          <i-form-item
            :rules="{required: true, message: '资方名称不能为空', trigger: 'blur'}"
            label="资方名称"
            prop="capitalName">
            <i-input v-model="formMaintain.capitalName">
            </i-input>
          </i-form-item>
        </i-col>
        <!--合作状态-->
        <i-col span="8">
          <i-form-item
            :rules="{required: true, message: '合作状态不能为空', trigger: 'blur'}"
            label="合作状态"
            prop="status">
            <i-input v-model="formMaintain.status">
            </i-input>
          </i-form-item>
        </i-col>
        <!--法定代表人-->
        <i-col span="8">
          <i-form-item label="法定代表人" prop="legalPerson">
            <i-input v-model="formMaintain.legalPerson">
            </i-input>
          </i-form-item>
        </i-col>
        <!--法人证件号码-->
        <i-col span="8">
          <i-form-item label="法人证件号码" prop="egalCertno">
            <i-input number v-model="formMaintain.egalCertno" >
            </i-input>
          </i-form-item>
        </i-col>
        <!--成立时间-->
        <i-col span="8">
          <i-form-item label="成立时间" prop="regDate">
            <bs-datepicker v-model="formMaintain.regDate" :readonly="false"></bs-datepicker>
          </i-form-item>
        </i-col>
        <!--统一社会信用代码-->
        <i-col span="8">
          <i-form-item label="统一社会信用代码" prop="creditCode">
            <i-input v-model="formMaintain.creditCode">
            </i-input>
          </i-form-item>
        </i-col>
        <!--账户名称-->
        <i-col span="8">
          <i-form-item label="账户名称" prop="acctName">
            <i-input v-model="formMaintain.acctName">
            </i-input>
          </i-form-item>
        </i-col>
        <!--账号-->
        <i-col span="8">
          <i-form-item label="账号" prop="acctNo">
            <i-input v-model="formMaintain.acctNo">
            </i-input>
          </i-form-item>
        </i-col>
        <!--开户银行-->
        <i-col span="8">
          <i-form-item label="开户银行" prop="openbankname">
            <i-input v-model="formMaintain.openbankname">
            </i-input>
          </i-form-item>
        </i-col>
        <!--主要联系人-->
        <i-col span="8">
          <i-form-item label="主要联系人" prop="linkmanName">
            <i-input v-model="formMaintain.linkmanName">
            </i-input>
          </i-form-item>
        </i-col>
        <!--联系电话-->
        <i-col span="8">
          <i-form-item label="联系电话" prop="linkmanMobile">
            <i-input v-model="formMaintain.linkmanMobile">
            </i-input>
          </i-form-item>
        </i-col>
        <!--联系邮箱-->
        <i-col span="8">
          <i-form-item label="联系邮箱" prop="email">
            <i-input v-model="formMaintain.email">
            </i-input>
          </i-form-item>
        </i-col>
        <!--地址-->
        <i-col span="24" class-name="city-select">
          <i-form-item label="地址">
            <bs-dispicker :currProvinceCode="formMaintain.bizProvinceCode"
                          :currDistrictCode="formMaintain.bizCityCode"
                          :currCityCode="formMaintain.bizDistrictName"
                          @on-change="selectCensusDistance">
            </bs-dispicker>
            <i-input placeholder="街道信息" v-model="formMaintain.bizRoadAddr" style="width: 539px;"></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <div class="text-right">
        <i-button type="primary" @click="formSubmit" :loading="buttonLoading">
          <span v-if="!buttonLoading">提交基本信息</span>
          <span v-else>loading...</span>
        </i-button>
      </div>
    </i-form>
  </bs-form-block>
  <bs-form-block :title="'合作协议'" padding="20px 0" borderWidth="0">
    <div class="form-top-actions">
      <i-button :disabled="!isAddSubMint" @click="openShowModal" type="info">
        <span v-if="isAddSubMint"><i class="iconfont icon-xinzeng"></i> 新增</span>
        <span v-else>请先提交基本信息...</span>
      </i-button>
    </div>
    <i-table border ref="proTable" :columns="columns1" :data="data1" :loading="dataloading"></i-table>
    <br>
    <br>
    <bs-modal :title="'新增'" v-model="ShowModal" :width="600">
      <modal-upload v-if="ShowModal" @parModel='closeModel' ></modal-upload>
    </bs-modal>
  </bs-form-block>
</div>
</template>

<script>
  import BSModal from '@/components/bs-modal';
  import BsDispicker from '@/components/bs-dispicker';
  import ModalUpload from './maintain-upload-modal'; // 新增删除的模态框内的新增模态框
  import MixinData from './mixin-data';
  import MixinMethods from './mixin-methods';
  export default {
    name: 'maintainAddSetModal',
    mixins: [MixinData, MixinMethods],
    components: {
      'bs-modal': BSModal,
      'bs-dispicker': BsDispicker,
      'modal-upload': ModalUpload
    },
    props: {
      childMsg: Object
    },
    data() {
      return {
        ShowModal: false,
        dataloading: false,
        buttonLoading: false,
        isAddSubMint: false, // 是否是新增里的提交基本信息之后的状态
        formMaintain: {
          capitalName: '', // 资方名称
          status: '', // 合作状态
          legalPerson: '', // 法定代表人
          egalCertno: '', // 法人证件号码
          regDate: '', // 成立时间
          creditCode: '', // 统一社会信用代码
          acctName: '', // 账户名称
          acctNo: '', // 账号
          openbankname: '', // 开户银行
          linkmanName: '', // 主要联系人
          linkmanMobile: '', // 联系电话
          email: '', // 联系邮箱
          bizProvinceCode: '1', // 地址省份编码
          bizProvinceName: '', // 地址省份名称
          bizCityCode: '1', // 地址城市编码
          bizCityName: '', // 地址城市名称
          bizDistrictCode: '1', // 地址地区编码
          bizDistrictName: '', // 地址地区名称
          bizRoadAddr: '' // 地址地区名称
        }
      };
    },
    mounted() {
      // 修改状态下，给弹窗的表单赋值
      if (!this.childMsg.isAdd) {
        this.$data.formMaintain = this.childMsg;
      }
    },
    methods: {
      // 打开合同协议模态框
      openShowModal() {
        this.$data.ShowModal = true;
      },
      // 删除
      removeUpload() {
      },
      // 修改情况的弹窗
      async setList() {
        let resAdd = await this.$http.post('/pms/capital/accBaseInfoSave', this.$data.formMaintain);
        if (resAdd.success) {
          console.log(resAdd);
          this.$data.buttonLoading = false; // 关闭按钮的loading状态
          this.$Message.success('修改成功', 2000);
        }
      },
      // 新增情况下的提交
      async addSuBmit() {
        let resAdd = await this.$http.post('/pms/capital/accBaseInfoSave', this.$data.formMaintain);
        if (resAdd.success) {
          console.log(resAdd);
          this.$data.buttonLoading = false; // 关闭按钮的loading状态
          this.$Message.success('新增成功', 2000);
        }
      },
      // 提交
      formSubmit() {
        // formMaintain
        let formName = 'formMaintain';
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$data.buttonLoading = true;
            // 如果是新增
            if (this.childMsg.isAdd) {
              this.addSuBmit();
            } else {
              this.setSubmit();
            }
            this.$data.isAddSubMint = true;
            // this.$emit('model-addSet');// 通知其父组件执行自定义事件“model-addSet”
          } else {
            this.$Message.error('"<span style="color: red">*</span>"必填项不能为空');
          }
        });
      },
      // 关闭合同协议的模态框
      closeModel() {
        this.$data.ShowModal = false;
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
