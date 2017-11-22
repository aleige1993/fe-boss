<template>
  <!--费用收取配置-->
<div id="conf-model-lilv">
  <div class="form-top-actions">
    <i-button @click="addModal" type="info"><i class="iconfont icon-xinzeng"></i> 新增</i-button>
  </div>
  <i-table border ref="FyTable" :columns="columns1" :data="data1"></i-table>
  <br>
  <br>
  <div class="text-right">
    <i-button type="primary" @click="formInSubmit">确认</i-button>
    <i-button type="ghost" style="margin-left: 8px" @click="formCancel">取消</i-button>
  </div>
  <pt-modal title="新增" v-model="showAdd" :width="520">
    <i-form ref="formInModel" :model="formInModel" label-position="left" :label-width="100">
      <i-form-item class="required" label="费用类型" prop="name">
        <i-select v-model="formInModel.name" placeholder="请选择">
          <i-option value="费用类型名称1">费用类型名称1</i-option>
          <i-option value="费用类型名称2">费用类型名称2</i-option>
          <i-option value="费用类型名称3">费用类型名称3</i-option>
          <i-option value="费用类型名称4">费用类型名称4</i-option>
        </i-select>
      </i-form-item>
      <i-form-item class="required" label="收取方式" prop="mode">
        <i-select transfer v-model="formInModel.mode" placeholder="请选择" @on-change="selpro">
          <i-option value="按比例">按比例</i-option>
          <i-option value="按固定金额">按固定金额</i-option>
        </i-select>
      </i-form-item>
      <i-form-item class="required" label="收支方向" prop="direction">
        <i-select v-model="formInModel.direction" placeholder="请选择">
          <i-option value="收入">收入</i-option>
          <i-option value="支出">支出</i-option>
        </i-select>
      </i-form-item>
      <i-form-item class="required" label="利率标准" prop="standard" v-if="formInModel.mode === '按比例'">
        <i-input placeholder="利率标准" v-model="formInModel.standard">
          <span slot="append">%</span>
        </i-input>
      </i-form-item>
      <i-form-item class="required" label="固定金额" prop="money" v-if="formInModel.mode === '按固定金额'">
        <i-input placeholder="利率标准" v-model="formInModel.money">
          <span slot="append">元</span>
        </i-input>
      </i-form-item>
      <i-form-item class="text-right">
        <i-button type="primary" @click="formInSubmit">提交</i-button>
        <i-button type="ghost" style="margin-left: 8px" @click="formInCancel">取消</i-button>
      </i-form-item>
    </i-form>
  </pt-modal>
</div>
</template>

<script>
  import PTModal from '@/components/bs-modal';
  import MixinData from './mixin-data';
  export default {
    name: 'conf-model-feiyong',
    components: {
      'pt-modal': PTModal
    },
    mixins: [MixinData],
    async mounted() {
      const Vm = this;
      let response = await this.$http.post('/productFy', {});
      try {
        Vm.$data.data1 = response.list;
      } catch (err) {
      }
    },
    methods: {
      addModal() {
        this.$data.isAdd = true;
        this.$data.showAdd = true;   // 增删的模态框
        let FormName = 'formInModel';
        this.$refs[FormName].resetFields(); // 重置表单
      },
      setList(row) {
        this.isAdd = false;
        this.$data.showAdd = true;
        this.formInModel.name = row.name;
        this.formInModel.mode = row.mode;
        this.formInModel.direction = row.direction;
        this.formInModel.standard = row.standard;
        this.formInModel.money = row.money;
      },
      remove(index) {
        this.data1.splice(index, 1);
      },
      formInSubmit() {
        if (this.isAdd) {
          this.$data.data1.unshift({
            id: '01',
            name: this.$data.formInModel.name,
            mode: this.$data.formInModel.mode,
            direction: this.$data.formInModel.direction,
            standard: this.$data.formInModel.standard,
            money: this.$data.formInModel.money
          });
        } else {
          this.$data.data1[this.listIndex].name = this.$data.formInModel.name;
          this.$data.data1[this.listIndex].mode = this.$data.formInModel.mode;
          this.$data.data1[this.listIndex].direction = this.$data.formInModel.direction;
          this.$data.data1[this.listIndex].standard = this.$data.formInModel.standard;
          this.$data.data1[this.listIndex].money = this.$data.formInModel.money;
        }
        this.$data.showAdd = false;
      },
      formCancel() {
        this.$emit('notice-cost');// 通知其父组件执行自定义事件“notice-cost”
      },
      formInCancel() {
        this.$data.showAdd = false;
        this.$refs['formInModel'].resetFields(); // 重置表单
      },
      // 在新增状态下 下拉菜单清空相应显示的输入框
      selpro() {
        if (this.$data.isAdd) {
          this.$data.formInModel.standard = '';
          this.$data.formInModel.money = '';
        }
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
