export default {
  methods: {
    selectLoanCar(car) {
      this.$data.formCar.carBrandCode = car.brandNo;
      this.$data.formCar.carBrandName = car.brandName;
      this.$data.formCar.carTypeCode = car.seriesNo;
      this.$data.formCar.carTypeName = car.seriesName;
      // this.$data.formCar.carTypeCode = car.seriesCode;
      this.$data.formCar.carModel = car.modelName;
    },
    // 获取车辆列表
    async getCarList() {
      this.$data.carDataLoading = true;
      let resp = await this.$http.post('/loanCarList', {});
      if (resp.success && resp.body.resultList.length !== 0) {
        this.$data.carData = resp.body.resultList;
      } else {
        this.$data.carData = [];
      }
      this.$data.carDataLoading = false;
    },
    // 打开车辆新增修改模态框
    openModalCar() {
      this.$data.isAddCar = true;
      this.$data.showModalCar = true;
      this.$refs['formCar'].resetFields();
    },
    // 车辆提交
    async addSuBmitCar() {
      await this.carData.unshift(this.$data.formCar);
      this.$Message.success('新增成功');
      this.$data.showModalCar = false;
    },
    // 修改情况下的提交数据
    async setSuBmitCar() {
      let index = await this.$data.formCar._index;
      this.$set(this.$data.carData, index, this.$data.formCar);
      this.$data.showModalCar = false;
      this.$Message.success('修改成功');
    },
    carSuBmit() {
      let name = 'formCar';
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.$data.isAddCar) {
            this.addSuBmitCar();
          } else {
            this.setSuBmitCar();
          }
        } else {
          this.$Message.error('<span style="color: red">*</span>项不能为空');
        }
      });
    },
    // 编辑
    setListCar(row) {
      this.$data.isAddCar = false;
      this.$data.showModalCar = true;
      this.$data.formCar = row;
    },
    // 删除
    async removeCar(row, index) {
      Alertify.confirm('确定要删除吗？', async (ok) => {
        if (ok) {
          this.$data.carData.splice(index, 1);
        }
      });
    },
    showAddCarEvalModal() {
      this.$data.isAddCarEval = true;
      this.$data.showCarEvalFormModal = true;
      this.$refs['formCarEval'].resetFields();
    },
    /**
     * 提交车辆评估信息
     */
    submitCarEval() {
      this.$refs['formCarEval'].validate(valid => {
        if (valid) {
          if (this.$data.isAddCarEval) {
            this.$data.formCar.carEvalVOList.push(this.$data.formCarEval);
          } else {
            this.$set(this.$data.formCar.carEvalVOList, this.$data.modifyCarEvalRowIndex, this.$data.formCarEval);
          }
          this.$data.showCarEvalFormModal = false;
        }
      });
    }
  }
};
