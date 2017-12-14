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
        <i-form ref="formQuota" :model="formQuota" label-position="right" :label-width="120" style="padding: 30px 0;">
          <!--客户名称-->
            <!--<i-form-item
              label="客户名称"
              :rules="{required: true, message: '客户名称不能为空', trigger: 'blur'}"
              prop="corpName">
              <input type="hidden" v-model="formQuota.corpNo"/>
              <i-input v-model="formQuota.corpName" :readonly="true" placeholder="选择客户">
                <i-button @click="showSelectCompany=!showSelectCompany" slot="append">选择客户 <Icon type="ios-more"></Icon></i-button>
              </i-input>
            </i-form-item>-->
          <i-row>
            <i-col span="8">
              <i-form-item label="客户名称" prop="corpName">
                <span v-text="formQuota.corpName"></span>
              </i-form-item>
            </i-col>
          </i-row>
          <i-row>
            <i-col span="8">
              <!--客户经理-->
              <!--<i-form-item
                label="客户经理"
                :rules="{required: true, message: '客户经理不能为空', trigger: 'blur'}"
                prop="custMgrName">
                <input type="hidden" v-model="formQuota.custMgrName"/>
                <i-input v-model="formQuota.custMgrName" :readonly="true" placeholder="选择客户经理">
                  <i-button @click="showSelectEmployer=!showSelectEmployer" slot="append">客户经理 <Icon type="ios-more"></Icon></i-button>
                </i-input>
              </i-form-item>-->
              <i-form-item label="客户经理" prop="custMgrName">
                <span v-text="formQuota.custMgrName"></span>
              </i-form-item>
            </i-col>
          </i-row>
          <!--授信总额度-->
            <br>
            <br>
          <i-row>
            <i-col span="8">
            <i-form-item label="授信总额度" prop="CreditMoney">
              <i-input v-model="formQuota.CreditMoney" placeholder="">
                <span slot="append">元</span>
              </i-input>
            </i-form-item>
            </i-col>
          </i-row>
          <i-row>
            <i-col span="8">
          <!--可用额度-->
            <i-form-item label="可用额度" prop="CreditMoney"><!--currentUsableLimit-->
              <i-input v-model="formQuota.CreditMoney" :readonly="true" placeholder="">
                <span slot="append">元</span>
              </i-input>
            </i-form-item>
            </i-col>
          </i-row>
          <i-row>
            <i-col span="8">
          <!--单笔最大额度-->
            <i-form-item label="单笔最大额度" prop="currentUsableLimit">
              <i-input v-model="formQuota.currentUsableLimit" placeholder="">
                <!--<span slot="append">元</span>-->
              </i-input>
            </i-form-item>
            </i-col>
          </i-row>
          <i-row>
            <i-col span="8">
          <!--授信起始日期-->
            <i-form-item label="授信起始日期" prop="startDate">
              <bs-datepicker v-model="formQuota.startDate"></bs-datepicker>
            </i-form-item>
            </i-col>
          </i-row>
          <i-row>
            <i-col span="8">
          <!--授信到期日期-->
            <i-form-item label="授信到期日期" prop="startDate">
              <bs-datepicker v-model="formQuota.endDate"></bs-datepicker>
            </i-form-item>
            </i-col>
          </i-row>
          <i-row>
            <i-col span="8">
          <!--额度释放方式-->
            <i-form-item label="额度释放方式" prop="CreditOpenModel">
              <i-select v-model="formQuota.CreditOpenModel">
                <i-option value="1">额度释放方式01</i-option>
                <i-option value="2">额度释放方式02</i-option>
                <i-option value="3">额度释放方式03</i-option>
              </i-select>
            </i-form-item>
            </i-col>
          </i-row>
          <bs-form-block :title="'审核意见'">
            <i-row>
              <i-col span="8">
                <i-form-item label="处理人" prop="name">
                  <i-input v-model="formQuota.name" :readonly="true" placeholder="">
                  </i-input>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="处理时间" prop="date">
                  <!--<i-input v-model="formQuota.date" :readonly="true" placeholder="">
                  </i-input>-->
                  <bs-datepicker v-model="formQuota.date" type="text" placeholder="申请时间"></bs-datepicker>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="结论" prop="conclusion" :rules="{required: true, message: '结论不能为空', trigger: 'change'}">
                  <i-select v-model="formQuota.conclusion">
                    <i-option value="1">通过</i-option>
                    <i-option value="2">拒绝</i-option>
                    <i-option value="3">退回</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="意见信息" prop="opinion" :rules="{required: true, message: '意见信息不能为空', trigger: 'blur'}">
                  <i-input type="textarea" v-model="formQuota.opinion" :rows="2" placeholder="">
                  </i-input>
                </i-form-item>
              </i-col>
            </i-row>
          </bs-form-block>
          <br>
          <br>
          <i-form-item class="text-center">
            <i-button type="primary" @click="submitFun">提交审核</i-button>
            <i-button type="ghost" @click="cancelFun" style="margin-left: 8px">取消</i-button>
          </i-form-item>
        </i-form>
      </i-tab-pane>
      <i-tab-pane label="审核历史信息">

      </i-tab-pane>
    </i-tabs>
  </div>

</template>

<script>
  export default {
    name: 'distributorCreditExamine',
    data() {
      return {
        tabIndex: 0,
        formQuota: {
          corpName: '',
          custMgrName: '',
          custMgrNo: '',
          CreditMoney: '', // 授信总额度
          currentUsableLimit: '', // 可用额度（自动带入授信总额度）
          startDate: '', // 授信起始日期
          endDate: '', // 授信起始日期
          CreditOpenModel: '', // 额度释放方式
          name: '',
          date: '',
          conclusion: ''
        }
      };
    },
    methods: {
      submitFun() {
        const formName = 'formQuota';
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.submiting();
          } else {
            this.$Message.error('"<span style="color: red">*</span>"必填项不能为空');
          }
        });
      },
      cancelFun() {}
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
