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
                <i-input v-model="formMaintain.Street" style="width: 60%">
                </i-input>
              </i-form-item>
            </i-col>
          </i-row>
        </i-form>

      </bs-form-block>
    </bs-modal>
  </div>
</template>

<script>
  import BSModal from '@/components/bs-modal';
  export default {
    name: 'invest-maintain',
    components: {
      'bs-modal': BSModal
    },
    data() {
      return {
        ShowModalOne: false,
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
                      this.remove(params.index);
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ],
        data1: []
      };
    }, // end data
    async mounted() {
      const Vm = this;
      let response = await this.$http.post('/maintain', {});
      try {
        Vm.$data.data1 = response.list;
      } catch (err) {
      }
    },
    methods: {
      // 新增弹窗
      addModal() {
        this.$data.ShowModalOne = true;
      },
      // 修改弹窗
      setList() {
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
