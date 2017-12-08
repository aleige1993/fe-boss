export default {
  methods: {
    // 编辑
    setListLoan() {},
    // 删除
    removeLoan() {},
    // 提交
    LoanSuBmit() {},
    // 上传成功
    uploadSuccess(res, file, fileList) {
      this.$data.uploadFileName = file.name;
      this.$data.formLoan.fileName = res.body.url;
    },
    // 上传失败
    uploadError(err, file, fileList) {
      this.$data.uploadFileName = '';
      this.$Notice.error({
        desc: err
      });
    }
  }
};
