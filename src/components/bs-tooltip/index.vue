<template>
  <Tooltip :placement="placement">
    {{showText}}
    <span :style="'white-space:'+whiteSpace+'; width: '+width+'px; word-break:'+wordBreak" slot="content">{{tipText}}</span>
  </Tooltip>
</template>
<script>
  export default {
    name: 'tooltipWhiteSpace',
    data() {
      return {};
    },
    props: {
      showText: {
        type: String,
        required: true,
        default: '提示'
      },
      tipText: {
        type: String,
        required: true,
        default: ''
      },
      placement: {
        type: String,
        required: false,
        default: 'bottom'
      },
      width: {
        type: String,
        required: false,
        default: '200'
      },
      whiteSpace: {
        type: String,
        required: false,
        default: 'normal'
      },
      wordBreak: {
        type: String,
        required: false,
        default: 'break-all'
      }
    }
  };
</script>
<style lang="scss" scoped>
</style>
