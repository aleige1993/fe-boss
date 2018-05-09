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
    'fromData.brandNo'(newVal) {
      let brandNo = this.$data.fromData.brandNo;
      if (brandNo && brandNo.length) {
        this.getAllSeriesList();
      }
    },
    'fromData.childBrandName'(newVal) {
      this.setSeriesListByChildBrand();
    }
  },
  methods: {
    async getAllSeriesList() {
      let res = await this.$http.post('/ces/getSeriesByBrand', {
        brandNo: this.$data.fromData.brandNo,
        seriesName: ''
      });
      if (res.success) {
        this.$data.seriesList = res.body.resultList;
        this.setChildBrandList();
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
      // alert(this.$data.fromData.childBrandName);
      this.$data.series.resultList = [];
      this.$data.seriesList.map(item => {
        if (item.groupName === this.$data.fromData.childBrandName) {
          this.$data.series.resultList = item.groupList;
        }
      });
    },
    addSeries() {
      let brandNo = this.$data.fromData.brandNo;
      this.$data.brand.searchList.map(item => {
        if (item.brandNo === brandNo) {
          this.$data.series.addFormData.brandName = item.brandName;
        };
      });
      this.$data.series.addFormData.brandId = brandNo;
      this.$data.series.addModel = true;
    },
    // 上传文件之前的回掉
    uploadSeriesProgress() {
      this.$data.series.fileUploading = true;
    },
    // 上传成功
    uploadSeriesSuccess(res, file, fileList) {
      if (this.$data.series.addModal) {
        this.$data.series.addFormData.seriesImg = res.body.url;
      }
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
            ...this.$data.series.addFormData
          });
          this.$data.series.addLoading = false;
          if (resp.success) {
            this.$Message.success('添加成功');
            this.getAllSeriesList();
            this.$data.series.addModel = false;
          }
        } else {
          this.$Message.error('"<span style="color: red">*</span>"必填项不能为空');
        }
      });
    }
  }
};
