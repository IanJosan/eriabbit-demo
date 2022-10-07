// 扩展vue原有的功能：全局组件，自定义指令，挂载原型方法，注意：没有全局过滤器。
// 这就是插件
// vue2.0插件写法要素：导出一个对象，有install函数，默认传入了Vue构造函数，Vue基础之上扩展
// vue3.0插件写法要素：导出一个对象，有install函数，默认传入了app应用实例，app基础之上扩展

// import XtxSkeleton from './xtx-skeleton.vue'
// import XtxCarousel from './xtx-carousel.vue'
// import XtxMore from './xtx-more.vue'
// import defaultImg from '@/assets/images/200.png'
// import XtxBread from './xtx-bread.vue'
// import XtxBreadItem from './xtx-bread-item.vue'
// export default {
//   install (app) {
//     // 在app上进行扩展，app提供 component directive 函数
//     // 如果要挂载原型 app.config.globalProperties 方式
//     app.component(XtxSkeleton.name, XtxSkeleton)
//     app.component(XtxCarousel.name, XtxCarousel)
//     app.component(XtxMore.name, XtxMore)
//     app.component(XtxBread.name, XtxBread)
//     app.component(XtxBreadItem.name, XtxBread)
//     // 自定义指令
//     defineDirective(app)
//   }
// }
// const defineDirective = (app) => {
//   app.directive('lazy', {
//     mounted (el, binding) {
//       const observe = new IntersectionObserver(([{ isIntersecting }]) => {
//         if (isIntersecting) {
//           observe.unobserve(el)
//           el.onerror = () => {
//             el.src = defaultImg
//           }
//           el.src = binding.value
//         }
//       }, {
//         threshold: 0
//       })
//       observe.observe(el)
//     }
//   })
// }

// 其实就是vue插件，扩展vue功能，全局组件、指令、函数 （vue.30取消过滤器）
// 当你在mian.js导入，使用Vue.use()  (vue3.0 app)的时候就会执行install函数
// import XtxSkeleton from './xtx-skeleton.vue'
// import XtxCarousel from './xtx-carousel.vue'
// import XtxMore from './xtx-more.vue'
// import XtxBread from './xtx-bread.vue'
// import XtxBreadItem from './xtx-bread-item.vue'
//
//
//
//
// 导入library文件夹下的所有组件
// 批量导入需要使用一个函数 require.context(dir,deep,matching)
// 参数：1. 目录  2. 是否加载子目录  3. 加载的正则匹配
import defaultImg from '@/assets/images/200.png'
// console.dir(importFn.keys()) 文件名称数组
import Message from './Message'
const importFn = require.context('./', false, /\.vue$/)
export default {
  install (app) {
    // app.component(XtxSkeleton.name, XtxSkeleton)
    // app.component(XtxCarousel.name, XtxCarousel)
    // app.component(XtxMore.name, XtxMore)
    // app.component(XtxBread.name, XtxBread)
    // app.component(XtxBreadItem.name, XtxBreadItem)

    // 批量注册全局组件
    importFn.keys().forEach(key => {
      // 导入组件
      const component = importFn(key).default
      // 注册组件
      app.component(component.name, component)
    })

    // 定义指令
    defineDirective(app)
    app.config.globalProperties.$message = Message// 原型函数
  }
}

const defineDirective = (app) => {
  app.directive('lazy', {
    mounted (el, binding) {
      const observe = new IntersectionObserver(([{ isIntersecting }]) => {
        if (isIntersecting) {
          observe.unobserve(el)
          el.onerror = () => {
            el.src = defaultImg
          }
          el.src = binding.value
        }
      }, {
        threshold: 0
      })
      observe.observe(el)
    }
  })
}
