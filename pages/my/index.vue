<template>
	<view>
		<view style="background: #129db1;">
			<view class="avatar" @click="toLogin">
				<u-avatar :src="userinfo.avatar?host+userinfo.avatar:''"></u-avatar>
				<view class="u-m-l-20 u-flex-1">
					<view class="nickname">{{userinfo.nickname||'请登录'}}</view>
					<view class="u-line-1 u-font-sm u-light-color">{{userinfo.bio||'欢迎来到华人圈'}}</view>
				</view>
				<u-icon name="arrow-right" color="#aaa"></u-icon>
			</view>
			<view class="u-flex u-text-center u-p-20">
				<view class="u-flex-1" @click="choose(0)">
					<view class=" u-font-xl bold">{{total[0]}}</view>
					<view class="u-light-color u-font-md">评论</view>
				</view>
				<view class="u-flex-1" @click="choose(1)">
					<view class=" u-font-xl bold">{{total[1]}}</view>
					<view class="u-light-color u-font-md">关注</view>
				</view>
				<view class="u-flex-1" @click="choose(2)">
					<view class=" u-font-xl bold">{{total[2]}}</view>
					<view class="u-light-color u-font-md">粉丝</view>
				</view>
			</view>
		</view>
		<!-- <u-grid :border="false" :col="3" @click="choose">
			<u-grid-item index="0">
				<view class="u-main-color u-font-xl bold">{{total[0]}}</view>
				<view class="u-tips-color u-font-md">评论</view>
			</u-grid-item>
			<u-grid-item index="1">
				<view class="u-main-color u-font-xl bold">{{total[1]}}</view>
				<view class="u-tips-color u-font-md">关注</view>
			</u-grid-item>
			<u-grid-item index="2">
				<view class="u-main-color u-font-xl bold">{{total[2]}}</view>
				<view class="u-tips-color u-font-md">粉丝</view>
			</u-grid-item>
		</u-grid> -->

		<view class="u-m-20">
			<u-cell-group>
				<u-cell-item icon="integral-fill" title="会员等级" value="v1"
					:titleStyle="{fontSize:'32upx'}"></u-cell-item>
				<navigator url="/pages/my/content">
					<u-cell-item icon="photo" title="我的发布" :titleStyle="{fontSize:'32upx'}"></u-cell-item>
				</navigator>
				<!-- <navigator url="content">
					<u-cell-item icon="star-fill" title="我的收藏" :titleStyle="{fontSize:'32upx'}"></u-cell-item>
				</navigator> -->
				<navigator url="/pages/my/shop">
					<u-cell-item icon="shopping-cart-fill" title="我的店铺" :titleStyle="{fontSize:'32upx'}"></u-cell-item>
				</navigator>
				<navigator url="/pages/system/about">
					<u-cell-item icon="error-circle-fill" title="关于我们" :titleStyle="{fontSize:'32upx'}"></u-cell-item>
				</navigator>
			</u-cell-group>

			<u-gap height="10"></u-gap>
			<u-cell-group>
				<navigator url="setting">
					<u-cell-item icon="setting-fill" title="个人设置" :titleStyle="{fontSize:'32upx'}"></u-cell-item>
				</navigator>
			</u-cell-group>
		</view>
		<view class="copyright">
			<view>华人圈 版权所有</view>
			<view>CopyRights © 2018~2023</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userinfo: {},
				total: []
			}
		},
		onLoad() {
			this.userinfo = uni.getStorageSync('userInfo')
			this.api.my().then(data => {
				this.total = data
			})
		},
		methods: {
			choose(index) {
				this.$u.route('pages/my/interact', {
					type: index
				})
			},
			toLogin() {
				uni.navigateTo({
					url: this.$u.test.isEmpty(this.userinfo) ? '/pages/auth/login' : '/pages/my/profile'
				})
			}
		}
	}
</script>

<style>
	page {
		background: #f3f3f3;
	}

	.nickname {
		color: #fff;
		font-weight: bold;
		text-shadow: 1px 1px #333;
	}

	.avatar {
		display: flex;
		align-items: center;
		padding: 40upx;
		/* background: #129db1; */
	}

	.bold {
		font-weight: bold;
		color: #fff;
	}

	.copyright {
		position: fixed;
		bottom: 50px;
		left: 0;
		right: 0;
		padding: 10upx;
	}

	.copyright>view {
		color: #ccc;
		font-size: 26upx;
		text-align: center;
	}
</style>