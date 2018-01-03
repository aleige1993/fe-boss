### BOSS后台管理系统模态框VUE组件 -- 放款管理-审批信息列表
----------------------------------
#### props

- requestData : 显示类型：Object  是否必须： 是  默认值：{ loan: '' }
  * loanNo: 必须有的字段
  * 格式。如:{loanNo: ''}


----------------------------------
#### 范例

- template:

```html
 <table-loan-info :requestData="{loanNo: $route.query.loanNo}"></table-loan-info>
```

- js:

```javascript
import TableLoanInfo from '@/components/table-loan-approval-info';
export default {
  components: {
    TableLoanInfo
  }
}
```
