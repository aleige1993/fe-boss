/*
 * Created by HuiyangLi on 2017/01/23.
 */
import store from '@/store';
export default {
  // 封装：“审核意见”中有“结论”时，确认弹框交互
  // 说明：
  // 仅“ApproveStatusEnum”枚举（'A':同意;'R':拒绝;'B':退回;'D':废弃;）
  // approveStatus: 结论的字段。
  // callback: 点击确定的回调。
  /*
  * 使用方法：如
  * this.$AuditPrompt.auditPromptFun(this.$data.formData.approveStatus, () => {
  *   --执行的语句--
  * });
  */
  auditPromptFun(approveStatus, callback) {
    let enumSelectData = store.getters.enumSelectData;
    let selects = enumSelectData.get('ApproveStatusEnum');
    let name = '';
    selects.map(item => {
      if (item.itemCode === approveStatus) {
        name = item.itemName;
      }
    });
    Alertify.confirm('确定要"' + name + '"吗?', (ok) => {
      if (ok) {
        callback && callback();
      }
    });
  }
};
