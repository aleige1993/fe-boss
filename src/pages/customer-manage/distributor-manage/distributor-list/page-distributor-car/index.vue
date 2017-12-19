<template>
<!--渠道商列表-车型管理-->
  <div id="pageDistributorCar">
    <i-breadcrumb separator=">" v-if="!isDetail">
      <i-breadcrumb-item href="/">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/customer/distributor">渠道商管理</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/customer/distributor">渠道商列表</i-breadcrumb-item>
      <i-breadcrumb-item>车型管理</i-breadcrumb-item>
    </i-breadcrumb>
    <div class="form-top-actions">
      <i-button v-if="!isDetail" @click="addModal" type="info"><i class="iconfont icon-xinzeng"></i>&nbsp;新增</i-button>
    </div>
    <i-table border :loading="dataLoading" ref="selection" :columns="columns1" :data="data1"></i-table>
    <div class="page-container">
      <i-page :current="currentPage" :total="total" size="small" show-elevator show-total @on-change="jumpPage" :page-size="pageSize"></i-page>
    </div>
    <bs-modal :title="isAdd ? '新增' : '修改'" v-model="showAddModal" :width="670">
      <i-form  ref="formCustom" :model="formCustom" label-position="right" :label-width="100">
        <i-form-item label="选择车型" prop="modelName">
          <bs-carpicker :currBrand="formCustom.brandName"
                        :currSeries="formCustom.seriesName"
                        :currMode="formCustom.modelName"
                        @on-change="selectCar"></bs-carpicker>
        </i-form-item>
        <i-form-item label="厂商指导价" prop="guidancePrice">
          <i-input placeholder="" v-model="formCustom.guidancePrice">
            <span slot="append">万元</span>
          </i-input>
        </i-form-item>
        <i-form-item label="售价" prop="sellingPrice">
          <i-input placeholder="" v-model="formCustom.sellingPrice">
            <span slot="append">万元</span>
          </i-input>
        </i-form-item>
        <i-form-item class="text-right">
          <i-button type="primary" @click="formSubmit" :loading="buttonLoading">
            <span v-if="!buttonLoading">提交</span>
            <span v-else>Loading...</span>
          </i-button>
          <i-button type="ghost" @click="handleCancel" style="margin-left: 8px">取消</i-button>
        </i-form-item>
      </i-form>
    </bs-modal>
  </div>
</template>

<script>
  import BsCarpicker from '@/components/bs-carpicker';
  import MixinData from './mixin-data';
  import BsModal from '@/components/bs-modal';
  export default {
    name: 'pageDistributorCar',
    components: {
      BsModal,
      BsCarpicker
    },
    mixins: [MixinData],
    data() {
      return {
        isDetail: false,
        isAdd: true,
        showAddModal: false,
        dataLoading: false,
        buttonLoading: false,
        currentPage: 1,
        total: 0,
        pageSize: 15,
        formCustom: {
          brandCode: '', // 车品牌code
          brandName: '', // 车品牌name
          seriesCode: '', // 车系code
          seriesName: '', // 车系code
          modelCode: '', // 车型code
          modelName: '', // 车型code
          modelId: '',
          guidancePrice: '',
          sellingPrice: ''
        }
      };
    },
    mounted() {
      if (this.$route.query.from === 'detail') {
        this.$data.isDetail = true;
      } else {
        this.$data.isDetail = false;
      }
      this.getPrivateCustomerList();
      // console.log(this.$JumpPage.getPageRemove(this.$data.currentPage, this.$data.pageSize, this.$data.total));
    },
    methods: {
      selectCar(distance) {
        this.$data.formCustom.brandCode = distance.brandCode;
        this.$data.formCustom.brandName = distance.brandName;
        this.$data.formCustom.seriesCode = distance.seriesCode;
        this.$data.formCustom.seriesName = distance.seriesName;
        this.$data.formCustom.modelCode = distance.modelCode;
        this.$data.formCustom.modelName = distance.modelName;
      },
      // 查询列表数据
      async getPrivateCustomerList(page) {
        this.$data.dataLoading = true;
        if (page) {
          this.$data.currentPage = page;
        }
        let resp = await this.$http.post('merchant/listCar', {
          merchantNo: this.$route.query.merchantNo,
          currentPage: this.$data.currentPage,
          pageSize: this.$data.pageSize
        });
        this.$data.dataLoading = false;
        if (resp.body.resultList.length !== 0) {
          this.$data.data1 = resp.body.resultList;
          this.$data.currentPage = resp.body.currentPage;
          this.$data.total = resp.body.totalNum;
        } else {
          this.$Notice.warning({
            title: '没有数据可加载',
            duration: 2
          });
          this.$data.data1 = [];
        }
      },
      jumpPage(page) {
        this.getPrivateCustomerList(page);
      },
      addModal() {
        this.isAdd = true;
        this.$data.showAddModal = true;
        this.$data.formCustom = {};
      },
      // 新增的保存请求方法
      async addSuBmit() {
        let resAdd = await this.$http.post('merchant/saveCar', {
          merchantNo: this.$route.query.merchantNo,
          brandId: this.$data.formCustom.brandCode, // 车品牌code
          brandName: this.$data.formCustom.brandName, // 车品牌name
          seriesId: this.$data.formCustom.seriesCode, // 车系code
          seriesName: this.$data.formCustom.seriesName, // 车系code
          modelId: this.$data.formCustom.brandCode, // 车型code
          modelName: this.$data.formCustom.modelName, // 车型code
          guidancePrice: this.$data.formCustom.guidancePrice, // 指导价
          sellingPrice: this.$data.formCustom.sellingPrice // 售价
        });
        this.$data.showAddModal = false;
        this.$data.buttonLoading = false; // 关闭按钮的loading状态
        if (resAdd.success) {
          this.$Message.success('新增成功');
          this.getPrivateCustomerList();
        }
      },
      setList(row) {
        this.isAdd = false;
        this.$data.showAddModal = true;
        this.formCustom = row;
      },
      // 修改情况下的提交数据
      async setSubmit() {
        let resModify = await this.$http.post('merchant/saveCar', {
          merchantNo: this.$route.query.merchantNo,
          brandId: this.$data.formCustom.brandCode, // 车品牌code
          brandName: this.$data.formCustom.brandName, // 车品牌name
          seriesId: this.$data.formCustom.seriesCode, // 车系code
          seriesName: this.$data.formCustom.seriesName, // 车系code
          modelId: this.$data.formCustom.brandCode, // 车型code
          modelName: this.$data.formCustom.modelName, // 车型code
          guidancePrice: this.$data.formCustom.guidancePrice, // 指导价
          sellingPrice: this.$data.formCustom.sellingPrice // 售价
        });
        this.$data.showAddModal = false;
        this.$data.buttonLoading = false;
        if (resModify.success) {
          this.$Message.success('修改成功');
          this.getPrivateCustomerList();
        }
      },
      // 删除数据的请求
      async remove(row) {
        Alertify.confirm('确定要删除吗？', async (ok) => {
          if (ok) {
            let merchantNo = row.merchantNo;
            let modelId = row.modelId;
            const loadingMsg = this.$Message.loading('删除中...', 0);
            let respDel = await this.$http.get('merchant/deleteCar', {
              merchantNo,
              modelId
            });
            loadingMsg();
            if (respDel.success) {
              this.$Message.success('删除成功');
              let jumpPage = this.$JumpPage.getPageRemove(this.$data.currentPage, this.$data.pageSize, this.$data.total);
              this.getPrivateCustomerList(jumpPage);
            }
          }
        });
      },
      formSubmit() {
        this.$data.buttonLoading = true;
        // 如果是新增
        if (this.isAdd) {
          this.addSuBmit();
        } else {
          this.setSubmit();
        }
      },
      handleCancel() {
        this.$data.showAddModal = false;
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
