<template>
	<view class="u-p-60">
		<image src="/static/imgs/logo.png" mode="widthFix" class="logo"></image>
		<input type="number" v-model="country" placeholder="国家地区(如中国86)" class="input-item">
		<input type="number" v-model="mobile" placeholder="输入手机号" class="input-item">
		<view class="u-flex u-p-t-20">
			<input type="number" v-model="captcha" placeholder="输入验证码" class="input-item">
			<u-button type="primary" size="mini" @click="send">获取验证码</u-button>
		</view>
		<view class="forget">
			<navigator url="/pages/auth/login">已有账号</navigator>
			<navigator url="login">找回密码</navigator>
		</view>
		<view class="u-p-t-40">
			<u-button type="primary" shape="circle" @click="register">立即注册</u-button>
		</view>
		<view style="text-align: center;margin-top: 20upx;">
			<label @click="checked=!checked">
				<radio :checked="checked" style="transform: scale(0.6);" />
				<text style="color: #999;vertical-align: middle;font-size: 24upx;">我已阅读并同意
					<text class="agree-content" @click.stop="toAgreement(1)">用户协议</text>
					和
					<text class="agree-content" @click.stop="toAgreement(2)">隐私政策</text>
				</text>
			</label>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				checked: false,
				country: '',
				mobile: '',
				captcha: '',
			}
		},
		methods: {
			toAgreement(e) {
				uni.navigateTo({
					url: e == 1 ? '/pages/system/agreement' : '/pages/system/privacy'
				})
			},
			send() {
				this.api.sendSms({
					country: this.country,
					mobile: this.mobile
				}).then(res => {
					console.log(res)
				})
			},
			register() {
				if (!this.checked) {
					return uni.$u.toast('请勾选协议后操作')
				}
				this.api.register({
					mobile:this.mobile,
					captcha:this.captcha
				}).then(data => {
					uni.setStorageSync('userInfo', data)
					uni.showToast({
						title: '注册成功'
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
		padding: 40upx 20upx;
		font-size: 24upx;
	}

	.agree-content {
		font-size: 24upx;
		color: #031140;
		margin: 0 10upx;
	}

	.agreement {
		text-align: center;
		height: 100vh;
		padding: 20px;
		box-sizing: border-box;

	}
</style>