### BOSS后台管理系统模态框VUE组件 -- 签约管理合同制作/签署确认 通用表单(仅适用于签约管理中“合同制作/签署确认”)
----------------------------------
#### props

- taskNode : 当前环节：String  是否必须： 是  默认值："6"
  > 6: 合同制作
  > 8: 合同签署确认

- status : 当前环节：String  是否必须： 是  默认值："0;1"
  > 0;1: 列表仅加载 状态为“已处理”和“未处理”的数据
  > 2: 列表仅加载 状态为“处理成功”的数据

- succeed : 针对加载已签署合同列表  是否必须： 否  默认值：false
  > false: 列表加载 “待制作合同列表” 或者 “待签署合同列表”
  > true: 列表仅加载 状态为“处理成功”的数据

#### 范例

- template:

```
<page-contract-list :taskNode="'6'" :status="'0;1'"></page-contract-list>
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
