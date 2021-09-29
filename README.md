# uniapp-wx-miniprogram
uniapp开发的微信小程序

vuex：弄懂mapState、mapGetters、mapMutations、mapActions

vuex进阶

一、state

1.1 引入vuex 以后，我们需要在state中定义变量，类似于vue中的data，通过state来存放状态
```
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  state: { //存放状态
    nickname:'Simba',
    age:20,
    gender:'男'
  },
  mutations: {},
  actions: {},
  modules: {}
})
```
