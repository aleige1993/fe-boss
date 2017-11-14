<template>
<div id="page-product-details">
  <i-breadcrumb separator="&gt;">
    <i-breadcrumb-item href="/">首页</i-breadcrumb-item>
    <i-breadcrumb-item href="/pages/configuration-manage/page-product">产品管理</i-breadcrumb-item>
    <i-breadcrumb-item>产品详情</i-breadcrumb-item>
  </i-breadcrumb>
  <!--基本信息-->
  <i-row>
    <i-col span="24">
      <i-form label-position="right" :label-width="120">
        <bs-form-block :title="'基本信息'">
          <i-row>
            <i-col span="6">
              <i-form-item label="产品编号">
                <i-input  placeholder="请输入产品名称"></i-input>
              </i-form-item>
            </i-col>
            <i-col span="6">
              <i-form-item label="产品名称">
                <i-input placeholder="请输入产品名称">
                </i-input>
              </i-form-item>
            </i-col>
            <i-col span="6">
              <i-form-item label="产品类别">
                <i-select v-model="formData.select">
                  <i-option value="chengyong">乘用车</i-option>
                  <i-option value="shangyong">商用车</i-option>
                  <i-option value="qingka">轻卡</i-option>
                  <i-option value="weika">微卡</i-option>
                  <i-option value="xinnengyuan">新能源</i-option>
                </i-select>
              </i-form-item>
            </i-col>
          </i-row>
          <i-row>
            <i-col span="6">
              <i-form-item label="个人单笔额度">
                <i-input placeholder="个人单笔额度">
                  <span slot="append">元</span>
                </i-input>
              </i-form-item>
            </i-col>
            <i-col span="6">
              <i-form-item label="个人单户额度">
                <i-input placeholder="个人单户额度">
                  <span slot="append">元</span>
                </i-input>
              </i-form-item>
            </i-col>
          </i-row>
          <i-row>
            <i-col span="6">
              <i-form-item label="企业单笔额度">
                <i-input placeholder="企业单笔额度">
                  <span slot="append">元</span>
                </i-input>
              </i-form-item>
            </i-col>
            <i-col span="6">
              <i-form-item label="企业单户额度">
                <i-input placeholder="企业单户额度">
                  <span slot="append">元</span>
                </i-input>
              </i-form-item>
            </i-col>
          </i-row>
        </bs-form-block>
      </i-form>
    </i-col>
  </i-row>
  <!--产品套餐-->
  <div class="details-item">
    <i-row>
      <i-col span="24">
        <bs-form-block :title="'产品套餐'">
          <div class="form-top-actions">
            <i-button type="info"><i class="iconfont icon-xinzeng"></i> 新增产品套餐</i-button>
          </div>
          <i-table border ref="selection" :columns="columns1" :data="data1"></i-table>
        </bs-form-block>
      </i-col>
    </i-row>
  </div>
  <!--费用收取项目-->
  <div class="details-item">
    <i-row>
      <i-col span="24">
        <bs-form-block :title="'费用收取项目'">
          <div class="form-top-actions">
            <i-button type="info"><i class="iconfont icon-xinzeng"></i> 新增</i-button>
          </div>
          <i-table border ref="selection" :columns="columns2" :data="data2"></i-table>
        </bs-form-block>
      </i-col>
    </i-row>
  </div>
  <!--贷款材料清单-->
  <div class="details-item">
    <i-row>
      <i-col span="24">
        <bs-form-block :title="'贷款材料清单'">
          <div class="form-top-actions">
            <i-button type="info"><i class="iconfont icon-xinzeng"></i> 新增</i-button>
          </div>
          <i-table border ref="selection" :columns="columns3" :data="data3"></i-table>
        </bs-form-block>
      </i-col>
    </i-row>
  </div>
</div>
</template>

<script>
  export default {
    name: '',
    data() {
      return {
        formData: {
          select: ''
        },
        columns1: [
          {
            title: '套餐ID',
            width: 100,
            align: 'center',
            key: 'TcID'
          },
          {
            title: '套餐名称',
            key: 'TcName'
          },
          {
            title: '套餐类型',
            key: 'TcType'
          },
          {
            title: '贷款期限(月)',
            key: 'TcTerm'
          },
          {
            title: '还款方式',
            key: 'TcMode'
          },
          {
            title: '还款周期',
            key: 'TcCycle'
          },
          {
            title: '还款选项',
            key: 'TcOption'
          },
          {
            title: '贷款名义年化利率%',
            width: 150,
            key: 'TcRate'
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
                      // this.show(params.index);
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
        data1: [],
        columns2: [
          {
            title: '选择',
            width: 200,
            align: 'center',
            key: 'FyOption'
          },
          {
            title: '费用类型',
            key: 'FyType'
          },
          {
            title: '费用标准',
            key: 'FyStandard'
          }
        ],
        data2: [],
        columns3: [
          {
            title: '编号',
            width: 100,
            align: 'center',
            key: 'BillID'
          },
          {
            title: '客户类型',
            width: 150,
            key: 'BillType'
          },
          {
            title: '名称',
            width: 150,
            key: 'BillNmae'
          },
          {
            title: '是否原件',
            key: 'isOriginal'
          },
          {
            title: '是否复印件',
            key: 'isCopy'
          },
          {
            title: '是否照片',
            key: 'isImage'
          },
          {
            title: '是否视频',
            key: 'isVideo'
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
                      // this.show(params.index);
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
        data3: []
      };
    },
    methods: {
      remove(index) {
        this.data1.splice(index, 1);
      }
    },
    async mounted() {
      const Vm = this;
      let response01 = await this.$http.post('/productDetails', {});
      try {
        Vm.$data.data1 = response01.list.data1;
        Vm.$data.data2 = response01.list.data2;
        Vm.$data.data3 = response01.list.data3;
      } catch (err) {
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
#page-product-details {
  & .form-top-actions {
    padding-top: 0;
    padding-left: 10px;
    padding-right: 10px;
  }
  & .details-item {
    padding-bottom: 27px;
  }
}
</style>
