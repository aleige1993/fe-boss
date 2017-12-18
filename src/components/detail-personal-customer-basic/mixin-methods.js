import Tools from '../../utils/Tools';

export default {
  methods: {
    async initFormData(memberNo) {
      this.$data.initFormLoading = true;
      try {
        let resp = await this.$http.post('/member/find', {
          memberNo
        });
        // console.log(resp.body);
        this.$data.initFormLoading = false;
        this.$data.formData = resp.body;
        this.$emit('on-submit-success', resp.body);
        this.$emit('getMember', resp.body);
      } catch (e) {
        this.$data.initFormLoading = false;
      }
    },
    gotoPersonal() {
      Tools.openWin(`#/index/customer/detail?noaction=true&id=${this.$data.formData.mbMemberDTO.memberNo}&from=detail`);
    }
  }
};
