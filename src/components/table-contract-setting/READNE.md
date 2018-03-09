### BOSS后台管理系统模态框VUE组件 -- 合同属性配置列表
----------------------------------
#### props

- type : 显示类型：String  是否必须： 是  默认值："page"
  > page: 显示为可编辑的功能列表显示
  > modal: 显示不可编辑的列表显示

- templateNo : 合同编号：String  是否必须： 否  默认值：""
  > 当 this.$route.query.id 没有值的时候，必传。即type为modal时传值

- templateName : 合同名称：String  是否必须： 否  默认值：""
  > 当 this.$route.query.name 没有值的时候，必传。即type为modal时传值

----------------------------------
#### 事件

- setRow : type为modal时，操作的修改按钮呈现，此为点击修改按钮的回调
  > 回调: 当前行数据row
- on-row-dbclick : 双击当前行时的回调
  > 回调: 当前行数据row,index

----------------------------------
#### 范例

- template:

```
<table-contract-list :type="'page'" ref="tableContractSetingList" @on-row-dbclick="selectRow" @on-set-row="setRow">
</table-contract-list>
```
或者：
```
<table-contract-list :templateNo="seeContractTemplateNo" :templateName="seeContractTemplateName" v-if="showContractSeting" :type="'modal'" ref="tableContractSetingList">
</table-contract-list>
```
- js:

```
import tableContractList from '@/components/table-contract-setting'; // 合同属性配置列表
export default {
  components: {
    tableContractList
  }
}
```
