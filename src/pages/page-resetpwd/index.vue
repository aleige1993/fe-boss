<template>
  <div id="page-table-demo">
    <i-breadcrumb separator=">">
      <i-breadcrumb-item href="/home">首页</i-breadcrumb-item>
      <!-- <i-breadcrumb-item>安全中心</i-breadcrumb-item> -->
      <i-breadcrumb-item>修改密码</i-breadcrumb-item>
    </i-breadcrumb>
    <div class="search-form-container">
      <h1 v-if="isInit === '1'">为了您的账号安全，请先修改登陆密码</h1>
      <i-form ref="formData" :model="formData" label-position="right" :label-width="120">
        <i-row>
          <i-col span="8">
            <i-form-item label="旧密码" prop="oldPassword"
                         :rules="{required: true, message: '旧密码不能为空'}">
              <i-input type="password" v-model="formData.oldPassword"></i-input>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row>
          <i-col span="8">
            <i-form-item label="新密码" prop="loginPassword"
                         :rules="{required: true, message: '新密码不能为空'}">
              <i-input type="password" v-model="formData.loginPassword"></i-input>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row>
          <i-col span="8">
            <i-form-item label="确认密码" prop="confirmPassword"
                         :rules="{required: true, message: '确认密码不能为空'}">
              <i-input type="password" v-model="formData.confirmPassword"></i-input>
            </i-form-item>
          </i-col>
        </i-row>
        <i-form-item>
          <i-button type="primary" @click="submitFun" :loading="buttonLoading">
            <span v-if="!buttonLoading">确认修改</span>
            <span v-else>loading...</span>
          </i-button>
        </i-form-item>
      </i-form>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'modifypwd',
    data() {
      return {
        buttonLoading: false,
        formData: {
          userNo: this.$userLogin.getLoginInfo().userNo || '',
          merchantNo: this.$userLogin.getLoginInfo().merchantNo || '',
          oldPassword: '',
          loginPassword: '',
          confirmPassword: ''
        }
      };
    },
    computed: {
      isInit() {
        return this.$userLogin.getLoginInfo().isInit;
      }
    },
    methods: {
      async submitSuccess() {
        this.$data.buttonLoading = true;
        let resp = await this.$http.post('/merchant/user/changePsw', {
          ...this.$data.formData
        });
        this.$data.buttonLoading = false;
        if (resp.success && resp.success === 'true') {
          this.$Message.success('密码修改成功，请重新登录');
          this.$router.push(
            {
              name: 'login'
            }
          );
        }
      },
      // 提交
      submitFun() {
        this.$refs['formData'].validate((valid) => {
          if (valid) {
            if (this.$data.formData.loginPassword !== this.$data.formData.confirmPassword) {
              this.$Message.error('两次密码不一致，请重新输入');
            } else {
              this.submitSuccess();
            }
          } else {
            this.$Message.error('"<span style="color: red">*</span>"必填项不能为空');
          }
        });
      }
    }
  };
</script>
<style lang="scss" scoped>
  .search-form-container {
    margin-top: 20px;
    border-bottom: none;
  }
  h1 {
    margin: 0 0 15px 120px;
    font-size: 14px;
    color: #f00;
  }
</style>
