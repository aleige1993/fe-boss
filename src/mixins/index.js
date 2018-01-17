import Vue from 'vue';
import Tools from '../utils/Tools';
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
    },
    isImg(fileUrl) {
      let suffix = '';
      if (fileUrl) {
        suffix = fileUrl.substring(fileUrl.lastIndexOf('.') + 1);
      }
      return suffix === 'png' || suffix === 'jpg' || suffix === 'gif' || suffix === 'jpeg' || suffix === 'bmp' || suffix === 'pic';
    }
  }
});
