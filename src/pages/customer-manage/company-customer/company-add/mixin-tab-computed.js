export default {
  computed: {
    corpNo() {
      if (this.$route.query.id) {
        return this.$route.query.id;
      } else {
        return this.customer.corpNo;
      }
    },
    isFromDetail() {
      return this.$route.query.from === 'detail';
    }
  }
};
