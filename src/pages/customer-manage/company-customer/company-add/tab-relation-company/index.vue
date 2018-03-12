<template>
  <div>
    <div class="form-top-actions" v-if="!isFromDetail" style="padding-top: 0">
      <i-button type="primary" @click="openAddModal"><i class="iconfont icon-xinzeng"></i> 新增</i-button>
    </div>
    <i-table :height="this.$store.getters.viewHeight+98" :loading="listLoading" :columns="relationCorpColumns" :data="relationCorpDatas"></i-table>
    <!--添加联系人模态框-->
    <bs-modal title="添加关联企业" v-model="addRelationCorpModal">
      <i-form ref="addRelationCorpForm" :model="formData" label-position="left" :label-width="80">
        <i-form-item label="公司名称" prop="relatedCorpName"
                     :rules="{required: true, message: '请输入公司名称'}">
          <i-input :readonly="true" v-model="formData.relatedCorpName" placeholder="">
            <i-button @click="slectRelationCompanyModal=!slectRelationCompanyModal" slot="append">选择企业</i-button>
          </i-input>
        </i-form-item>
        <i-form-item label="统一社会信用代码" prop="relatedCorpCreditCode"
                     :rules="{required: true, message: '请输入统一社会信用代码'}">
          <i-input :readonly="true" v-model="formData.relatedCorpCreditCode" placeholder=""></i-input>
        </i-form-item>
        <i-form-item label="关系" prop="relation">
          <i-select v-model="formData.relation" id="u5568_input" placeholder=""
                    :rules="{required: true, message: '请输入关系', trigger: 'change'}">
            <i-option v-for="item in enumSelectData.get('HaveCompanyRelativeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
          </i-select>
        </i-form-item>
        <i-form-item label="联系人" prop="linkmanName"
                     :rules="{required: true, message: '请输入联系人'}">
          <i-input v-model="formData.linkmanName" placeholder=""></i-input>
        </i-form-item>
        <i-form-item label="联系人电话" prop="linkmanMobile"
                     :rules="{required: true, message: '请输入联系人电话'}">
          <i-input v-model="formData.linkmanMobile" placeholder=""></i-input>
        </i-form-item>
        <i-form-item label="注册时间" prop="regDate"
                     :rules="{required: true, message: '请输入注册时间'}">
          <input type="hidden" v-model="formData.regDate"/>
          <bs-datepicker v-model="formData.regDate" style="width: 100%" placeholder=""></bs-datepicker>
        </i-form-item>
        <i-form-item label="注册资金" prop="regCapital"
                     :rules="{required: true, message: '请输入注册资金'}">
          <i-input v-model="formData.regCapital" placeholder="">
            <span slot="append">万元</span>
          </i-input>
        </i-form-item>
        <i-form-item label="经营地址" prop="bizAddress"
                     :rules="{required: true, message: '请输入经营地址'}">
          <i-input v-model="formData.bizAddress" placeholder=""></i-input>
        </i-form-item>
        <i-form-item label="备注" prop="mail">
          <i-input v-model="formData.remark" type="textarea" :rows="4" placeholder=""></i-input>
        </i-form-item>
        <i-form-item label="">
          <i-button @click="submitForm" :loading="submitLoading" type="primary" size="large" style="width: 120px;">
            <span v-if="submitLoading">处理中...</span>
            <span v-else>提交</span>
          </i-button>
        </i-form-item>
      </i-form>
    </bs-modal>
    <!-- 选择企业的弹窗 -->
    <bs-modal title="选择企业" :width="1200" v-model="slectRelationCompanyModal">
      <table-company-customer-list ref="tableCompanyCustomer" v-if="slectRelationCompanyModal" type="modal" @on-row-dbclick="selectRelationCompany">
        <div class="form-top-actions" slot="topAction">
          <i-button type="info" @click="addCompanyCustomerModal=!addCompanyCustomerModal"><i class="iconfont icon-xinzeng"></i> 新增</i-button>
        </div>
      </table-company-customer-list>
    </bs-modal>
    <bs-modal title="新增企业客户" :width="1280" v-model="addCompanyCustomerModal">
      <company-customer-basic-info @on-submit-success="addCompanySuccess" type="modal"></company-customer-basic-info>
    </bs-modal>
  </div>
</template>
<script>
  import PTModal from '@/components/bs-modal';
  import MixinTabComputed from '../mixin-tab-computed';
  import MixinData from './mixin-data';
  import TableCompanyCustomerList from '@/components/table-company-customer-list';
  import CompanyCustomerBasicInfo from '@/components/form-company-customer-basic/index.vue';
  export default {
    name: 'TabRelationCorpAccountInfo',
    mixins: [MixinData, MixinTabComputed],
    data() {
      return {
        addRelationCorpModal: false,
        listLoading: false,
        submitLoading: false,
        slectRelationCompanyModal: false,
        addCompanyCustomerModal: false,
        formData: {
          'corpNo': '',
          'corpName': '',
          'relatedCorpNo': '',
          'relatedCorpName': '',
          'relatedCorpCreditCode': '',
          'relation': '',
          'linkmanName': '',
          'linkmanMobile': '',
          'regDate': '',
          'regCapital': '',
          'bizAddress': '',
          'remark': ''
        }
      };
    },
    props: ['customer'],
    methods: {
      async getRelationList() {
        this.$data.listLoading = true;
        let resp = await this.$http.post('/corp/listCorpRelationShip', {
          corpNo: this.corpNo,
          currentPage: 0,
          pageSize: 9999
        });
        this.$data.listLoading = false;
        if (resp.success) {
          this.$data.relationCorpDatas = resp.body.resultList;
        }
      },
      openAddModal() {
        this.$refs['addRelationCorpForm'].resetFields();
        this.$data.addRelationCorpModal = true;
      },
      selectRelationCompany(row, index) {
        // console.log(row);
        this.$data.formData.relatedCorpNo = row.corpNo;
        this.$data.formData.relatedCorpName = row.corpName;
        this.$data.formData.relatedCorpCreditCode = row.creditCode;
        this.$data.formData.regDate = row.regDate;
        this.$data.formData.regCapital = row.regCapital;
        this.$data.formData.linkmanName = row.mainLinkmanName;
        this.$data.formData.linkmanMobile = row.mainLinkmanPhone;
        this.$data.formData.bizAddress = row.bizProvinceName + row.bizDistrictName + row.bizCityName + row.bizRoadAddr;
        this.$data.slectRelationCompanyModal = false;
      },
      addCompanySuccess() {
        this.$data.addCompanyCustomerModal = false;
        this.$refs['tableCompanyCustomer'].getCompanyCustomerList();
      },
      submitForm() {
        this.$refs['addRelationCorpForm'].validate(async valid => {
          if (valid) {
            this.$data.submitLoading = true;
            this.$data.formData.corpNo = this.corpNo;
            this.$data.formData.corpName = this.corpName;
            let resp = await this.$http.post('/corp/saveCorpRelationShip', this.$data.formData);
            this.$data.submitLoading = false;
            if (resp.success) {
              this.$data.addRelationCorpModal = false;
              this.$Message.success('提交成功');
              this.getRelationList();
            }
          }
        });
      }
    },
    components: {
      'bs-modal': PTModal,
      TableCompanyCustomerList,
      CompanyCustomerBasicInfo
    },
    mounted() {
      this.getRelationList();
    }
  };
</script>
<style lang="scss">

</style>
