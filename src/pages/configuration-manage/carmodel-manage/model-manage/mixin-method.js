export default {
  methods: {
    selectRow(row, index) {
      this.$emit('on-row-dbclick', row, index);
    },
    jumpPage(page) {
      this.getProxyPayList(page);
    },
    search() {
      this.getProxyPayList(1);
    },
    add() {
      this.$data.isAdd = true;
      this.$data.addModal = true;
      this.$data.fromData = {};
    },
    async getProxyPayList(page) {
      this.$data.dataLoading = true;
      if (page) {
        this.$data.searchForm.currentPage = page;
      }
      let resp = await this.$http.post('/ces/model/page', {
        ...this.$data.searchForm
      });
      this.$data.dataLoading = false;
      this.$data.privateCustomerLoanList = resp.body.resultList;
      this.$data.currentPage = resp.body.currentPage;
      this.$data.total = resp.body.totalNum;
    },
    async submitSuccess() {
      this.$data.buttonLoading = true;
      let url = this.$data.isAdd ? '' : '/ces/model/detail/update';
      let resp = await this.$http.post(url, {
        ...this.$data.fromData
      });
      this.$data.buttonLoading = false;
      this.$data.addModal = false;
      if (resp.success) {
        let text = this.$data.isAdd ? '添加成功' : '修改成功';
        this.$Message.success(text);
        this.getProxyPayList();
      }
    },
    // 提交
    submitFun() {
      this.$refs['fromData'].validate((valid) => {
        if (valid) {
          this.submitSuccess();
        } else {
          this.$Message.error('"<span style="color: red">*</span>"必填项不能为空');
        }
      });
    },
    // 上传文件之前的回掉
    uploadModelProgress() {
      this.$data.fromData.modelFileUploading = true;
    },
    // 上传成功
    uploadModelSuccess(res, file, fileList) {
      if (this.$data.addModal) {
        this.$data.fromData.modelImg = res.body.url;
      }
      this.$data.fromData.modelFileUploading = false;
    },
    // 上传失败
    uploadModelError(err, file, fileList) {
      this.$Notice.error({
        title: '错误提示',
        desc: err
      });
      this.$data.fromData.modelFileUploading = false;
    },
    // 取消 按钮
    cancelFun() {
      this.$data.addModal = false;
    }
  },
  mounted() {
    this.getProxyPayList();
  }
};
