<template>
  <view>
    <!-- 最外层的容器 -->
    <view class="my-settle-container">
      <view class="jiesuan-left">
        <label class="radio">
          <radio color="#C00000" :checked="isFullCheck" @click="changFullCheck" /><text>全选</text>
        </label>
      </view>
      <view class="total">合计:<text class="total-money">¥{{checkedGoodsAmount}}</text></view>
      <view class="btn-settle" @click="sellSettle">结算({{checkedCount}})</view>
    </view>
  </view>
</template>

<script>
  import {
    mapState,
    mapGetters,
    mapMutations
  } from 'vuex'
  export default {
    name: "my-settle",
    data() {
      return {
        // 倒计时的秒数
        seconds: 3,
        // 定时器的 Id
        timer: null
      };
    },
    filters: {
      toFixed(num) {
        return Number(num).toFixed(2)
      }
    },
    methods: {
      ...mapMutations('m_cart', ['qieHuanFullCheck']),
      changFullCheck() {
        this.qieHuanFullCheck(!this.isFullCheck)
      },
      sellSettle() {
        if (!this.checkedCount) return uni.$showMsg("请选择要结算的商品")
        if (!this.addStr.length) return uni.$showMsg("请选择收货地址")
        if (!this.token) return this.delayNavigate()
      },
      // 延迟导航到 my 页面
      delayNavigate() {
          // 把 data 中的秒数重置成 3 秒
          this.seconds = 3

        // 1. 展示提示消息，此时 seconds 的值等于 3
        this.showTips(this.seconds)

        // 2. 创建定时器，每隔 1 秒执行一次
        this.timer = setInterval(() => {
          // 2.1 先让秒数自减 1
          this.seconds--
          // 2. 判断秒数是否 <= 0
          if (this.seconds <= 0) {
            // 2.1 清除定时器
            clearInterval(this.timer)

            // 2.2 跳转到 my 页面
            uni.switchTab({
              url: '/pages/my/my'
            })

            // 2.3 终止后续代码的运行（当秒数为 0 时，不再展示 toast 提示消息）
            return
          }

          this.showTips(this.seconds)
        }, 1000)
      },
      // 展示倒计时的提示消息
      showTips(n) {
        // 调用 uni.showToast() 方法，展示提示消息
        uni.showToast({
          // 不展示任何图标
          icon: 'none',
          // 提示的消息
          title: '请登录后再结算！' + n + ' 秒后自动跳转到登录页',
          // 为页面添加透明遮罩，防止点击穿透
          mask: true,
          // 1.5 秒后自动消失
          duration: 1500
        })
      }
    },
    computed: {
      ...mapGetters('m_cart', ['checkedCount', 'total', 'checkedGoodsAmount']),
      ...mapGetters('m_user', ['addStr']),
      ...mapState('m_user', ['token']),
      isFullCheck() {
        return this.total === this.checkedCount
      }

    }
  }
</script>

<style lang="scss">
  .my-settle-container {
    /* 底部固定定位 */
    position: fixed;
    bottom: 0;
    left: 0;
    /* 设置宽高和背景色 */
    width: 100%;
    height: 50px;
    background-color: #FFFFFF;
    padding-left: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 15px;

    .total-money {
      color: #C00000;
    }

    .btn-settle {
      // 最小宽度100px
      min-width: 100px;
      background-color: #C00000;
      text-align: center;
      line-height: 50px;
      color: #FFFFFF;
    }
  }
</style>
