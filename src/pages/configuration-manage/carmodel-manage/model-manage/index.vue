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
          <i-input type="text" v-model="searchForm.seriesName" placeholder=""></i-input>
        </i-form-item>
        <i-form-item prop="password">
          子品牌名称
        </i-form-item>
        <i-form-item prop="user">
          <i-input type="text" v-model="searchForm.seriesGroupName" placeholder=""></i-input>
        </i-form-item>
        <i-form-item prop="password">
          品牌名称
        </i-form-item>
        <i-form-item prop="user">
          <i-input type="text" v-model="searchForm.brandName" placeholder=""></i-input>
        </i-form-item>
        <i-form-item>
          <i-button @click="search" type="primary"><i-icon type="ios-search-strong"></i-icon> 搜索</i-button>
        </i-form-item>
      </i-form>
    </div>
    <div class="form-top-actions">
      <i-button type="info" @click="add"><i class="iconfont icon-xinzeng"></i> 新增</i-button>
    </div>
    <slot name="topAction"></slot>
    <i-table :height="tableFixHeight" border :loading="dataLoading" ref="selection" @on-select="selectRow" :columns="resultCustomerColumns" :data="privateCustomerLoanList"></i-table>
    <div class="page-container">
      <i-page :total="total" :page-size="15" :current="currentPage" @on-change="jumpPage" size="small" show-elevator show-total></i-page>
    </div>
    <pt-modal :title="isAdd ? '添加车型' : '修改车型'" v-model="addModal" :width="1000" :zIndex="200" @on-close="modelData.modelFileUploading=false">
      <i-form ref="modelData" :model="modelData" label-position="right" :label-width="100">
        <i-row>
          <i-col span="12">
            <i-form-item v-if="isAdd" label="品牌名称" prop="id" :rules="{required: true, message: '品牌名称不能为空'}">
              <div class="flex-items">
                <i-select
                  v-model="modelData.id"
                  placeholder=""
                  filterable>
                  <!--remote-->
                  <!--:remote-method="remoteSearchBrand"-->
                  <!--:loading="brand.searchLoading">-->
                  <i-option v-for="item in brand.searchList" :key="item.id" :value="item.id">{{item.brandName}}</i-option>
                </i-select>
                <i-button @click="addBrand" type="info">新增</i-button>
              </div>
            </i-form-item>
            <i-form-item v-else label="品牌名称" prop="brandName">
              <i-input readonly v-model="modelData.brandName" placeholder=""></i-input>
            </i-form-item>
          </i-col>
          <i-col span="12">
            <i-form-item v-if="isAdd" label="子品牌名称" prop="childBrandName" :rules="{required: true, message: '子品牌名称不能为空'}">
              <div class="flex-items">
                <i-select filterable :disabled="!modelData.id" v-model="modelData.childBrandName" placeholder="">
                  <i-option v-for="item in childBrandList" :key="item.name" :value="item.name">{{item.name}}</i-option>
                </i-select>
                <i-button v-if="modelData.id" @click="addSeries" type="info">新增</i-button>
              </div>
            </i-form-item>
            <i-form-item v-else label="子品牌名称" prop="seriesGroupName">
              <i-input readonly v-model="modelData.seriesGroupName" placeholder=""></i-input>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row>
          <i-col span="12">
            <i-form-item v-if="isAdd" label="车系名称" prop="carSeriesId" :rules="{required: true, message: '车系名称不能为空'}">
              <div class="flex-items">
                <i-select filterable :disabled="!modelData.childBrandName" v-model="modelData.carSeriesId" placeholder="">
                  <i-option v-for="item in series.resultList" :key="item.id" :value="item.id">{{item.seriesName}}</i-option>
                </i-select>
                <i-button v-if="modelData.id" @click="addSeries" type="info">新增</i-button>
              </div>
            </i-form-item>
            <i-form-item v-else label="车系名称" prop="serialName">
              <i-input readonly v-model="modelData.seriesName" placeholder=""></i-input>
            </i-form-item>
          </i-col>
          <i-col span="12">
            <i-form-item label="车型名称" :rules="{required: true, message: '车型名称不能为空'}" prop="name">
              <i-input v-model="modelData.name" placeholder=""></i-input>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row v-if="!isAdd">
          <i-col span="18">
            <i-form-item label="车型全称">
              {{modelData.fullName}}
            </i-form-item>
          </i-col>
        </i-row>
        <i-row>
          <i-col span="6">
            <i-form-item label="生产年份" :rules="{required: true, message: '生产年份不能为空'}" prop="yyyy">
              <i-input v-model="modelData.yyyy" placeholder=""></i-input>
            </i-form-item>
          </i-col>
          <i-col span="6">
            <i-form-item label="指导售价" :rules="{required: true, message: '指导售价不能为空'}" prop="referprice">
              <i-input v-model="modelData.referprice" placeholder=""></i-input>
            </i-form-item>
          </i-col>
          <i-col span="6">
            <i-form-item label="引擎" prop="engine" :rules="{required: true, message: '发动机排量不能为空'}">
              <i-input v-model="modelData.engine" placeholder="例：1.8T 190马力 L4"></i-input>
            </i-form-item>
          </i-col>
          <i-col span="6">
            <i-form-item label="发动机排量" prop="engineExhaustForFloat" :rules="{required: true, message: '发动机排量不能为空'}">
              <i-input v-model="modelData.engineExhaustForFloat" placeholder="例：1.8T"></i-input>
            </i-form-item>
          </i-col>
          <!--<i-col span="6">-->
            <!--<i-form-item label="车辆颜色" prop="colorType">-->
              <!--<i-select v-model="modelData.colorType" placeholder="">-->
                <!--<i-option v-for="item in enumSelectData.get('CarColorEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>-->
              <!--</i-select>-->
            <!--</i-form-item>-->
          <!--</i-col>-->
        </i-row>
        <i-row>
          <i-col span="6">
            <i-form-item label="车辆级别" prop="classType">
              <i-input v-model="modelData.classType" placeholder=""></i-input>
            </i-form-item>
          </i-col>
          <i-col span="6">
            <i-form-item label="驱动类型" prop="driveType">
              <i-input v-model="modelData.driveType" placeholder=""></i-input>
            </i-form-item>
          </i-col>
          <i-col span="6">
            <i-form-item label="车门数" prop="doors">
              <i-input v-model="modelData.doors" placeholder=""></i-input>
            </i-form-item>
          </i-col>
          <i-col span="6">
            <i-form-item label="车身结构" prop="struct">
              <i-input v-model="modelData.struct" placeholder=""></i-input>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row>
          <i-col span="6">
            <i-form-item label="环保标准" prop="engineEnvirStandard">
              <i-input v-model="modelData.engineEnvirStandard" placeholder=""></i-input>
            </i-form-item>
          </i-col>
          <i-col span="6">
            <i-form-item label="精确排量" prop="engineExhaust">
              <i-input v-model="modelData.engineExhaust" placeholder=""></i-input>
            </i-form-item>
          </i-col>
          <i-col span="6">
            <i-form-item label="燃料" prop="engineFuel">
              <i-input v-model="modelData.engineFuel" placeholder=""></i-input>
            </i-form-item>
          </i-col>
          <i-col span="6">
            <i-form-item label="进气形式" prop="engineIntake">
              <i-input v-model="modelData.engineIntake" placeholder=""></i-input>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row>
          <i-col span="6">
            <i-form-item label="最大扭矩" prop="engineMaxNj">
              <i-input v-model="modelData.engineMaxNj" placeholder=""></i-input>
            </i-form-item>
          </i-col>
          <i-col span="6">
            <i-form-item label="最大扭矩转速" prop="engineMaxNjSpeed">
              <i-input v-model="modelData.engineMaxNjSpeed" placeholder=""></i-input>
            </i-form-item>
          </i-col>
          <i-col span="6">
            <i-form-item label="最大功率" prop="engineMaxPower">
              <i-input v-model="modelData.engineMaxPower" placeholder=""></i-input>
            </i-form-item>
          </i-col>
          <i-col span="6">
            <i-form-item label="最大转速" prop="engineMaxPowerSpeed">
              <i-input v-model="modelData.engineMaxPowerSpeed" placeholder=""></i-input>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row>
          <i-col span="6">
            <i-form-item label="制动方式" prop="engineType">
              <i-input v-model="modelData.engineType" placeholder=""></i-input>
            </i-form-item>
          </i-col>
          <i-col span="6">
            <i-form-item label="档位个数" prop="gearNum">
              <i-input v-model="modelData.gearNum" placeholder=""></i-input>
            </i-form-item>
          </i-col>
          <i-col span="6">
            <i-form-item label="变速箱类型" prop="gearboxType">
              <i-input v-model="modelData.gearboxType" placeholder=""></i-input>
            </i-form-item>
          </i-col>
          <i-col span="6">
            <i-form-item label="最大速度" prop="highSpeed">
              <i-input v-model="modelData.highSpeed" placeholder=""></i-input>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row>
          <i-col span="6">
            <i-form-item label="上市时间" prop="listedTime">
              <bs-datepicker v-model="searchForm.listedTime" type="text" placeholder=""></bs-datepicker>
            </i-form-item>
          </i-col>
          <i-col span="6">
            <i-form-item label="长" prop="longMm">
              <i-input v-model="modelData.longMm" placeholder=""></i-input>
            </i-form-item>
          </i-col>
          <i-col span="6">
            <i-form-item label="宽" prop="width">
              <i-input v-model="modelData.width" placeholder=""></i-input>
            </i-form-item>
          </i-col>
          <i-col span="6">
            <i-form-item label="高" prop="hight">
              <i-input v-model="modelData.hight" placeholder=""></i-input>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row>
          <i-col span="6">
            <i-form-item label="前轮规格" prop="qlSize">
              <i-input v-model="modelData.qlSize" placeholder=""></i-input>
            </i-form-item>
          </i-col>
          <i-col span="6">
            <i-form-item label="后轮规格" prop="hlSize">
              <i-input v-model="modelData.hlSize" placeholder=""></i-input>
            </i-form-item>
          </i-col>
          <i-col span="6">
            <i-form-item label="前轮距" prop="ljQ">
              <i-input v-model="modelData.ljQ" placeholder=""></i-input>
            </i-form-item>
          </i-col>
          <i-col span="6">
            <i-form-item label="后轮距" prop="ljH">
              <i-input v-model="modelData.ljH" placeholder=""></i-input>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row>
          <i-col span="6">
            <i-form-item label="刹车类型" prop="parkingType">
              <i-input v-model="modelData.parkingType" placeholder=""></i-input>
            </i-form-item>
          </i-col>
          <i-col span="6">
            <i-form-item label="行李厢容积" prop="luggage">
              <i-input v-model="modelData.luggage" placeholder=""></i-input>
            </i-form-item>
          </i-col>
          <i-col span="6">
            <i-form-item label="油箱容积" prop="tank">
              <i-input v-model="modelData.tank" placeholder=""></i-input>
            </i-form-item>
          </i-col>
          <i-col span="6">
            <i-form-item label="座位数" prop="seats">
              <i-input v-model="modelData.seats" placeholder=""></i-input>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row>
          <i-col span="12">
            <i-form-item label="车型图片" prop="modelImg">
              <input type="hidden" v-model="modelData.modelImg"/>
              <i-upload
                :format="['jpg','jpeg','png']"
                :on-success="uploadModelSuccess"
                :before-upload="uploadModelProgress"
                :on-error="uploadModelError"
                :max-size="uploadMaxSize"
                :on-format-error="handleFormatError"
                :on-exceeded-size="handleMaxSize"
                :action="$config.HTTPBASEURL+'/common/upload'"
                :show-upload-list="false">
                <div class="upload-image">
                  <div v-if="!modelData.modelImg">
                    <i-icon type="ios-cloud-upload" size="52" style="color: #3399ff"></i-icon>
                    <p>单击或拖动文件上传</p>
                    <i-spin fix v-if="modelData.fileUploading">
                      <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                      <div style="margin-top: 10px">正在上传中，请勿关闭...</div>
                    </i-spin>
                  </div>
                  <img v-else height="95" :src="modelData.modelImg" alt="">
                </div>
              </i-upload>
            </i-form-item>
          </i-col>
          <i-col span="12">
            <i-form-item
              label="备注"
              prop="tag">
              <i-input type="textarea" :rows="3" v-model="modelData.tag" placeholder=""></i-input>
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
    <pt-modal title="添加" v-model="brand.addModel" :width="600" :zIndex="200" @on-close="brand.FileUploading=false">
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
            :on-success="uploadBrandSuccess"
            :before-upload="uploadBrandProgress"
            :on-error="uploadBrandError"
            :max-size="uploadMaxSize"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            :action="$config.HTTPBASEURL+'/common/upload'"
            :show-upload-list="false">
            <div class="upload-image">
              <div v-if="!brand.addFormData.logo">
                <i-icon type="ios-cloud-upload" size="52" style="color: #3399ff"></i-icon>
                <p>单击或拖动文件上传</p>
                <i-spin fix v-if="brand.fileUploading">
                  <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                  <div style="margin-top: 10px">正在上传中，请勿关闭...</div>
                </i-spin>
              </div>
              <img v-else height="95" :src="brand.addFormData.logo" alt="">
            </div>
          </i-upload>
        </i-form-item>
        <i-form-item class="text-right">
          <i-button type="primary" @click="submitAddBrand" :loading="brand.addLoading">
            <span v-if="!brand.addLoading">提交</span>
            <span v-else>loading...</span>
          </i-button>
          <i-button type="ghost" @click="cancelBrandFun" style="margin-left: 8px">取消</i-button>
        </i-form-item>
      </i-form>
    </pt-modal>

    <!--添加子品牌、车型-->
    <pt-modal title="添加" v-model="series.addModel" :width="600" :zIndex="200" @on-close="series.FileUploading=false">
      <i-form v-if="series.addModel" ref="series.addFormData" :model="series.addFormData" label-position="left" :label-width="80">
        <i-form-item label="品牌名称" prop="brandName" :rules="{required: true, message: '品牌名称不能为空', trigger: 'blur'}">
          <i-input :readonly="true" v-model="series.addFormData.brandName" placeholder=""></i-input>
        </i-form-item>
        <i-form-item label="子品牌名称" prop="seriesGroupName" :rules="{required: true, message: '子品牌名称不能为空', trigger: 'blur'}">
          <i-input v-model="series.addFormData.seriesGroupName" placeholder=""></i-input>
        </i-form-item>
        <i-form-item label="车系名称" prop="seriesName" :rules="{required: true, message: '车系名称不能为空', trigger: 'blur'}">
          <i-input v-model="series.addFormData.seriesName" placeholder=""></i-input>
        </i-form-item>
        <i-form-item label="车系图片" prop="seriesImg">
          <input type="hidden" v-model="series.addFormData.seriesImg"/>
          <i-upload
            :format="['jpg','jpeg','png']"
            :on-success="uploadSeriesSuccess"
            :before-upload="uploadSeriesProgress"
            :on-error="uploadSeriesError"
            :max-size="uploadMaxSize"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            :action="$config.HTTPBASEURL+'/common/upload'"
            :show-upload-list="false">
            <div class="upload-image">
              <div v-if="!series.addFormData.seriesImg">
                <i-icon type="ios-cloud-upload" size="52" style="color: #3399ff"></i-icon>
                <p>单击或拖动文件上传</p>
                <i-spin fix v-if="series.fileUploading">
                  <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                  <div style="margin-top: 10px">正在上传中，请勿关闭...</div>
                </i-spin>
              </div>
              <img v-else height="95" :src="series.addFormData.seriesImg" alt="">
            </div>
          </i-upload>
        </i-form-item>
        <i-form-item class="text-right">
          <i-button type="primary" @click="submitAddSeries" :loading="series.addLoading">
            <span v-if="!series.addLoading">提交</span>
            <span v-else>loading...</span>
          </i-button>
          <i-button type="ghost" @click="cancelSeriesFun" style="margin-left: 8px">取消</i-button>
        </i-form-item>
      </i-form>
    </pt-modal>

  </div>
</template>

<script>
  import MixinData from './mixin-data';
  import MixinMethod from './mixin-method';
  import MixinBrandMethod from './mixin-mehtod-brand';
  import MixinSeriesMethod from './mixin-mehtod-series';
  import PTModal from '@/components/bs-modal';
  export default {
    name: 'carModelManage',
    mixins: [MixinData, MixinMethod, MixinBrandMethod, MixinSeriesMethod],
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
    text-align: center;
  }
</style>
