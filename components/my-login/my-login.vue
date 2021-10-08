<template>
	<view class="login-container">
		
		<uni-icons type="contact-filled" size="100"></uni-icons>
		<button type="primary" class="btn-login">一键登录</button>
		<view class="desc">登录后尽享更多权益</view>
	</view>
</template>

<script>
	export default {
		name:"my-login",
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.login-container{
	height: 750rpx;
	background-color: #F8F8F8;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: relative;
	// 超出部分隐藏掉
	overflow: hidden; 
	// 
	&::after{
		content: ' ';
		display:block;
		width: 100%;
		height: 40px;
		position: absolute;
		bottom: 0;
		left: 0;
		background-color: #FFFFFF;
		border-radius: 100%;
		transform: translateY(50%);
	}
	.btn-login{
		color: #FFFFFF;
		background-color: #C00000;
		width: 90%;
		border-radius: 100px;
		font-size: 15px;
	}
	.desc{
		color: gray;
		font-size: 12px;
		margin-top: 10px;
	}
}
</style>
