<template>
<div id="maintain-modal-upload">
  <i-form ref="formAgreement" :model="formAgreement" label-position="left" :label-width="100">
    <i-form-item
      :rules="{required: true, message: '协议名称不能为空', trigger: 'blur'}"
      label="协议名称"
      prop="name">
      <i-input v-model="formAgreement.name"></i-input>
    </i-form-item>
    <i-form-item
      :rules="{required: true, message: '协议编号不能为空', trigger: 'blur'}"
      label="协议编号"
      prop="number">
      <i-input v-model="formAgreement.number"></i-input>
    </i-form-item>
    <i-form-item
      :rules="{required: true, message: '协议附件不能为空', trigger: 'blur'}"
      label="协议附件"
      prop="enclosure">
      <input type="text" v-model="formAgreement.enclosure">
      <i-upload
        :on-success="uploadSuccess"
        :on-error="uploadError"
        multiple
        type="drag"
        :action="uploadUrl">
        <div style="padding: 20px 0">
          <i-icon type="ios-cloud-upload" size="52" style="color: #3399ff"></i-icon>
          <p>单击或拖动文件上传</p>
        </div>
      </i-upload>
    </i-form-item>
    <i-form-item class="text-right">
      <i-button type="primary" @click="formSubmit" :loading="buttonLoading">
        <span v-if="!buttonLoading">提交</span>
        <span v-else>loading...</span>
      </i-button>
      <i-button type="ghost" style="margin-left: 8px" @click="formCancel">取消</i-button>
    </i-form-item>
  </i-form>
</div>
</template>

<script>
  export default {
    name: 'maintainModalUpload',
    data() {
      return {
        buttonLoading: false,
        formAgreement: {
          name: '',
          number: '',
          enclosure: ''
        },
        uploadUrl: '//jsonplaceholder.typicode.com/posts/'
      };
    },
    methods: {
      formSubmit() {
        let formName = 'formAgreement';
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$emit('parModel');
          } else {
            this.$Message.error('"<span style="color: red">*</span>"必填项不能为空');
          }
        });
      },
      // 上传成功
      uploadSuccess(res, file, fileList) {
        console.log(res);
        this.$data.formAgreement.enclosure = res.body.url;
      },
      // 上传失败
      uploadError() {},
      formCancel() {
        this.$emit('parModel');
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
