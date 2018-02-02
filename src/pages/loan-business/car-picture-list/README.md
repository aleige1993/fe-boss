### BOSS后台管理系统模态框VUE组件 -- 针对进件中添加车辆图片的组件

#### props

- isDetails : 仅为查看时不做上传 类型：Boolean  是否必须： 否
- data : 文件列表 类型：Array  是否必须： 是
* data结构规范如下：
[
  {
    carPicName: '',
    carPicUrl: ''
  },
  {
    carPicName: '',
    carPicUrl: ''
  }
]


#### 事件
- on-data-add : 上传的回调
- on-data-remove : 删除的回调


#### 范例
```javascript
import BsModal from '@/components/bs-modal';
<bs-modal :title="'上传/查看车辆图片'" v-model="seeCarPictureModal" :width="1200" @on-close="emptyCarRowPic">
      <car-picture-list
        v-if="seeCarPictureModal"
        :data="loanCarPicVOListModalData"
        @on-data-remove="carDataRomove"
        @on-data-add="carDataAdd">
      </car-picture-list>
</bs-modal>
```
