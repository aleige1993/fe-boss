import Vue from 'vue';
Vue.mixin({
  computed: {
    enumSelectData() {
      return this.$store.getters.enumSelectData;
    }
  },
  methods: {
    enumCode2Name(code, enumType) {
      let enumSelectData = this.$store.getters.enumSelectData;
      let selects = enumSelectData.get(enumType);
      let name = '';
      if (selects && selects.length > 0) {
        selects.map(item => {
          if (item.itemCode === code) {
            name = item.itemName;
          }
        });
      }
      return name;
    }
  }
});
