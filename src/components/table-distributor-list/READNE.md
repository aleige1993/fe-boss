### BOSS后台管理系统模态框VUE组件 -- 渠道商管理列表
----------------------------------
#### props

- type : 显示类型：String  是否必须： 是  默认值："page"
  > page: 显示为可编辑的功能列表显示
  > modal: 显示不可编辑的列表显示

----------------------------------
#### 事件

- on-radio-fun : 单击当前行时的回调
  > 回调: 当前行数据row
- on-row-dbclick : 双击当前行时的回调
  > 回调: 当前行数据row,index

----------------------------------
#### 范例

- template:

```
<table-distributor-list :type="'page'" ref="tableDistributorList" @on-radio-fun="radioFun" @on-row-dbclick="selectRow">
</table-distributor-list>
```

- js:

```
import tableDistributorList from '@/components/table-distributor-list';
export default {
  components: {
    tableDistributorList
  }
}
```
