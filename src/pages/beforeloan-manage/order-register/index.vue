<template>
  <div id="">
    <i-breadcrumb separator=">">
      <i-breadcrumb-item href="/">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/components/i-breadcrumb">贷前管理</i-breadcrumb-item>
      <i-breadcrumb-item>进件登记</i-breadcrumb-item>
    </i-breadcrumb>
    <div class="form-top-actions"></div>
    <i-row>
      <i-col span="24">
        <Form label-position="right" :label-width="120">
          <bs-form-block :title="'基本信息'">
            <i-row>
              <i-col span="6">
                <i-form-item label="车类">
                  <i-select v-model="formData.select">
                    <Option value="beijing">一手车</Option>
                    <Option value="shanghai">二手车</Option>
                    <Option value="shenzhen">三手车</Option>
                  </i-select>
                </i-form-item>
              </i-col>
              <i-col span="6">
                <i-form-item label="车型">
                  <i-select v-model="formData.select">
                    <Option value="beijing">一手车</Option>
                    <Option value="shanghai">二手车</Option>
                    <Option value="shenzhen">三手车</Option>
                  </i-select>
                </i-form-item>
              </i-col>
              <i-col span="6">
              <i-form-item label="申请金额">
                <i-input placeholder="请输入姓名">
                <span slot="append">元</span>
                </i-input>
              </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="6">
              <i-form-item label="产品">
                <i-select v-model="formData.select">
                  <Option value="beijing">一手车</Option>
                  <Option value="shanghai">二手车</Option>
                  <Option value="shenzhen">三手车</Option>
                </i-select>
              </i-form-item>
              </i-col>
              <i-col span="6">
              <i-form-item label="费用套餐">
                <i-select v-model="formData.select">
                  <Option value="beijing">一手车</Option>
                  <Option value="shanghai">二手车</Option>
                  <Option value="shenzhen">三手车</Option>
                </i-select>
              </i-form-item>
              </i-col>
              <i-col span="6">
              <i-form-item label="申请期限">
                <i-input placeholder="请输入姓名">
                <span slot="append">月</span>
                </i-input>
              </i-form-item>
              </i-col>
            </i-row>
          </bs-form-block>
          <bs-form-block :title="'车辆信息'">
            <i-row>
              <i-col span="6">
              <i-form-item label="渠道商">
                <i-select v-model="formData.select">
                  <Option value="beijing">一手车</Option>
                  <Option value="shanghai">二手车</Option>
                  <Option value="shenzhen">三手车</Option>
                </i-select>
              </i-form-item>
              </i-col>
              <i-col span="6">
              <i-form-item label="客户经理工号">
                <i-input placeholder="自动带入" readonly="true"></i-input>
              </i-form-item>
              </i-col>
              <i-col span="6">
              <i-form-item label="客户经理姓名">
                <i-input placeholder="自动带入" readonly="true"></i-input>
              </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="6">
              <i-form-item label="车辆品牌">
                <i-select filterable>
                  <Option>宝马</Option>
                </i-select>
              </i-form-item>
              </i-col>
              <i-col span="6">
              <i-form-item label="车系">
                <i-select filterable>
                  <Option>宝马</Option>
                </i-select>
              </i-form-item>
              </i-col>
              <i-col span="6">
              <i-form-item label="型号">
                <i-select filterable>
                  <Option>宝马</Option>
                </i-select>
              </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="6">
              <i-form-item label="车辆颜色">
                <i-select filterable>
                  <i-option>宝马</i-option>
                </i-select>
              </i-form-item>
              </i-col>
              <i-col span="6">
              <i-form-item label="排量">
                <i-input></i-input>
              </i-form-item>
              </i-col>
              <i-col span="6">
              <i-form-item label="排放标准">
                <i-input></i-input>
              </i-form-item>
              </i-col>
            </i-row>
          </bs-form-block>
        </Form>
      </i-col>
    </i-row>
  </div>
</template>
<script>
export default {
  name: '',
  data() {
    return {
      formData: {
        select: ''
      }
    };
  }
};
</script>
<style lang="scss" scoped>
</style>
