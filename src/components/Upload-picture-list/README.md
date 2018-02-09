### BOSS后台管理系统模态框VUE组件 -- l列表中按钮添加图片的组件

#### props

- isDetails : 仅为查看时不做上传 类型：Boolean  是否必须： 否
- picAryData : 文件列表 类型：Array  是否必须： 是
* data结构规范如下：
[
  {
    PicName: '',
    PicUrl: ''
  },
  {
    PicName: '',
    PicUrl: ''
  }
]


#### 事件
- on-data-add : 上传的回调
- on-data-remove : 删除的回调


#### 范例
```javascript
import BsModal from '@/components/bs-modal';
<bs-modal :title="'上传/查看车辆图片'" v-model="seePictureModal" :width="1200" @on-close="emptyRowPic">
      <car-picture-list
        v-if="seePictureModal"
        :picAryData="loanPicVOListModalData"
        @on-data-remove="picDataRomove"
        @on-data-add="picDataRomove">
      </car-picture-list>
</bs-modal>
```
