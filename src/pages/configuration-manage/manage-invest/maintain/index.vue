<template>
<!--资方维护-->
  <div id="invest-maintain">
    <i-breadcrumb separator="&gt;">
      <i-breadcrumb-item href="/">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/conf">配置管理</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/conf/invest">资方管理</i-breadcrumb-item>
      <i-breadcrumb-item>资方维护</i-breadcrumb-item>
    </i-breadcrumb>
    <div class="form-top-actions">
      <i-button @click="addModal" type="info"><i class="iconfont icon-xinzeng"></i> 新增产品</i-button>
    </div>

    <i-table :loading="dataLoading" highlight-row border ref="proTable" :columns="columns1" :data="data1"></i-table>
    <div class="page-container">
      <i-page :current="currentPage" :total="total" size="small" show-elevator show-total @on-change="jumpPage">
      </i-page>
    </div>
    <bs-modal :title="'新增'" v-model="ShowModalOne" :width="1200">
      <bs-form-block :title="'基本信息'" padding="20px 0" borderWidth="0px">
        <i-form ref="formMaintain" :model="formMaintain" label-position="right" :label-width="120">
          <i-row :gutter="16">
            <!--资方名称-->
            <i-col span="8">
              <i-form-item class="required" label="资方名称" prop="protype">
                <i-input v-model="formMaintain.name" :readonly="iSsee">
                </i-input>
              </i-form-item>
            </i-col>
            <!--合作状态-->
            <i-col span="8">
              <i-form-item class="required" label="合作状态" prop="protype">
                <i-input v-model="formMaintain.state" :readonly="iSsee">
                </i-input>
              </i-form-item>
            </i-col>
            <!--法定代表人-->
            <i-col span="8">
              <i-form-item label="法定代表人" prop="protype">
                <i-input v-model="formMaintain.LegalPerson" :readonly="iSsee">
                </i-input>
              </i-form-item>
            </i-col>
            <!--法人证件号码-->
            <i-col span="8">
              <i-form-item label="法人证件号码" prop="protype">
                <i-input v-model="formMaintain.LegalPhone"  :readonly="iSsee">
                </i-input>
              </i-form-item>
            </i-col>
            <!--成立时间-->
            <i-col span="8">
              <i-form-item label="成立时间" prop="protype">
                <i-input v-model="formMaintain.time" :readonly="iSsee">
                </i-input>
              </i-form-item>
            </i-col>
            <!--统一社会信用代码-->
            <i-col span="8">
              <i-form-item label="统一社会信用代码" prop="protype">
                <i-input v-model="formMaintain.redit " :readonly="iSsee">
                </i-input>
              </i-form-item>
            </i-col>
            <!--账户名称-->
            <i-col span="8">
              <i-form-item label="账户名称" prop="protype">
                <i-input v-model="formMaintain.uesrName" :readonly="iSsee">
                </i-input>
              </i-form-item>
            </i-col>
            <!--账号-->
            <i-col span="8">
              <i-form-item label="账户名称" prop="protype">
                <i-input v-model="formMaintain.uesrId" :readonly="iSsee">
                </i-input>
              </i-form-item>
            </i-col>
            <!--开户银行-->
            <i-col span="8">
              <i-form-item label="开户银行" prop="protype">
                <i-input v-model="formMaintain.bank" :readonly="iSsee">
                </i-input>
              </i-form-item>
            </i-col>
            <!--主要联系人-->
            <i-col span="8">
              <i-form-item label="主要联系人" prop="protype">
                <i-input v-model="formMaintain.primaryContact" :readonly="iSsee">
                </i-input>
              </i-form-item>
            </i-col>
            <!--联系电话-->
            <i-col span="8">
              <i-form-item label="联系电话" prop="protype">
                <i-input v-model="formMaintain.contactNumber" :readonly="iSsee">
                </i-input>
              </i-form-item>
            </i-col>
            <!--联系邮箱-->
            <i-col span="8">
              <i-form-item label="联系邮箱" prop="protype">
                <i-input v-model="formMaintain.contactEmail" :readonly="iSsee">
                </i-input>
              </i-form-item>
            </i-col>
            <!--地址-->
            <i-col span="24">
              <i-form-item label="地址" prop="protype">
                <i-select v-model="formMaintain.province" style="width: 10%" :disabled="iSsee">
                  <i-option value="重庆">重庆</i-option>
                  <i-option value="上海">上海</i-option>
                </i-select>
                <i-select v-model="formMaintain.city" style="width: 10%" :disabled="iSsee">
                  <i-option value="重庆">重庆</i-option>
                  <i-option value="上海">重庆</i-option>
                </i-select>
                <i-select v-model="formMaintain.area" style="width: 10%" :disabled="iSsee">
                  <i-option value="重庆">九龙坡区</i-option>
                  <i-option value="上海">渝中区</i-option>
                </i-select>
                <i-input v-model="formMaintain.Street" style="width: calc(70% - 16px); margin-left: 5px;" :readonly="iSsee">
                </i-input>
              </i-form-item>
            </i-col>
          </i-row>
        </i-form>
      </bs-form-block>
      <bs-form-block :title="'合作协议'" padding="20px 0" borderWidth="0px">
        <div class="form-top-actions" v-if="!iSsee">
          <i-button @click="addModalTwo" type="info"><i class="iconfont icon-xinzeng"></i> 新增</i-button>
        </div>
        <i-table highlight-row border ref="proTable" :columns="columns2" :data="data2"></i-table>
        <br>
        <br>
        <div class="text-right">
          <i-button type="primary" @click="formSubmit" v-if="!iSsee">提交</i-button>
          <i-button type="ghost" style="margin-left: 8px" @click="formCancel">{{iSsee ? '返回' : '取消'}}</i-button>
        </div>
        <bs-modal :title="'合作协议'" v-model="ShowModalTwo" :width="600">
          <modal-two @parModel='closeModelTwo' ></modal-two>
        </bs-modal>
      </bs-form-block>
    </bs-modal>
  </div>
</template>

<script>
  import BSModal from '@/components/bs-modal';
  import MixinData from './mixin-data';
  import ModalTwo from './modal-two.vue';
  export default {
    name: 'manage-invest-maintain',
    mixins: [MixinData],
    components: {
      'bs-modal': BSModal,
      'modal-two': ModalTwo
    },
    data() {
      return {
        dataLoading: false,
        ShowModalOne: false,
        ShowModalTwo: false,
        total: 0,
        currentPage: 1,
        formMaintain: {},
        iSsee: false           // 是否是查看页面
      };
    }, // end data
    mounted() {
      this.getList();
    },
    methods: {
      async getList(page) {
        this.$data.dataLoading = true;
        if (page) {
          this.$data.currentPage = page;
        }
        let resp = await this.$http.get('/maintain', {});
        this.$data.dataLoading = false;
        this.$data.data1 = resp.body.resultList;
        this.$data.currentPage = resp.body.currentPage;
        this.$data.total = resp.body.totalNum;
      },
      // 分页跳转
      jumpPage() {
        this.getList();
      },
      // 新增弹窗
      addModal() {
        this.$data.iSsee = false;   // 不是查看状态
        this.$data.ShowModalOne = true;
      },
      // 新增弹窗
      addModalTwo() {
        this.$data.ShowModalTwo = true;
      },
      // 资方维护列表的删除
      remove1(index) {
        Alertify.confirm('确定要删除吗？', (confirm) => {
          if (confirm) {
            this.data1.splice(index, 1);
            // Alertify.alert('确定');
          } else {}
        });
      },
      // 资方维护弹窗的列表删除
      remove2(index) {
        Alertify.confirm('确定要删除吗？', (confirm) => {
          if (confirm) {
            this.data2.splice(index, 1);
            // Alertify.alert('确定');
          } else {}
        });
      },
      // 修改弹窗
      setList() {
        this.$data.iSsee = false;   // 不是查看状态
      },
      // 提交 按钮
      formSubmit() {},
      // 取消 按钮
      formCancel() {
        this.$data.ShowModalOne = false;
      },
      // 取消 按钮
      closeModelTwo() {
        this.$data.ShowModalTwo = false;
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
