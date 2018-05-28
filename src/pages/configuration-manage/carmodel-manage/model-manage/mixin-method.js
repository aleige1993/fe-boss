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
      this.$refs['modelData'].resetFields();
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
      // console.log(JSON.stringify(this.$data.modelData));
      this.$data.buttonLoading = true;
      let submitData = {};
      if (this.$data.isAdd) {
        let carSeriesId = this.$data.modelData.carSeriesId;
        this.$data.series.resultList.map(item => {
          if (item.id === carSeriesId) {
            this.$data.modelData.seriesName = item.seriesName;
          }
        });
        this.$data.modelData.referpriceNew = this.$data.modelData.referprice;
        submitData = {
          carModelDto: {
            modelFullName: this.$data.modelData.seriesName + this.$data.modelData.name,
            modelName: this.$data.modelData.name,
            seriesYear: this.$data.modelData.yyyy,
            guidancePrice: this.$data.modelData.referprice,
            modelImg: this.$data.modelData.modelImg
          },
          CarDetailVo: this.$data.modelData,
          carSeriesId
        };
      } else {
        submitData = this.$data.modelData;
      }
      // console.log(JSON.stringify(submitData));
      let url = this.$data.isAdd ? '/ces/add/carDetail' : '/ces/model/detail/update';
      let resp = await this.$http.post(url, submitData);
      this.$data.buttonLoading = false;
      if (resp.success) {
        let text = this.$data.isAdd ? '添加成功' : '修改成功';
        this.$Message.success(text);
        this.getProxyPayList();
        this.$data.addModal = false;
      }
    },
    // 提交
    submitFun() {
      this.$refs['modelData'].validate((valid) => {
        if (valid) {
          this.submitSuccess();
        } else {
          this.$Message.error('"<span style="color: red">*</span>"必填项不能为空');
        }
      });
    },
    // 上传文件之前的回掉
    uploadModelProgress() {
      this.$data.modelData.fileUploading = true;
    },
    // 上传成功
    uploadModelSuccess(res, file, fileList) {
      this.$data.modelData.modelImg = res.body.url;
      this.$data.modelData.fileUploading = false;
    },
    // 上传失败
    uploadModelError(err, file, fileList) {
      this.$Notice.error({
        title: '错误提示',
        desc: err
      });
      this.$data.modelData.fileUploading = false;
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
