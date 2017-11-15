<template>
  <div id="">
    <i-breadcrumb separator=">">
      <i-breadcrumb-item href="/">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/customer">客户档案</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/customer">个人客户管理</i-breadcrumb-item>
      <i-breadcrumb-item>客户添加</i-breadcrumb-item>
    </i-breadcrumb>
    <div class="form-top-actions"></div>
    <Tabs :animated="false" type="card">
      <TabPane label="主体信息">
        <i-row>
          <i-col span="24">
            <i-form label-position="right" :label-width="120">
              <bs-form-block :title="'基本信息'">
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
                      <i-select v-model="formData.select">
                        <i-option value="beijing">男</i-option>
                        <i-option value="shanghai">女</i-option>
                      </i-select>
                    </i-form-item>
                  </i-col>
                  <i-col span="6">
                    <i-form-item class="required" label="出生日期">
                      <i-date-picker type="date" placeholder="Select date" style="width: 200px"></i-date-picker>
                    </i-form-item>
                  </i-col>
                  <i-col span="6">
                    <i-form-item class="required" label="年龄">
                      <i-input :readonly="true" placeholder="根据出生日期计算"></i-input>
                    </i-form-item>
                  </i-col>
                </i-row>
                <i-row>
                  <i-col span="6">
                    <i-form-item class="required" label="婚姻状况">
                      <i-select v-model="formData.select">
                        <i-option value="beijing">男</i-option>
                        <i-option value="shanghai">女</i-option>
                      </i-select>
                    </i-form-item>
                  </i-col>
                  <i-col span="6">
                    <i-form-item class="required" label="教育程度">
                      <i-select v-model="formData.select">
                        <i-option value="beijing">男</i-option>
                        <i-option value="shanghai">女</i-option>
                      </i-select>
                    </i-form-item>
                  </i-col>
                  <i-col span="6">
                    <i-form-item class="required" label="职业类型">
                      <i-select v-model="formData.select">
                        <i-option value="beijing">政府机关</i-option>
                        <i-option value="shanghai">自由职业者</i-option>
                      </i-select>
                    </i-form-item>
                  </i-col>
                </i-row>
                <i-row>
                  <i-col span="6">
                    <i-form-item class="required" label="年收入">
                      <i-input v-model="formData.select">
                        <span slot="append">元</span>
                      </i-input>
                    </i-form-item>
                  </i-col>
                  <i-col span="6">
                    <i-form-item class="required" label="参加工作年限">
                      <i-select v-model="formData.select">
                        <i-option value="beijing">1</i-option>
                        <i-option value="shanghai">2</i-option>
                      </i-select>
                    </i-form-item>
                  </i-col>
                  <i-col span="6">
                    <i-form-item class="required" label="是否本地人">
                      <i-select v-model="formData.select">
                        <i-option value="Y">是</i-option>
                        <i-option value="N">否</i-option>
                      </i-select>
                    </i-form-item>
                  </i-col>
                </i-row>
                <i-row>
                  <i-col span="6">
                    <i-form-item class="required" label="本地有否房产">
                      <i-select v-model="formData.select">
                        <i-option value="Y">是</i-option>
                        <i-option value="N">否</i-option>
                      </i-select>
                    </i-form-item>
                  </i-col>
                  <i-col span="6">
                    <i-form-item class="required" label="本地居住年限">
                      <i-select v-model="formData.select">
                        <i-option value="beijing">1</i-option>
                        <i-option value="shanghai">2</i-option>
                      </i-select>
                    </i-form-item>
                  </i-col>
                  <i-col span="6">
                    <i-form-item class="required" label="居住性质">
                      <i-select v-model="formData.select">
                        <i-option value="Y">是</i-option>
                        <i-option value="N">否</i-option>
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
              </bs-form-block>
              <!--工作信息-->
              <bs-form-block :title="'工作信息'">

              </bs-form-block>

              <div class="form-footer-actions">
                <i-button type="primary"><i class="iconfont icon-tijiao"></i> 提交</i-button>
                <i-button type="success"><i class="iconfont icon-jujue"></i> 重置</i-button>
                <i-button><i class="iconfont icon-dayin"></i> 打印</i-button>
              </div>
            </i-form>
          </i-col>
        </i-row>
      </TabPane>
      <TabPane label="配偶信息">标签二的内容</TabPane>
      <TabPane label="联系人信息">标签三的内容</TabPane>
      <TabPane label="银行账户信息">标签一的内容</TabPane>
      <TabPane label="征信信息">标签二的内容</TabPane>
      <TabPane label="旗下公司">标签三的内容</TabPane>
      <TabPane label="负面调查">标签一的内容</TabPane>
      <TabPane label="业务往来">标签二的内容</TabPane>
      <TabPane label="诉讼情况">标签三的内容</TabPane>
    </Tabs>

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
