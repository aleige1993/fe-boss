export default {
  mounted() {
    this.getCarList();
  },
  methods: {
    // 获取车辆列表
    async getCarList() {
      this.$data.carDataLoading = true;
      /*let resp = await this.$http.get('/pms/cfgFinishedDoc/list', {
        currentPage: this.$data.currentPage,
        pageSize: this.$data.pageSize
      });
      if (resp.body.length !== 0) {
        this.$data.carData = resp.body;
      }
      this.$data.carData = [];*/
      let carDataArray = await JSON.parse(window.localStorage.getItem('carData'));
      this.$data.carData = carDataArray;
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
      this.$data.carbuttonLoading = true;
      await this.carData.push(this.$data.formCar);
      this.$Message.success('新增成功');
      this.$data.showModalCar = false;
    },
    // 修改情况下的提交数据
    /*async setSuBmitCar() {
      await this.carData.push(this.$data.formCar);
      this.$Message.success('修改成功');
      this.$data.showModalCar = false;
    },*/
    carSuBmit() {
      this.$data.carbuttonLoading = true;
      if (this.$data.isAddCar) {
        this.addSuBmitCar();
      } else {
        // this.setSuBmitCar();
      }
      this.$data.carbuttonLoading = false;
    },
    // 编辑
    setListCar(row) {
      this.$data.isAddCar = false;
      this.$data.showModalCar = true;
      this.$data.formCar = row;
    },
    // 删除
    async removeCar(row) {
      Alertify.confirm('确定要删除吗？', async (ok) => {
        if (ok) {
          const loadingMsg = this.$Message.loading('删除中...', 0);
          let respDel = await this.$http.post('/commonRemove', {
            id: row.id
          });
          if (respDel.success) {
            loadingMsg();
            this.$Message.success('删除成功');
            this.getCarList();
          }
        }
      });
    }
  }
};
