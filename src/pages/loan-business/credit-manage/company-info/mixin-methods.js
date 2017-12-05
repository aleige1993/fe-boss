export default {
  methods: {
    submitAttach() {
      console.log(this.$data.attachFormData);
      this.$data.formData.attachDTOs.push(this.$data.attachFormData);
      this.$data.addAttachModal = false;
    },
    // 初始化页面
    async initFormData(corpNo) {
      this.$data.initFormLoading = true;
      let resp = await this.$http.post('/corp/getCorpDetail', {
        corpNo
      });
      this.$data.initFormLoading = false;
      this.$data.loadingAttachFile = true;
      let resp2 = await this.$http.post('/corp/listCorpAttach', {
        corpNo,
        currentPage: 1,
        pageSize: 9999
      });
      this.$data.loadingAttachFile = false;
      if (resp.success) {
        this.$data.formData.baseDTO = resp.body.baseDTO;
        if (resp2.success) {
          this.$data.formData.attachDTOs = resp2.body.resultList;
          this.$emit('on-select-company', corpNo, resp2.body.resultList);
        }
      }
    }
  }
};
