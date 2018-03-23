<template>
<div id="maintain-modal-upload">
  <i-form ref="formAgreement" :model="formAgreement" label-position="left" :label-width="100">
    <i-form-item
      :rules="{required: true, message: '协议名称不能为空', trigger: 'blur'}"
      label="协议名称"
      prop="cooperationName">
      <i-input v-model="formAgreement.cooperationName"></i-input>
    </i-form-item>
    <i-form-item
      :rules="{required: true, message: '协议编号不能为空', trigger: 'blur'}"
      label="协议编号"
      prop="cooperationNo">
      <i-input v-model="formAgreement.cooperationNo"></i-input>
    </i-form-item>
    <i-form-item
      :rules="{required: true, message: '协议附件不能为空', trigger: 'blur'}"
      label="协议附件"
      prop="attachUrl">
      <i-upload
        :show-upload-list="false"
        :on-success="uploadSuccess"
        :before-upload="uploadProgress"
        :on-error="uploadError"
        type="drag"
        :action="$config.HTTPBASEURL + '/common/upload'">
        <div style="padding: 20px 0">
          <i-icon type="ios-cloud-upload" size="52" style="color: #3399ff"></i-icon>
          <p>单击或拖动文件上传</p>
          <i-spin fix v-if="fileUploading">
            <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
            <div style="margin-top: 10px">正在上传中，请勿关闭...</div>
          </i-spin>
        </div>
      </i-upload>
      <p class="show-upload-text" v-text="formAgreement.attachUrl"></p>
      <input type="hidden" v-model="formAgreement.attachUrl" style="width: 100%;border: 0;">
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
    props: {
      agreementData: Object
    },
    data() {
      return {
        buttonLoading: false,
        fileUploading: false,
        uploadFileName: '',
        formAgreement: {
          cooperationName: '', // 协议名称
          cooperationNo: '', // 协议编号
          attachUrl: '' // 协议附件地址
        }
      };
    },
    methods: {
      // 提交请求
      async Submit() {
        this.$data.buttonLoading = true;
        let capitalNo = this.agreementData.capitalNo;
        let capitalName = this.agreementData.capitalName;
        let dataObject = {
          capitalNo,
          capitalName,
          ...this.$data.formAgreement
        };
        let res = await this.$http.post('/pms/capital/cooperationSave', dataObject);
        this.$data.buttonLoading = false;
        if (res.success) {
          this.$Message.success('新增成功', 2000);
        }
        await bsWait(200);
        this.$emit('parModel');
        this.$emit('getAgreementList');
      },
      formSubmit() {
        let formName = 'formAgreement';
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.Submit();
          } else {
            this.$Message.error('"<span style="color: red">*</span>"必填项不能为空');
          }
        });
      },
      // 上传之前的回掉
      uploadProgress(res, file, fileList) {
        this.$data.fileUploading = true;
      },
      // 上传成功
      uploadSuccess(res, file, fileList) {
        this.$data.uploadFileName = file.name;
        this.$data.formAgreement.attachUrl = res.body.url;
        this.$data.fileUploading = false;
      },
      // 上传失败
      uploadError(err, file, fileList) {
        this.$data.uploadFileName = '';
        this.$Notice.error({
          title: '错误提示', desc: err
        });
        this.$data.fileUploading = false;
      },
      formCancel() {
        this.$emit('parModel');
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
#maintain-modal-upload {
  & .show-upload-text {
    position: relative;
    padding-right: 36px;
    line-height: 20px;
    min-height: 20px;
    color: #666;
  }
}
</style>
