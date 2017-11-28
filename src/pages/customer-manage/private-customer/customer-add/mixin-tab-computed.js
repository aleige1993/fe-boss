export default {
  computed: {
    memberNo() {
      if (this.$route.query.id) {
        return this.$route.query.id;
      } else {
        return this.customer.mbMemberDTO.memberNo;
      }
    }
  }
};
