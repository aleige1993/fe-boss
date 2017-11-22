import Vue from 'vue';
Vue.mixin({
  computed: {
    enumSelectData() {
      return this.$store.getters.enumSelectData;
    }
  }
});
