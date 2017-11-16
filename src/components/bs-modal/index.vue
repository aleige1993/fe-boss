<template>
  <div class="pt-modal-shadow" v-bind:style="{zIndex: zIndex}" v-show="showThisModal">
    <div class="pt-modal-dialog" v-bind:style="{width: width+'px'}">
      <div class="pt-modal-title">
        <slot name="title">
          {{title || '标题'}}
          <i @click="hideCureentModal" class="iconfont icon-cha close"></i>
        </slot>
      </div>
      <div class="pt-modal-body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: '',
  data() {
    return {
      isShow: false
    };
  },
  computed: {
    showThisModal() {
      return this.isShow;
    }
  },
  props: {
    title: {
      type: String
    },
    value: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
      required: false,
      default: 520
    },
    zIndex: {
      type: Number,
      required: false,
      default: 100
    }
  },
  methods: {
    hideCureentModal() {
      this.$data.isShow = false;
    }
  },
  mounted() {
    // do something after mounting vue instance
    this.$data.isShow = this.value;
  },
  watch: {
    value(val) {
      this.$data.isShow = val;
    },
    isShow(val) {
      this.$emit('input', val);
    }
  }
};
$(function() {
  // 弹窗高度自适应
  let modelFun = function() {
    let ele = $('.pt-modal-dialog');
    ele.each(function() {
      $(this).css({
        'max-height': '90%'
      });
      let _h = $(this).height();
      $($(this).find('.pt-modal-body')[0]).css({
        'max-height': _h - 36 + 'px'
      });
    });
  };
  modelFun();
  $(window).resize(function() {
    modelFun(); // 弹窗高度自适应
  });
});
</script>
<style lang="scss" scoped>
.pt-modal-shadow{
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, .8);
  position: fixed;
  left: 0; top: 0;
  z-index: 100;
  text-align: center;
  &:before{
    content: " ";
    display: inline-block;
    height: 100%;
    width: 1px;
    vertical-align: middle;
  }
}
.pt-modal-dialog{
  width: 520px;
  background-color: #fff;
  min-height: 200px;
  max-height: 90%;
  overflow: hidden;
  display: inline-block;
  vertical-align: middle;
  box-shadow: 5px 5px 16px rgba(97, 92, 92, .35);
  border-radius: 4px;
  animation-name: zoomFadeIn;
  animation-duration: .3s;
  animation-timing-function: ease-in;
  .pt-modal-title{
    height: 36px;
    line-height: 36px;
    padding: 0 10px;
    @include gradient-bg;
    color: #fff;
    text-align: left;
    position: relative;
    font-size: 14px;
    letter-spacing: 1px;
    font-weight: bold;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    i.close{
      color: #fff;
      position: absolute;
      right: 10px;
      top: 3px;
      font-size: 18px;
      cursor: pointer;
      font-weight: 500;
      transition: all .5s;
      line-height: 1;
    }
  }
  .pt-modal-body{
    position: relative;
    overflow-y: auto;
    padding: 20px 40px;
    text-align: left;
  }
}
@keyframes zoomFadeIn {
  0%{
    transform: scale(.9);
    opacity: 0
  }
  100% {
    transform: scale(1);
    opacity: 1
  }
}
</style>
