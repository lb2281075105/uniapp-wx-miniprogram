<template>
	<view>
		<!-- 最外层的容器 -->
		<view class="my-settle-container">
			<view class="jiesuan-left">
				<label class="radio">
					<radio color="#C00000" :checked="isFullCheck" @click="changFullCheck"/><text>全选</text>
				</label>
			</view>
			<view class="total">合计:<text class="total-money">¥{{checkedGoodsAmount}}</text></view>
			<view class="btn-settle">结算({{checkedCount}})</view>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapMutations
	} from 'vuex'
	export default {
		name: "my-settle",
		data() {
			return {
				
			};
		},
		filters:{
			toFixed(num){
				return Number(num).toFixed(2)
			}
		},
		methods:{
			...mapMutations('m_cart', ['qieHuanFullCheck']),
			changFullCheck(){
				this.qieHuanFullCheck(!this.isFullCheck)
			}	
		},
		computed:{
			...mapGetters('m_cart', ['checkedCount','total','checkedGoodsAmount']),
			isFullCheck(){
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
		.total-money{
			color: #C00000;
		}
		.btn-settle{
			// 最小宽度100px
			min-width: 100px;
			background-color: #C00000;
			text-align: center;
			line-height: 50px;
			color: #FFFFFF;
		}
	}
</style>
