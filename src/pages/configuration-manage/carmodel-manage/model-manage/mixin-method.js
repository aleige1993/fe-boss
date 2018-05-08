export default {
  methods: {
    async remoteSearchBrand(brandName = '') {
      if (brandName !== '') {
        this.$data.brand.searchLoading = true;
        let res = await this.$http.post('/ces/getMasterBrand', {
          brandName
        });
        if (res.success) {
          res.body.resultList.map(items => {
            items.groupList.map(item => {
              this.$data.brand.searchList.push(item);
            });
          });
          this.$data.brand.searchLoading = false;
        }
      } else {
        this.$data.brand.searchList = [];
      }
    },
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
    // 上传成功
    uploadModelSuccess(res, file, fileList) {
      this.$data.fromData.modelImg = res.body.url;
    },
    uploadSerialSuccess(res, file, fileList) {
      this.$data.fromData.serialPic = res.body.url;
    },
    uploadLogoSuccess(res, file, fileList) {
      this.$data.fromData.logourl = res.body.url;
    },
    // 上传失败
    uploadError(err, file, fileList) {
      this.$Notice.error({
        title: '错误提示',
        desc: err
      });
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
