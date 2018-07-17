export default {
  methods: {
    // 删除联系人
    deleteContents() {
      Alertify.confirm('请仅在客户使用业务员的手机号进件的情况下，需废弃该订单重新进件时，进行此操作！删除"联系人信息"后，该贷款客户的所有联系人信息将被删除并不能恢复。请谨慎删除', async(ok) => {
        if (ok) {
          const loading = this.$Message.loading('处理中...', 0);
          let resp = await this.$http.post('/common/cleanContacts', {
            memberNo: this.applyBasicInfo.memberNo
          });
          loading();
          if (resp.success) {
            this.$data.emergencyDatas = [];
            this.$data.contactBookDatas = [];
            this.$data.callInDatas = [];
            this.$data.callOutDatas = [];
            this.$Message.success('删除成功');
          }
        }
      });
    },
    /*
     * 头部数组
     */
    ValidaQuery() {
      let from = this.$route.query.from;
      let status = this.$route.query.status;
      if (from === undefined && status === '3') {
        this.$data.isShow = true;
      }
    },
    async getEmergencyContact(page = 1) {
      this.$data.loadingContactBook = true;
      let resp = await this.$http.post('/common/listUrgencyPhone', {
        'orderNo': this.applyBasicInfo.orderNo
      });
      this.$data.loadingContactBook = false;
      this.$data.emergencyDatas = resp.body;
    },
    /*
     * 获取电话本联系人
     * @param page
     * @returns {Promise.<void>}
     */
    async getContactBooks(page = 1) {
      this.$data.loadingContactBook = true;
      let resp = await this.$http.post('/common/listPhoneBook', {
        'memberNo': this.applyBasicInfo.memberNo,
        'custType': this.customerType,
        'currentPage': page || this.$data.searchForm.currentPage,
        'phoneNo': this.$data.searchForm.phoneNo,
        'pageSize': 15
      });
      this.$data.loadingContactBook = false;
      this.$data.contactBookTotal = resp.body.totalNum;
      this.$data.contactBookDatas = resp.body.resultList;
    },
    /*
     * 呼入记录
     * @param page
     * @returns {Promise.<void>}
     */
    async getCallInList(page) {
      this.$data.loadingContactBook = true;
      let resp = await this.$http.post('/common/listPhoneCallIn', {
        'memberNo': this.applyBasicInfo.memberNo,
        'custType': this.customerType,
        'currentPage': page || this.$data.searchForm.currentPage,
        'phoneNo': this.$data.searchForm.phoneNo,
        'pageSize': 15
      });
      this.$data.loadingContactBook = false;
      this.$data.callInTotal = resp.body.totalNum;
      this.$data.callInDatas = resp.body.resultList;
    },
    /* 呼出记录
     * @param page
     * @returns {Promise.<void>}
     */
    async getCallOutList(page) {
      this.$data.loadingContactBook = true;
      let resp = await this.$http.post('/common/listPhoneCallOut', {
        'memberNo': this.applyBasicInfo.memberNo,
        'custType': this.customerType,
        'currentPage': page || this.$data.searchForm.currentPage,
        'phoneNo': this.$data.searchForm.phoneNo,
        'pageSize': 15
      });
      this.$data.loadingContactBook = false;
      this.$data.callOutTotal = resp.body.totalNum;
      this.$data.callOutDatas = resp.body.resultList;
    },
    /**
     * 搜索
     */
    searchContactBooks() {
      this.getContactBooks(1);
      this.getCallInList(1);
      this.getCallOutList(1);
    },
    emergencyPageChange(page) {

    },
    contactBooksPageChange(page) {
      this.getContactBooks(page);
    },
    callInPageChange(page) {
      this.getCallInList(page);
    },
    callOutPageChange(page) {
      this.getCallOutList(page);
    }
  }
};
