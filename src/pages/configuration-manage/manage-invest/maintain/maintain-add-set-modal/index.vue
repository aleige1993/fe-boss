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
            prop="name">
            <i-input v-model="formMaintain.name">
            </i-input>
          </i-form-item>
        </i-col>
        <!--合作状态-->
        <i-col span="8">
          <i-form-item
            :rules="{required: true, message: '合作状态不能为空', trigger: 'blur'}"
            label="合作状态"
            prop="state">
            <i-input v-model="formMaintain.state">
            </i-input>
          </i-form-item>
        </i-col>
        <!--法定代表人-->
        <i-col span="8">
          <i-form-item label="法定代表人" prop="protype">
            <i-input v-model="formMaintain.LegalPerson">
            </i-input>
          </i-form-item>
        </i-col>
        <!--法人证件号码-->
        <i-col span="8">
          <i-form-item label="法人证件号码" prop="protype">
            <i-input v-model="formMaintain.LegalPhone" >
            </i-input>
          </i-form-item>
        </i-col>
        <!--成立时间-->
        <i-col span="8">
          <i-form-item label="成立时间" prop="protype">
            <i-input v-model="formMaintain.time">
            </i-input>
          </i-form-item>
        </i-col>
        <!--统一社会信用代码-->
        <i-col span="8">
          <i-form-item label="统一社会信用代码" prop="protype">
            <i-input v-model="formMaintain.redit ">
            </i-input>
          </i-form-item>
        </i-col>
        <!--账户名称-->
        <i-col span="8">
          <i-form-item label="账户名称" prop="protype">
            <i-input v-model="formMaintain.uesrName">
            </i-input>
          </i-form-item>
        </i-col>
        <!--账号-->
        <i-col span="8">
          <i-form-item label="账户名称" prop="protype">
            <i-input v-model="formMaintain.uesrId">
            </i-input>
          </i-form-item>
        </i-col>
        <!--开户银行-->
        <i-col span="8">
          <i-form-item label="开户银行" prop="protype">
            <i-input v-model="formMaintain.bank">
            </i-input>
          </i-form-item>
        </i-col>
        <!--主要联系人-->
        <i-col span="8">
          <i-form-item label="主要联系人" prop="protype">
            <i-input v-model="formMaintain.primaryContact">
            </i-input>
          </i-form-item>
        </i-col>
        <!--联系电话-->
        <i-col span="8">
          <i-form-item label="联系电话" prop="protype">
            <i-input v-model="formMaintain.contactNumber">
            </i-input>
          </i-form-item>
        </i-col>
        <!--联系邮箱-->
        <i-col span="8">
          <i-form-item label="联系邮箱" prop="protype">
            <i-input v-model="formMaintain.contactEmail">
            </i-input>
          </i-form-item>
        </i-col>
        <!--地址-->
        <i-col span="24" class-name="city-select">
          <i-form-item label="地址">
            <bs-dispicker :currProvinceCode="formMaintain.censusProvinceCode"
                          :currDistrictCode="formMaintain.censusDistrictCode"
                          :currCityCode="formMaintain.censusCityCode"
                          @on-change="selectCensusDistance">
            </bs-dispicker>
            <i-input placeholder="街道信息" v-model="formMaintain.censusRoadAddr" style="width: 539px;"></i-input>
          </i-form-item>
        </i-col>
      </i-row>
    </i-form>
  </bs-form-block>
  <bs-form-block :title="'合作协议'" padding="20px 0" borderWidth="0">
    <div class="form-top-actions">
      <i-button @click="openShowModal" type="info"><i class="iconfont icon-xinzeng"></i> 新增</i-button>
    </div>
    <i-table border ref="proTable" :columns="columns1" :data="data1" :loading="dataloading"></i-table>
    <br>
    <br>
    <div class="text-right">
      <i-button type="primary" @click="formSubmit" :loading="buttonLoading">
        <span v-if="!buttonLoading">提交</span>
        <span v-else>loading...</span>
      </i-button>
    </div>
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
        formMaintain: {
          name: '', // 资方名称
          state: '', // 合作状态
          censusProvinceCode: '1', // 省份code
          censusProvinceName: '', // 省份name
          censusDistrictCode: '1', // 市区code
          censusDistrictName: '', // 市区name
          censusCityCode: '1', // 区县code
          censusCityName: '' // 区县name
        },
        seleformList: {
          provinceCode: '1',
          provinceName: '重庆',
          districtCode: '1',
          districtName: '渝中',
          cityCode: '1',
          cityName: '渝中山咔咔',
          roadAddr: ''
        }
      };
    },
    methods: {
      // 打开合同协议模态框
      openShowModal() {
        this.$data.ShowModal = true;
      },
      // 删除
      removeUpload() {
      },
      // 提交
      formSubmit() {
        // formMaintain
        let formName = 'formMaintain';
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$emit('model-addSet');// 通知其父组件执行自定义事件“model-addSet”
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
