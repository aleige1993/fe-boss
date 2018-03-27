<template>
  <bs-big-img :thumb="url" :full="url" :thumbWidth="300" :thumbHeight="200" :fullWidth="600"></bs-big-img>
</template>

<script>
import BsBigImg from '@/components/bs-big-img-2';
export default {
  data() {
    return {
      url: 'http://dev-songchedai.oss-cn-shanghai.aliyuncs.com/20180326/18032619453802100001.jpg'
    };
  },
  components: {
    BsBigImg
  }
};
</script>
<style lang="scss"></style>
