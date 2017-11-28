### BOSS后台管理系统地址选择VUE组件

#### props

- currProvinceCode : 当前省份code 类型：String  是否必须： 否；  不传则不做默认选中
- currDistrictCode : 当前区县code 类型：String  是否必须： 否；  不传则不做默认选中
- currCityCode : 当前城市code 类型：String  是否必须： 否；  不传则不做默认选中

#### 事件

- on-change : 选择了地址后的回掉，

    接受参数：distance -- 选择后的地址信息 类型--Object，包含的属性如下
    
    ~~~
      distance.provinceCode; // 省份code
      distance.provinceName; // 省份名称
      distance.districtCode; // 地区code
      distance.districtName; // 地区名称
      distance.cityCode; // 城市code
      distance.cityName; // 城市名称
    ~~~

#### 范例
~~~
<bs-dispicker :currProvinceCode="formData.mbMemberDTO.nowProvinceCode"
    :currDistrictCode="formData.mbMemberDTO.nowDistrictCode"
    :currCityCode="formData.mbMemberDTO.nowCityCode"
    @on-change="selectNowDistance"></bs-dispicker>
...
import BsDispicker from '@/components/bs-dispicker';
export default {
    data() {
        return {};
    },
    methods: {
        selectCompanyDistance(distance) {
          this.$data.formData.mbMemberWorkDTO.provinceCode = distance.provinceCode;
          this.$data.formData.mbMemberWorkDTO.provinceName = distance.provinceName;
          this.$data.formData.mbMemberWorkDTO.districtCode = distance.districtCode;
          this.$data.formData.mbMemberWorkDTO.districtName = distance.districtName;
          this.$data.formData.mbMemberWorkDTO.cityCode = distance.cityCode;
          this.$data.formData.mbMemberWorkDTO.cityName = distance.cityName;
        }
    },
    components: {
        BsDispicker
    }
}

~~~