<template>
    <div class='xtx-carousel' @mouseenter="stop" @mouseleave="start">
        <!-- 轮播图 -->
        <ul class="carousel-body">
            <li class="carousel-item" v-for="(item,i) in sliders" :key="i" :class="{fade:index===i}">
                <RouterLink to="/">
                    <img :src="item.imgUrl" alt="">
                </RouterLink>
            </li>
        </ul>
        <!-- 切换按钮 -->
        <a href="javascript:;" class="carousel-btn prev"><i class="iconfont icon-angle-left"
                @click="toggle(-1)"></i></a>
        <a href="javascript:;" class="carousel-btn next"><i class="iconfont icon-angle-right"
                @click="toggle(1)"></i></a>
        <!-- 圆点 -->
        <div class="carousel-indicator">
            <span v-for="(item,i) in sliders" :key="i" :class="{active:index===i}" @click="index = i"></span>
        </div>
    </div>
</template>

<script>
import { ref, watch, onUnmounted } from 'vue'
export default {
  name: 'XtxCarousel',
  props: {
    sliders: {
      type: Array,
      default: () => []
    },
    duration: {
      type: Number,
      default: 3000
    },
    autoPlay: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    const index = ref(0)
    let timer = null
    const autoPlayFn = () => {
      clearInterval(timer)
      timer = setInterval(() => {
        index.value++
        if (index.value > props.sliders.length - 1) {
          index.value = 0
        }
      }, props.duration)
    }
    watch(() => props.sliders, (newVal) => {
      if (newVal.length && props.autoPlay) {
        index.value = 0
        autoPlayFn()
      }
    }, { immediate: true })
    const stop = () => {
      if (timer) {
        clearInterval(timer)
      }
    }
    const start = () => {
      if (props.sliders.length && props.autoPlay) {
        autoPlayFn()
      }
    }
    const startTime = ref(0)
    const toggle = (step) => {
      const now = Date.now()
      if (now - startTime.value >= 1000) {
        const newIndex = index.value + step
        if (newIndex >= props.sliders.length) {
          index.value = 0
          startTime.value = now
          return
        }
        if (newIndex < 0) {
          index.value = props.sliders.length - 1
          startTime.value = now
          return
        }
        index.value = newIndex
        startTime.value = now
      }
    }

    onUnmounted(() => {
      clearInterval(timer)
    })
    return { index, stop, start, toggle }
  }
}
</script>
<style scoped lang="less">
.xtx-carousel {
    width: 100%;
    height: 100%;
    min-width: 300px;
    min-height: 150px;
    position: relative;

    .carousel {
        &-body {
            width: 100%;
            height: 100%;
        }

        &-item {
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
            opacity: 0;
            transition: opacity 0.5s linear;

            &.fade {
                opacity: 1;
                z-index: 1;
            }

            img {
                width: 100%;
                height: 100%;
            }
        }

        &-indicator {
            position: absolute;
            left: 0;
            bottom: 20px;
            z-index: 2;
            width: 100%;
            text-align: center;

            span {
                display: inline-block;
                width: 12px;
                height: 12px;
                background: rgba(0, 0, 0, 0.2);
                border-radius: 50%;
                cursor: pointer;

                ~span {
                    margin-left: 12px;
                }

                &.active {
                    background: #fff;
                }
            }
        }

        &-btn {
            width: 44px;
            height: 44px;
            background: rgba(0, 0, 0, .2);
            color: #fff;
            border-radius: 50%;
            position: absolute;
            top: 228px;
            z-index: 2;
            text-align: center;
            line-height: 44px;
            opacity: 0;
            transition: all 0.5s;

            &.prev {
                left: 20px;
            }

            &.next {
                right: 20px;
            }
        }
    }

    &:hover {
        .carousel-btn {
            opacity: 1;
        }
    }
}
</style>
