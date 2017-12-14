### BOSS后台管理系统车型车系选择VUE组件

#### props

- currBrand : 当前品牌 类型：String  是否必须： 否；  不传则不做默认选中
- currSeries : 当前车系 类型：String  是否必须： 否；  不传则不做默认选中
- currMode : 当前品牌 类型：String  是否必须： 否；  不传则不做默认选中

#### 事件

- on-change : 选择了地址后的回掉，

    接受参数：car -- 选择后的地址信息 类型--Object，包含的属性如下
    
    ~~~
      car.brandCode; // 车品牌code
      car.brandName; // 品牌 名称
      car.seriesCode; // 车系code
      car.seriesName; // 车系名称
      car.modelCode; // 型号code
      car.modelName; // 型号名称
    ~~~

#### 范例
~~~
<bs-carpicker :currBrand="'奥迪'"
    :currSeries="‘A6’"
    :currMode="'2017款'"
    @on-change="selectCar"></bs-carpicker>
...
import BsCarpicker from '@/components/bs-carpicker';
export default {
    data() {
        return {};
    },
    methods: {
        selectCar(car) {
          this.$data.formData.car.brandCode = distance.brandCode;
          this.$data.formData.car.brandName = distance.brandName;
          this.$data.formData.car.seriesCode = distance.seriesCode;
          this.$data.formData.car.seriesName = distance.seriesName;
          this.$data.formData.car.modelCode = distance.modelCode;
          this.$data.formData.car.modelName = distance.modelName;
        }
    },
    components: {
        BsCarpicker
    }
}

~~~