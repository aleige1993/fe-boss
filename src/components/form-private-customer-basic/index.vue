<template>
  <div class="" style="position: relative">
    <i-row>
      <i-col span="24">
        <i-form label-position="right" :model="formData" ref="formAddCustomer" :label-width="120">
          <bs-form-block :title="'基本信息'">
            <i-row>
              <i-col span="8">
                <i-form-item :prop="'mbMemberDTO.name'" label="姓名"
                  :rules="{required: true, message: '姓名不能为空', trigger: 'blur'}">
                  <i-input :readonly="isshow" placeholder="姓名" v-model="formData.mbMemberDTO.name"></i-input>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="注册手机号" prop="mbMemberDTO.mobile"
                  :rules="{required: true, message: '手机号不能为空', trigger: 'blur'}">
                  <i-input :readonly="isFromDetail" v-model="formData.mbMemberDTO.mobile" placeholder="手机号"></i-input>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="会员类型" prop="mbMemberDTO.memberType"
                 :rules="{required: true, message: '会员类型不能为空', trigger: 'blur'}">
                  <i-select disabled v-model="formData.mbMemberDTO.memberType">
                    <i-option v-for="item in MemberType" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
            </i-row>
            <!--新增字段-->
            <i-row>
              <i-col span="8">
                <i-form-item label="社保" prop="mbMemberDTO.isSocialSecurity"
                             :rules="{required: true, message: '请选择是否购买社保', trigger: 'change'}">
                  <i-select :disabled="isFromDetail" v-model="formData.mbMemberDTO.isSocialSecurity">
                    <i-option v-for="item in enumSelectData.get('HaveNoEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}社保</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="公积金" prop="mbMemberDTO.isPublicReserveFunds"
                             :rules="{required: true, message: '请选择是否购买公积金', trigger: 'blur'}">
                  <i-select :disabled="isFromDetail" v-model="formData.mbMemberDTO.isPublicReserveFunds">
                    <i-option v-for="item in enumSelectData.get('HaveNoEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}公积金</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="信用记录" prop="mbMemberDTO.creditType"
                             :rules="{required: true, message: '请选择信用记录', trigger: 'blur'}">
                  <i-select :disabled="isFromDetail" v-model="formData.mbMemberDTO.creditType">
                    <i-option v-for="item in enumSelectData.get('CreditTypeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="8">
                <i-form-item label="证件类型" prop="mbMemberDTO.certType"
                  :rules="{required: true, message: '请选择证件类型', trigger: 'change'}">
                  <i-select :disabled="isFromDetail" v-model="formData.mbMemberDTO.certType">
                    <i-option v-for="item in enumSelectData.get('CertTypeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="证件号码" prop="mbMemberDTO.certNo"
                  :rules="{required: true, message: '证件号码不能为空', trigger: 'blur'}">
                  <i-input :readonly="isshow" v-model.lazy="formData.mbMemberDTO.certNo" @on-blur="reviseInfo"></i-input>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="证件有效期" prop="mbMemberDTO.certValidDate">
                  <!-- <i-date-picker format="yyyy-MM-dd" :readonly="isFromDetail"
                  @on-change="certValidDateChange" :value="formData.mbMemberDTO.certValidDate"
                  type="date" placeholder="Select date" style="width: 100%"></i-date-picker> -->
                  <bs-datepicker v-model="formData.mbMemberDTO.certValidDate" :readonly="false"></bs-datepicker>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="8">
                <i-form-item label="性别" prop="mbMemberDTO.sex">
                  <i-select disabled v-model="formData.mbMemberDTO.sex" placeholder="系统自动解析">
                    <i-option v-for="item in enumSelectData.get('SexEnum')"  :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="出生日期" prop="mbMemberDTO.birthday" >
                  <bs-datepicker placeholder="系统自动解析" readonly v-model="formData.mbMemberDTO.birthday"></bs-datepicker>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="年龄">
                  <i-input :readonly="true" v-model="age" placeholder="系统自动解析"></i-input>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="8">
                <i-form-item label="婚姻状况" prop="mbMemberDTO.maritalStatus"
                  :rules="{required: true, message: '请选择婚况', trigger: 'change'}">
                  <i-select :disabled="isFromDetail" v-model="formData.mbMemberDTO.maritalStatus" >
                    <i-option v-for="item in enumSelectData.get('MaritalStatusEnum')"  :key="item.itemCode" :value="item.itemCode" >{{item.itemName}}</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="教育程度" prop="mbMemberDTO.education"
                  :rules="{required: true, message: '请选择教育程度', trigger: 'change'}">
                  <i-select :disabled="isFromDetail" v-model="formData.mbMemberDTO.education">
                    <i-option v-for="item in enumSelectData.get('EducationEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="职业类型" prop="mbMemberDTO.workType">
                  <i-select :disabled="isFromDetail" v-model="formData.mbMemberDTO.workType">
                    <i-option v-for="item in enumSelectData.get('WorkTypeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="8">
                <i-form-item label="工资收入" prop="mbMemberDTO.monthRevenue"
                  :rules="{required: true, message: '收入不能为空'}">
                  <i-select :disabled="isFromDetail" v-model="formData.mbMemberDTO.monthRevenue">
                    <i-option v-for="item in enumSelectData.get('MonthRevenueEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="参加工作年限" prop="mbMemberDTO.workYears">
                  <i-select :disabled="isFromDetail" v-model="formData.mbMemberDTO.workYears">
                    <i-option v-for="item in enumSelectData.get('YearsEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="是否本地人" prop="mbMemberDTO.isNative"
                  :rules="{required: true, message: '请选择是否本地人', trigger: 'change'}">
                  <i-select :disabled="isFromDetail" v-model="formData.mbMemberDTO.isNative">
                    <i-option v-for="item in enumSelectData.get('YesNoEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="8">
                <i-form-item label="本地有否房产" prop="mbMemberDTO.isLocalHouse"
                  :rules="{required: true, message: '请选择是否本地有房产', trigger: 'change'}">
                  <i-select :disabled="isFromDetail" v-model="formData.mbMemberDTO.isLocalHouse">
                    <i-option v-for="item in enumSelectData.get('YesNoEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="本地居住年限" prop="mbMemberDTO.liveYears">
                  <i-select :disabled="isFromDetail" v-model="formData.mbMemberDTO.liveYears">
                    <i-option v-for="item in enumSelectData.get('YearsEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="住房情况" prop="mbMemberDTO.liveType"
                  :rules="{required: true, message: '请选择居住性质', trigger: 'change'}">
                  <i-select :disabled="isFromDetail" v-model="formData.mbMemberDTO.liveType">
                    <i-option v-for="item in enumSelectData.get('LiveTypeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="18">
                <i-form-item v-if="!isFromDetail" label="户籍地址" prop="mbMemberDTO.censusDistrictName"
                             :rules="{required: true, message: '请输入户籍地址', trigger: 'blur'}">
                  <input type="hidden" v-model="formData.mbMemberDTO.censusDistrictName">
                  <bs-dispicker readonly :currProvince="formData.mbMemberDTO.censusProvinceName"
                                :currDistrict="formData.mbMemberDTO.censusDistrictName"
                                :currCity="formData.mbMemberDTO.censusCityName"
                                @on-change="selectCensusDistance">
                  </bs-dispicker>
                  <i-input placeholder="街道信息" v-model="formData.mbMemberDTO.censusRoadAddr" style="width: 320px;"></i-input>
                </i-form-item>
                <i-form-item v-else label="户籍地址">
                  {{formData.mbMemberDTO.censusProvinceName}}
                  {{formData.mbMemberDTO.censusCityName}}
                  {{formData.mbMemberDTO.censusDistrictName}}
                  {{formData.mbMemberDTO.censusRoadAddr}}
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="18">
                <i-form-item v-if="!isFromDetail" label="居住地址" prop="mbMemberDTO.nowDistrictName"
                             :rules="{required: true, message: '请输入居住地址', trigger: 'blur'}">
                  <input type="hidden" v-model="formData.mbMemberDTO.nowDistrictName">
                  <bs-dispicker ref="censusDispicker" :currProvince="formData.mbMemberDTO.nowProvinceName"
                                :currDistrict="formData.mbMemberDTO.nowDistrictName"
                                :currCity="formData.mbMemberDTO.nowCityName"
                                @on-change="selectNowDistance"></bs-dispicker>
                  <i-input placeholder="街道信息" v-model="formData.mbMemberDTO.nowRoadAddr" style="width: 320px;"></i-input>
                </i-form-item>
                <i-form-item v-else label="居住地址">
                  {{formData.mbMemberDTO.nowProvinceName}}
                  {{formData.mbMemberDTO.nowCityName}}
                  {{formData.mbMemberDTO.nowDistrictName}}
                  {{formData.mbMemberDTO.nowRoadAddr}}
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="8">
                <i-form-item label="身份证正面"
                             prop="mbMemberDTO.certFrontUrl"
                             :rules="{required: true, message: '请上传身份证正面照', trigger: 'blur'}">
                  <input type="hidden" v-model="formData.mbMemberDTO.certFrontUrl"/>
                  <!--<img v-if="formData.mbMemberDTO.certFrontUrl!==''&&isFromDetail"  width="149" height="95" :src="formData.mbMemberDTO.certFrontUrl" alt="">-->
                  <bs-big-img v-if="formData.mbMemberDTO.certFrontUrl!==''&&isFromDetail" :thumb="formData.mbMemberDTO.certFrontUrl"
                              :thumbWidth="149" :thumbHeight="95"
                              :full="formData.mbMemberDTO.certFrontUrl" :full-width="945"></bs-big-img>
                  <i-upload v-else
                    :on-success="uploadFaceSuccess"
                    :on-progress="uploadFaceLoading"
                    :format="['jpg','jpeg','png']"
                    :max-size="uploadMaxSize"
                    :on-format-error="handleFormatError"
                    :on-exceeded-size="handleMaxSize"
                    :on-error="uploadError"
                    :action="$config.HTTPBASEURL+'/common/upload'" :show-upload-list="false">
                    <img v-if="formData.mbMemberDTO.certFrontUrl&&formData.mbMemberDTO.certFrontUrl!==''"  width="149" height="95" :src="formData.mbMemberDTO.certFrontUrl" alt="">
                    <idcard-placeholder v-else type="face"></idcard-placeholder>
                    <i-spin fix v-if="idcardFaceUploading"></i-spin>
                  </i-upload>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="身份证反面"
                             prop="mbMemberDTO.certBackUrl"
                             :rules="{required: true, message: '请上传身份证反面照', trigger: 'blur'}">
                  <input type="hidden" v-model="formData.mbMemberDTO.certBackUrl"/>
                  <!--<img v-if="formData.mbMemberDTO.certBackUrl!==''&&isFromDetail" width="149" height="95" :src="formData.mbMemberDTO.certBackUrl" alt="">-->
                  <bs-big-img v-if="formData.mbMemberDTO.certBackUrl!==''&&isFromDetail" :thumb="formData.mbMemberDTO.certBackUrl"
                              :thumbWidth="149" :thumbHeight="95"
                              :full="formData.mbMemberDTO.certBackUrl" :full-width="945"></bs-big-img>
                  <i-upload v-else :on-success="uploadBackSuccess"
                                    :on-progress="uploadBackLoading"
                                    :max-size="uploadMaxSize"
                                    :on-format-error="handleFormatError"
                                    :on-exceeded-size="handleMaxSize"
                                    :format="['jpg','jpeg','png']"
                                    :action="$config.HTTPBASEURL+'/common/upload'" :show-upload-list="false">
                    <img v-if="formData.mbMemberDTO.certBackUrl&&formData.mbMemberDTO.certBackUrl!==''" width="149" height="95" :src="formData.mbMemberDTO.certBackUrl" alt="">
                    <idcard-placeholder v-else type="back"></idcard-placeholder>
                    <i-spin fix v-if="idcardBackUploading"></i-spin>
                  </i-upload>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="手持身份证"
                             prop="mbMemberDTO.certHandUrl"
                             :rules="{required: true, message: '请上传手持身份证照', trigger: 'blur'}">
                  <input type="hidden" v-model="formData.mbMemberDTO.certHandUrl"></input>
                  <!--<img v-if="formData.mbMemberDTO.certHandUrl!==''&&isFromDetail" width="149" height="95" :src="formData.mbMemberDTO.certHandUrl" alt="">-->
                  <bs-big-img v-if="formData.mbMemberDTO.certHandUrl!==''&&isFromDetail" :thumb="formData.mbMemberDTO.certHandUrl"
                              :thumbWidth="149" :thumbHeight="95"
                              :full="formData.mbMemberDTO.certHandUrl" :full-width="945">
                  </bs-big-img>
                  <i-upload v-else :on-success="uploadHandSuccess"
                  :on-progress="uploadHandLoading"
                  :format="['jpg','jpeg','png']"
                  :max-size="uploadMaxSize"
                  :on-format-error="handleFormatError"
                  :on-exceeded-size="handleMaxSize"
                  :action="$config.HTTPBASEURL+'/common/upload'" :show-upload-list="false">
                    <img v-if="formData.mbMemberDTO.certHandUrl&&formData.mbMemberDTO.certHandUrl!==''" width="149" height="95" :src="formData.mbMemberDTO.certHandUrl" alt="">
                    <idcard-placeholder v-else type="hand"></idcard-placeholder>
                    <i-spin fix v-if="idcardHandUploading"></i-spin>
                  </i-upload>
                </i-form-item>
              </i-col>
            </i-row>
          </bs-form-block>
          <!--配偶信息-->
          <!--<bs-form-block :title="'配偶信息'" v-if="formData.mbMemberDTO.maritalStatus==='1'">-->
          <bs-form-block :title="'配偶信息'" v-if="formData.mbMemberDTO.maritalStatus === '1' && formData.memberSpouseInfoDTO">
            <i-row>
              <i-col span="8">
                <i-form-item prop="memberSpouseInfoDTO.spoName" label="配偶姓名"
                             :rules="{required: true, message: '姓名不能为空', trigger: 'blur'}">
                  <i-input :readonly="isFromDetail" placeholder="姓名" v-model="formData.memberSpouseInfoDTO.spoName"></i-input>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item prop="memberSpouseInfoDTO.spoIdCard" label="身份证号"
                             :rules="{required: true, message: '身份证号不能为空', trigger: 'blur'}">
                  <i-input :readonly="isFromDetail" placeholder="身份证" v-model="formData.memberSpouseInfoDTO.spoIdCard"></i-input>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item prop="memberSpouseInfoDTO.spoPhone" label="手机号"
                             :rules="{required: true, message: '手机号不能为空', trigger: 'blur'}">
                  <i-input :readonly="isFromDetail" placeholder="手机号" v-model="formData.memberSpouseInfoDTO.spoPhone"></i-input>
                </i-form-item>
              </i-col>
            </i-row>
          </bs-form-block>
          <!--工作信息 职业类型不是自由职业者时才需要-->
          <bs-form-block v-if="formData.mbMemberDTO.workType !== '2'" :title="'工作信息'">
            <i-row>
              <!--<i-col span="8">-->
                <!--<i-form-item label="单位名称"-->
                             <!--prop="mbMemberWorkDTO.companyName"-->
                             <!--:rules="{required: true, message: '请选择单位', trigger: 'change'}">-->
                  <!--<i-input :readonly="true" v-model="formData.mbMemberWorkDTO.companyName">-->
                    <!--<i-button v-if="!isFromDetail" type="primary" @click="showSelectCompany=!showSelectCompany" slot="append">选择公司 <Icon type="ios-more"></Icon></i-button>-->
                  <!--</i-input>-->
                <!--</i-form-item>-->
              <!--</i-col>-->
              <i-col span="8">
                <i-form-item label="单位名称"
                             prop="mbMemberWorkDTO.companyName"
                             :rules="{required: true, message: '单位名称不能为空', trigger: 'blur'}">
                  <i-input :readonly="isFromDetail" v-model="formData.mbMemberWorkDTO.companyName"/>
                </i-form-item>
              </i-col>
              <!--<i-col span="8">-->
                <!--<i-form-item label="统一社会信用代码"-->
                             <!--prop="mbMemberWorkDTO.creditCode"-->
                             <!--:rules="{required: true, message: '统一社会信用代码不能为空', trigger: 'blur'}">-->
                  <!--<i-input :readonly="isFromDetail" v-model="formData.mbMemberWorkDTO.creditCode"/>-->
                <!--</i-form-item>-->
              <!--</i-col>-->
              <i-col span="8">
                <i-form-item label="单位性质"
                             prop="mbMemberWorkDTO.unitType"
                             :rules="{required: true, message: '请选择单位性质', trigger: 'blur'}">
                  <input v-model="formData.mbMemberWorkDTO.unitType" type="hidden"/>
                  <!--<i-input :readonly="true" :value="enumCode2Name(formData.mbMemberWorkDTO.unitType, 'UnitTypeEnum')" placeholder="自动带入"></i-input>-->
                  <i-select :disabled="isFromDetail" v-model="formData.mbMemberWorkDTO.unitType" placeholder="公司性质">
                    <i-option v-for="item in enumSelectData.get('UnitTypeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="职务" prop="mbMemberWorkDTO.duty"
                             :rules="{required: true, message: '请选择职务', trigger: 'change'}">
                  <i-select :disabled="isFromDetail" v-model="formData.mbMemberWorkDTO.duty">
                    <i-option v-for="item in enumSelectData.get('DutyEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
              <!--<i-col span="8">-->
                <!--<i-form-item label="行业类别"-->
                             <!--prop="mbMemberWorkDTO.industryType"-->
                             <!--:rules="{required: true, message: '请选择行业类别', trigger: 'blur'}">-->
                  <!--<input  v-model="formData.mbMemberWorkDTO.industryType" type="hidden" />-->
                  <!--&lt;!&ndash;<i-input :readonly="true" :value="enumCode2Name(formData.mbMemberWorkDTO.industryType, 'IndustryTypeEnum')" placeholder="自动带入"></i-input>&ndash;&gt;-->
                  <!--<i-select :disabled="isFromDetail" v-model="formData.mbMemberWorkDTO.industryType">-->
                    <!--<i-option v-for="item in enumSelectData.get('IndustryTypeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>-->
                  <!--</i-select>-->
                <!--</i-form-item>-->
              <!--</i-col>-->
            </i-row>
            <i-row>
              <!--<i-col span="8">-->
                <!--&lt;!&ndash;<i-form-item label="入职时间">&ndash;&gt;-->
                  <!--&lt;!&ndash;<bs-datepicker :readonly="isFromDetail" v-model="formData.mbMemberWorkDTO.joinDate"></bs-datepicker>&ndash;&gt;-->
                <!--&lt;!&ndash;</i-form-item>&ndash;&gt;-->
              <!--</i-col>-->
              <!--<i-col span="8">-->
                <!--&lt;!&ndash;<i-form-item label="所属部门">&ndash;&gt;-->
                  <!--&lt;!&ndash;<i-input :readonly="isFromDetail" v-model="formData.mbMemberWorkDTO.department"></i-input>&ndash;&gt;-->
                <!--&lt;!&ndash;</i-form-item>&ndash;&gt;-->
              <!--</i-col>-->
            </i-row>
            <i-row>
              <!--<i-col span="8">-->
                <!--<i-form-item label="月收入">-->
                  <!--<i-input :readonly="isFromDetail" v-model="formData.mbMemberWorkDTO.monthRevenue">-->
                    <!--<span v-if="formData.mbMemberWorkDTO.monthRevenue" slot="append">元</span>-->
                  <!--</i-input>-->
                <!--</i-form-item>-->
              <!--</i-col>-->
              <i-col span="8">
                <i-form-item label="单位电话"
                             prop="mbMemberWorkDTO.companyTel"
                             :rules="{required: true, message: '请输入公司电话', trigger: 'blur'}">
                  <i-input :readonly="isFromDetail" v-model="formData.mbMemberWorkDTO.companyTel" placeholder=""></i-input>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="公司地址" v-if="!isFromDetail"
                             prop="mbMemberWorkDTO.roadAddr"
                             :rules="{required: true, message: '请输入公司地址', trigger: 'blur'}">
                  <!--<input type="hidden" v-model="formData.mbMemberWorkDTO.cityCode">-->
                  <!--<bs-dispicker :currProvince="formData.mbMemberWorkDTO.provinceName"-->
                  <!--:currDistrict="formData.mbMemberWorkDTO.districtName"-->
                  <!--:currCity="formData.mbMemberWorkDTO.cityName"-->
                  <!--@on-change="selectCompanyDistance">-->
                  <!--</bs-dispicker>-->
                  <i-input v-model="formData.mbMemberWorkDTO.roadAddr" placeholder="街道信息" ></i-input>
                </i-form-item>
              </i-col>
            </i-row>
            <!--<i-row>-->
              <!--<i-col span="18">-->
                <!--<i-form-item label="公司地址" v-if="!isFromDetail"-->
                             <!--prop="mbMemberWorkDTO.cityCode"-->
                             <!--:rules="{required: true, message: '请输入公司地址', trigger: 'blur'}">-->
                  <!--<input type="hidden" v-model="formData.mbMemberWorkDTO.cityCode">-->
                  <!--&lt;!&ndash;<bs-dispicker :currProvince="formData.mbMemberWorkDTO.provinceName"&ndash;&gt;-->
                                <!--&lt;!&ndash;:currDistrict="formData.mbMemberWorkDTO.districtName"&ndash;&gt;-->
                                <!--&lt;!&ndash;:currCity="formData.mbMemberWorkDTO.cityName"&ndash;&gt;-->
                                <!--&lt;!&ndash;@on-change="selectCompanyDistance">&ndash;&gt;-->
                  <!--&lt;!&ndash;</bs-dispicker>&ndash;&gt;-->
                  <!--<i-input v-model="formData.mbMemberWorkDTO.roadAddr" placeholder="街道信息" style="width: 220px;"></i-input>-->
                <!--</i-form-item>-->
                <!--&lt;!&ndash;<i-form-item v-else label="公司地址">&ndash;&gt;-->
                  <!--&lt;!&ndash;{{formData.mbMemberWorkDTO.provinceName}}&ndash;&gt;-->
                  <!--&lt;!&ndash;{{formData.mbMemberWorkDTO.cityName}}&ndash;&gt;-->
                  <!--&lt;!&ndash;{{formData.mbMemberWorkDTO.districtName}}&ndash;&gt;-->
                  <!--&lt;!&ndash;{{formData.mbMemberWorkDTO.roadAddr}}&ndash;&gt;-->
                <!--&lt;!&ndash;</i-form-item>&ndash;&gt;-->
              <!--</i-col>-->
            <!--</i-row>-->
          </bs-form-block>
          <bs-form-block v-if="type==='page'" :title="'来源信息'">
            <i-row>
              <i-col span="8">
                <i-form-item label="业务拓展部门">
                  <input type="hidden" v-model="formData.mbMemberDTO.bizDepartmentCode"/>
                  <i-input v-model="formData.mbMemberDTO.bizDepartmentName" :readonly="true" placeholder="选择客户经理">
                    <i-button @click="selectDepartmentModal=!selectDepartmentModal" v-if="!isFromDetail" slot="append">选择拓展部门 <Icon type="ios-more"></Icon></i-button>
                  </i-input>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="开始合作时间">
                  <bs-datepicker :readonly="isFromDetail" placement="top-start" v-model="formData.mbMemberDTO.joinStartDate"></bs-datepicker>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="客户经理">
                  <input type="hidden" v-model="formData.mbMemberDTO.custMgrNo"/>
                  <i-input v-model="formData.mbMemberDTO.custMgrName" :readonly="true" placeholder="选择客户经理">
                    <i-button v-if="!isFromDetail" @click="showSelectEmployer=!showSelectEmployer" slot="append">选择客户经理 <Icon type="ios-more"></Icon></i-button>
                  </i-input>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="8">
                <i-form-item label="来源渠道" prop="mbMemberDTO.sourceWay"
                   :rules="{required: true, message: '来源渠道不能为空', trigger: 'blur'}">
                  <i-select v-model="formData.mbMemberDTO.sourceWay" placeholder="来源渠道">
                    <i-option value="" style="height: 26px; color: #bbbec4">-请选择-</i-option>
                    <i-option v-for="item in enumSelectData.get('BizChannelEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
            </i-row>
          </bs-form-block>
          <i-row>
            <i-col span="24" v-if="type==='modal'" style="text-align: center">
              <i-button type="success" @click="submitBasicInfo"><i class="iconfont icon-tijiao"></i> 保存</i-button>
            </i-col>
          </i-row>
          <div class="form-footer-actions" v-if="!isFromDetail&&type!=='modal'">
            <i-button type="primary" v-if="!id" @click="saveBasicInfo"><i class="iconfont icon-tijiao"></i> 保存草稿</i-button>
            <i-button type="success" @click="submitBasicInfo"><i class="iconfont icon-tijiao"></i> 保存</i-button>
          </div>
        </i-form>
      </i-col>
    </i-row>
    <!-- 选择企业的弹窗 -->
    <bs-modal title="选择企业" :width="1200" v-model="showSelectCompany">
      <table-company-customer-list type="modal" @on-row-dbclick="selectCompanyCustomer"></table-company-customer-list>
    </bs-modal>
    <!-- 选择客户经理的弹窗 -->
    <bs-modal title="选择客户经理" :width="1200" v-model="showSelectEmployer">
      <table-employer-list @on-row-dbclick="selectEmployer"></table-employer-list>
    </bs-modal>
    <!-- 选择业务拓展部门的弹窗 -->
    <bs-modal :width="880" v-model="selectDepartmentModal" title="选择业务拓展部门">
      <tree-grid v-if="selectDepartmentModal" @on-row-dblclick="selectDep" :columns="depColumns" :data="depData"></tree-grid>
    </bs-modal>
    <i-spin size="large" fix v-if="initFormLoading"></i-spin>
  </div>
</template>
<script>
import MxinData from './mixin-data';
import MxinMethods from './mixin-methods';
import IDCardPlaceholder from '@/components/bs-idcard-placeholder';
import TableEmployerList from '@/components/table-employer-list';
import TableCompanyCustomerList from '@/components/table-company-customer-list';
import BsModal from '@/components/bs-modal';
import Tools from '@/utils/Tools';
import TreeGrid from '@/components/bs-tree-grid';
import BsDispicker from '@/components/bs-dispicker';
export default {
  name: 'formCustomerBsicInfo',
  mixins: [MxinData, MxinMethods],
  data() {
    return {
      checkoutCertNoTimer: null,
      checkingCertNo: false,
      submitLoading: false,
      isFromDetail: false,
      isshow: false,
      initFormLoading: false,
      showSelectCompany: false,
      selectDepartmentModal: false,
      showSelectEmployer: false
    };
  },
  props: {
    type: {
      default: 'page',
      required: false,
      type: String
    },
    customer: {
      default: null,
      required: false,
      type: Object
    }
  },
  computed: {
    id() {
      return this.$route.query.id;
    },
    age() {
      let birthday = this.$data.formData.mbMemberDTO.birthday;
      if (birthday === '') {
        return '';
      } else {
        return Tools.getAgeFromBirthday(birthday);
      }
    }
  },
  components: {
    'idcard-placeholder': IDCardPlaceholder,
    TableEmployerList,
    TableCompanyCustomerList,
    BsModal,
    TreeGrid,
    BsDispicker
  },
  methods: {
    selectEmployer(row, index) {
      this.$data.formData.mbMemberDTO.custMgrNo = row.userCode;
      this.$data.formData.mbMemberDTO.custMgrName = row.userName;
      this.$data.showSelectEmployer = false;
    },
    selectCompanyCustomer(row, index) {
      let companyName = row.corpName;
      let companyCode = row.corpNo;
      let companyType = row.corpType;
      let industryType = row.industryType;
      this.formData.mbMemberWorkDTO.companyName = companyName;
      this.formData.mbMemberWorkDTO.companyCode = companyCode;
      this.$data.showSelectCompany = false;
      this.formData.mbMemberWorkDTO.unitType = companyType;
      this.formData.mbMemberWorkDTO.industryType = industryType;
      this.formData.mbMemberWorkDTO.companyTel = row.telephone;
      this.formData.mbMemberWorkDTO.provinceCode = row.bizProvinceCode;
      this.formData.mbMemberWorkDTO.provinceName = row.bizProvinceName;
      this.formData.mbMemberWorkDTO.cityCode = row.bizCityCode;
      this.formData.mbMemberWorkDTO.cityName = row.bizCityName;
      this.formData.mbMemberWorkDTO.districtCode = row.bizDistrictCode;
      this.formData.mbMemberWorkDTO.districtName = row.bizDistrictName;
      this.formData.mbMemberWorkDTO.roadAddr = row.bizRoadAddr;
    },
    async initPageData() {
      this.$data.initFormLoading = true;
      try {
        let resp = await this.$http.post('/member/find', {
          memberNo: this.id
        });
        this.$data.initFormLoading = false;
        this.$data.formData = resp.body;
        if (resp.body.mbMemberDTO.workYears) {
          this.$data.formData.mbMemberDTO.workYears = this.$data.formData.mbMemberDTO.workYears + '';
        }
        if (resp.body.mbMemberDTO.liveYears) {
          this.$data.formData.mbMemberDTO.liveYears = this.$data.formData.mbMemberDTO.liveYears + '';
        }
        // this.$refs['censusDispicker'].initData();
        this.$emit('on-submit-success', resp.body);
      } catch (e) {
        this.$data.initFormLoading = false;
      }
      if (!this.$data.formData.memberSpouseInfoDTO) {
        this.$data.formData.memberSpouseInfoDTO = this.$data.memberSpouseInfoDTO;
      }
      this.reviseInfo();
    },
    async getDepList() {
      let resp = await this.$http.post('/common/dept/tree', {});
      this.$data.depData = resp.body.children;
    },
    selectDep(id, row, data) {
      this.$data.formData.mbMemberDTO.bizDepartmentCode = data.id;
      this.$data.formData.mbMemberDTO.bizDepartmentName = data.text;
      this.$data.selectDepartmentModal = false;
    },
    async reviseInfo() {
//      let _this = this;
//      $.ajax({
//        url: 'http://10.164.238.14:9093/common/user/card/info',
//        type: 'post',
//        data: {
//          idNo: _this.$data.formData.mbMemberDTO.certNo
//        },
//        success: (data) => {
//
//        }
//      });
      if (this.$data.formData.mbMemberDTO.certNo) {
        let isd = this.$data.formData.mbMemberDTO.certNo;
        let resp = await this.$http.post('/common/user/card/info', {
          'idNo': isd
        });
        let data = resp.body;
        this.$data.formData.mbMemberDTO.birthday = data.birthday;
        this.$data.formData.mbMemberDTO.sex = data.sex;
        this.$data.formData.mbMemberDTO.censusProvinceCode = data.address.censusProvinceCode;
        this.$data.formData.mbMemberDTO.censusProvinceName = data.address.censusProvinceName;
        this.$data.formData.mbMemberDTO.censusCityCode = data.address.censusCityCode;
        this.$data.formData.mbMemberDTO.censusCityName = data.address.censusCityName;
        this.$data.formData.mbMemberDTO.censusDistrictCode = data.address.censusDistrictCode;
        this.$data.formData.mbMemberDTO.censusDistrictName = data.address.censusDistrictName;
//        console.log('isd', isd);
//        console.log('resp', resp);
      }
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: '上传文件过大',
        desc: '文件  ' + file.name + ' 太大了, 上传的文件不能大于' + this.$config.UPLOAD_FILE_MAX_SIZE / 1024 + 'M.'
      });
    }
  },
  mounted() {
    let pageFrom = this.$route.query.from;
    this.$data.isshow = (pageFrom === 'modify');
    this.$data.isFromDetail = (pageFrom === 'detail');
    this.getDepList();
    // 如果有id，初始化页面数据
    if (this.id && this.type === 'page') {
      this.initPageData();
    } else {
      // 如果不是编辑，清空表单
      this.$refs['formAddCustomer'].resetFields();
      this.$data.formData.mbMemberDTO.memberType = '1';
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
