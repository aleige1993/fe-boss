<template>
  <section>
    <top-bar></top-bar>
    <top-nav></top-nav>
    <div id="page-resetpwd">
      <!-- <i-breadcrumb separator=">">
        <i-breadcrumb-item href="/home">首页</i-breadcrumb-item>
        <i-breadcrumb-item>安全中心</i-breadcrumb-item>
        <i-breadcrumb-item>修改密码</i-breadcrumb-item>
      </i-breadcrumb> -->
      <i-row type="flex" justify="center" align="middle">
        <i-col :span="8">
          <div class="search-form-container">
            <h1 v-if="isInit === '1'">为了您的账号安全，请先修改登陆密码</h1>
            <i-form ref="formData" :model="formData" label-position="right" :label-width="120">
              <i-row>
                <i-col span="24">
                  <i-form-item label="旧密码" prop="oldPassword"
                               :rules="{required: true, message: '旧密码不能为空'}">
                    <i-input type="password" v-model="formData.oldPassword"></i-input>
                  </i-form-item>
                </i-col>
              </i-row>
              <i-row>
                <i-col span="24">
                  <i-form-item label="新密码" prop="password"
                               :rules="{required: true, message: '新密码不能为空'}">
                    <i-input type="password" v-model="formData.password"></i-input>
                  </i-form-item>
                </i-col>
              </i-row>
              <i-row>
                <i-col span="24">
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
        </i-col>
      </i-row>

    </div>
  </section>
</template>

<script>
  import TopBar from '@/pages/common/top-bar';
  import TopNav from '@/pages/common/top-nav';
  export default {
    name: 'modifypwd',
    data() {
      return {
        buttonLoading: false,
        formData: {
          userId: this.$userLogin.getLoginInfo().userId || '',
          username: this.$userLogin.getLoginInfo().loginName || '',
          oldPassword: '',
          password: '',
          confirmPassword: ''
        }
      };
    },
    computed: {
      isInit() {
        return this.$userLogin.getLoginInfo().isInit;
      }
    },
    components: {
      TopBar,
      TopNav
    },
    methods: {
      async logout() {
        let promise = await this.$http.get('/logout');
        if (promise.reCode === '0000') {
          this.$userLogin.removeLoginInfo();
          this.$router.push('/login');
        } else {
          this.$Notice.error({
            title: '错误提示',
            desc: '系统繁忙，请稍后重试'
          });
        }
      },
      async submitSuccess() {
        this.$data.buttonLoading = true;
        let resp = await this.$http.post('/sys/user/resetPwd', {
          ...this.$data.formData
        });
        this.$data.buttonLoading = false;
        if (resp.success) {
          this.$Message.success('密码修改成功，请重新登录');
          // 先退出之前的登录信息再跳转到登录页面
          this.logout();
        }
      },
      // 提交
      submitFun() {
        this.$refs['formData'].validate((valid) => {
          if (valid) {
            if (this.$data.formData.password !== this.$data.formData.confirmPassword) {
              this.$Message.error('两次密码不一致，请重新输入');
            } else {
              this.submitSuccess();
            }
          }
        });
      }
    },
    mounted() {
      this.initMenuTree();
    }
  };
</script>
<style lang="scss" scoped>
#page-resetpwd{
  padding-top: 100px;
}
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
