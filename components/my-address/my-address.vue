<template>
	<view>
		<view class="address-box" v-if="JSON.stringify(address) === '{}'">
			<button type="primary" size="mini" @click="chooseAddress">请选择收货地址+</button>
		</view>

		<view class="address-info-box" v-else @click="chooseAddress">
			<view class="row1">
				<view class="row1-left">收货人：<text>{{address.userName}}</text></view>
				<view class="row1-right">
					<view class="row1-phone">电话：{{address.telNumber}}</view>
					<uni-icons type="arrowright" size="16"></uni-icons>
				</view>
			</view>
			<view class="row2">
				<view class="row2-left">收货地址：</view>
				<view class="row2-right">
					{{addStr}}
				</view>
			</view>
		</view>


		<image src="/static/cart_border@2x.png" class="address-img"></image>
	</view>
</template>

<script>
	import {mapMutations,mapState,mapGetters} from 'vuex'
	export default {
		name: "my-address",
		data() {
			return {
				// address: {}
			};
		},
		methods: {
			...mapMutations('m_user', ['updateAddress']),
			// 选择收货地址
			async chooseAddress() {
				// 1. 调用小程序提供的 chooseAddress() 方法，即可使用选择收货地址的功能
				//    返回值是一个数组：第 1 项为错误对象；第 2 项为成功之后的收货地址对象
				// 解构赋值
				const [err, succ] = await uni.chooseAddress().catch(err => err)
				// 2. 用户成功的选择了收货地址
				if (err === null && succ.errMsg === 'chooseAddress:ok') {
					// 为 data 里面的收货地址对象赋值
					this.updateAddress(this.address)
				}

			}

		},
		computed:{
			...mapState('m_user', ['address']),
			...mapGetters('m_user', ['addStr'])
		}

	}
</script>

<style lang="scss">
	.address-box {
		height: 90px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.address-img {
		display: block;
		width: 100%;
		height: 5px;
	}

	.address-info-box {
		padding: 10px 5px 10px 5px;
		font-size: 12px;

		.row1 {
			display: flex;
			justify-content: space-between;

			.row1-right {
				display: flex;

			}
		}

		.row2 {
			display: flex;
			margin-top: 10px;

			.row2-left {
				white-space: nowrap;
			}

			align-items: center;
		}
	}
</style>
