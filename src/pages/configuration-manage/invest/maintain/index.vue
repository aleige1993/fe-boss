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

    <i-table highlight-row border ref="proTable" :columns="columns1" :data="data1"></i-table>
    <div class="page-container">
      <i-page :current="1" :total="40" size="small" show-elevator show-total>
      </i-page>
    </div>
    <bs-modal :title="'新增'" v-model="ShowModalOne" :width="1200">
      <bs-form-block :title="'基本信息'" padding="20px 0" borderWidth="0px">
        <i-form ref="formMaintain" :model="formMaintain" label-position="right" :label-width="120">
          <i-row :gutter="16">
            <!--资方名称-->
            <i-col span="8">
              <i-form-item class="required" label="资方名称" prop="protype">
                <i-input v-model="formMaintain.name">
                </i-input>
              </i-form-item>
            </i-col>
            <!--合作状态-->
            <i-col span="8">
              <i-form-item class="required" label="合作状态" prop="protype">
                <i-input v-model="formMaintain.state">
                </i-input>
              </i-form-item>
            </i-col>
            <!--法定代表人-->
            <i-col span="8">
              <i-form-item label="法定代表人" prop="protype">
                <i-input v-model="formMaintain.LegalPerson">
                </i-input>
              </i-form-item>
            </i-col>
            <!--法人证件号码-->
            <i-col span="8">
              <i-form-item label="法人证件号码" prop="protype">
                <i-input v-model="formMaintain.LegalPhone">
                </i-input>
              </i-form-item>
            </i-col>
            <!--成立时间-->
            <i-col span="8">
              <i-form-item label="成立时间" prop="protype">
                <i-input v-model="formMaintain.time">
                </i-input>
              </i-form-item>
            </i-col>
            <!--统一社会信用代码-->
            <i-col span="8">
              <i-form-item label="统一社会信用代码" prop="protype">
                <i-input v-model="formMaintain.redit ">
                </i-input>
              </i-form-item>
            </i-col>
            <!--账户名称-->
            <i-col span="8">
              <i-form-item label="账户名称" prop="protype">
                <i-input v-model="formMaintain.uesrName">
                </i-input>
              </i-form-item>
            </i-col>
            <!--账号-->
            <i-col span="8">
              <i-form-item label="账户名称" prop="protype">
                <i-input v-model="formMaintain.uesrId">
                </i-input>
              </i-form-item>
            </i-col>
            <!--开户银行-->
            <i-col span="8">
              <i-form-item label="开户银行" prop="protype">
                <i-input v-model="formMaintain.bank">
                </i-input>
              </i-form-item>
            </i-col>
            <!--主要联系人-->
            <i-col span="8">
              <i-form-item label="主要联系人" prop="protype">
                <i-input v-model="formMaintain.primaryContact">
                </i-input>
              </i-form-item>
            </i-col>
            <!--联系电话-->
            <i-col span="8">
              <i-form-item label="联系电话" prop="protype">
                <i-input v-model="formMaintain.contactNumber">
                </i-input>
              </i-form-item>
            </i-col>
            <!--联系邮箱-->
            <i-col span="8">
              <i-form-item label="联系邮箱" prop="protype">
                <i-input v-model="formMaintain.contactEmail">
                </i-input>
              </i-form-item>
            </i-col>
            <!--地址-->
            <i-col span="24">
              <i-form-item label="地址" prop="protype">
                <i-select v-model="formMaintain.province" style="width: 10%">
                  <i-option value="重庆">重庆</i-option>
                  <i-option value="上海">上海</i-option>
                </i-select>
                <i-select v-model="formMaintain.city" style="width: 10%">
                  <i-option value="重庆">重庆</i-option>
                  <i-option value="上海">重庆</i-option>
                </i-select>
                <i-select v-model="formMaintain.area" style="width: 10%">
                  <i-option value="重庆">九龙坡区</i-option>
                  <i-option value="上海">渝中区</i-option>
                </i-select>
                <i-input v-model="formMaintain.Street" style="width: calc(70% - 16px); margin-left: 5px;">
                </i-input>
              </i-form-item>
            </i-col>
          </i-row>
        </i-form>

      </bs-form-block>
      <bs-form-block :title="'合作协议'" padding="20px 0" borderWidth="0px">
        <div class="form-top-actions">
          <i-button @click="addModalTwo" type="info"><i class="iconfont icon-xinzeng"></i> 新增</i-button>
        </div>
        <i-table highlight-row border ref="proTable" :columns="columns2" :data="data2"></i-table>
        <br>
        <br>
        <div class="text-right">
          <i-button type="primary" @click="formSubmit">提交</i-button>
          <i-button type="ghost" style="margin-left: 8px" @click="formCancel">取消</i-button>
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
  import ModalTwo from './modal-two.vue';
  export default {
    name: 'invest-maintain',
    components: {
      'bs-modal': BSModal,
      'modal-two': ModalTwo
    },
    data() {
      return {
        ShowModalOne: false,
        ShowModalTwo: false,
        formMaintain: {},
        columns1: [
          {
            title: '资方编号',
            width: 100,
            align: 'center',
            key: 'id'
          },
          {
            title: '资方名称',
            key: 'name'
          },
          {
            title: '状态',
            key: 'state'
          },
          {
            title: '操作',
            key: 'action',
            width: 200,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                    }
                  }
                }, '详情'),
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.listIndex = params.index;
                      this.setList(params.row);
                    }
                  }
                }, '修改'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.remove1(params.index);
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ],
        data1: [],
        columns2: [
          {
            title: '协议编号',
            width: 100,
            align: 'center',
            key: 'id'
          },
          {
            title: '协议名称',
            key: 'name'
          },
          {
            title: '协议附件',
            key: 'enclosure'
          },
          {
            title: '操作',
            key: 'action',
            width: 200,
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
                      this.remove2(params.index);
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ],
        data2: []
      };
    }, // end data
    async mounted() {
      const Vm = this;
      let response = await this.$http.post('/maintain', {});
      let responseAgreement = await this.$http.post('/agreement', {});
      try {
        Vm.$data.data1 = response.list;
        Vm.$data.data2 = responseAgreement.list;
      } catch (err) {
      }
    },
    methods: {
      // 新增弹窗
      addModal() {
        this.$data.ShowModalOne = true;
      },
      // 新增弹窗
      addModalTwo() {
        this.$data.ShowModalTwo = true;
      },
      // 资方维护列表的删除
      remove1(index) {
        this.data1.splice(index, 1);
      },
      // 资方维护弹窗的列表删除
      remove2(index) {
        this.data2.splice(index, 1);
      },
      // 修改弹窗
      setList() {
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
