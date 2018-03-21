import Vue from 'vue';
Vue.mixin({
  computed: {
    enumSelectData() {
      return this.$store.getters.enumSelectData;
    },
    tableFixHeight() {
      return this.$store.getters.viewHeight;
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
      let imgSuffixAry = ['png', 'jpg', 'gif', 'jpeg', 'bmp', 'pic'];
      let suffix = '';
      if (fileUrl) {
        suffix = fileUrl.substring(fileUrl.lastIndexOf('.') + 1);
      }
      return imgSuffixAry.some(item => {
        return suffix.toLowerCase() === item;
      });
    },
    async initMenuTree() {
      const msg = this.$Message.loading({
        content: '正在初始化菜单',
        duration: 0
      });
      let promise = await this.$http.get('/sys/menu/list?menuId=98');
      msg();
      if (promise.reCode === '0000') {
        this.$store.dispatch('setMenuList', promise.body.childMenus);
      }
    }
  }
});
