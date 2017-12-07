export default {
  data() {
    return {
      loanColumns: [
        {
          title: '贷款材料名称',
          align: 'center',
          width: 150,
          key: 'loanName'
        },
        {
          title: '备注',
          key: 'Remark'
        },
        {
          title: '文件名',
          key: 'fileName',
          render: (h, params) => {
            return h('div', [
              h('P', {
                style: {
                  width: '80%',
                  height: '20px',
                  lineHeight: '18px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  textAlign: 'right',
                  color: '#2b90f8',
                  cursor: 'pointer'
                },
                on: {
                  click: () => {
                    window.open(params.row.fileName);
                  }
                }
              }, params.row.fileName),
              h('Upload', {
                props: {
                  action: '//jsonplaceholder.typicode.com/posts/'
                },
                style: {
                  display: 'inline-block',
                  width: '20%',
                  height: '20px',
                  lineHeight: '18px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  textAlign: 'right',
                  color: 'red',
                  cursor: 'pointer'
                },
                on: {
                  click: () => {
                    this.removeAssure($.extend({}, params.row));
                  }
                }
              }, '上传')
            ]);
          }
        }
      ],
      loanData: [
        {
          loanName: '车辆登记证',
          Remark: 'asdawdasd',
          fileName: ''
        },
        {
          loanName: '车辆登记证',
          Remark: 'ASDA98754aSDASD61568',
          fileName: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1512640505404&di=7eaacd3a7c04c6969d5e52a5bce557b7&imgtype=0&src=http%3A%2F%2Fimg5.duitang.com%2Fuploads%2Fitem%2F201302%2F16%2F20130216185910_x5S3T.jpeg'
        }
      ]
    };
  }
};
