<template>
  <div id="page-table">
    <i-breadcrumb separator=">">
      <i-breadcrumb-item href="/">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/conf">配置管理</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/conf/invest">资方管理</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/conf/invest/contract">合同模板维护</i-breadcrumb-item>
      <i-breadcrumb-item>参数配置</i-breadcrumb-item>
    </i-breadcrumb>
    <div class="form-top-actions">
      <i-button type="info" @click="add"><i class="iconfont icon-xinzeng"></i> 新增</i-button>
    </div>
    <slot name="topAction"></slot>
    <i-table border :loading="dataLoading" ref="selection" @on-select="selectRow" :columns="resultCustomerColumns"
             :data="privateCustomerLoanList"></i-table>
    <div class="page-container">
      <i-page :total="total" :page-size="15" :current="currentPage" @on-change="jumpPage" size="small" show-elevator
              show-total></i-page>
    </div>
    <pt-modal :title="isAdd ? '添加' : '修改'" v-model="addModal" :width="600" :zIndex="200">
      <i-form ref="fromData" :model="fromData" label-position="left" :label-width="100">
        <!--<i-form-item label="合同编号" prop="contractTemplateName">-->
          <!--<i-input v-model="fromData.contractTemplateNo" placeholder="" readonly></i-input>-->
        <!--</i-form-item>-->
        <i-form-item label="合同名称" prop="contractTemplateName">
          <i-input v-model="fromData.contractTemplateName" placeholder="" readonly></i-input>
        </i-form-item>
        <i-form-item label="属性名称" prop="fieldName" :rules="{required: true, message: '属性名称不能为空', trigger: 'blur'}">
          <i-input v-model="fromData.fieldName" placeholder=""></i-input>
        </i-form-item>
        <i-form-item label="属性描述" prop="fieldDesc" :rules="{required: true, message: '属性描述不能为空', trigger: 'blur'}">
          <i-input v-model="fromData.fieldDesc" placeholder=""></i-input>
        </i-form-item>
        <i-form-item label="属性类型" prop="fieldType" :rules="{required: true, message: '请选择属性类型', trigger: 'blur'}">
          <i-select v-model="fromData.fieldType">
            <i-option v-for="item in settingTypeEnum" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}
            </i-option>
          </i-select>
        </i-form-item>
        <i-form-item v-show="fromData.fieldType === '1'" label="属性默认值" prop="fieldDefaultValue">
          <i-input v-model="fromData.fieldDefaultValue" placeholder=""></i-input>
        </i-form-item>
        <i-form-item v-show="fromData.fieldType === '2'" label="属性取值来源实体" prop="fieldSourceEntity">
          <i-select v-model="fromData.fieldSourceEntity" @on-change="selectFieldSourceEntity">
            <i-option v-for="item in sourceEntityEnum" :key="item.entityId" :value="item.entityId">{{item.entityName}}
            </i-option>
          </i-select>
        </i-form-item>
        <i-form-item v-show="fromData.fieldType === '2'" label="属性取值来源字段" prop="fieldSourceAttr">
          <i-select v-model="fromData.fieldSourceAttr" @on-change="selectFieldSourceAttr">
            <i-option v-for="item in sourceAttrEnum" :key="item.fieldId" :value="item.fieldId">{{item.fieldName}}
            </i-option>
          </i-select>
        </i-form-item>
        <i-form-item class="text-right">
          <i-button type="primary" @click="submitFun" :loading="buttonLoading">
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
  import PTModal from '@/components/bs-modal';
  export default {
    name: 'pageTable',
    mixins: [MixinData],
    data() {
      return {
        isAdd: true,
        addModal: false,
        dataLoading: false,
        buttonLoading: false,
        total: 0,
        currentPage: 1,
        certTypeEnum: {},
        uploadFileName: '',
        searchForm: {
          'projectNo': '',
          'toAccName': '',
          'transCardId': '',
          'btime': '',
          'etime': '',
          'status': '',
          currentPage: 1,
          pageSize: 15
        },
        fromData: {
          fieldType: ''
        },
        contractTemplateNo: this.$route.query.id, // 合同编码
        contractTemplateName: this.$route.query.name, // 合同名称
        settingTypeEnum: [], // 属性类型枚举
        sourceEntityEnum: [], // 属性取值来源实体
        sourceAttrEnum: [] // 属性取值来源字段
      };
    },
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
    },
    props: {
      type: String,
      default: 'page',
      required: false
    },
    methods: {
      selectRow(row, index) {
        this.$emit('on-row-dbclick', row, index);
      },
      jumpPage(page) {
        this.getProxyPayList(page);
      },
      search() {
        this.getProxyPayList(1);
      },
      add() {
        this.$refs['fromData'].resetFields();
        this.$data.isAdd = true;
        this.$data.addModal = true;
        this.$data.fromData.contractTemplateNo = this.$data.contractTemplateNo;
        this.$data.fromData.contractTemplateName = this.$data.contractTemplateName;
      },
//      selectFieldType() {
//        if (this.$data.fromData.fieldType === '1') {
//          this.$data.defaultValueReadonly = false;
//        } else {
//          this.$data.defaultValueReadonly = true;
//          this.$data.fromData.fieldDefaultValue = null;
//        }
//      },
      selectFieldSourceEntity() {
        let sourceArray = [];
        this.$data.sourceEntityEnum.map(item => {
          if (item.entityId === this.$data.fromData.fieldSourceEntity) {
            this.$data.fromData.entityDesc = item.entityName;
            sourceArray = item.fieldList;
          }
          return sourceArray;
        });
        this.$data.sourceAttrEnum = sourceArray;
      },
      selectFieldSourceAttr() {
        this.$data.sourceAttrEnum.map(item => {
          if (item.fieldId === this.$data.fromData.fieldSourceAttr) {
            this.$data.fromData.attrDesc = item.fieldName;
          }
        });
      },
      async getProxyPayList(page) {
        this.$data.dataLoading = true;
        if (page) {
          this.$data.searchForm.currentPage = page;
        }
//        console.log(this.$data.searchForm.currentPage);
        let resp = await this.$http.post('/cfg/contract/list', {
          templateNo: this.$data.contractTemplateNo,
          currentPage: this.$data.searchForm.currentPage,
          pageSize: this.$data.searchForm.pageSize
        });
//        console.log(JSON.stringify(resp));
        this.$data.dataLoading = false;
        this.$data.privateCustomerLoanList = resp.body.resultList;
        this.$data.currentPage = resp.body.currentPage;
        this.$data.total = resp.body.totalNum;
      },
      async getSourceList() {
        let resp = await this.$http.get('/cfg/contract/listField');
        this.sourceEntityEnum = resp.body;
//        console.log(JSON.stringify(this.sourceEntityEnum));
      },
      async submitSuccess() {
//        console.log(this.$data.fromData.entityDesc, this.$data.fromData.attrDesc);
        if (this.$data.fromData.fieldType === '1') {
          this.$data.fromData.fieldSourceEntity = '';
          this.$data.fromData.fieldSourceAttr = '';
          this.$data.fromData.entityDesc = '';
          this.$data.fromData.attrDesc = '';
        } else {
          this.$data.fromData.fieldDefaultValue = '';
        }
        this.$data.buttonLoading = true;
        let url = this.$data.isAdd ? '/cfg/contract/add' : '/cfg/contract/modify';
        let resp = await this.$http.post(url, this.$data.fromData);
        this.$data.buttonLoading = false;
        this.$data.addModal = false;
        if (resp.success) {
          let text = this.$data.isAdd ? '添加成功' : '修改成功';
          this.$Message.success(text);
          this.getProxyPayList();
        }
      },
      // 提交
      submitFun() {
        this.$refs['fromData'].validate((valid) => {
          if (valid) {
            this.submitSuccess();
          } else {
            this.$Message.error('"<span style="color: red">*</span>"必填项不能为空');
          }
        });
      },
      // 取消 按钮
      cancelFun() {
        this.$data.addModal = false;
      }
    },
    mounted() {
      this.getProxyPayList();
      this.getSourceList();
      this.$data.settingTypeEnum = [
        {
          'itemCode': '1',
          'itemName': '常量'
        },
        {
          'itemCode': '2',
          'itemName': '变量'
        }
      ];
    }
  };
</script>
<style lang="scss" scoped>
</style>
