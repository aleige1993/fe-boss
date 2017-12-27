export default {
  methods: {
    selectLoanCar(car) {
      this.$data.formCar.carBrandCode = car.brandCode;
      this.$data.formCar.carBrandName = car.brandName;
      this.$data.formCar.carTypeCode = car.seriesCode;
      this.$data.formCar.carTypeName = car.seriesName;
      // this.$data.formCar.carTypeCode = car.seriesCode;
      this.$data.formCar.carModel = car.modelName;
    },
    // 获取车辆列表
    async getCarList() {
      this.$data.carDataLoading = true;
      let resp = await this.$http.post('/loanCarList', {});
      if (resp.body.resultList.length !== 0) {
        this.$data.carData = resp.body.resultList;
      } else {
        this.$Message.warning('车辆信息无数据');
        this.$data.carData = [];
      }
      this.$data.carDataLoading = false;
    },
    // 打开车辆新增修改模态框
    openModalCar() {
      this.$data.isAddCar = true;
      this.$data.showModalCar = true;
      this.$data.formCar = {};
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
    }
  }
};
