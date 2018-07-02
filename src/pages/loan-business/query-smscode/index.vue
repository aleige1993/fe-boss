<template>
  <div id="page-table-demo">
    <i-breadcrumb separator=">">
      <i-breadcrumb-item href="/home">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/loanbusiness">贷款业务</i-breadcrumb-item>
      <i-breadcrumb-item>查询短信验证码</i-breadcrumb-item>
    </i-breadcrumb>
    <i-row type="flex">
      <i-col :span="8">
        <div class="search-form-container">
          <i-form ref="formData" :model="formData" label-position="right" :label-width="120">
            <i-row>
              <i-col span="24">
                <i-form-item label="手机号" prop="mobile"
                             :rules="{required: true, message: '手机号不能为空'}">
                  <i-input type="text" v-model="formData.mobile" @on-enter="submitFun"></i-input>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="24">
                <i-form-item label="查询结果">
                  <i-input readonly type="text" v-model="resultMsg"></i-input>
                </i-form-item>
              </i-col>
            </i-row>
            <i-form-item>
              <i-button type="primary" @click="submitFun" :loading="buttonLoading">
                <span v-if="!buttonLoading">提交</span>
                <span v-else>loading...</span>
              </i-button>
            </i-form-item>
          </i-form>
        </div>
      </i-col>
    </i-row>
  </div>
</template>

<script>
  export default {
    name: 'querySmsCode',
    data() {
      return {
        buttonLoading: false,
        formData: {
          mobile: ''
        },
        resultMsg: ''
      };
    },
    methods: {
      async submitSuccess() {
        this.$data.buttonLoading = true;
        let res = await this.$http.get('/common/getSmsCaptcha', {
          mobile: this.$data.formData.mobile
        });
        this.$data.buttonLoading = false;
        if (res.success) {
          this.$data.resultMsg = res.reMsg;
        }
      },
      // 提交
      submitFun() {
        this.$refs['formData'].validate((valid) => {
          if (valid) {
            this.submitSuccess();
          }
        });
      }
    },
    mounted() {
    }
  };
</script>

<style lang="scss">

</style>
