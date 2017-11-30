export default {
  computed: {
    corpNo() {
      if (this.$route.query.id) {
        return this.$route.query.id;
      } else {
        return this.customer.corpNo;
      }
    },
    corpName() {
      if (this.$route.query.name) {
        return this.$route.query.name;
      } else {
        return this.customer.corpName;
      }
    },
    isFromDetail() {
      return this.$route.query.from === 'detail';
    }
  }
};
