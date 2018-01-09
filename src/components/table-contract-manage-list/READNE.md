### BOSS后台管理系统模态框VUE组件 -- 签约管理合同制作/复核/签署确认 通用表单(仅适用于签约管理中“合同制作/复核/签署确认”)
----------------------------------
#### props

- taskNode : 当前环节：String  是否必须： 是  默认值："6"
  > 6: 合同制作
  > 7: 合同复核
  > 8: 合同签署确认

#### 范例

- template:

```
<page-contract-list :taskNode="'6'"></page-contract-list>
```

- js:

```
import pageContractList from '@/components/table-contract-manage-list';
export default {
  components: {
    pageContractList
  }
}
```
