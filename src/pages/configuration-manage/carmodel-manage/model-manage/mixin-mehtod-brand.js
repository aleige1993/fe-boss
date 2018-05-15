export default {
  data() {
    return {
      brand: {
        searchList: [],
        searchLoading: false,
        addModel: false,
        addLoading: false,
        addFormData: {
          'brandName': '',
          'initial': '',
          'logo': ''
        },
        fileUploading: false
      }
    };
  },
  mounted() {
    this.getBrandList();
  },
  methods: {
    async getBrandList(brandName = '') {
      this.$data.brand.searchList = [];
      this.$data.brand.searchLoading = true;
      let res = await this.$http.post('/ces/getMasterBrand', {
        brandName
      });
      if (res.success) {
        res.body.resultList.map(items => {
          items.groupList.map(item => {
            this.$data.brand.searchList.push(item);
          });
        });
        this.$data.brand.searchLoading = false;
      }
    },
    addBrand() {
      this.$data.brand.addModel = true;
      this.$data.brand.addFormData = {};
    },
    // 上传文件之前的回掉
    uploadBrandProgress() {
      this.$data.brand.fileUploading = true;
    },
    // 上传成功
    uploadBrandSuccess(res, file, fileList) {
      this.$data.brand.addFormData.logo = res.body.url;
      this.$data.brand.fileUploading = false;
    },
    // 上传失败
    uploadBrandError(err, file, fileList) {
      this.$Notice.error({
        title: '错误提示',
        desc: err
      });
      this.$data.brand.fileUploading = false;
    },
    submitAddBrand() {
      this.$refs['brand.addFormData'].validate(async (valid) => {
        if (valid) {
          this.$data.brand.addLoading = true;
          let resp = await this.$http.post('/ces/add/brand', {
            ...this.$data.brand.addFormData
          });
          this.$data.brand.addLoading = false;
          if (resp.success) {
            this.$Message.success('添加成功');
            this.$data.brand.addModel = false;
            this.getBrandList();
          }
        } else {
          this.$Message.error('"<span style="color: red">*</span>"必填项不能为空');
        }
      });
    }
  }
};
