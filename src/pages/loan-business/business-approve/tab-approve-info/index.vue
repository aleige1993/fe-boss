<template>
  <div id="">
    <i-row>
      <i-col span="24">
        <i-form label-position="right" ref="busApproveForm" :model="approveData" :label-width="140">
          <bs-form-block :title="'贷款准入规则'">
            <i-table :columns="accessRuleCol" :data="approveData.accessRuleList"></i-table>
          </bs-form-block>
          <bs-form-block :title="'初审信息'">
            <i-row>
              <i-col span="8">
                <i-form-item label="网审情况">
                  <i-input v-model="approveData.firstTrialParam.netApprove"></i-input>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="电核情况">
                  <i-input v-model="approveData.firstTrialParam.telephoneApprove"></i-input>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="24">
                <div class="form-top-actions">
                  <i-button type="primary" @click="firstApproveForm = {} ; addFirstApproveModal = !addFirstApproveModal">添加初审信息</i-button>
                </div>
                <i-table :columns="firstApproveColumns" :data="approveData.firstTrialParam.creditCheckItemsList"></i-table>
              </i-col>
            </i-row>
          </bs-form-block>
          <bs-form-block :title="'用信方案'">
            <i-row>
              <i-col span="8">
                <i-form-item class="required" label="匹配产品" prop="product"
                             :rules="{required: true, message: '请选择匹配产品'}">
                  <i-select v-model="approveData.product">
                    <i-option>啊啊啊</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item class="required" label="匹配期限" prop="product"
                             :rules="{required: true, message: '请选择匹配期限'}">
                  <i-select v-model="approveData.product">
                    <i-option>啊啊啊</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item class="required" label="匹配额度" prop="product"
                             :rules="{required: true, message: '请选择匹配额度'}">
                  <i-select v-model="approveData.product">
                    <i-option>啊啊啊</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="8">
                <i-form-item class="required" label="*单笔最高授信额度" prop="product"
                             :rules="{required: true, message: '请输入单笔最高授信额度'}">
                  <i-input v-model="approveData.product">
                    <span slot="append">元</span>
                  </i-input>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item class="required" label="单户最高授信额度" prop="product"
                             :rules="{required: true, message: '请输入单户最高授信额度'}">
                  <i-input v-model="approveData.product">
                    <span slot="append">元</span>
                  </i-input>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item class="required" label="审批额度" prop="product"
                             :rules="{required: true, message: '请输入审批额度'}">
                  <i-input v-model="approveData.product">
                    <span slot="append">元</span>
                  </i-input>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="8">
                <i-form-item class="required" label="还款方式" prop="product"
                             :rules="{required: true, message: '请输入还款方式'}">
                  <i-input v-model="approveData.product">
                    <span slot="append">元</span>
                  </i-input>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item class="required" label="我方名义利率" prop="product"
                             :rules="{required: true, message: '请输入我方名义利率'}">
                  <i-input v-model="approveData.product">
                    <span slot="append">%/年</span>
                  </i-input>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item class="required" label="我方实际利率" prop="product"
                             :rules="{required: true, message: '请输入我方实际利率'}">
                  <i-input v-model="approveData.product">
                    <span slot="append">%/年</span>
                  </i-input>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="8">
                <i-form-item class="required" label="放款方式" prop="product"
                             :rules="{required: true, message: '请输入放款方式'}">
                  <i-input v-model="approveData.product">
                    <span slot="append">元</span>
                  </i-input>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item class="required" label="客户名义利率" prop="product"
                             :rules="{required: true, message: '请输入客户名义利率'}">
                  <i-input v-model="approveData.product">
                    <span slot="append">%/年</span>
                  </i-input>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item class="required" label="客户实际利率" prop="product"
                             :rules="{required: true, message: '请输入客户实际利率'}">
                  <i-input v-model="approveData.product">
                    <span slot="append">%/年</span>
                  </i-input>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="8">
                <i-form-item class="required" label="是否海乐行垫付" prop="product"
                             :rules="{required: true, message: '请选择是否海乐行垫付'}">
                  <i-select v-model="approveData.product">
                    <i-option value="1">是</i-option>
                    <i-option value="1">否</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item class="required" label="贷款用途" prop="product"
                             :rules="{required: true, message: '请选择贷款用途' }">
                  <i-select v-model="approveData.product">
                    <i-option>啊啊啊</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item class="required" label="GPS数量" prop="product"
                             :rules="{required: true, message: '请输入GPS数量'}">
                  <i-input v-model="approveData.product"></i-input>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="16">
                <i-form-item class="required" label="风控措施" prop="product"
                             :rules="{required: true, message: '请输入风控措施'}">
                  <i-input type="textarea" :rows="4" v-model="approveData.product"></i-input>
                </i-form-item>
              </i-col>
            </i-row>
          </bs-form-block>
          <bs-form-block :title="'费用收取方案'">
            <i-table :columns="feeMethodCol" :data="approveData.feeMethodList"></i-table>
          </bs-form-block>
          <!--审核意见-->
          <bs-form-block title="审核意见" >
            <i-row>
              <i-col span="8">
                <i-form-item label="结论">
                  <i-radio-group v-model="approveData.creditAuditParam.approveStatus">
                    <i-radio label="A">通过</i-radio>
                    <i-radio label="R">拒绝</i-radio>
                    <i-radio label="B">退回</i-radio>
                  </i-radio-group>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="24">
                <i-form-item label="意见信息">
                  <i-input type="textarea" v-model="approveData.creditAuditParam.opinion" :rows="4"></i-input>
                </i-form-item>
              </i-col>
            </i-row>
          </bs-form-block>
        </i-form>
      </i-col>
    </i-row>

    <!--添加初审信息的弹窗-->
    <bs-modal v-model="addFirstApproveModal" :width="520" title="添加初审信息">
      <i-form :label-width="80" ref="addFirstApproveForm" :model="firstApproveForm">
        <i-form-item label="第三方网站名称" prop="itemName"
                     :rules="{required: true, message: '请输入第三方网站名称'}">
          <i-input v-model="firstApproveForm.itemName"></i-input>
        </i-form-item>
        <i-form-item label="查询描述" prop="description"
                     :rules="{required: true, message: '请输入描述信息'}">
          <i-input type="textarea" :rows="4" v-model="firstApproveForm.description"></i-input>
        </i-form-item>
        <i-form-item label="查询结果" prop="fileUrl"
                     :rules="{required: true, message: '请上传凭证'}">
          <input type="hidden" :value="firstApproveForm.fileUrl">
          <i-upload :show-upload-list="false"
                    multiple type="drag" :on-success="uploadFirstApproveFileSuccess"
                    :action="$config.HTTPBASEURL+'/common/upload'">
            <div style="padding: 20px 0" v-if="!firstApproveForm.fileUrl || firstApproveForm.fileUrl===''">
              <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
              <p>点击选择文件或者拖放文件到这里</p>
            </div>
            <p v-else>{{firstApproveForm.fileUrl}}</p>
          </i-upload>
        </i-form-item>
        <i-form-item label="">
          <i-button @click="submitFirstApprove" style="width: 120px;" type="primary" size="large">保存</i-button>
        </i-form-item>
      </i-form>
    </bs-modal>
  </div>
</template>
<script>
  import MixinData from './mixin-data';
  import BsModel from '@/components/bs-modal';
  export default {
    name: 'businessApproveTabApproveInfo',
    mixins: [MixinData],
    data() {
      return {
        addFirstApproveModal: false,
        firstApproveForm: {
          'itemName': '',
          'fileName': '',
          'description': '',
          'fileUrl': ''
        }
      };
    },
    methods: {
      uploadFirstApproveFileSuccess(res) {
        this.$set(this.$data.firstApproveForm, 'fileUrl', res.body.url);
        // this.$data.firstApproveForm.fileUrl = res.body.url;
      },
      submitFirstApprove() {
        this.$refs['addFirstApproveForm'].validate(valid => {
          if (valid) {
            // this.$data.approveData.firstTrialParam.creditCheckItemsList.push(this.$data.firstApproveForm);
            this.$data.addFirstApproveModal = false;
          }
        });
      }
    },
    components: {
      'bs-modal': BsModel
    }
  };
</script>
<style lang="scss" scoped="">

</style>