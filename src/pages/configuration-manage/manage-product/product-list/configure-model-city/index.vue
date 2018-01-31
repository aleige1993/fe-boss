<template>
<!--合同模板配置-->
  <div id="configure-model-city">
    <div class="form-top-actions">
      <i-button @click="addModal" type="info"><i class="iconfont icon-xinzeng"></i> 新增</i-button>
    </div>
    <i-table border ref="cityTable" :columns="columns1" :data="data1"></i-table>
    <br>
    <br>
    <bs-modal :title="'新增'" v-model="showAddModal">
      <i-form ref="pmsProductCityDTOS" :model="pmsProductCityDTOS" label-position="right" :label-width="100" style="padding-bottom:0;">
        <i-form-item label="产品名称">
          <p>{{formData.productName}}</p>
        </i-form-item>
        <i-form-item
          label="投放城市"
          :rules="{required: true, message: '请选择投放城市', trigger: 'change'}"
          prop="cityCode">
          <input type="hidden" v-model="pmsProductCityDTOS.cityCode">
          <bs-dispicker-two :filterCQ="true"
                            :currProvinceCode="pmsProductCityDTOS.provinceCode"
                            :currDistrictCode="pmsProductCityDTOS.cityCode"
                            @on-change="selectNowDistance"></bs-dispicker-two>
        </i-form-item>
        <i-form-item class="text-right">
          <i-button type="primary" @click="addSuBmit" :loading="buttonLoading">
            <span v-if="!buttonLoading">提交</span>
            <span v-else>loading...</span>
          </i-button>
          <i-button type="ghost" style="margin-left: 8px" @click="formCancel">取消</i-button>
        </i-form-item>
      </i-form>
    </bs-modal>
  </div>
</template>

<script>
  import BsDispickerTwo from '@/components/bs-dispicker-two';
  import BSModal from '@/components/bs-modal';
  export default {
    name: 'configureModelCity',
    components: {
      BsDispickerTwo,
      'bs-modal': BSModal
    },
    props: {
      childMsg: Object
    },
    data() {
      return {
        showAddModal: false,
        buttonLoading: false,
        formData: {
          productNo: '',
          productName: '',
          productAlias: ''
        },
        pmsProductCityDTOS: {
          provinceCode: '',
          provinceName: '',
          cityCode: '',
          cityName: ''
        },
        columns1: [
          {
            title: '省',
            width: 200,
            key: 'provinceName'
          },
          {
            title: '市',
            key: 'cityName'
          },
          {
            title: '操作',
            key: 'action',
            width: 150,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.remove($.extend({}, params.row));
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ],
        data1: []
      };
    },
    mounted() {
      this.$data.formData.productName = this.childMsg.productName;
      this.$data.formData.productNo = this.childMsg.productNo;
      this.$data.formData.productAlias = this.childMsg.productAlias;
      this.getPrivateCustomerList();
    },
    methods: {
      // 查询列表数据
      async getPrivateCustomerList() {
        this.$data.dataLoading = true;
        let resp = await this.$http.get('/pms/product/productCityList', {
          productNo: this.childMsg.productNo
        });
        this.$data.dataLoading = false;
        if (resp.success && resp.body.resultList.length !== 0) {
          this.$data.data1 = resp.body.resultList;
        } else {
          this.$data.data1 = [];
        }
      },
      // 新增的保存请求方法
      addSuBmit() {
        this.$refs['pmsProductCityDTOS'].validate(async (valid) => {
          if (valid) {
            this.$data.buttonLoading = true;
            let resAdd = await this.$http.post('/pms/product/bindProductCity', {
              productName: this.childMsg.productName,
              productNo: this.childMsg.productNo,
              productAlias: this.childMsg.productAlias,
              pmsProductCityDTOS: { ...this.$data.pmsProductCityDTOS }
            });
            this.$data.buttonLoading = false; // 关闭按钮的loading状态
            this.$data.showAddModal = false;
            if (resAdd.success) {
              this.$Message.success('新增成功');
              this.getPrivateCustomerList();
            }
          } else {
            this.$Message.error('"<span style="color: red">*</span>"必填项不能为空');
          }
        });
      },
      addModal() {
        this.$data.showAddModal = true;
        this.$data.formData = {};
        this.$data.pmsProductCityDTOS = {};
        this.$data.formData.productName = this.childMsg.productName;
        this.$data.formData.productNo = this.childMsg.productNo;
        this.$data.formData.productAlias = this.childMsg.productAlias;
      },
      // 删除数据的请求
      async remove(row) {
        Alertify.confirm('确定要删除吗？', async (ok) => {
          if (ok) {
            const loadingMsg = this.$Message.loading('删除中...', 0);
            let respDel = await this.$http.post('/pms/product/removeProductCity ', {
              productNo: this.childMsg.productNo,
              provinceName: row.provinceName,
              provinceCode: row.provinceCode,
              cityName: row.cityName,
              cityCode: row.cityCode
            });
            loadingMsg();
            if (respDel.success) {
              this.$Message.success('删除成功');
              this.getPrivateCustomerList();
            }
          }
        });
      },
      formCancel() {
        this.$data.showAddModal = false;
      },
      // 城市两级联动
      selectNowDistance(city) {
        this.$data.pmsProductCityDTOS.provinceCode = city.provinceCode;
        this.$data.pmsProductCityDTOS.provinceName = city.provinceName;
        this.$data.pmsProductCityDTOS.cityCode = city.districtCode;
        this.$data.pmsProductCityDTOS.cityName = city.districtName;
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
