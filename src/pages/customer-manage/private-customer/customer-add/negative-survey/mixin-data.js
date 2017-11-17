export default {
  data() {
    return {
      negativeSurveyColumns: [
        {
          title: '调查时间',
          key: 'surveyDate'
        },
        {
          title: '说明',
          key: 'content'
        },
        {
          title: '录入人',
          key: 'surveyPerson'
        },
        {
          title: '录入时间',
          key: 'inputDate'
        },
        {
          title: '操作',
          key: 'action',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.remove(params.index);
                  }
                }
              }, '删除')
            ]);
          }
        }
      ],
      negativeSurveyDatas: [
        {
          surveyDate: '2017-12-25',
          content: '25645415842142151',
          surveyPerson: '中国工商银行',
          inputDate: '2017-12-25'
        }
      ]
    };
  }
};
