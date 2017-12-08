export default {
  methods: {
    async initFormData(certNo) {
      this.$data.initFormLoading = true;
      try {
        let resp = await this.$http.post('/member/find', {
          certNo
        });
        this.$data.initFormLoading = false;
        this.$data.formData = resp.body;
        this.$emit('on-submit-success', resp.body);
      } catch (e) {
        this.$data.initFormLoading = false;
      }
    },
    gotoPersonal() {
      console.log(this.$data.formData.memberNo);
      window.open(`#/index/customer/detail?id=${this.$data.formData.memberNo}&from=detail`);
    }
  }
};
