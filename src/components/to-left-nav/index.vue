<template>
<!--点击一级菜单之后的公用页面（除首页外）-->
  <div id="toleftnavImange">
    <dl>
      <dt>
        <img src="./to-left-nav.gif" alt=">请点选左边菜单～">
      </dt>
      <dd>请点选左边菜单～</dd>
    </dl>
  </div>
</template>

<script>
  export default {
    name: 'toleftnavImange',
    data: () => ({})
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
#toleftnavImange {
  position: absolute;
  top: 90px;
  bottom: 0;
  left: 174px;
  right: 0;
  & dl {
    display: block;
    width: 240px;
    height: 260px;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    & dt {
      display: block;
      width: 240px;
      height: 240px;
      & img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    & dd {
      font-size: 14px;
      text-align: center;
      line-height: 20px;
      color: #333;
    }
  }
}
</style>
