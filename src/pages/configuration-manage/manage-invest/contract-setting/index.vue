<template>
  <div id="page-table">
    <i-breadcrumb separator=">">
      <i-breadcrumb-item href="/home">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/conf">配置管理</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/conf/invest">资方管理</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/conf/invest/contract">合同模板维护</i-breadcrumb-item>
      <i-breadcrumb-item>合同属性配置</i-breadcrumb-item>
    </i-breadcrumb>
    <table-contract-list :type="'page'" ref="tableContractSetingList" @on-row-dbclick="selectRow" @on-set-row="setRow">
      <div class="form-top-actions" slot="topAction">
        <i-button type="info" @click="openAdd"><i class="iconfont icon-xinzeng"></i> 新增</i-button>
      </div>
    </table-contract-list>
    <pt-modal :title="isAdd ? '添加' : '修改'" v-model="addModal" :width="600" :zIndex="200">
      <i-form v-if="addModal" ref="fromData" :model="fromData" label-position="left" :label-width="100">
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
  import PTModal from '@/components/bs-modal';
  import tableContractList from '@/components/table-contract-setting'; // 合同属性配置列表
  export default {
    name: 'pageTable',
    data() {
      return {
        isAdd: true,
        addModal: false,
        buttonLoading: false,
        contractTemplateNo: this.$route.query.id || this.templateNo, // 合同编码
        contractTemplateName: this.$route.query.name || this.templateName, // 合同名称
        fromData: {
          fieldType: ''
        },
        settingTypeEnum: [], // 属性类型枚举
        sourceEntityEnum: [], // 属性取值来源实体
        sourceAttrEnum: [] // 属性取值来源字段
      };
    },
    components: {
      'pt-modal': PTModal,
      tableContractList
    },
    methods: {
      // 双击时的回调 （此页面用不到此功能）
      selectRow(row, index) {},
      setRow(row, index) {
        this.$data.isAdd = false;
        this.$data.addModal = true;
        this.$data.fromData = row;
      },
      openAdd() {
        this.fromData = {};
        this.$data.isAdd = true;
        this.$data.addModal = true;
        this.$data.fromData.contractTemplateNo = this.$data.contractTemplateNo;
        this.$data.fromData.contractTemplateName = this.$data.contractTemplateName;
      },
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
      // 获取 属性取值来源实体 枚举
      async getSourceList() {
        let resp = await this.$http.get('/cfg/contract/listField');
        this.sourceEntityEnum = resp.body;
        // console.log(JSON.stringify(this.sourceEntityEnum));
      },
      // 提交的ajax
      async submitSuccess() {
        // console.log(this.$data.fromData.entityDesc, this.$data.fromData.attrDesc);
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
          this.$refs.tableContractSetingList.getProxyPayList();
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
      this.getSourceList(); //属性取值来源实体枚举
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
