<template>
  <span class="select-show-input" style="width: 100%;display: block;">
    <i-select filterable :placeholder="currBrand" :disabled="readonly"  :label-in-value="true" v-model="carData.brandNo"  @on-change="brandChange" style="width: 32%; display: inline-block; margin-right: 2%;">
      <i-option-group v-for="(item, index) in brandDropList" :key="index" :label="item.groupName">
        <i-option v-for="brand in item.groupList"  :value="brand.brandNo" :key="brand.brandNo">{{brand.brandName}}</i-option>
      </i-option-group>
    </i-select><i-select filterable :placeholder="currSeries" :disabled="readonly" :label-in-value="true" v-model="carData.seriesNo" @on-change="seriesChange" style="width: 32%; display: inline-block; margin-right: 2%;">
      <i-option-group v-for="item in seriesDropList" :key="item.groupName" :label="item.groupName">
        <i-option v-for="s in item.groupList"  :value="s.seriesNo" :key="s.seriesNo">{{s.seriesName}}</i-option>
      </i-option-group>
    </i-select><i-select filterable :placeholder="currModel" :disabled="readonly" :label-in-value="true" @on-change="modelChange" v-model="carData.modelNo" style="width: 32%; display: inline-block;">
      <i-option-group v-for="item in modelDropList" :key="item.groupName" :label="item.groupName">
        <i-option v-for="m in item.groupList"  :value="m.modelNo" :key="m.modelNo">{{m.modelName}}</i-option>
      </i-option-group>
    </i-select>
  </span>
</template>
<script>
  export default {
    name: 'bsCarPicker',
    data() {
      return {
        brandDropList: [],
        seriesDropList: [],
        modelDropList: [],
        carData: {
          brandNo: '',
          brandName: '',
          seriesNo: '',
          seriesName: '',
          modelNo: '',
          modeName: ''
        }
      };
    },
    props: {
      currBrand: {
        default: '',
        required: false,
        type: String
      },
      currSeries: {
        default: '',
        required: false,
        type: String
      },
      currModel: {
        default: '',
        required: false,
        type: String
      },
      space: {
        default: false,
        required: false,
        type: Boolean
      },
      readonly: {
        default: false,
        required: false,
        type: Boolean
      }
    },
    methods: {
      // 获取地址下拉联动
      getBrandDropList(brandName = '') {
        let data = {
          brandName
        };
        return this.$http.post('/ces/getMasterBrand', data, false);
      },
      async brandChange(val) {
        this.$data.carData.brandName = val.label;
        let resp = await this.$http.post('/ces/getSeriesByBrand', {
          brandNo: val.value,
          seriesName: ''
        });
        if (resp.success) {
          this.$data.seriesDropList = resp.body.resultList;
        }
        this.$emit('on-change', { ...this.$data.carData });
      },
      async seriesChange(val) {
        this.$data.carData.seriesName = val.label;
        let resp = await this.$http.post('/ces/getModelBySeries', {
          seriesNo: val.value,
          modelName: ''
        });
        if (resp.success) {
          this.$data.modelDropList = resp.body.resultList;
        }
        this.$emit('on-change', Object.assign({}, this.$data.carData));
      },
      modelChange(val) {
        this.$data.carData.modelName = val.label;
        this.$emit('on-change', { ...this.$data.carData });
      }
    },
    async mounted() {
      let resp = await this.getBrandDropList();
      if (resp.success) {
        this.$data.brandDropList = resp.body.resultList;
      }
      // await bsWait(2000);
      // this.initData();
    }
  };
</script>
<style lang="scss" scoped="">
</style>
