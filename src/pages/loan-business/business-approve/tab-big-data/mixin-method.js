export default {
  methods: {
    /*
     * 获取联系人信息
     * @returns {Promise.<void>}
     */
    async getContactList() {
      this.$data.loadingContactBook = true;
      let resp = await this.$http.post('/member/ohter/contacts/query', {
        memberNo: this.memberNo
      });
      this.$data.loadingContactBook = false;
      this.$data.contactDatas = resp.body;
    },
    /*
     * 获取电话本联系人
     * @param page
     * @returns {Promise.<void>}
     */
    async getContactBooks(page) {
      this.$data.loadingContactBook = true;
      let resp = await this.$http.post('/member/telephone/page', {
        'memberNo': this.memberNo,
        'contactsPhone': this.$data.contactBookSearchForm.contactsPhone,
        'currentPage': page || this.$data.contactBookSearchForm.currentPage,
        'pageSize': '15'
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
      let resp = await this.$http.post('/member/call/in/page', {
        'memberNo': this.memberNo,
        'contactsPhone': this.$data.callInListSearchForm.contactsPhone,
        'currentPage': page || this.$data.callInListSearchForm.currentPage,
        'pageSize': '15'
      });
      this.$data.loadingContactBook = false;
      this.$data.callInTotal = resp.body.totalNum;
      this.$data.callInDatas = resp.body.resultList;
    },
    /**
     * 呼出记录
     * @param page
     * @returns {Promise.<void>}
     */
    async getCallOutList(page) {
      this.$data.loadingContactBook = true;
      let resp = await this.$http.post('/member/call/out/page', {
        'memberNo': this.memberNo,
        'contactsPhone': this.$data.contactBookSearchForm.contactsPhone,
        'currentPage': page || this.$data.contactBookSearchForm.currentPage,
        'pageSize': '15'
      });
      this.$data.loadingContactBook = false;
      this.$data.callOutTotal = resp.body.totalNum;
      this.$data.callOutDatas = resp.body.resultList;
    }
  }
};
