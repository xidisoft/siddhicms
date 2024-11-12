<template>
	<view>
		<u-swiper :list="merchant.shopimages" height="400" border-radius="0"></u-swiper>
		<view class="u-p-20">
			<view class="name">
				{{merchant.name}}
				<text class="tags">优质商家</text>
			</view>
			<view class="u-tips-color u-p-t-20 u-flex u-row-between">
				<u-icon name="clock" :label="merchant.timerange"></u-icon>
				<u-icon name="eye" :label="merchant.pv"></u-icon>
			</view>
		</view>
		<u-gap bg-color="#eee" height="10"></u-gap>
		<view class="u-flex u-p-20">
			<view class="u-flex-1 u-m-r-20">
				<u-icon name="map" color="#d43" :label="merchant.address"></u-icon>
			</view>
			<u-icon name="phone-fill" color="#129db1" @click="call(merchant.phone)"></u-icon>
		</view>
		<u-gap bg-color="#eee" height="10"></u-gap>
		<view style="padding: 20upx 20upx 100px;">
			<u-section title="店铺简介" color="#129db1"></u-section>
			<view class="content">
				<rich-text :nodes="merchant.content"></rich-text>
			</view>
			<image :src="item.image" mode="widthFix" style="width: 100%;padding-top: 20upx;"
				v-for="item in merchant.shopimages"></image>
		</view>
		<view class="bottom">
			<view class="u-flex-1 u-flex u-row-around ">
				<u-icon name="home" label="主页" label-pos="bottom" size="40" @click="tohome"></u-icon>
				<u-icon name="weixin-fill" label="微信" label-pos="bottom" color="green" size="40"
					@click="showQrcode=true"></u-icon>
				<u-icon name="chat" label="私信" label-pos="bottom" size="40" color="#129db1"
					@click="chat(merchant.user_id)"></u-icon>
			</view>
			<view class="u-flex-1 u-text-right">
				<u-button type="error" size="mini" shape="circle" @click="call(merchant.phone)">
					<u-icon name="phone" label="电话" label-color="#fff"></u-icon>
				</u-button>
			</view>
		</view>
		<u-popup v-model="showQrcode" mode="center" length="50%">
			<image :src="host+merchant.qrcodeimage" mode="widthFix" style="width: 100%;"></image>
		</u-popup>
		<u-back-top :scroll-top="scrollTop"></u-back-top>
		<xidicms-loading :show="showLoading"></xidicms-loading>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showLoading: true,
				merchant: {},
				scrollTop: 0,
				showQrcode: false
			}
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		onLoad(e) {
			this.api.merchantDetail({
				id: e.id
			}).then(data => {
				data.shopimages = data.shopimages.split(',').map(item => {
					item = {
						image: this.host + item
					}
					return item
				})
				this.merchant = data
				uni.setNavigationBarTitle({
					title: this.merchant.name + '-华人圈'
				})
				setTimeout(() => {
					this.showLoading = false
				}, 800)
			})
		},
		methods: {
			call(tel) {
				uni.makePhoneCall({
					phoneNumber: tel
				})
			},
			tohome() {
				uni.reLaunch({
					url: '/pages/index/index'
				})
			},
			chat(id) {
				uni.navigateTo({
					url: '/pages/message/chat?id=' + id
				})
			}

		}
	}
</script>

<style>
	.name {
		font-weight: bold;
		font-size: 36upx;
		color: #333;
	}

	.tags {
		background: #d43;
		padding: 4upx 10upx;
		color: #fff;
		margin-left: 10upx;
		font-size: 22upx;
		border-radius: 10upx;
	}

	.content {
		margin-top: 40upx;
	}

	.content img {
		width: 100% !important;
	}

	.bottom {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background: #fff;
		display: flex;
		align-items: center;
		padding: 20upx;
		box-shadow: 0 2px 10px 1px #ddd;
	}
</style>