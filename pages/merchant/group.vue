<template>
	<z-paging ref="paging" v-model="dataList" :auto-clean-list-when-reload="false"
		:auto-scroll-to-top-when-reload="false" @query="queryList">
		<view class="search">
			<u-search v-model="keyword" placeholder="请输入店铺名称" @search="search" @custom="search"
				@clear="remove"></u-search>
		</view>
		<view class="merchant" v-for="(item,index) in dataList" :key="index" @click="todetail(item.id)">
			<image :src="item.coverimage" mode="aspectFill" style="width: 160upx;height: 140upx;"></image>
			<view class="u-flex-1 u-m-l-20 u-flex">
				<view class="u-flex-1">
					<view class="u-line-1 u-main-color" style="font-weight: bold;">{{item.name}}</view>
					<view class="u-tips-color u-font-md u-line-1">{{item.address}}</view>
					<u-icon name="clock" color="#129db1" :label="item.timerange" label-color="#999"></u-icon>
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
				keyword: '',
				showLoading: true,
				dataList: [],
				pid: 0
			}
		},
		onLoad(e) {
			this.pid = e.id
		},
		methods: {
			queryList(pageNo, pageSize) {
				const params = {
					page: pageNo,
					num: pageSize,
					pid: this.pid,
					keyword: this.keyword
				}
				this.api.merchant(params).then(data => {
					data.shop.map((item) => {
						item.coverimage = this.host + item.coverimage
					})
					this.$refs.paging.complete(data.shop);
					uni.setNavigationBarTitle({
						title: data.group.name + '商家'
					})
					setTimeout(() => {
						this.showLoading = false
					}, 800)
				})
			},
			todetail(id) {
				uni.navigateTo({
					url: '/pages/merchant/detail?id=' + id
				})
			},

			call(tel) {
				uni.makePhoneCall({
					phoneNumber: tel
				})
			},
			search() {
				this.$refs.paging.reload();
			},
			remove() {
				this.dataList = []
			}
		}
	}
</script>

<style>
	page {
		background: #f3f3f3;
	}

	.search {
		background: #fff;
		padding: 20upx;
		position: sticky;
		top: 0;
		z-index: 99;
		border-bottom: solid 1px #eee;
	}

	.merchant {
		display: flex;
		align-items: flex-start;
		margin: 16upx;
		padding: 20upx;
		background: #fff;
	}

	.phone {
		border-radius: 50%;
		display: flex;
		align-items: center;
		padding: 10upx;
		border: solid 1px #d43;
	}
</style>