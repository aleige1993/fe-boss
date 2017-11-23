<template>
<div id="maintain-modal-two">
  <i-form ref="formAgreement" :model="formAgreement" label-position="left" :label-width="100">
    <i-form-item class="required" label="协议名称" prop="name">
      <i-input v-model="formAgreement.name"></i-input>
    </i-form-item>
    <i-form-item class="required" label="协议编号" prop="number">
      <i-input v-model="formAgreement.number"></i-input>
    </i-form-item>
    <i-form-item class="required" label="协议附件" prop="Enclosure">
      <i-upload
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
      <i-button type="primary" @click="formSubmit">提交</i-button>
      <i-button type="ghost" style="margin-left: 8px" @click="formCancel">取消</i-button>
    </i-form-item>
  </i-form>
</div>
</template>

<script>
  export default {
    name: '',
    data() {
      return {
        formAgreement: {},
        uploadUrl: ''
      };
    },
    methods: {
      formSubmit() {
      },
      formCancel() {
        this.$emit('parModel');
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
