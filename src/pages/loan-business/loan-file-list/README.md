### BOSS后台管理系统模态框VUE组件

#### props

- data : 文件列表 类型：Array  是否必须： 是
- title ：当前文件组的标题 类型 String  是否必须： 否  默认值：‘标题’

#### 事件
- on-add : 上传的回调
- on-remove : 删除的回调  
#### 范例
~~~
<pt-modal title="添加产品" @on-close="modalClose" v-model="showAddModal" :width="600" :zIndex="200">
  <!--下面是slot内容-->
  <Form ref="formValidate" label-position="left" :label-width="80">
    <FormItem label="姓名" prop="name">
        <Input placeholder="请输入姓名"></Input>
    </FormItem>
    <FormItem label="邮箱" prop="mail">
        <Input placeholder="请输入邮箱"></Input>
    </FormItem>
    <FormItem class="text-right">
        <Button type="primary">提交</Button>
        <Button type="ghost" style="margin-left: 8px">重置</Button>
    </FormItem>
  </Form>
</pt-modal>
~~~
