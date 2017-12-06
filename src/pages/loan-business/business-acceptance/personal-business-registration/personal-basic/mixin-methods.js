export default {
  methods: {
    async getDepList() {
      let resp = await this.$http.post('/common/dept/tree', {});
      this.$data.depData = resp.body.children;
    },
    selectDep(id, row, data) {
      /*this.$data.formData.mbMemberDTO.bizDepartmentCode = data.id;
      this.$data.formData.mbMemberDTO.bizDepartmentName = data.text;
      this.$data.selectDepartmentModal = false;*/
    },
    selectEmployer(row, index) {
      console.log(row);
    }
  }
};
