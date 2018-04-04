import Vue from 'vue';
import Config from '../utils/Config';
Vue.mixin({
  computed: {
    enumSelectData() {
      return this.$store.getters.enumSelectData;
    },
    tableFixHeight() {
      return this.$store.getters.viewHeight;
    },
    uploadMaxSize() {
      return Config.UPLOAD_FILE_MAX_SIZE;
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
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: '文件格式错误',
        desc: file.name + '不是正确的图片格式的文件，请选择图片文件'
      });
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: '上传文件过大',
        desc: '文件  ' + file.name + ' 太大了, 上传的文件不能大于' + Config.UPLOAD_FILE_MAX_SIZE / 1024 + 'M.'
      });
    }
  }
});
