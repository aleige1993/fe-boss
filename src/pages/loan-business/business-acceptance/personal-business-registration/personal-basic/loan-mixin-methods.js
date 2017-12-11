export default {
  methods: {
    // 获取车辆列表
    async getLoanList() {
      this.$data.loanDataLoading = true;
      let resp = await this.$http.post('/loan-loanList', {});
      if (resp.body.resultList.length !== 0) {
        this.$data.loanData = resp.body.resultList;
      } else {
        this.$Message.warning('车辆信息无数据');
        this.$data.loanData = [];
      }
      this.$data.loanDataLoading = false;
    },
    // 打开车辆新增修改模态框
    openModalLoan() {
      this.$data.isAddLoan = true;
      this.$data.showModalLoan = true;
      this.$data.formLoan = {};
      this.$data.uploadFileName = '';
    },
    // 车辆提交
    async addSuBmitLoan() {
      await this.loanData.unshift(this.$data.formLoan);
      this.$Message.success('新增成功');
      this.$data.showModalLoan = false;
    },
    // 修改情况下的提交数据
    async setSuBmitLoan() {
      let index = await this.$data.formLoan._index;
      this.$set(this.$data.loanData, index, this.$data.formLoan);
      this.$Message.success('修改成功');
      this.$data.showModalLoan = false;
    },
    LoanSuBmit() {
      if (this.$data.isAddLoan) {
        this.addSuBmitLoan();
      } else {
        this.setSuBmitLoan();
      }
    },
    // 编辑
    setListLoan(row) {
      this.$data.isAddLoan = false;
      this.$data.showModalLoan = true;
      this.$data.formLoan = row;
    },
    // 删除
    async removeLoan(row, index) {
      Alertify.confirm('确定要删除吗？', async (ok) => {
        if (ok) {
          this.$data.loanData.splice(index, 1);
        }
      });
    },
    // 上传成功
    uploadSuccess(res, file, fileList) {
      this.$data.uploadFileName = file.name;
      this.$data.formLoan.attachPath = res.body.url;
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
