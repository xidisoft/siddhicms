<template>
	<view>
		<view class="u-p-20">
			<text class="group-tag" @click="toGroup(info.group_id)">{{info.group_name}}</text>
			<text class="title">{{info.title}}</text>
			<view class="time-views">
				<u-icon name="clock" :label="$u.timeFrom(info.updatetime)" label-color="#999"></u-icon>
				<u-icon name="eye" :label="info.pv" label-color="#999" v-if="info.pv>0"></u-icon>
			</view>
		</view>
		<u-gap bg-color="#f3f3f3" height="10"></u-gap>
		<view class="tags">
			<view v-for="item in info.tagsjson" class="tags-item">
				<text>{{item[0]}}</text>
				<text>{{item[1]}}</text>
			</view>
		</view>
		<u-gap bg-color="#f3f3f3" height="10"></u-gap>
		<view class="u-m-20">
			<view style="font-weight: bold;color: #129db1;">具体描述</view>
			<view class="content">
				<rich-text :nodes="info.content"></rich-text>
			</view>
			<image :src="host+img" mode="widthFix" style="width: 100%;" v-for="img in info.images"></image>
		</view>
		<view class="copyright">
			<view class="u-tips-color u-m-b-10">免责声明：</view>
			<view class="u-light-color u-font-sm">
				华人圈是同城信息发布和传播的平台，信息内容来源于用户自行发布，请自行评估交易风险。如发生法律纠纷，本平台不承担任何责任！如发现有过时或者错误的信息，请通知我们删除！以上请知悉！</view>
		</view>
		<u-gap height="200"></u-gap>
		<view class="right-menu">
			<view class="icons" @click="operate(1)"><u-icon name="home" size="40" color="#129db1"></u-icon></view>
			<view class="icons" @click="operate(2)"><u-icon name="chat" size="40" color="#129db1"></u-icon></view>
			<view class="icons" @click="operate(3)"><u-icon name="arrow-up" size="40" color="#129db1"></u-icon></view>
		</view>
		<view class="bottom">
			<u-avatar :src="host+info.avatar"></u-avatar>
			<view class="u-flex-1 u-line-1 u-m-20">
				<view class="u-font-lg u-m-b-6 nickname">{{info.nickname}}</view>
				<view class="u-line-1 u-font-md u-tips-color">{{info.bio||'欢迎来到华人圈'}}</view>
			</view>
			<u-button type="error" shape="circle" size="mini" @click="call">
				<u-icon name="phone" label="电话" label-color="#fff"></u-icon>
			</u-button>
		</view>
		<xidicms-loading :show="showLoading"></xidicms-loading>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showLoading: true,
				info: {},
			}
		},
		onLoad(e) {
			var that = this
			this.api.detail({
				id: e.id
			}).then(data => {
				uni.setNavigationBarTitle({
					title: data.title
				})
				data.tagsjson = JSON.parse(data.tagsjson)
				data.tagsjson = Object.entries(data.tagsjson)
				data.images = this.$u.test.isEmpty(data.images) ? [] : data.images.split(',')

				this.info = data
				setTimeout(() => {
					this.showLoading = false
				}, 1000)
			})
		},
		methods: {
			toGroup(id) {
				uni.navigateTo({
					url: '/pages/index/group?id=' + id
				})
			},
			call() {
				uni.makePhoneCall({
					phoneNumber: this.info.phone
				})
			},
			operate(e) {
				switch (e) {
					case 1:
						uni.switchTab({
							url: '/pages/index/index'
						})
						break;
					case 2:
						uni.navigateTo({
							url: '/pages/message/chat?id=' + this.info.user_id
						})
						break;
					case 3:
						uni.pageScrollTo({
							scrollTop: 0
						})
						break;
				}
			}
		}
	}
</script>

<style lang="scss">
	.title {
		font-weight: 400;
		font-size: 36upx;
	}

	.group-tag {
		background: $siddhi-theme;
		color: #fff;
		padding: 0 10upx;
		line-height: 1rem;
		border-radius: 10upx;
		font-size: 28upx;
		margin-right: 10upx;
	}

	.time-views {
		display: flex;
		justify-content: space-between;
		padding-top: 20upx;
		color: #999;
	}

	.tags {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		padding: 20upx;
	}

	.tags-item {
		margin: 20upx 60upx 20upx 0;
	}

	.tags-item>text:first-child {
		color: #999;
		margin-right: 20upx;
	}

	.content {
		line-height: 1.5rem;
		text-align: justify;
		padding: 30upx 0;
		font-size: 34upx;
	}

	.content img {
		width: 100% !important;
	}

	.copyright {
		background: #f3f3f3;
		margin: 60upx 20upx;
		padding: 20upx;
	}

	.copyright>view {
		font-size: 26upx;
		line-height: 1.5em;
		text-align: justify;
	}

	.right-menu {
		position: fixed;
		bottom: 200upx;
		right: 20upx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 260upx;
	}

	.icons {
		background: rgba(0, 0, 0, 0.1);
		border-radius: 50%;
		padding: 10upx;
	}

	.bottom {
		background: #fff;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		display: flex;
		align-items: center;
		padding-left: 20upx;
		border-top: solid 1px #eee;
		padding: 0 20upx;
	}

	.nickname {
		color: $siddhi-theme;
		font-weight: bold;
	}
</style>