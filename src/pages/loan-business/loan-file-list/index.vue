<template>
  <div class="loan-file-list">
    <h4 class="list-title">
      {{fileList.loanDocName}}
      <a v-if="!readonly" href="javascript:;" class="text-danger" @click.prevent="deleteGroup" >
        <i-icon type="close-circled"></i-icon>
      </a>
    </h4>
    <div class="list-files clearfix">
      <div style="margin-bottom: 10px; overflow: hidden" class="clearfix">
        <span class="pull-left" style="display: inline-block; height: 32px;line-height: 32px;">
          {{fileList.loanDocName}}是否缺少：
          <i-radio-group v-model="fileList.status" style="margin-left: 10px; position: relative; top: -4px">
            <i-radio label="1">缺少</i-radio>
            <i-radio label="0">完整</i-radio>
          </i-radio-group>
        </span>
        <i-input style="width: 300px;margin-left: 10px;" placeholder="缺少材料说明" class="pull-left" v-if="fileList.status === '1'" v-model="fileList.remark"></i-input>
      </div>
      <template v-for="(item, index) in fileList.docDetailAttachList">
        <template v-if="isImg(item.attachUrl)">
          <bs-big-img  style="float: left" :thumbWidth="128" :thumbHeight="128" :fullWidth="1280"
                       :thumb="item.attachUrl"
                       :full="item.attachUrl">
            <span class="icon-remove" slot="icon-remove" @click.stop="deleteFile(item, index)"><i-icon type="close"></i-icon></span>
          </bs-big-img>
        </template>
        <template v-else>
          <bs-file-item style="float: left" :type="getFileSuffix(item.attachUrl)" :fileUrl="item.attachUrl" :fileName="item.attachName">
            <span class="icon-remove" slot="icon-remove" @click.stop="deleteFile(item, index)"><i-icon type="close"></i-icon></span>
          </bs-file-item>
        </template>
      </template>
      <i-upload v-if="!readonly" style="display: inline-block; float: left; width:128px; margin-left: 5px; position: relative" :show-upload-list="false"
                multiple type="drag"
                :on-progress="uploading"
                :max-size="uploadMaxSize"
                :on-exceeded-size="handleMaxSize"
                :on-success="uploadFileSuccess"
                :action="$config.HTTPBASEURL+'/common/upload'">
        <div style="width: 126px;height:128px;line-height: 150px; text-align: center; border: 1px dashed #2196f3; color: #2196f3">
          <Icon type="ios-cloud-upload" size="42"></Icon>
        </div>
        <i-spin v-if="isUploading" fix></i-spin>
      </i-upload>
    </div>
  </div>
</template>
<script>
  import bus from '@/bus';
  export default {
    name: 'loanFileList',
    data() {
      return {
        isUploading: false,
        fileList: []
      };
    },
    props: {
      readonly: {
        type: Boolean,
        required: false,
        default: false
      },
      // value: String // 1 已落实 0 未落实
      value: {
        type: Object,
        required: false,
        default: {}
      }
    },
    methods: {
      deleteGroup() {
        Alertify.confirm('确定要删除当前组以及下面的所有文件吗？', ok => {
          if (ok) {
            this.$emit('on-group-remove', this.groupIndex);
          }
        });
      },
      deleteFile(file, index) {
        Alertify.confirm('确定要删除当前文件吗？', ok => {
          if (ok) {
            this.$data.fileList.docDetailAttachList.splice(index, 1);
          }
        });
      },
      uploading() {
        this.$data.isUploading = true;
        bus.$emit('loanFileUploading', true);
      },
      uploadFileSuccess(res) {
        bus.$emit('loanFileUploading', false);
        this.$data.isUploading = false;
        if (res.success) {
          let file = res.body;
          this.$data.fileList.docDetailAttachList.push({
            attachName: file.fileName,
            attachUrl: file.url
          });
        }
      },
      getFileSuffix(fileUrl) {
        if (fileUrl) {
          return fileUrl.substring(fileUrl.lastIndexOf('.') + 1);
        } else {
          return '';
        }
      },
      isImg(fileUrl) {
        let suffix = this.getFileSuffix(fileUrl);
        return suffix === 'png' || suffix === 'jpg' || suffix === 'gif' || suffix === 'jpeg' || suffix === 'bmp' || suffix === 'pic';
      }
    },
    mounted() {
      this.$data.fileList = this.value;
    },
    watch: {
      fileList(newVal, oldVal) {
        this.$emit('input', newVal);
      },
      value: {
        deep: true,
        handler(newVal, oldVal) {
          this.$data.fileList = newVal;
        }
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
    z-index: 1;
  }
</style>
