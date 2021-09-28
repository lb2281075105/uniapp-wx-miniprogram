<template>
	<!-- 并不是小程序里面全部使用rpx,固定的宽度和高度使用px -->
  <view class="scroll-view-container">
    <view class="left-scroll-view" :style="{height: wh + 'px';}">
		<view>xxx</view>
		<view>xxx</view>
		<view>xxx</view>
		<view>xxx</view>
		<view>xxx</view>
		<view>xxx</view>
		<view>xxx</view>
		<view>xxx</view>
		<view>xxx</view>
		<view>xxx</view>
		<view>xxx</view>
		<view>xxx</view>
		<view>xxx</view>
		<view>xxx</view>
		<view>xxx</view>
		<view>xxx</view>
		
	</view>
	<view class="right-scroll-view" :style="{height: wh + 'px';}">
		<view>xxx</view>
		<view>xxx</view>
		<view>xxx</view>
		<view>xxx</view>
		<view>xxx</view>
		<view>xxx</view>
		<view>xxx</view>
		<view>xxx</view>
		<view>xxx</view>
		<view>xxx</view>
		<view>xxx</view>
		<view>xxx</view>
		<view>xxx</view>
		<view>xxx</view>
		<view>xxx</view>
		<view>xxx</view>
		
	</view>
  </view>
</template>

<script>
	
  export default {
    data() {
      return {
        wh:0
      };
    },
	onLoad() {
		const systemInfo = uni.getSystemInfoSync()
		console.log(systemInfo)
	}
  }
</script>

<style lang="scss">
.scroll-view-container{
	display: flex;
	.left-scroll-view{
		width: 120px;
	}
}
</style>
