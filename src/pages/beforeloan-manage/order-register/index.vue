<template>
  <div id="">
    <i-breadcrumb separator=">">
      <i-breadcrumb-item href="/home">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/components/i-breadcrumb">贷前管理</i-breadcrumb-item>
      <i-breadcrumb-item>进件登记</i-breadcrumb-item>
    </i-breadcrumb>
    <div class="form-top-actions"></div>
    <i-row>
      <i-col span="24">
        <i-form label-position="right" :label-width="120">
          <bs-form-block :title="'基本信息'">
            <i-row>
              <i-col span="6">
                <i-form-item class="required" label="车类">
                  <i-select v-model="formData.select">
                    <i-option value="beijing">一手车</i-option>
                    <i-option value="shanghai">二手车</i-option>
                    <i-option value="shenzhen">三手车</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
              <i-col span="6">
                <i-form-item class="required" label="车型">
                  <i-select v-model="formData.select">
                    <i-option value="beijing">一手车</i-option>
                    <i-option value="shanghai">二手车</i-option>
                    <i-option value="shenzhen">三手车</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
              <i-col span="6">
              <i-form-item class="required" label="申请金额">
                <i-input placeholder="请输入姓名">
                <span slot="append">元</span>
                </i-input>
              </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="6">
              <i-form-item class="required" label="产品">
                <i-select v-model="formData.select">
                  <i-option value="beijing">一手车</i-option>
                  <i-option value="shanghai">二手车</i-option>
                  <i-option value="shenzhen">三手车</i-option>
                </i-select>
              </i-form-item>
              </i-col>
              <i-col span="6">
              <i-form-item class="required" label="费用套餐">
                <i-select v-model="formData.select">
                  <i-option value="beijing">一手车</i-option>
                  <i-option value="shanghai">二手车</i-option>
                  <i-option value="shenzhen">三手车</i-option>
                </i-select>
              </i-form-item>
              </i-col>
              <i-col span="6">
              <i-form-item class="required" label="申请期限">
                <i-input placeholder="请输入姓名">
                <span slot="append">月</span>
                </i-input>
              </i-form-item>
              </i-col>
            </i-row>
          </bs-form-block>
          <!--车辆信息-->
          <bs-form-block :title="'车辆信息'">
            <i-row>
              <i-col span="6">
              <i-form-item class="required" label="渠道商">
                <i-select v-model="formData.select">
                  <i-option value="beijing">一手车</i-option>
                  <i-option value="shanghai">二手车</i-option>
                  <i-option value="shenzhen">三手车</i-option>
                </i-select>
              </i-form-item>
              </i-col>
              <i-col span="6">
              <i-form-item class="required" label="客户经理工号">
                <i-input placeholder="自动带入" readonly="true"></i-input>
              </i-form-item>
              </i-col>
              <i-col span="6">
              <i-form-item class="required" label="客户经理姓名">
                <i-input placeholder="自动带入" readonly="true"></i-input>
              </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="6">
              <i-form-item class="required" label="车辆品牌">
                <i-select filterable>
                  <i-option>宝马</i-option>
                </i-select>
              </i-form-item>
              </i-col>
              <i-col span="6">
              <i-form-item class="required" label="车系">
                <i-select filterable>
                  <i-option>宝马</i-option>
                </i-select>
              </i-form-item>
              </i-col>
              <i-col span="6">
              <i-form-item class="required" label="型号">
                <i-select filterable>
                  <i-option>宝马</i-option>
                </i-select>
              </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="6">
              <i-form-item class="required" label="车辆颜色">
                <i-select filterable>
                  <i-option>宝马</i-option>
                </i-select>
              </i-form-item>
              </i-col>
              <i-col span="6">
              <i-form-item class="required" label="排量">
                <i-input></i-input>
              </i-form-item>
              </i-col>
              <i-col span="6">
              <i-form-item class="required" label="排放标准">
                <i-input></i-input>
              </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="6">
                <i-form-item class="required" label="生产厂商">
                  <i-input></i-input>
                </i-form-item>
              </i-col>
              <i-col span="6">
                <i-form-item class="required" label="发动机号">
                  <i-input></i-input>
                </i-form-item>
              </i-col>
              <i-col span="6">
                <i-form-item class="required" label="车架号">
                  <i-input></i-input>
                </i-form-item>
              </i-col>
            </i-row>
            <!--二手车信息-->
            <bs-form-child-title :title="'二手车信息'"></bs-form-child-title>
            <i-row>
              <i-col span="6">
                <i-form-item class="required" label="上牌城市">
                  <i-input></i-input>
                </i-form-item>
              </i-col>
              <i-col span="6">
                <i-form-item class="required" label="上牌时间">
                  <i-date-picker type="date" placeholder="Select date" style="width: 200px"></i-date-picker>
                </i-form-item>
              </i-col>
              <i-col span="6">
                <i-form-item class="required" label="行驶里程(KM)">
                  <i-input></i-input>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="6">
                <i-form-item class="required" label="转手次数">
                  <i-input></i-input>
                </i-form-item>
              </i-col>
              <i-col span="6">
                <i-form-item class="required" label="车辆状况">
                  <i-select>
                    <i-option>良好</i-option>
                    <i-option>一般般</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
              <i-col span="6">
                <i-form-item class="required" label="有误事故">
                  <i-select>
                    <i-option>有</i-option>
                    <i-option>无</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="18">
                <i-form-item label="特殊说明">
                  <i-input type="textarea" :rows="4"></i-input>
                </i-form-item>
              </i-col>
            </i-row>
            <!--车辆保险信息-->
            <bs-form-child-title :title="'车辆保险信息'"></bs-form-child-title>
            <i-row>
              <i-col span="6">
                <i-form-item class="required" label="保险单号">
                  <i-input></i-input>
                </i-form-item>
              </i-col>
              <i-col span="6">
                <i-form-item class="required" label="保险到期日">
                  <i-date-picker type="date" placeholder="Select date" style="width: 200px"></i-date-picker>
                </i-form-item>
              </i-col>
              <i-col span="6">
                <i-form-item class="required" label="保险公司">
                  <i-input></i-input>
                </i-form-item>
              </i-col>
            </i-row>
          </bs-form-block>
          <!--客户信息-->
          <bs-form-block title="客户信息">
            <i-row>
              <i-col span="6">
                <i-form-item class="required" label="姓名">
                  <i-input></i-input>
                </i-form-item>
              </i-col>
              <i-col span="6">
                <i-form-item class="required" label="身份证号">
                  <i-input></i-input>
                </i-form-item>
              </i-col>
              <i-col span="6">
                <i-form-item class="required" label="身份证有效期">
                  <i-date-picker type="date" placeholder="Select date" style="width: 200px"></i-date-picker>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="6">
                <i-form-item class="required" label="性别">
                  <i-radio-group v-model="formData.user.gender">
                    <i-radio label="1" :value="1">男</i-radio>
                    <i-radio label="0">女</i-radio>
                    <i-radio label="保密"></i-radio>
                  </i-radio-group>
                </i-form-item>
              </i-col>
              <i-col span="6">
                <i-form-item class="required" label="出生日期">
                  <i-date-picker type="date" placeholder="Select date" style="width: 200px"></i-date-picker>
                </i-form-item>
              </i-col>
              <i-col span="6">
                <i-form-item class="required" label="年龄">
                  <i-input readonly="true"></i-input>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="6">
                <i-form-item class="required"  label="婚姻状况">
                  <i-select v-model="formData.user.isWed">
                    <i-option :value="1">已婚</i-option>
                    <i-option :value="2">未婚</i-option>
                    <i-option :value="3">离异</i-option>
                    <i-option :value="4">丧偶</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
              <i-col span="6">
                <i-form-item class="required" label="教育程度">
                  <i-select>
                    <i-option>博士及以上</i-option>
                    <i-option>硕士</i-option>
                    <i-option>本科</i-option>
                    <i-option>大专</i-option>
                    <i-option>其他</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
              <i-col span="6">
                <i-form-item class="required" label="职业类型">
                  <i-select>
                    <i-option>IT</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="6">
                <i-form-item class="required" label="年收入">
                  <i-input>
                    <span slot="append">元</span>
                  </i-input>
                </i-form-item>
              </i-col>
              <i-col span="6">
                <i-form-item class="required" label="参加工作年薪">
                  <i-select>
                    <i-option>1年</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
              <i-col span="6">
                <i-form-item class="required" label="是否本地人">
                  <i-radio-group>
                    <i-radio label="1" :value="1">是</i-radio>
                    <i-radio label="0">否</i-radio>
                  </i-radio-group>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="6">
                <i-form-item class="required" label="本地有否房产">
                  <i-radio-group>
                    <i-radio label="1" :value="1">是</i-radio>
                    <i-radio label="0">否</i-radio>
                  </i-radio-group>
                </i-form-item>
              </i-col>
              <i-col span="6">
                <i-form-item class="required" label="本地居住年限">
                  <i-select>
                    <i-option>1年</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
              <i-col span="6">
                <i-form-item class="required" label="居住性质">
                  <i-select>
                    <i-option>购房</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="18">
                <i-form-item class="required" label="户籍地址">
                  <i-select style="width: 150px">
                    <i-option>重庆市</i-option>
                  </i-select>
                  <i-select style="width: 150px">
                    <i-option>重庆市</i-option>
                  </i-select>
                  <i-select style="width: 150px">
                    <i-option>重庆市</i-option>
                  </i-select>
                  <i-input placeholder="街道信息" style="width: 220px;"></i-input>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="18">
                <i-form-item class="required" label="居住地址">
                  <i-select style="width: 150px">
                    <i-option>重庆市</i-option>
                  </i-select>
                  <i-select style="width: 150px">
                    <i-option>重庆市</i-option>
                  </i-select>
                  <i-select style="width: 150px">
                    <i-option>重庆市</i-option>
                  </i-select>
                  <i-input placeholder="街道信息" style="width: 220px;"></i-input>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="6">
                <i-form-item class="required" label="身份证正面">
                  <i-upload action="//jsonplaceholder.typicode.com/posts/">
                    <div style="padding: 20px 0">
                      <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                      <p>Click or drag files here to upload</p>
                    </div>
                  </i-upload>
                </i-form-item>
              </i-col>
              <i-col span="6">
                <i-form-item class="required" label="身份证反面">
                  <i-upload action="//jsonplaceholder.typicode.com/posts/">
                    <div style="padding: 20px 0">
                      <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                      <p>Click or drag files here to upload</p>
                    </div>
                  </i-upload>
                </i-form-item>
              </i-col>
              <i-col span="6">
                <i-form-item class="required" label="手持身份证">
                  <i-upload action="//jsonplaceholder.typicode.com/posts/">
                    <div style="padding: 20px 0">
                      <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                      <p>Click or drag files here to upload</p>
                    </div>
                  </i-upload>
                </i-form-item>
              </i-col>
            </i-row>
            <!--配偶信息-->
            <div v-show="formData.user.isWed===1">
              <bs-form-child-title :title="'配偶信息'"></bs-form-child-title>
              <i-row>
                <i-col span="6">
                  <i-form-item class="required" label="配偶姓名">
                    <i-input></i-input>
                  </i-form-item>
                </i-col>
                <i-col span="6">
                  <i-form-item class="required" label="证件类型">
                    <i-select>
                      <i-option>身份证</i-option>
                    </i-select>
                  </i-form-item>
                </i-col>
                <i-col span="6">
                  <i-form-item class="required" label="证件号码">
                    <i-input></i-input>
                  </i-form-item>
                </i-col>
              </i-row>
              <i-row>
                <i-col span="6">
                  <i-form-item class="required" label="教育程度">
                    <i-select>
                      <i-option>身份证</i-option>
                    </i-select>
                  </i-form-item>
                </i-col>
                <i-col span="6">
                  <i-form-item class="required" label="职业类型">
                    <i-select>
                      <i-option>身份证</i-option>
                    </i-select>
                  </i-form-item>
                </i-col>
                <i-col span="6">
                  <i-form-item class="required" label="参与类型">
                    <i-select>
                      <i-option>身份证</i-option>
                    </i-select>
                  </i-form-item>
                </i-col>
              </i-row>
              <i-row>
                <i-col span="18">
                  <i-form-item class="required" label="户籍地址">
                    <i-select style="width: 150px">
                      <i-option>重庆市</i-option>
                    </i-select>
                    <i-select style="width: 150px">
                      <i-option>重庆市</i-option>
                    </i-select>
                    <i-select style="width: 150px">
                      <i-option>重庆市</i-option>
                    </i-select>
                    <i-input placeholder="街道信息" style="width: 220px;"></i-input>
                  </i-form-item>
                </i-col>
              </i-row>
              <i-row>
                <i-col span="6">
                  <i-form-item class="required" label="身份证正面">
                    <i-upload action="//jsonplaceholder.typicode.com/posts/">
                      <div style="padding: 20px 0">
                        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                        <p>Click or drag files here to upload</p>
                      </div>
                    </i-upload>
                  </i-form-item>
                </i-col>
                <i-col span="6">
                  <i-form-item class="required" label="身份证反面">
                    <i-upload action="//jsonplaceholder.typicode.com/posts/">
                      <div style="padding: 20px 0">
                        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                        <p>Click or drag files here to upload</p>
                      </div>
                    </i-upload>
                  </i-form-item>
                </i-col>
              </i-row>
            </div>
            <!--联系方式-->
            <bs-form-child-title :title="'联系方式'"></bs-form-child-title>
            <i-table style="margin: 0 20px" :columns="contactTableColume"  :data="formData.user.userContacts"></i-table>
            <!--工作单位信息-->
            <bs-form-child-title :title="'工作单位信息'"></bs-form-child-title>
          </bs-form-block>
          <div class="form-footer-actions">
            <i-button type="primary"><i class="iconfont icon-tijiao"></i> 提交</i-button>
            <i-button type="success"><i class="iconfont icon-jujue"></i> 重置</i-button>
            <i-button><i class="iconfont icon-dayin"></i> 打印</i-button>
          </div>
        </i-form>
      </i-col>
    </i-row>
  </div>
</template>
<script>
export default {
  name: '',
  data() {
    return {
      contactTableColume: [
        {
          title: '姓名',
          key: 'name'
        },
        {
          title: '关系',
          key: 'relationShip'
        },
        {
          title: '电话',
          key: 'phone'
        },
        {
          title: '操作',
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
                    this.show(params.index);
                  }
                }
              }, '编辑'),
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
      formData: {
        select: '',
        user: {
          gender: '',
          isWed: 1,
          userContacts: [{
            name: '张三',
            relationShip: '兄妹',
            phone: '1584214511'
          }]
        }
      }
    };
  },
  watch: {
    'formData.user.isWed': (val) => {
      // alert(val);
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
