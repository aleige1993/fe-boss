<template>
  <div class="idcard-place">
    <p class="pic">
      <img v-if="type === 'face'" src="./img/idcard-face.png" alt="">
      <img v-if="type === 'back'" src="./img/idcard-back.png" alt="">
      <img v-if="type === 'hand'" src="./img/idcard-hand.png" alt="">
    </p>
    <p class="text">点击上传照片</p>
  </div>
</template>
<script>
  export default {
    name: 'bsIDCardPlaceholder',
    data() {
      return {};
    },
    props: {
      type: {
        default: 'face',
        required: false,
        type: String
      }
    }
  };
</script>
<style lang="scss">
.idcard-place{
  width: 170px; height: 148px;
  text-align: center;
  border: 1px solid #eeedec;
  cursor: pointer;
  padding: 9px 9px;
  border-radius: 3px;
  transition: all .5s;
  &:hover{
    border: 1px solid $color-primary;
    box-shadow: 0 0 3px $color-primary;
  }
  .pic{
    width: 150px; height: 94px;
    img{
      width: 150px; height: 94px;
      border-radius: 4px;
    }
  }
  .text{
    margin-top: 15px;
    display: inline-block;
    background: url("./img/icon-pic.png") left center no-repeat;
    height: 15px;
    line-height: 15px;
    padding-left: 24px;
  }
}
</style>
