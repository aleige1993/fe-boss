export default {
  // name: 'confmodelfee',
  // components: {
  //   'pt-modal': PTModal
  // },
  // props: {
  //   childMsg: Object
  // },
  // mixins: [MixinData],
  data() {
    return {
      showCostModel: false,
      isCostAdd: true,
      showCostAdd: false,
      costDataLoading: false,
      buttonLoading: false,
      costTypeSelect: [], // 费用类型的下拉数据
      formCostModel: {
        feeTypeNo: '',  // 费用类型编号
        feeTypeCode: '',  // 费用类型代码
        incomeType: '',  // 收取类型
        feeTypeName: '',  // 费用类型名称
        feeType: '',  // 收支方向
        feeAccording: '', // 收费依据
        productName: '',  // 产品名称
        fixedAmount: '',  // 固定金额
        productNo: '',  // 产品编号
        ratio: '',  // 标准比例
        productId: ''  // 产品ID
      }
    };
  },
  // mounted() {
  //   this.getCostSelectData(); // 费用类型的下拉数据
  //   this.getCostCollectList();  // 获取模态框列表数据
  // },
  methods: {
    // 费用类型代码随费用类型变化
    feeTypeCodeChange(value) {
      this.$data.costTypeSelect.forEach((item) => {
        if (item.feeTypeNo === value) {
          this.$data.formCostModel.feeTypeCode = item.feeTypeCode;
        }
      });
    },
    // 获取模态框列表数据
    async getCostCollectList() {
      this.$data.costDataLoading = true;
      // let productNo = this.childMsg.productNo;
      let resp = await this.$http.get('/pms/productFeeDetail/queryByProductNo', {
        packageRateNo: this.$data.packageRateNo
      });
      this.$data.costDataLoading = false;
      if (resp.success) {
        this.$data.costdata = resp.body.resultList;
        this.$data.costdata = this.$data.costdata.map(item => {
          if (item.incomeType === '1') { // 切换成按利率
            item.fixedAmount = ''; // 按固定金额
          } else if (item.incomeType === '2') {
            item.ratio = ''; // 按利率
          }
          return item;
        });
      } else {
        this.$data.costdata = [];
      }
    },
    // 获取 基础配置-费用类型配置的数据
    async getCostSelectData() {
      let SelectResp = await this.$http.get('/pms/cfgFeeType/list', {
        currentPage: 1,
        pageSize: 99999
      });
      if (SelectResp.success) {
        this.$data.costTypeSelect = SelectResp.body.resultList;
      } else {
        this.$data.costTypeSelect = [];
      }
    },
    getFeeTypeName() {
      let selectSize = this.$data.costTypeSelect.length;
      let feeTypeName = '';
      for (let i = 0; i < selectSize; i++) {
        if (this.$data.costTypeSelect[i].feeTypeNo === this.$data.formCostModel.feeTypeNo) {
          feeTypeName = this.$data.costTypeSelect[i].feeTypeName;
        }
      }
      return feeTypeName;
    },
    // 新增的保存请求方法
    async addSuBmitCost() {
      this.$data.buttonLoading = true;
      let feeTypeName = this.getFeeTypeName();
      let resAdd = await this.$http.post('/pms/productFeeDetail/save', {
        packageRateNo: this.$data.packageRateNo,
        feeTypeNo: this.$data.formCostModel.feeTypeNo,  // 费用类型编号
        feeTypeCode: this.$data.formCostModel.feeTypeCode,  // 费用类型代码
        incomeType: this.$data.formCostModel.incomeType, // 收取类型
        feeTypeName,  // 费用类型名称
        feeType: this.$data.formCostModel.feeType,  // 收支方向
        feeAccording: this.$data.formCostModel.feeAccording,  // 收费依据
        productName: this.childMsg.productName,  // 产品名称
        fixedAmount: this.$data.formCostModel.fixedAmount,  // 固定金额
        productNo: this.childMsg.productNo,  // 产品编号
        ratio: this.$data.formCostModel.ratio,  // 标准比例
        productId: this.childMsg.id // 产品ID
      });
      this.$data.buttonLoading = false; // 关闭按钮的loading状态
      if (resAdd.success) {
        this.$data.showCostAdd = false;
        this.$Message.success('添加费用类型成功');
        this.getCostCollectList();
      }
    },
    addCostModal() {
      this.$data.isCostAdd = true;
      this.$data.showCostAdd = true;   // 增删的模态框
      this.$refs['formCostModel'].resetFields();
      this.getCostSelectData(); // 费用类型的下拉数据
    },
    setCostList(row) {
      this.isCostAdd = false;
      this.$data.showCostAdd = true;
      this.formCostModel = row;
      this.getCostSelectData(); // 费用类型的下拉数据
    },
    // 修改情况下的提交数据
    async setSubmitCost() {
      this.$data.buttonLoading = true;
      let feeTypeName = this.getFeeTypeName();
      let resModify = await this.$http.post('/pms/productFeeDetail/modify', {
        id: this.$data.formCostModel.id,
        packageRateNo: this.$data.packageRateNo,
        feeTypeNo: this.$data.formCostModel.feeTypeNo,  // 费用类型编号
        feeTypeCode: this.$data.formCostModel.feeTypeCode,  // 费用类型代码
        incomeType: this.$data.formCostModel.incomeType, // 收取类型
        feeTypeName,  // 费用类型名称
        feeType: this.$data.formCostModel.feeType,  // 收支方向
        feeAccording: this.$data.formCostModel.feeAccording,  // 收费依据
        productName: this.childMsg.productName,  // 产品名称
        fixedAmount: this.$data.formCostModel.fixedAmount,  // 固定金额
        productNo: this.childMsg.productNo,  // 产品编号
        ratio: this.$data.formCostModel.ratio  // 标准比例
      });
      this.$data.buttonLoading = false;
      if (resModify.success) {
        this.$data.showCostAdd = false;
        this.$Message.success('修改费用类型成功');
        this.getCostCollectList();
      }
    },
    // 删除数据的请求
    async costRemove(row) {
      // console.log(row);
      Alertify.confirm('确定要删除吗？', async (ok) => {
        if (ok) {
          let feeTypeNo = row.feeTypeNo;
          let id = row.id;
          const loadingMsg = this.$Message.loading('删除中...', 0);
          let respDel = await this.$http.post('/pms/productFeeDetail/remove', {
            id,
            feeTypeNo
            // packageRateNo: this.$data.packageRateNo
          });
          loadingMsg();
          if (respDel.success) {
            this.$Message.success('删除费用类型成功');
            this.getCostCollectList();
          }
        }
      });
    },
    // 新增模态框的保存按钮点击事件
    formInSubmitCost() {
      let formName = 'formCostModel';
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 如果是新增
          if (this.isCostAdd) {
            this.addSuBmitCost();
          } else {
            this.setSubmitCost();
          }
        } else {
          this.$Message.error('"<span style="color: red">*</span>"必填项不能为空');
        }
      });
    },
    formInCancelCost() {
      this.$data.showCostAdd = false;
    },
    // 在新增状态下 下拉菜单清空相应显示的输入框
    selpro(val) {
      if (this.$data.isCostAdd) {
        this.$data.formCostModel.ratio = ''; // 按利率
        this.$data.formCostModel.fixedAmount = ''; // 按固定金额
      } else if (val === '1') { // 切换成按利率
        this.$data.formCostModel.fixedAmount = ''; // 按固定金额
      } else if (val === '2') {
        this.$data.formCostModel.ratio = ''; // 按利率
      }
    }
  }
};
