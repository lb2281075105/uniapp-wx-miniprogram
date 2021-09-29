
// #ifndef VUE3
import Vue from 'vue'
import App from './App'

// @代表项目根目录
import store from '@/store/store.js'
// import store from './store/store.js' 也可以
// uni.navigateTo({
// 			  // 路由跳转 / 斜线代表项目根目录
// 		  	url:"/subpkg/goods_detail/goods_detail?goods_id=" + item.goods_id
// 		  })

Vue.config.productionTip = false

import { $http } from '@escook/request-miniprogram'
uni.$http = $http
$http.baseUrl = 'https://www.uinav.com'
$http.beforeRequest = function (options) {
  uni.showLoading({
    title: '数据加载中...',
  })
}

uni.$showMsg = function(title = '数据请求失败',duration = 1500){
  uni.showToast({
    duration,
    title,
    icon:'none'
  })
}
// 请求完成之后做一些事情
$http.afterRequest = function () {
  uni.hideLoading()
}

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif