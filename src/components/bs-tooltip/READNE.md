### BOSS后台管理系统模态框VUE组件 -- 基于iview对Toopltip重新组件（可换行，可用于table中）
----------------------------------
#### props

- showText : 鼠标没有悬浮时的显示文字：String  是否必须： 是  默认值："提示"

- tipText : 鼠标悬浮之后显示的文字：String  是否必须： 是  默认值：""

- placement : 提示框显示的位置：String  是否必须： 否  默认值："bottom"
  > placement: 参见与iview的Toopltip组件

- width : 提示框显示的宽度：String  是否必须： 否  默认值："200"

- whiteSpace : 提示框显示的文字可否换行：String  是否必须： 否  默认值："normal"
  >normal: 正常换行
  >nowrap: 不换行

- wordBreak : 提示框显示的文字强制换行：String  是否必须： 否  默认值："break-all"
  >详见CSS "word-break"属性


----------------------------------
#### 范例（用于iview的Table组件中）

- js:

```
import BsTooltip from '@/components/bs-tooltip';
export default {
  render: (h, params) => {
    return h(BsTooltip, {
      props: {
        showText: showCityNames + '',
        tipText: cityNames + '',
        placement: 'left',
        width: '200',
        wordBreak: 'break-all',
        whiteSpace: 'normal'
      }
    });
  }
}
```
