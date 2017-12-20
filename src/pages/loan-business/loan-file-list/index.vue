<template>
  <div class="loan-file-list">
    <h4 class="list-title">{{title}}</h4>
    <div class="list-files clearfix">
      <template v-for="item in data">
        <template v-if="isImg(item.fileUrl)">
          <bs-big-img  style="float: left" :thumbWidth="128" :thumbHeight="128" :fullWidth="1280"
                       :thumb="'https://gss0.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/zhidao/wh%3D600%2C800/sign=f42f163443540923aa3c6b78a268fd31/3b87e950352ac65c69a68e64f1f2b21193138a02.jpg'"
                       :full="'https://gss0.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/zhidao/wh%3D600%2C800/sign=f42f163443540923aa3c6b78a268fd31/3b87e950352ac65c69a68e64f1f2b21193138a02.jpg'">
            <span class="icon-remove" slot="icon-remove" @click.stop="deleteFile"><i-icon type="close"></i-icon></span>
          </bs-big-img>
        </template>
        <template v-else>
          <bs-file-item style="float: left" type="png" :fileUrl="item.fileUrl" :fileName="item.fileName">
            <span class="icon-remove" slot="icon-remove" @click.stop="deleteFile(item)"><i-icon type="close"></i-icon></span>
          </bs-file-item>
        </template>
      </template>

      <!--<bs-file-item style="float: left" type="gif" fileName="文件2">
        <span class="icon-remove" slot="icon-remove" @click.stop="deleteFile"><i-icon type="close"></i-icon></span>
      </bs-file-item>
      <bs-file-item style="float: left" type="zip" fileName="文件2">
        <span class="icon-remove" slot="icon-remove" @click.stop="deleteFile"><i-icon type="close"></i-icon></span>
      </bs-file-item>-->

      <i-upload style="display: inline-block; float: left; width:128px; margin-left: 5px;"
                multiple type="drag" :on-success="uploadFileSuccess"
                :action="$config.HTTPBASEURL+'/common/upload'">
        <div style="width: 128px;height:128px;line-height: 150px; text-align: center; border: 1px dashed #2196f3; color: #2196f3">
          <Icon type="ios-cloud-upload" size="42"></Icon>
        </div>
      </i-upload>
    </div>
  </div>
</template>
<script>
  import Tools from '../../../utils/Tools';
  export default {
    name: '',
    data() {
      return {};
    },
    props: {
      title: {
        type: String,
        default: '材料名称',
        required: false
      },
      data: {
        type: Array,
        required: false,
        default: []
      }
    },
    methods: {
      deleteFile(file) {
        alert(file.fileName);
        this.$emit('on-remove', file);
      },
      uploadFileSuccess(res) {
        this.$emit('on-add', res);
      },
      getFileSuffix(fileUrl) {
        return fileUrl.substring(fileUrl.lastIndexOf('.') + 1);
      },
      isImg(fileUrl) {
        let suffix = this.getFileSuffix(fileUrl);
        return suffix === 'png' || suffix === 'jpg' || suffix === 'gif' || suffix === 'jpeg' || suffix === 'bmp' || suffix === 'pic';
      }
    }
  };
</script>
<style lang="scss" scoped>
  .loan-file-list{
    border: 1px solid #ccc;
    margin-bottom: 10px;
    .list-title{
      height: 30px;
      line-height: 30px;
      font-size: 14px;
      font-weight: bold;
      background-color: #ecf4f8;
      text-align: center;
      border-bottom: 1px solid #ccc;
    }
    .list-files{
      padding: 10px;

    }
  }
  .icon-remove{
    position: absolute;
    top: -3px;
    right: 1px;
    display: inline-block;
    width: 20px;
    height: 20px;
    background-color: #f00;
    color: #fff;
    border-radius: 10px;
    text-align: center;
    line-height: 20px;
    z-index: 100;
  }
</style>