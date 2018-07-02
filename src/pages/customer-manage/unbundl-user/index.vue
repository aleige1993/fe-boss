<template>
  <div id="unbundl">
    <i-breadcrumb separator=">">
      <i-breadcrumb-item href="/home">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/customer">客户档案</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/customer/privatecustomer">个人客户管理</i-breadcrumb-item>
      <i-breadcrumb-item>个人客户解绑</i-breadcrumb-item>
    </i-breadcrumb>
    <div class="form-top-actions"></div>
    <div class="" style="position: relative">
      <i-form ref="refDate" :model="formDate" :rules="ruleDate" :label-width="100">
        <i-row>
          <i-col span="5">
            <i-form-item label="客户名" prop="name">
              <i-input v-model="formDate.name" placeholder="请输入客户姓名"></i-input>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row>
          <i-col span="5">
            <i-form-item label="电话" prop="phone">
              <i-input v-model="formDate.phone" placeholder="或之前绑定的电话"></i-input>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row>
          <i-col span="5">
            <i-form-item label="身份证" prop="card">
              <i-input v-model="formDate.card" placeholder="请输入身份证"></i-input>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row>
          <i-col span="5">
             <i-form-item>
              <i-button type="primary" @click="submitForm()" style="width: 80px;">解绑</i-button>
            </i-form-item>
          </i-col>
        </i-row>
      </i-form>


    </div>
  </div>
</template>
<script>
  /* global Alertify */
  export default {
    name: 'unbundling',
    data() {
      return {
        formDate: {
          name: '',
          phone: '',
          card: ''
        },
        ruleDate: {
          name: [
            { required: true, message: '客户名不能为空', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '解绑电话不能为空', trigger: 'blur' }
          ],
          card: [
            { required: true, message: '客户身份证不能为空', trigger: 'blur' }
          ]
        }
      };
    },
    computed: {
    },
    watch: {
    },
    components: {
    },
    methods: {
      submitForm() {
        this.$refs['refDate'].validate((valid) => {
          if (valid) {
            this.$Message.success('Success!');
          }
        });
      }
    },
    mounted() {
    }
  };
</script>
<style lang="scss" scoped>
</style>
