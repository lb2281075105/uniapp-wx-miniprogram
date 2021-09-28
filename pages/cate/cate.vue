<template>
	<!-- 并不是小程序里面全部使用rpx,固定的宽度和高度使用px -->
  <view class="scroll-view-container">
    <scroll-view class="left-scroll-view" scroll-y="true" :style="{height: wh + 'px'}">
		
		<block v-for="(item,i) in cateList" :key="i">
			<view :class="['left-scroll-view-item',i === active ? 'active':''] " @click="activeChange(i)">{{item.cat_name}}</view>
		</block>
	</scroll-view>
	<scroll-view class="right-scroll-view" scroll-y="true" :style="{height: wh + 'px'}">
		<view>yyy</view>
		<view>yyy</view>
		<view>yyy</view>
		<view>yyy</view>
		<view>yyy</view>
		<view>yyy</view>
		<view>yyy</view>
		<view>yyy</view>
	
	</scroll-view>
  </view>
</template>

<script>
	
  export default {
    data() {
      return {
        wh:0,
		cateList:[],
		active:0
      };
    },
	onLoad() {
		const systemInfo = uni.getSystemInfoSync()
		this.wh = systemInfo.windowHeight
		this.getCateList()
	},
	methods:{
		async getCateList(){
			const {data:res} = await uni.$http.get("/api/public/v1/categories")
			if(res.meta.status == 200){
			  this.cateList = res.message
			}else{
			  uni.$showMsg()
			}
		},
		activeChange(i){
			this.active = i
		}
	}

  }
</script>

<style lang="scss">
.scroll-view-container{
	display: flex;
	.left-scroll-view{
		width: 120px;
		.left-scroll-view-item{
			background-color: #F7F7F7;
			line-height: 60px;
			text-align: center;
			font-size: 12px;
			
			&.active{
				background-color: #FFFFFF;
				position: relative;
				&::before{
					content: ' ';
					position: absolute;
					top: 50%;
					left: 0;
					transform: translateY(-50%);
					background-color: #C00000;
					display: block;
					width: 3px;
					height: 30px;
				}		
			}
			
		}

	}
}
</style>
