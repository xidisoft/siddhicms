<template>
	<view class="u-p-20">
		<view class="u-p-40">
			<image src="/static/imgs/logo.png" mode="widthFix" class="logo"></image>
			<input type="text" v-model="account" placeholder="输入登录账号" class="input-item">
			<input type="password" v-model="password" placeholder="输入登录密码" class="input-item">
			<view class="forget">
				<navigator url="/pages/auth/register" hover-class="none">注册账户</navigator>
				<navigator url="register" hover-class="none">忘记密码</navigator>
			</view>
			<view class="u-p-t-40">
				<u-button type="primary" shape="circle" @click="login">立即登录</u-button>
			</view>
			<view style="text-align: center;margin-top: 20upx;">
				<label @click="checked=!checked">
					<radio :checked="checked" color="#129db1" style="transform: scale(0.6);" />
					<text style="color: #999;vertical-align: middle;font-size: 24upx;">我已阅读并同意
						<text class="agree-content" @click.stop="toAgreement(1)">用户协议</text>
						和
						<text class="agree-content" @click.stop="toAgreement(2)">隐私政策</text>
					</text>
				</label>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				account: '',
				password: '',
				checked: false,
			}
		},
		onShow() {
			var user = uni.getStorageSync('userInfo')
			if (uni.$u.test.isEmpty(user?.token) == false) {
				uni.showModal({
					title: '系统提示',
					content: '你已经登录，请勿重复登录！',
					showCancel: false,
					success(res) {
						if (res.confirm) {
							uni.navigateBack()
						}
					}
				})
			}
		},
		methods: {
			toAgreement(e) {
				uni.navigateTo({
					url: e == 1 ? '/pages/system/agreement' : '/pages/system/privacy'
				})
			},

			login() {
				if (uni.$u.test.isEmpty(this.account)) {
					return uni.$u.toast('账号不能为空')
				}
				if (uni.$u.test.isEmpty(this.password)) {
					return uni.$u.toast('密码不能为空')
				}
				if (!this.checked) {
					return uni.$u.toast('勾选协议后操作')
				}
				this.api.login({
					account: this.account,
					password: this.password
				}).then(data => {
					uni.setStorageSync('userInfo', data.userinfo)
					uni.showToast({
						title: '登录成功'
					})
					setTimeout(() => {
						uni.reLaunch({
							url: '/pages/index/index'
						})
					}, 1500)
				})
			}

		}
	}
</script>

<style>
	.logo {
		width: 100%;
		margin: 50upx auto;
	}

	.input-item {
		border-bottom: solid 1px #eee;
		padding: 20upx;
	}

	.input-item:hover {
		border-color: rgba(18, 157, 177, 0.5);
	}

	.forget {
		display: flex;
		justify-content: space-between;
		padding: 20upx;
		font-size: 24upx;
	}

	.agree-content {
		font-size: 24upx;
		color: #031140;
		margin: 0 10upx;
	}

	.agreement {
		width: 100%;
		height: 100vh;
		padding: 20px;
		box-sizing: border-box;
	}
</style>