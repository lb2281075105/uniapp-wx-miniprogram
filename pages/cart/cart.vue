<template>

	<view class="cart-container" v-if="cart.length !== 0">
		<my-address></my-address>

		<view class="cart-title">
			<uni-icons type="shop" size="18"></uni-icons>
			<text class="cart-right-title">购物车</text>
		</view>

		<uni-swipe-action>
			<block v-for="(item,i) in cart" :key="i">
				<uni-swipe-action-item class="goods-list" :right-options="options" @click="onClick(item)">
					<my-goods :goods="item" :showRadio="true" :showNumberBox="true" @radio-change="radioCahngeHandler"
						@numChangeHandler="countChangeHandler"></my-goods>
				</uni-swipe-action-item>
			</block>
		</uni-swipe-action>
		<my-settle></my-settle>
	</view>
	<view v-else class="placeholder">
		<image src="/static/cart_empty@2x.png" mode="" class="placeholder-image" />
		<view class="placeholder-title">空空如也</view>
	</view>
</template>

<script>
	import badge from '@/mixins/tabbar-badge.js'
	import {
		mapState,
		mapMutations,
	} from 'vuex'
	export default {
		mixins: [badge],
		computed: {
			...mapState('m_cart', ['cart'])
		},
		data() {
			return {
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#C00000'
					}
				}]
			};
		},
		methods: {
			...mapMutations('m_cart', ['updateCartStorage', 'updateCartCountStorage', 'removeCartCountStorage']),
			radioCahngeHandler(goods) {
				this.updateCartStorage(goods)
			},
			countChangeHandler(goods) {
				this.updateCartCountStorage(goods)
			},
			onClick(item) {
				this.removeCartCountStorage(item)
			}
		}
	}
</script>

<style lang="scss">
	.cart-container {
		padding-bottom: 50px;
	}

	.cart-title {
		height: 40px;
		border-bottom: 1px solid #efefef;
		display: flex;
		align-items: center;
		padding-left: 10px;

		.cart-right-title {
			margin-left: 10px;
			font-size: 13px;

		}
	}

	.placeholder {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.placeholder-image {
		margin-top: 150px;
		width: 80px;
		height: 80px;
	}

	.placeholder-title {
		font-size: 12px;
		margin-top: 10px;
	}
</style>
