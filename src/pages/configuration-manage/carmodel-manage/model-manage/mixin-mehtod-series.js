export default {
  data() {
    return {
      seriesList: [], // 返回子品牌和车型List
      childBrandList: [],
      series: {
        resultList: [],
        addModel: false,
        addLoading: false,
        addFormData: {
          'brandName': '',
          'brandId': '',
          'seriesGroupName': '',
          'seriesName': '',
          'seriesImg': ''
        },
        fileUploading: false
      }
    };
  },
  watch: {
    'modelData.id'(newVal) {
      if (this.$data.isAdd && this.$data.modelData.id) {
        this.getAllSeriesList();
      }
    },
    'modelData.childBrandName'(newVal) {
      if (this.$data.isAdd) {
        this.setSeriesListByChildBrand();
      }
    }
  },
  methods: {
    async getAllSeriesList() {
      this.$data.brand.searchList.map(item => {
        if (item.id === this.$data.modelData.id) {
          this.$data.modelData.brandNo = item.brandNo;
          this.$data.modelData.brandName = item.brandName;
        }
      });
      let res = await this.$http.post('/ces/getSeriesByBrand', {
        brandNo: this.$data.modelData.brandNo,
        seriesName: ''
      });
      if (res.success) {
        this.$data.seriesList = res.body.resultList;
        this.setChildBrandList();
        this.setSeriesListByChildBrand();
      }
    },
    setChildBrandList() {
      this.$data.childBrandList = [];
      this.$data.seriesList.map(item => {
        this.$data.childBrandList.push({
          name: item.groupName
        });
      });
    },
    setSeriesListByChildBrand() {
      this.$data.series.resultList = [];
      this.$data.seriesList.map(item => {
        if (item.groupName === this.$data.modelData.childBrandName) {
          this.$data.series.resultList = item.groupList;
        }
      });
    },
    addSeries() {
      this.$data.series.addFormData = {};
      this.$data.series.addFormData.brandId = this.$data.modelData.id;
      this.$data.series.addFormData.brandName = this.$data.modelData.brandName;
      this.$data.series.addFormData.seriesGroupName = this.$data.modelData.childBrandName;
      this.$data.series.addModel = true;
    },
    // 上传文件之前的回掉
    uploadSeriesProgress() {
      this.$data.series.fileUploading = true;
    },
    // 上传成功
    uploadSeriesSuccess(res, file, fileList) {
      this.$data.series.addFormData.seriesImg = res.body.url;
      this.$data.series.fileUploading = false;
    },
    // 上传失败
    uploadSeriesError(err, file, fileList) {
      this.$Notice.error({
        title: '错误提示',
        desc: err
      });
      this.$data.series.fileUploading = false;
    },
    submitAddSeries() {
      this.$refs['series.addFormData'].validate(async (valid) => {
        if (valid) {
          this.$data.series.addLoading = true;
          let resp = await this.$http.post('/ces/add/childBrand', {
            CarSeries: this.$data.series.addFormData,
            brandId: this.$data.series.addFormData.brandId
          });
          this.$data.series.addLoading = false;
          if (resp.success) {
            this.$Message.success('添加成功');
            this.$data.series.addModel = false;
            this.getAllSeriesList();
          }
        } else {
          this.$Message.error('"<span style="color: red">*</span>"必填项不能为空');
        }
      });
    },
    cancelSeriesFun() {
      this.$data.series.addModel = false;
    }
  }
};
