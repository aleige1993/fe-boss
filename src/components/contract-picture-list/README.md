### BOSS后台管理系统模态框VUE组件 -- 合同管理中合同列表中按钮添加图片的组件

#### props

- details : 仅为查看时不做上传 类型：Boolean  是否必须： 否
- picData : 文件列表 类型：Array  是否必须： 是
* data结构规范如下：
[
  {
    attachmentName: '',
    attachmentUrl: ''
  },
  {
    attachmentName: '',
    attachmentUrl: ''
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
        :picData="loanPicVOListModalData"
        @on-data-remove="picDataRomove"
        @on-data-add="picDataRomove">
      </car-picture-list>
</bs-modal>
```