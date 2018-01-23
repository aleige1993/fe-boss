### BOSS后台管理系统模态框VUE组件 -- iView日期选择组件重构（将放回时间格式转换为字符串'yyyy-mm-dd',并可设置选择范围只从当日开始）

#### props

- v-model： 数据双向绑定
- isNowStart : 显示只能选择当日之后的日期 类型：Boolean  是否必须： 否

#### 范例
```
  <bs-datepicker :isNowStart="true" v-model="startDate"></bs-datepicker>
```
