import Tools from '../../utils/Tools';

export default {
  methods: {
    async initFormData(memberNo) {
      this.$data.initFormLoading = true;
      try {
        let resp = await this.$http.post('/member/find', {
          memberNo
        });
        this.$data.initFormLoading = false;
        console.log(resp);
        if (resp.success) {
          if (!resp.body) {
            this.$Notice({
              title: '错误信息',
              desc: '没有找到这个客户'
            });
          } else {
            this.$data.formData = resp.body;
            this.$emit('on-submit-success', resp.body);
            this.$emit('getMember', resp.body);
          }
        }
      } catch (e) {
        this.$data.initFormLoading = false;
      }
    },
    gotoPersonal() {
      Tools.openWin(`#/index/customer/detail?noaction=true&id=${this.$data.formData.mbMemberDTO.memberNo}&from=detail`);
    }
  }
};
