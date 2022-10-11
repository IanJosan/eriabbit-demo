// 提供复用逻辑函数
import { useIntervalFn, useIntersectionObserver } from '@vueuse/core'
import { ref, onUnmounted } from 'vue'
import dayjs from 'dayjs'

// 数据懒加载函数
export const useLazyData = (apiFn) => {
  // 需要
  // 1. 被观察的对象
  // 2. 不同的API函数
  const target = ref(null)
  const result = ref([])
  const { stop } = useIntersectionObserver(
    target,
    ([{ isIntersecting }], observerElement) => {
      if (isIntersecting) {
        stop()
        // 调用API获取数据
        apiFn().then(data => {
          result.value = data.result
        })
      }
    },
    // 进入交界处的比值
    {
      threshold: 0
    }
  )
  // 返回--->数据（dom,后台数据）
  return { target, result }
}

export const usePayTime = () => {
  const time = ref(0)
  const timeText = ref('')
  const { pause, resume } = useIntervalFn(() => {
    time.value--
    timeText.value = dayjs.unix(time.value).format('mm分ss秒')
    console.log(time.value)
    if (time.value <= 0) {
      pause()
    }
  }, 1000, false)
  onUnmounted(() => {
    pause()
  })
  const start = (countDown) => {
    time.value = countDown
    timeText.value = dayjs.unix(time.value).format('mm分ss秒')
    resume()
  }
  return { start, timeText }
}
