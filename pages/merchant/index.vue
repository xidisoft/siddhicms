<template>
	<z-paging ref="paging" v-model="dataList" :auto-clean-list-when-reload="false"
		:auto-scroll-to-top-when-reload="false" @query="queryList">
		<view class="u-m-t-10 u-m-b-10">
			<u-swiper :list="ads" effect3d height="300"></u-swiper>
		</view>
		<view style="background: #fff;">
			<u-grid :col="5" :border="false">
				<u-grid-item v-for="(item,index) in group" @click="toGroup(item.id)" v-if="item.id>0&&index<10">
					<image :src="host+item.image" mode="widthFix" class="group-icon"></image>
					<view class="u-font-sm ">{{item.name}}</view>
				</u-grid-item>
				<u-grid-item @click="toGroup(0)">
					<image src="/static/imgs/more.png" mode="widthFix" class="group-icon"></image>
					<view class="u-font-sm ">更多</view>
				</u-grid-item>
			</u-grid>
		</view>
		<!-- <u-gap bg-color="#f3f3f3"></u-gap> -->
		<!-- <view class="apply">
			<text class="u-font-lg">商家入驻即可免费获得同城展示机会</text>
			<u-button type="warning" size="mini" shape="circle" @click="addMerchant">立即入驻</u-button>
		</view> -->
		<!-- <view class="tabs">
			<u-tabs :list="group" active-color="#129db1" font-size="34" :current="current" @change="tabChange"></u-tabs>
		</view> -->
		<view class="search">
			<u-search v-model="keyword" :action-style="{color:'#fff'}" placeholder="输入商家名称" @search="search"
				@custom="search" @clear="clear"></u-search>
		</view>
		<view class="shop-item" v-for="(item,index) in dataList" :key="index" @click="todetail(item.id)">
			<view class="cover">
				<u-lazy-load :image="item.coverimage" loading-img="/static/imgs/loading.jpg" height="140"
					img-mode="aspectFill"></u-lazy-load>
			</view>
			<view class="u-flex-1 u-m-l-20 u-flex u-col-top">
				<view class="u-flex-1">
					<view class="u-line-1 u-main-color u-line-1" style="font-weight: bold;">{{item.name}}</view>
					<view class="u-tips-color u-font-md u-line-1">{{item.address}}</view>
					<u-icon name="clock" color="#129db1" label-color="#999" :label="item.timerange"></u-icon>
				</view>
				<view class="phone" @click.stop="call(item.phone)">
					<u-icon name="phone" color="#d43"></u-icon>
				</view>
			</view>
		</view>
		<xidicms-loading :show="showLoading"></xidicms-loading>
	</z-paging>
</template>

<script>
	export default {
		data() {
			return {
				showLoading: true,
				group: [],
				ads: [],
				dataList: [],
				current: 0,
				pid: 0,
				swiperHeight: 0,
				keyword: ''
			}
		},

		methods: {
			search() {
				this.$refs.paging.reload()
			},
			clear() {
				this.keyword = ''
				this.$refs.paging.reload()
			},

			tabChange(index) {
				this.current = index;
				this.pid = this.group[index].id
				this.$refs.paging.reload();
			},
			queryList(pageNo, pageSize) {
				const params = {
					page: pageNo,
					num: pageSize,
					pid: this.pid,
					keyword: this.keyword
				}
				this.api.merchant(params).then(data => {
					if (pageNo == 0 && this.current == 0) {
						this.group = [{
							id: 0,
							name: '推荐'
						}, ...data.group]
						this.ads = data.ads.map(item => {
							item.image = this.host + item.image
							return item
						})
					}
					data.shop.map((item) => {
						item.coverimage = this.host + item.coverimage
					})
					this.$refs.paging.complete(data.shop);
					setTimeout(() => {
						this.showLoading = false
					}, 800)
				})
			},
			toGroup(id) {
				if (id == 0) {
					return this.$u.route('/pages/merchant/more')
				}
				this.$u.route('/pages/merchant/group', {
					id
				})
			},
			todetail(id) {
				this.$u.route('/pages/merchant/detail', {
					id
				})
			},
			addMerchant() {
				this.$u.route('/pages/merchant/create')
			},
			call(tel) {
				uni.makePhoneCall({
					phoneNumber: tel
				})
			}
		}
	}
</script>

<style>
	page {
		background: #f3f3f3;
	}

	.group-icon {
		width: 50%;
		margin-bottom: 10upx;
	}

	.apply {
		color: #fff;
		background: #129db1;
		margin: 20upx;
		padding: 20upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-radius: 10upx;
	}

	.tabs {
		position: sticky;
		top: 0;
		z-index: 99;
		border-top: solid 2px #eee;
	}

	.search {
		background: #129db1;
		padding: 20upx;
		/* margin: 10upx; */
	}

	.shop-item {
		display: flex;
		margin: 10upx;
		padding: 20upx;
		background: #fff;
	}

	.cover {
		width: 160upx;
		height: 140upx;
		border-radius: 10upx;
		overflow: hidden;
	}

	.phone {
		border-radius: 50%;
		display: flex;
		align-items: center;
		padding: 10upx;
		border: solid 1px #d43;
	}
</style>