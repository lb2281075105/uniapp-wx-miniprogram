<template>
	<view class="login-container">

		<uni-icons type="contact-filled" size="100"></uni-icons>
		<!-- 用户授权 -->
		<button type="primary" class="btn-login" open-type="getUserInfo" @getuserinfo="getUserInfo">一键登录</button>
		<view class="desc">登录后尽享更多权益</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapGetters,
		mapMutations
	} from 'vuex'
	export default {
		name: "my-login",
		data() {
			return {

			};
		},
		methods: {
			...mapMutations('m_user', ['updateUserInfo', 'updateToken']),
			getUserInfo(e) {
				console.log(e)
				// 判断是否获取用户信息成功
				if (e.detail.errMsg === 'getUserInfo:fail auth deny') return uni.$showMsg('您取消了登录授权！')
				this.updateUserInfo(e.detail.userInfo)
				this.getToken(e.detail)
			},
			// 调用登录接口，换取永久的 token
			async getToken(info) {
				// 调用微信登录接口
				const [err, res] = await uni.login().catch(err => err)
				// 判断是否 uni.login() 调用失败
				if (err || res.errMsg !== 'login:ok') return uni.$showError('登录失败！')

				// 准备参数对象
				const query = {
					code: res.code,
					encryptedData: info.encryptedData,
					iv: info.iv,
					rawData: info.rawData,
					signature: info.signature
				}

				// 换取 token
				const {
					data: loginResult
				} = await uni.$http.post('/api/public/v1/users/wxlogin', query)
				if (loginResult.meta.status !== 200) return uni.$showMsg('登录失败！')
				console.log(loginResult)
				// 2. 更新 vuex 中的 token
				this.updateToken(loginResult.message.token)
			}
		}
	}
</script>

<style lang="scss">
	.login-container {
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
		&::after {
			content: ' ';
			display: block;
			width: 100%;
			height: 40px;
			position: absolute;
			bottom: 0;
			left: 0;
			background-color: #FFFFFF;
			border-radius: 100%;
			transform: translateY(50%);
		}

		.btn-login {
			color: #FFFFFF;
			background-color: #C00000;
			width: 90%;
			border-radius: 100px;
			font-size: 15px;
		}

		.desc {
			color: gray;
			font-size: 12px;
			margin-top: 10px;
		}
	}
</style>
