<template>
  <div>
    <div class="form-top-actions" style="padding-top: 0">
      <i-button type="primary" @click="addBankModal=!addBankModal"><i class="iconfont icon-xinzeng"></i> 新增</i-button>
    </div>
    <i-table :loading="listLoading" :columns="relationCorpColumns" :data="relationCorpDatas"></i-table>
    <!--添加联系人模态框-->
    <bs-modal title="添加关联企业" v-model="addBankModal">
      <i-form ref="addRelationCorpForm" label-position="left" :label-width="80">
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
                    :rules="{required: true, message: '请输入关系'}">
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
          <i-date-picker v-model="formData.regDate" style="width: 100%" placeholder=""></i-date-picker>
        </i-form-item>
        <i-form-item label="注册资金" prop="regCapital"
                     :rules="{required: true, message: '请输入注册资金'}">
          <i-input v-model="formData.regCapital" placeholder=""></i-input>
        </i-form-item>
        <i-form-item label="经营地址" prop="bizAddress"
                     :rules="{required: true, message: '请输入经营地址'}">
          <i-input v-model="formData.bizAddress" placeholder=""></i-input>
        </i-form-item>
        <i-form-item label="备注" prop="mail">
          <i-input v-model="formData.remark" placeholder=""></i-input>
        </i-form-item>
        <i-form-item label="">
          <i-button @click="submitForm" type="primary" size="large" style="width: 80px;">提交</i-button>
        </i-form-item>
      </i-form>
    </bs-modal>
    <!-- 选择企业的弹窗 -->
    <bs-modal title="选择企业" :width="1200" v-model="slectRelationCompanyModal">
      <table-company-customer-list type="modal" @on-row-dbclick="selectCompany">
        <div class="form-top-actions" slot="topAction">
          <i-button type="info" @click="addCompanyCustomerModal=!addCompanyCustomerModal"><i class="iconfont icon-xinzeng"></i> 新增</i-button>
        </div>
      </table-company-customer-list>
    </bs-modal>
    <bs-modal title="新增企业客户" :width="1280" v-model="addCompanyCustomerModal">
      <company-customer-basic-info @on-row-click="selectCompany" type="modal"></company-customer-basic-info>
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
        addBankModal: false,
        listLoading: false,
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
      selectCompany(row, index) {
        // Alertify.alert('您选择的企业id：' + index);
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
      submitForm() {
        this.$refs['addRelationCorpForm'].validate(valid => {
          if (valid) {
            // aa
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
