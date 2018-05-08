<template>
  <div id="page-table-demo" class="page-carmodel-manage">
    <i-breadcrumb separator=">">
      <i-breadcrumb-item href="/home">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/conf">配置管理</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/conf/carmodelmanage">车型管理</i-breadcrumb-item>
      <i-breadcrumb-item>车型管理</i-breadcrumb-item>
    </i-breadcrumb>
    <div class="search-form-container">
      <i-form inline>
        <i-form-item prop="password">
          车型名称
        </i-form-item>
        <i-form-item prop="user">
          <i-input type="text" v-model="searchForm.modelFullName" placeholder=""></i-input>
        </i-form-item>
        <i-form-item prop="password">
          车系名称
        </i-form-item>
        <i-form-item prop="user">
          <i-input type="text" v-model="searchForm.modelFullName" placeholder=""></i-input>
        </i-form-item>
        <i-form-item prop="password">
          子品牌名称
        </i-form-item>
        <i-form-item prop="user">
          <i-input type="text" v-model="searchForm.modelFullName" placeholder=""></i-input>
        </i-form-item>
        <i-form-item prop="password">
          品牌名称
        </i-form-item>
        <i-form-item prop="user">
          <i-input type="text" v-model="searchForm.modelFullName" placeholder=""></i-input>
        </i-form-item>
        <i-form-item>
          <i-button @click="search" type="primary"><i-icon type="ios-search-strong"></i-icon> 搜索</i-button>
        </i-form-item>
      </i-form>
    </div>
    <!--<div class="form-top-actions">-->
      <!--<i-button type="info" @click="add"><i class="iconfont icon-xinzeng"></i> 新增</i-button>-->
    <!--</div>-->
    <slot name="topAction"></slot>
    <i-table :height="tableFixHeight+88" border :loading="dataLoading" ref="selection" @on-select="selectRow" :columns="resultCustomerColumns" :data="privateCustomerLoanList"></i-table>
    <div class="page-container">
      <i-page :total="total" :page-size="15" :current="currentPage" @on-change="jumpPage" size="small" show-elevator show-total></i-page>
    </div>
    <pt-modal :title="isAdd ? '添加车型' : '修改车型'" v-model="addModal" :width="1200" :zIndex="200">
      <i-form ref="fromData" :model="fromData" label-position="right" :label-width="100">
        <i-row>
          <i-col span="8">
            <i-form-item label="品牌名称" prop="brandNo" :rules="{required: true, message: '品牌名称不能为空'}">
              <div class="flex-items">
                <i-select
                  v-model="fromData.brandName"
                  placeholder=""
                  filterable
                  remote
                  :remote-method="remoteSearchBrand"
                  :loading="brand.searchLoading">
                  <i-option v-for="item in brand.searchList" :key="item.brandNo" :value="item.brandNo">{{item.brandName}}</i-option>
                </i-select>
                <i-button type="info">增加</i-button>
              </div>
            </i-form-item>
          </i-col>
          <i-col span="8">
            <i-form-item label="车型全称" :rules="{required: true, message: '车型全称不能为空'}" prop="modelFullName">
              <i-input v-model="fromData.modelFullName" placeholder=""></i-input>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row>
          <i-col span="6">
            <i-form-item label="品牌名称" :rules="{required: true, message: '品牌名称不能为空'}" prop="brandName">
              <i-input v-model="fromData.brandName" placeholder=""></i-input>
            </i-form-item>
          </i-col>
          <i-col span="6">
            <i-form-item label="级别" :rules="{required: true, message: '级别不能为空'}" prop="classType">
              <i-input v-model="fromData.classType" placeholder=""></i-input>
            </i-form-item>
          </i-col>
          <i-col span="6">
            <i-form-item label="车门数" :rules="{required: true, message: '车门数不能为空'}" prop="doors">
              <i-input v-model="fromData.doors" placeholder=""></i-input>
            </i-form-item>
          </i-col>
          <i-col span="6">
            <i-form-item label="驱动类型" :rules="{required: true, message: '驱动类型不能为空'}" prop="driveType">
              <i-input v-model="fromData.driveType" placeholder=""></i-input>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row>
          <i-col span="6">
            <i-form-item label="发动机" :rules="{required: true, message: '发动机不能为空'}" prop="engine">
              <i-input v-model="fromData.engine" placeholder=""></i-input>
            </i-form-item>
          </i-col>
          <i-col span="6">
            <i-form-item label="环保标准" :rules="{required: true, message: '环保标准不能为空'}" prop="engineEnvirStandard">
              <i-input v-model="fromData.engineEnvirStandard" placeholder=""></i-input>
            </i-form-item>
          </i-col>
          <i-col span="6">
            <i-form-item label="精确排量" :rules="{required: true, message: '精确排量不能为空'}" prop="engineExhaust">
              <i-input v-model="fromData.engineExhaust" placeholder=""></i-input>
            </i-form-item>
          </i-col>
          <i-col span="6">
            <i-form-item label="排量" :rules="{required: true, message: '排量不能为空'}" prop="engineExhaustForFloat">
              <i-input v-model="fromData.engineExhaustForFloat" placeholder=""></i-input>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row>
          <i-col span="6">
            <i-form-item label="燃料" :rules="{required: true, message: '燃料不能为空'}" prop="engineFuel">
              <i-input v-model="fromData.engineFuel" placeholder=""></i-input>
            </i-form-item>
          </i-col>
          <i-col span="6">
            <i-form-item label="进气形式" :rules="{required: true, message: '进气形式不能为空'}" prop="engineIntake">
              <i-input v-model="fromData.engineIntake" placeholder=""></i-input>
            </i-form-item>
          </i-col>
          <i-col span="6">
            <i-form-item label="最大扭矩" :rules="{required: true, message: '最大扭矩不能为空'}" prop="engineMaxNj">
              <i-input v-model="fromData.engineMaxNj" placeholder=""></i-input>
            </i-form-item>
          </i-col>
          <i-col span="6">
            <i-form-item label="最大扭矩转速" :rules="{required: true, message: '最大扭矩转速不能为空'}" prop="engineMaxNjSpeed">
              <i-input v-model="fromData.engineMaxNjSpeed" placeholder=""></i-input>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row>
          <i-col span="6">
            <i-form-item label="最大功率" :rules="{required: true, message: '最大功率不能为空'}" prop="engineMaxPower">
              <i-input v-model="fromData.engineMaxPower" placeholder=""></i-input>
            </i-form-item>
          </i-col>
          <i-col span="6">
            <i-form-item label="最大转速" :rules="{required: true, message: '最大转速不能为空'}" prop="engineMaxPowerSpeed">
              <i-input v-model="fromData.engineMaxPowerSpeed" placeholder=""></i-input>
            </i-form-item>
          </i-col>
          <i-col span="6">
            <i-form-item label="制动方式" :rules="{required: true, message: '制动方式不能为空'}" prop="engineType">
              <i-input v-model="fromData.engineType" placeholder=""></i-input>
            </i-form-item>
          </i-col>
          <i-col span="6">
            <i-form-item label="档位个数" :rules="{required: true, message: '档位个数不能为空'}" prop="gearNum">
              <i-input v-model="fromData.gearNum" placeholder=""></i-input>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row>
          <i-col span="6">
            <i-form-item label="变速箱类型" :rules="{required: true, message: '变速箱类型不能为空'}" prop="gearboxType">
              <i-input v-model="fromData.gearboxType" placeholder=""></i-input>
            </i-form-item>
          </i-col>
          <i-col span="6">
            <i-form-item label="出厂指导价" :rules="{required: true, message: '出厂指导价不能为空'}" prop="referprice">
              <i-input v-model="fromData.referprice" placeholder=""></i-input>
            </i-form-item>
          </i-col>
          <i-col span="6">
            <i-form-item label="最大速度" :rules="{required: true, message: '最大速度不能为空'}" prop="highSpeed">
              <i-input v-model="fromData.highSpeed" placeholder=""></i-input>
            </i-form-item>
          </i-col>
          <i-col span="6">
            <i-form-item label="高" :rules="{required: true, message: '高不能为空'}" prop="hight">
              <i-input v-model="fromData.hight" placeholder=""></i-input>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row>
          <i-col span="6">
            <i-form-item label="后轮规格" :rules="{required: true, message: '后轮规格不能为空'}" prop="hlSize">
              <i-input v-model="fromData.hlSize" placeholder=""></i-input>
            </i-form-item>
          </i-col>
          <i-col span="6">
            <i-form-item label="上市时间" :rules="{required: true, message: '上市时间不能为空'}" prop="listedTime">
              <!--<i-input v-model="fromData.listedTime" placeholder=""></i-input>-->
              <bs-datepicker v-model="fromData.listedTime" placeholder="" type="text" placeholder="查询时间"></bs-datepicker>
            </i-form-item>
          </i-col>
          <i-col span="6">
            <i-form-item label="后轮距" :rules="{required: true, message: '后轮距不能为空'}" prop="ljH">
              <i-input v-model="fromData.ljH" placeholder=""></i-input>
            </i-form-item>
          </i-col>
          <i-col span="6">
            <i-form-item label="前轮距" :rules="{required: true, message: '前轮距不能为空'}" prop="ljQ">
              <i-input v-model="fromData.ljQ" placeholder=""></i-input>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row>
          <i-col span="6">
            <!--<i-form-item label="logo地址" :rules="{required: true, message: 'logo地址不能为空'}" prop="logourl">-->
              <!--<i-input v-model="fromData.logourl" placeholder=""></i-input>-->
            <!--</i-form-item>-->
            <i-form-item class="upload-image" label="logo地址" :rules="{required: true, message: '请上传logo地址'}" prop="modelImg">
              <input type="hidden" v-model="fromData.logourl"/>
              <bs-big-img :thumb="fromData.logourl" :thumbHeight="32" :full="fromData.logourl" :full-width="945"></bs-big-img>
              <i-upload :on-success="uploadLogoSuccess"
                :max-size="uploadMaxSize"
                :on-exceeded-size="handleMaxSize"
                :on-error="uploadError" :action="$config.HTTPBASEURL+'/common/upload'" :show-upload-list="false">
                <i-form-item prop="password">
                  <a href="javascript:">修改</a>
                </i-form-item>
              </i-upload>
            </i-form-item>
          </i-col>
          <i-col span="6">
            <i-form-item label="长" :rules="{required: true, message: '长不能为空'}" prop="longMm">
              <i-input v-model="fromData.longMm" placeholder=""></i-input>
            </i-form-item>
          </i-col>
          <i-col span="6">
            <i-form-item label="行李厢容积" :rules="{required: true, message: '行李厢容积不能为空'}" prop="luggage">
              <i-input v-model="fromData.luggage" placeholder=""></i-input>
            </i-form-item>
          </i-col>
          <i-col span="6">
            <i-form-item label="子品牌" :rules="{required: true, message: '子品牌不能为空'}" prop="masterBrand">
              <i-input v-model="fromData.masterBrand" placeholder=""></i-input>
            </i-form-item>
          </i-col>
        </i-row>

        <i-row>
          <i-col span="6">
            <i-form-item label="刹车类型" :rules="{required: true, message: '刹车类型不能为空'}" prop="parkingType">
              <i-input v-model="fromData.parkingType" placeholder=""></i-input>
            </i-form-item>
          </i-col>
          <i-col span="6">
            <i-form-item label="前轮规格" :rules="{required: true, message: '前轮规格不能为空'}" prop="qlSize">
              <i-input v-model="fromData.qlSize" placeholder=""></i-input>
            </i-form-item>
          </i-col>
          <i-col span="6">
            <i-form-item label="座位数" :rules="{required: true, message: '座位数不能为空'}" prop="seats">
              <i-input v-model="fromData.seats" placeholder=""></i-input>
            </i-form-item>
          </i-col>
          <i-col span="6">
            <i-form-item label="车系名称" :rules="{required: true, message: '车系名称不能为空'}" prop="serialName">
              <i-input v-model="fromData.serialName" placeholder=""></i-input>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row>
          <i-col span="6">
            <!--<i-form-item label="车系图片" :rules="{required: true, message: '车系图片不能为空'}" prop="serialPic">-->
              <!--<i-input v-model="fromData.serialPic" placeholder=""></i-input>-->
            <!--</i-form-item>-->
            <i-form-item class="upload-image" label="车系图片" :rules="{required: true, message: '请上传车系图片'}" prop="modelImg">
              <input type="hidden" v-model="fromData.serialPic"/>
              <bs-big-img :thumb="fromData.serialPic" :thumbHeight="32" :full="fromData.serialPic" :full-width="945"></bs-big-img>
              <i-upload :on-success="uploadSerialSuccess"
                :max-size="uploadMaxSize"
                :on-exceeded-size="handleMaxSize"
                :on-error="uploadError" :action="$config.HTTPBASEURL+'/common/upload'" :show-upload-list="false">
                <i-form-item prop="password">
                  <a href="javascript:">修改</a>
                </i-form-item>
              </i-upload>
            </i-form-item>
          </i-col>
          <i-col span="6">
            <i-form-item label="车身结构" :rules="{required: true, message: '车身结构不能为空'}" prop="struct">
              <i-input v-model="fromData.struct" placeholder=""></i-input>
            </i-form-item>
          </i-col>
          <i-col span="6">
            <i-form-item label="油箱容积" :rules="{required: true, message: '油箱容积不能为空'}" prop="tank">
              <i-input v-model="fromData.tank" placeholder=""></i-input>
            </i-form-item>
          </i-col>
          <i-col span="6">
            <i-form-item label="宽" :rules="{required: true, message: '宽不能为空'}" prop="width">
              <i-input v-model="fromData.width" placeholder=""></i-input>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row>
          <i-col span="6">
            <i-form-item label="年款" :rules="{required: true, message: '年款不能为空'}" prop="yyyy">
              <i-input v-model="fromData.yyyy" placeholder=""></i-input>
            </i-form-item>
          </i-col>
          <i-col span="6">
            <i-form-item label="轴距" :rules="{required: true, message: '轴距不能为空'}" prop="zj">
              <i-input v-model="fromData.zj" placeholder=""></i-input>
            </i-form-item>
          </i-col>
          <i-col span="6">
            <i-form-item label="备注"  prop="tag">
              <i-input v-model="fromData.tag" placeholder=""></i-input>
            </i-form-item>
          </i-col>
        </i-row>
        <i-form-item class="text-right">
          <i-button type="primary" @click="submitFun" :loading="buttonLoading">
            <span v-if="!buttonLoading">提交</span>
            <span v-else>loading...</span>
          </i-button>
          <i-button type="ghost" @click="cancelFun" style="margin-left: 8px">取消</i-button>
        </i-form-item>
      </i-form>
    </pt-modal>

    <!--添加品牌-->
    <pt-modal title="添加" v-model="brand.addModel" :width="600" :zIndex="200" @on-close="fileUploading=false">
      <i-form v-if="brand.addModel" ref="brand.addFormData" :model="brand.addFormData" label-position="left" :label-width="80">
        <i-form-item label="品牌名称" prop="brandName" :rules="{required: true, message: '品牌名称不能为空', trigger: 'blur'}">
          <i-input v-model="brand.addFormData.brandName" placeholder=""></i-input>
        </i-form-item>
        <i-form-item label="首字母" prop="initial" :rules="{required: true, message: '首字母不能为空', trigger: 'blur'}">
          <i-input v-model="brand.addFormData.initial" placeholder=""></i-input>
        </i-form-item>
        <i-form-item label="品牌LOGO" prop="logo">
          <input type="hidden" v-model="brand.addFormData.logo"/>
          <i-upload
            :format="['jpg','jpeg','png']"
            :on-success="uploadSuccess"
            :before-upload="uploadProgress"
            :on-error="uploadError"
            :max-size="uploadMaxSize"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            :action="$config.HTTPBASEURL+'/common/upload'"
            :show-upload-list="false">
            <div class="upload-image">
              <i-icon type="ios-cloud-upload" size="52" style="color: #3399ff"></i-icon>
              <p>单击或拖动文件上传</p>
              <i-spin fix v-if="fileUploading">
                <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                <div style="margin-top: 10px">正在上传中，请勿关闭...</div>
              </i-spin>
            </div>
          </i-upload>
        </i-form-item>
        <i-form-item class="text-right">
          <i-button type="primary" @click="submitFun" :loading="buttonLoading||fileUploading">
            <span v-if="!buttonLoading">提交</span>
            <span v-else>loading...</span>
          </i-button>
          <i-button type="ghost" @click="cancelFun" style="margin-left: 8px">取消</i-button>
        </i-form-item>
      </i-form>
    </pt-modal>
  </div>
</template>

<script>
  import MixinData from './mixin-data';
  import MixinMothod from './mixin-method';
  import MixinBrandMethod from './mixin-mehtod-brand';
  import PTModal from '@/components/bs-modal';
  export default {
    name: 'carModelManage',
    mixins: [MixinData, MixinMothod, MixinBrandMethod],
    components: {
      'pt-modal': PTModal
    },
    computed: {
      resultCustomerColumns() {
        if (this.type === 'modal') {
          return this.$data.customerColumns;
        } else {
          return [...this.$data.customerColumns, ...this.$data.customerActionColumns];
        }
      }
    }
  };
</script>
<style lang="scss" scoped>
  .flex-items {
    display: flex;
    .ivu-btn {
      margin-left: 5px;
    }
  }
  .upload-image {
    height: 32px;
    .ivu-upload {
      display: inline-block;
      vertical-align: top;
    }
  }
</style>
