export default {
  methods: {
    // 获取担保信息列表
    async getAssureList() {
      this.$data.assureDataLoading = true;
      let resp = await this.$http.post('/loanAssureList', {});
      this.$data.assureDataLoading = false;
      if (resp.success) {
        this.$data.assureData = resp.body.resultList;
      } else {
        this.$data.assureData = [];
      }
    },
    /**
     * 选择担保人类型
     */
    loanApplyAssureChanged(value) {
      this.$refs['formAssure'].resetFields();
      this.$data.formAssure.guaPersonType = value;
    },
    // 打开担保信息新增修改模态框
    openModalAssure() {
      this.$data.isAddAssure = true;
      this.$data.showModalAssure = true;
      this.$data.formAssure = {};
    },
    // 担保信息提交
    async addSuBmitAssure() {
      await this.assureData.unshift(this.$data.formAssure);
      this.$data.showModalAssure = false;
      this.$Message.success('新增成功');
    },
    // 修改情况下的提交数据
    async setSuBmitAssure() {
      let index = await this.$data.formAssure._index;
      this.$set(this.$data.assureData, index, this.$data.formAssure);
      this.$data.showModalAssure = false;
      this.$Message.success('修改成功');
    },
    assureSuBmit() {
      let name = 'formAssure';
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.$data.isAddAssure) {
            this.addSuBmitAssure();
          } else {
            this.setSuBmitAssure();
          }
        } else {
          this.$Message.error('<span style="color: red">*</span>项不能为空');
        }
      });
    },
    // 编辑
    setListAssure(row) {
      this.$data.isAddAssure = false;
      this.$data.showModalAssure = true;
      this.$data.formAssure = row;
    },
    // 删除
    async removeAssure(row, index) {
      Alertify.confirm('确定要删除吗？', async(ok) => {
        if (ok) {
          this.$data.assureData.splice(index, 1);
        }
      });
    }
  }
};
