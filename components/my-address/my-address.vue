<template>
	<view>
		<view class="address-box">
			<button type="primary" size="mini">请选择收货地址+</button>
		</view>
		<image src="/static/cart_border@2x.png" class="address-img"></image>
	</view>
</template>
 
<script>
	export default {
		name:"my-address",
		data() {
			return {
				
			};
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
		width: 100%;
		height: 5px;
	}
</style>
