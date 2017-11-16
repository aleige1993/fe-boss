### BOSS后台管理系统身份证上传前占位图

#### props

- type : 照片类型 'hand'--手持；'back'--反面；‘face’--正面 是否必须： 否  默认值：‘face’
#### 范例
~~~
<idcard-placeholder type="hand"></idcard-placeholder>
export default {
  import IDCardPlaceholder from '@/components/bs-idcard-placeholder';
  ....
  components: {
    'idcard-placeholder': IDCardPlaceholder
  }
}
~~~
