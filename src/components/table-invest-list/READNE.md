### BOSS后台管理系统模态框VUE组件 -- 资方列表公共组件
----------------------------------
#### props

- type : 显示类型：String  是否必须： 是  默认值："page"
  > page: 显示为可编辑的功能列表显示
  > modal: 显示不可编辑的列表显示

----------------------------------
#### 事件

- on-set-row : “page”模式下才可用，单击修改按钮弹出模态框

- on-remove-row : “page”模式下才可用，单击删除按钮的交互

- on-show-userModal : “page”模式下才可用，单击“账户信息”按钮的交互

- on-row-dbclick : 双击当前行时的回调
  > 回调: 当前行数据row,index

- 使用this.$refs.tableInvestList.getPrivateCustomerList(); 执行列表刷新

----------------------------------
#### 范例

- template:

```
 <table-invest-list ref="tableInvestList" type="page" @on-row-dbclick="selectRow" @on-set-row="setListZf" @on-remove-row="removeZf" @on-show-userModal="showUser"></table-invest-list>
```

- js:

```
import TableInvestList from '@/components/table-invest-list';
export default {
  components: {
    TableInvestList
  }
}
```
