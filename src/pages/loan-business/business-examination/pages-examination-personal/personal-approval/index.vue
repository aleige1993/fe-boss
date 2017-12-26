<template>
<!--个人业务登记-审批-->
  <div id="personalApproval">
    <i-form ref="formApproval" :model="formApproval" label-position="right" :label-width="100">
      <bs-form-block :title="'审核意见'">
        <i-row>
          <i-col span="8">
            <i-form-item label="处理人" prop="name">
              <i-input v-model="formApproval.name" :readonly="true" placeholder="">
              </i-input>
            </i-form-item>
          </i-col>
          <i-col span="8">
            <i-form-item label="处理时间" prop="date">
              <i-input v-model="formApproval.date" :readonly="true" placeholder="">
              </i-input>
            </i-form-item>
          </i-col>
          <i-col span="8">
            <i-form-item label="结论" prop="conclusion" :rules="{required: true, message: '结论不能为空', trigger: 'change'}">
              <i-radio-group v-model="formApproval.conclusion">
                <i-radio v-for="item in enumSelectData.get('ApproveStatusEnum')" :label="item.itemCode" :key="item.itemCode" style="margin-right: 20px; margin-top: -5px">{{item.itemName}}</i-radio>
              </i-radio-group>
            </i-form-item>
          </i-col>
          <i-col span="24">
            <i-form-item label="意见信息" prop="opinion" :rules="{required: true, message: '意见信息不能为空', trigger: 'blur'}">
              <i-input type="textarea" v-model="formApproval.opinion" :rows="2" placeholder="">
              </i-input>
            </i-form-item>
          </i-col>
        </i-row>
      </bs-form-block>
      <bs-form-block :title="'审核历史意见'">
        <i-table :loading="examineTableLoading" border ref="examineTable" :columns="examineColumns" :data="examineData"></i-table>
      </bs-form-block>
    </i-form>
  </div>
</template>

<script>
  export default {
    name: '',
    data() {
      return {
        examineTableLoading: false,
        formApproval: {},
        examineColumns: [
          {
            title: '处理人',
            align: 'center',
            width: 150,
            key: 'name'
          },
          {
            title: '任务节点',
            key: 'taskNode'
          },
          {
            title: '开始时间',
            width: 180,
            key: 'timenStart'
          },
          {
            title: '结束时间',
            width: 180,
            key: 'timeEnd'
          },
          {
            title: '耗时',
            width: 100,
            key: 'long'
          },
          {
            title: '结论',
            width: 200,
            key: 'conclusion'
          },
          {
            title: '意见信息',
            width: 300,
            key: 'opinion'
          }
        ],
        examineData: []
      };
    },
    mounted() {
      // this.getTableList();
    },
    methods: {
      /*async getTableList() {
        this.$data.examineTableLoading = true;
        let resp = await this.$http.get('/examineData', {
          currentPage: 1
        });
        this.$data.examineTableLoading = false;
        if (resp.body.resultList.length !== 0) {
          this.$data.examineData = resp.body.resultList;
        } else {
          this.$Notice.warning({
            title: '"审核历史意见"没有数据可加载',
            duration: 2
          });
          this.$data.examineData = [];
        }
      }*/
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
