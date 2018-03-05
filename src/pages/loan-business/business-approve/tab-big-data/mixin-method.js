export default {
  methods: {
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
      console.log(resp);
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
