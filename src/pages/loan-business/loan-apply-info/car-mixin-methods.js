export default {
  methods: {
    selectLoanCar(car) {
      this.$data.formCar.carBrandCode = car.brandNo;
      this.$data.formCar.carBrandName = car.brandName;
      this.$data.formCar.carTypeCode = car.seriesNo;
      this.$data.formCar.carTypeName = car.seriesName;
      // this.$data.formCar.carTypeCode = car.seriesCode;
      this.$data.formCar.carModel = car.modelNo;
      this.$data.formCar.carModelName = car.modelName;
    },
    // 获取车辆列表
    async getCarList() {
      this.$data.carDataLoading = true;
      let resp = await this.$http.post('/loanCarList', {});
      if (resp.success) {
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
      await this.carData.unshift($.extend({}, this.$data.formCar));
      this.$data.showModalCar = false;
    },
    // 修改情况下的提交数据
    async setSuBmitCar() {
      let index = await this.$data.formCar._index;
      this.$set(this.$data.carData, index, this.$data.formCar);
      this.$data.showModalCar = false;
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
          this.$Message.error('<span style="color: red">*</span>项不能为空或填写格式错误');
        }
      });
    },
    /**
     * 编辑车辆信息
     * @param row
     * @returns {Promise<void>}
     */
    setListCar(row) {
      this.$data.isAddCar = false;
      this.$data.showModalCar = true;
      this.$data.carInfoDataIndex = row._index;
      this.$data.formCar = row;
    },
    // 删除
    async removeCar(row, index) {
      Alertify.confirm('确定要删除吗？', async(ok) => {
        if (ok) {
          this.$data.carData.splice(index, 1);
        }
      });
    },
    showAddCarEvalModal() {
      this.$data.isAddCarEval = true;
      this.$data.showCarEvalFormModal = true;
      // this.$refs['formCarEval'].resetFields();
    },
    /**
     * 提交车辆评估信息
     */
    submitCarEval() {
      this.$refs['formCarEval'].validate(valid => {
        if (valid) {
          if (this.$data.isAddCarEval) {
            this.$data.formCar.loanCarEvalDTOList.push(this.$data.formCarEval);
          } else {
            this.$set(this.$data.formCar.loanCarEvalDTOList, this.$data.modifyCarEvalRowIndex, this.$data.formCarEval);
          }
          this.$data.showCarEvalFormModal = false;
        }
      });
    }
  }
};
