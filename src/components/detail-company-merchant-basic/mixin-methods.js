export default {
  methods: {
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
        // await bsWait(500);
        this.$emit('on-submit-success', {
          corpNo: resp.body.baseDTO.corpNo,
          corpName: resp.body.baseDTO.corpName
        });
      }
      if (resp2.success) {
        this.$data.formData.attachDTOs = resp2.body.resultList;
      }
    }
  }
};
