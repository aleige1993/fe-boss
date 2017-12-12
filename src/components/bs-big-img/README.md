### boss图片点击放大组件

#### props

- thumb : 显示的图片的地址 类型：String  是否必须： 是
- full ： 大图图片地址 类型 String  是否必须： 是
- thumb-width : 显示的图片的宽度 类型 Number 是否必须：否 默认值：图片的宽度
- thumb-height : 显示的图片的高度 类型 Number 是否必须：否 默认值：图片的高度
- full-width ： 放大的图片的宽度 类型 Number 是否必须：否 默认值：图片的宽度

### DEMO
~~~
import BsBigImg from '@/components/bs-big-img';
...
components: {
    BsBigImg
}
...
<bs-big-img v-if="formData.mbMemberDTO.certHandUrl!==''&&isFromDetail" 
    :thumb="formData.mbMemberDTO.certHandUrl"
    :showWidth="149" :showHeight="95"
    :full="formData.mbMemberDTO.certHandUrl" 
    :full-width="945" 
    :full-height="600">
</bs-big-img>

~~~