<template>
	<z-paging ref="paging" v-model="dataList" @query="queryList">
		<view class="u-m-b-20" v-for="(item,index) in dataList">
			<view class="shop" @click="detail(item.id)">
				<image :src="host+item.coverimage" mode="aspectFill"></image>
				<view class="u-flex-1 u-m-l-20">
					<view class="u-line-1" style="font-weight: bold;">{{item.name}}</view>
					<view class="u-type-error u-p-b-20">{{item.status_text}}</view>
					<view class="u-tips-color u-font-md">浏览量：{{item.pv}}</view>
					<view class="u-tips-color u-font-md">更新时间：{{$u.timeFrom(item.updatetime)}}</view>
				</view>
			</view>
			<view style="background: #fff;padding: 20upx;">
				<!-- <u-button size="mini">编辑</u-button> -->
				<u-button size="mini" :custom-style="{margin:'0 20upx'}" @click="refresh(item.id)">刷新</u-button>
				<u-button size="mini" @click="del(index)">删除</u-button>
			</view>
		</view>
		<xidicms-loading :show="showLoading"></xidicms-loading>
	</z-paging>
</template>

<script>
	export default {
		data() {
			return {
				dataList: [],
				showLoading: true,
			}
		},
	
		methods: {
			queryList(page, num) {
				this.api.myShop({
					page,
					num
				}).then(data => {
					this.$refs.paging.complete(data);
					setTimeout(() => {
						this.showLoading = false
					}, 800)
				})
			},
			detail(e) {
				this.$u.route('/pages/merchant/detail', {
					id: e
				})
			},
			
			del(index){
				var that = this
				uni.showModal({
					title: '确定要删除吗？',
					success(res) {
						if (res.confirm) {
							that.api.deleteMerchant({
								id: that.dataList[index].id
							}).then(data => {
								that.dataList.splice(index, 1)
								uni.showToast({
									title: '删除成功'
								})
							})
						}
					}
				})
			},
			refresh(id) {
				var that = this
				this.api.refreshMerchant({
					id: id
				}).then(data => {
					uni.showModal({
						title: '更新成功',
						showCancel: false,
						success(res) {
							if (res.confirm) {
								that.$refs.paging.reload();
							}
						}
					})
				})
			}

		}
	}
</script>

<style>
	page {
		background: #f3f3f3;
	}

	.shop {
		display: flex;
		padding: 20upx;
		background: #fff;
		border-radius: 10upx;
		border-bottom: solid 1px #eee;
	}

	.shop>image {
		width: 200upx;
		height: 200upx;
		border-radius: 10upx;

	}
</style>