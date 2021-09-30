<template>
	<view v-if="goods_info.goods_name" class="goods-detail-container">
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular="true">
			<swiper-item v-for="(item,i) in goods_info.pics" :key="i">
				<!-- / 根目录 -->
				<image :src="item.pics_big" @click="preview(i)"></image>
			</swiper-item>
		</swiper>
		<view class="goods-info">
			<view class="goods-price">¥{{goods_info.goods_price}}</view>
			<view class="goods-body">
				<view class="goods-name">{{goods_info.goods_name}}</view>
				<view class="goods-shoucang">
					<uni-icons type="star" size="17"></uni-icons>
					<view class="goods-sc">收藏</view>
				</view>
			</view>
			<view class="goods-kd">快递：免运费</view>
		</view>
		<!-- 解决image 图片下方空白间隙 display:block就可以 -->
		<rich-text :nodes="goods_info.goods_introduce"></rich-text>
		<view class="goods-nav">
			<uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick"
				@buttonClick="buttonClick" />
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapGetters
	} from 'vuex'

	export default {
		computed: {
			...mapState('m_cart',['cart']),
			...mapGetters('m_cart',['total'])
		},
		watch:{
			
			// 定义 total 侦听器，指向一个配置对象
			total:{
				// handler 属性用来定义侦听器的 function 处理函数
				handler(newValue){
					const findResult = this.options.find(x => x.text === '购物车')
					if(findResult){
						findResult.info = newValue
					}
				},
			    // immediate 属性用来声明此侦听器，是否在页面初次加载完毕后立即调用
				immediate:true
			}
		},
		data() {
			return {
				goods_info: {},
				options: [{
					icon: 'shop',
					text: '店铺',
					infoBackgroundColor: '#007aff',
					infoColor: "red"
				}, {
					icon: 'cart',
					text: '购物车',
					info: 0
				}],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				]
			}
		},
		onLoad(options) {
			const goods_id = options.goods_id
			this.getGoodDetail(goods_id)
		},
		methods: {
			...mapMutations('m_cart',['addToCart']),
			async getGoodDetail(goods_id) {
				// uni.$http.get 返回的是promise对象 需要用上async await
				const {
					data: res
				} = await uni.$http.get("/api/public/v1/goods/detail", {
					goods_id
				})

				if (res.meta.status == 200) {
					res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g,
						'<img style="display:block;"').replace(/webp/g, 'jpg')
					this.goods_info = res.message
				} else {
					uni.$showMsg()
				}
			},
			preview(i) {
				console.log(i)
				uni.previewImage({
					current: i,
					urls: this.goods_info.pics.map(v => v.pics_big)
				})
			},
			onClick(e) {
				if (e.content.text == "购物车") {
					uni.switchTab({
						url: '/pages/cart/cart'
					})
				}
			},
			buttonClick(e) {
				if(e.content.text == "加入购物车"){
					// { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
					const goods = {
						goods_id:this.goods_info.goods_id,
						goods_name:this.goods_info.goods_name,
						goods_price:this.goods_info.goods_price,
						goods_count:1,
						goods_small_logo:this.goods_info.goods_small_logo,
						goods_state:true
					}
					
					this.addToCart(goods)
				}
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	swiper {
		height: 750rpx;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.goods-info {
		padding: 10px;
		padding-right: 0;

		.goods-price {
			color: #C00000;
		}

		.goods-body {
			display: flex;
			margin-top: 5px;

			.goods-name {
				font-size: 13px;
				margin-right: 10px;
			}

			.goods-shoucang {
				width: 120px;
				border-left: #efefef solid 1px;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				font-size: 13px;
			}
		}

		.goods-kd {
			font-size: 13px;
			margin-top: 5px;
		}
	}

	.goods-nav {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
	}

	.goods-detail-container {
		padding-bottom: 50px;
	}
</style>
