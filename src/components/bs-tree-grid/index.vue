<template>
  <div class='gid' :id='vmId'></div>
</template>
<script>
  import TreeGrid from '../../assets/js/treeGrid/TreeGrid';
  export default {
    name: '',
    data() {
      return {
        vmId: '',
        folderOpenIcon: './static/img/folderOpen.png',
        folderCloseIcon: './static/img/folderClose.png',
        defaultLeafIcon: './static/img/defaultLeaf.gif',
        treeTable: null
      };
    },
    props: {
      columns: {
        type: Array,
        required: true
      },
      data: {
        type: Array,
        required: true
      }
    },
    methods: {
      itemDblClick(id, index, data) {
        this.$emit('on-row-dblclick', id, index, data);
      },
      generateUUID() {
        let d = new Date().getTime();
        let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          let r = (d + Math.random() * 16) % 16 | 0;
          d = Math.floor(d / 16);
          return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
      },
      initTree() {
        const vm = this;
        setTimeout(function() {
          let treeGrid = new TreeGrid({
            id: 'dg1',
            width: '800',
            renderTo: '' + vm.$data.vmId,
            headerAlign: 'left',
            headerHeight: '34',
            dataAlign: 'left',
            indentation: '20',
            folderOpenIcon: vm.$data.folderOpenIcon,
            folderCloseIcon: vm.$data.folderCloseIcon,
            defaultLeafIcon: vm.$data.defaultLeafIcon,
            hoverRowBackground: 'true',
            folderColumnIndex: '1',
            itemClick: null,
            itemDblClick: vm.itemDblClick,
            columns: vm.columns,
            data: vm.data
          });
          treeGrid.show();
          treeGrid.expandAll('N');
          vm.$data.treeTable = treeGrid;
        }, 500);
      }
    },
    watch: {
      data(val) {
        if (this.$data.treeTable) {
          this.initTree();
        }
      }
    },
    mounted() {
      let _id = `bs-treegrid-${this.generateUUID()}`;
      this.$data.vmId = _id;
      this.initTree();
    }
  };
</script>
<style>
  body{
    font-size:11px;
  }
  .TreeGrid{
    border-collapse: collapse;
    font-size: 11px;
    border: 1px solid #778899;
  }

  .TreeGrid .header{
    background-color: #87CEEB;
    font-size: 11px;
    font-weight: 600;
  }

  .TreeGrid td{
    border: 1px solid #E6E6FA;
    padding: 8px 3px 8px 3px;
  }

  .TreeGrid a{
    text-decoration: underline;
    color: black;
  }

  .TreeGrid a:hover{
    color: blue;
  }

  .TreeGrid .image_hand{
    border: 0;
    margin-right: 3px;
    position: relative;
    top: 0px;
    cursor: pointer;
    align: absmiddle;
  }

  .TreeGrid .image_nohand{
    border: 0;
    margin-right: 3px;
    cursor: pointer;
    align: absmiddle;
  }

  .TreeGrid .row_hover{
    background-color: #E6E6FA;
  }

  .TreeGrid .row_active{
    background-color: #E0FFFF;
  }

</style>
