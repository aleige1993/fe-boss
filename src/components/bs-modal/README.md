### BOSS后台管理系统模态框VUE组件

#### props

- v-model : 显示或者隐藏模态框 类型：Boolean  是否必须： 是
- title ： 模态框的标题 类型 String  是否必须： 否  默认值：‘标题’
- width : 模态框的宽度 类型 Number 是否必须：否 默认值：520
- zIndex : 如果一页组件（页面）中含有多个模态框，通过此属性设置各个模态框的层级关系 类型 Number 是否必须：否 默认值：100
- slot ： 模态框主体内容
#### 范例
~~~
<pt-modal title="添加产品" v-model="showAddModal" :width="600" :zIndex="200">
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
