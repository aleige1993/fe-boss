export default {
  data() {
    return {
      employerColumns: [
        {
          title: '员工编号',
          key: 'userCode'
        },
        {
          title: '姓名',
          key: 'userName'
        },
        {
          title: '手机号码',
          key: 'mobile',
          width: 150
        },
        {
          title: '部门',
          key: 'deptName'
        }
      ],
      employerList: []
    };
  }
};
