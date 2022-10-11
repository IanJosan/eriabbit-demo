<template>
    <div class="xtx-city" ref="target">
        <div class="select" @click="toggleDialog" :class="{active}">
            <span v-if="!fullLocation" class="placeholder">{{placeholder}}</span>
            <span v-else class="value">{{fullLocation}}</span>
            <i class="iconfont icon-angle-down"></i>
        </div>
        <div class="option" v-if="active">
            <div v-if="loading" class="loading"></div>
            <template v-else>
                <span @click="changeItem(item)" class="ellipsis" v-for="item in currList" :key="item.code">{{item.name}}</span>
            </template>
        </div>
    </div>
</template>
<script>
import { ref, computed, reactive } from 'vue'
import { onClickOutside } from '@vueuse/core'
import axios from 'axios'
export default {
  name: 'XtxCity',
  props: {
    fullLocation: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: '请选择配送地址'
    }
  },
  setup (props, { emit }) {
    // 控制展开收起,默认收起
    const active = ref(false)
    const allCityData = ref([])
    const loading = ref(false)
    const openDialog = () => {
      active.value = true
      // 此时获取地区
      loading.value = true
      getCityData().then(data => {
        allCityData.value = data
        loading.value = false
      })
      for (const key in changeResult) {
        changeResult[key] = ''
      }
    }
    const closeDialog = () => {
      active.value = false
    }
    // 切换展开收起
    const toggleDialog = () => {
      if (active.value) closeDialog()
      else openDialog()
    }
    // 点击其他位置隐藏
    const target = ref(null)
    onClickOutside(target, () => {
      closeDialog()
    })
    // 计算属性 当前显示地区数组
    const currList = computed(() => {
      // 默认省级
      let list = allCityData.value
      if (changeResult.provinceCode && changeResult.provinceName) {
        list = list.find(p => p.code === changeResult.provinceCode).areaList
      }
      if (changeResult.cityCode && changeResult.cityName) {
        list = list.find(c => c.code === changeResult.cityCode).areaList
      }
      return list
    })
    // 定义选择的省市区
    const changeResult = reactive({
      provinceCode: '',
      provinceName: '',
      cityCode: '',
      cityName: '',
      countyCode: '',
      countyName: '',
      fullLocation: ''
    })
    // 当点击地区按钮时记录
    const changeItem = (item) => {
      if (item.level === 0) {
        // 省
        changeResult.provinceCode = item.code
        changeResult.provinceName = item.name
      }
      if (item.level === 1) {
        changeResult.cityCode = item.code
        changeResult.cityName = item.name
      }
      if (item.level === 2) {
        changeResult.countyCode = item.code
        changeResult.countyName = item.name
        changeResult.fullLocation = `${changeResult.provinceName} ${changeResult.cityName} ${changeResult.countyName}`
        closeDialog()
        emit('change', changeResult)
      }
    }
    return { active, toggleDialog, target, loading, currList, changeItem }
  }
}
// 获取省份函数
const getCityData = () => {
  return new Promise((resolve, reject) => {
    if (window.cityData) {
      resolve(window.cityData)
    } else {
      const url = 'https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json'
      axios.get(url).then(res => {
        // 缓存
        window.cityData = res.data
        resolve(res.data)
      })
    }
  })
}
</script>
<style scoped lang="less">
.xtx-city {
    display: inline-block;
    position: relative;
    z-index: 400;

    .select {
        border: 1px solid #e4e4e4;
        height: 30px;
        padding: 0 5px;
        line-height: 28px;
        cursor: pointer;

        &.active {
            background: #fff;
        }

        .placeholder {
            color: #999;
        }

        .value {
            color: #666;
            font-size: 12px;
        }

        i {
            font-size: 12px;
            margin-left: 5px;
        }
    }

    .option {
        width: 542px;
        border: 1px solid #e4e4e4;
        position: absolute;
        left: 0;
        top: 29px;
        background: #fff;
        min-height: 30px;
        line-height: 30px;
        display: flex;
        flex-wrap: wrap;
        padding: 10px;

        >span {
            width: 130px;
            text-align: center;
            cursor: pointer;
            border-radius: 4px;
            padding: 0 3px;

            &:hover {
                background: #f5f5f5;
            }
        }

        .loading {
            height: 290px;
            width: 100%;
            background: url(../../assets/images/loading.gif) no-repeat center;
        }
    }
}
</style>
