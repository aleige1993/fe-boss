export default {
  data() {
    return {
      columns1: [
        {
          title: '资方编号',
          width: 200,
          align: 'center',
          key: 'capitalNo'
        },
        {
          title: '资方名称',
          key: 'capitalName'
        },
        {
          title: '状态',
          key: 'status'
        }
      ],
      columnsFeatureActionColumns: [
        {
          title: '操作',
          key: 'action',
          width: 220,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.$emit('on-set-row', $.extend({}, params.row));
                  }
                }
              }, '修改'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    let jumpPage = this.$JumpPage.getPageRemove(this.$data.currentPage, this.$data.pageSize, this.$data.total);
                    this.$emit('on-remove-row', $.extend({}, params.row), jumpPage);
                  }
                }
              }, '删除'),
              h('Button', {
                props: {
                  type: 'success',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.$emit('on-show-userModal', $.extend({}, params.row));
                  }
                }
              }, '账户信息')
            ]);
          }
        }
      ],
      data1: []
    };
  }
};
