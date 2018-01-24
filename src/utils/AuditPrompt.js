/*
 * Created by HuiyangLi on 2017/01/23.
 */
import Vue from 'vue';
import store from '@/store';
export default {
  // 封装：“审核意见”中有“结论”时，确认弹框交互
  // 说明：
  // 仅“ApproveStatusEnum”枚举（'A':同意;'R':拒绝;'B':退回;'D':废弃;）
  // approveStatus: 结论的字段。
  auditPromptFun(approveStatus) {
    let enumSelectData = store.getters.enumSelectData;
    let selects = enumSelectData.get('ApproveStatusEnum');
    let name = '';
    selects.map(item => {
      if (item.itemCode === approveStatus) {
        name = item.itemName;
      }
    });
    let ret = false;
    Alertify.confirm('确定要"' + name + '"吗?', (ok) => {
      if (ok) {
        ret = true;
      } else {
        ret = false;
      }
    });
    return ret;
  }
};
