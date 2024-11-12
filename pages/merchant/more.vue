<template>
	<view>
		<u-grid :col="3">
			<u-grid-item v-for="item in group" @click="togroup(item.id)">
				<view class="grid-text">{{item.name}}</view>
			</u-grid-item>
		</u-grid>
		<xidicms-loading :show="showLoading"></xidicms-loading>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				showLoading: false,
				group: [],
			}
		},
		onLoad(e) {
			this.showLoading = true
			this.api.merchantGroup().then(data => {
				this.group = data
				setTimeout(() => {
					this.showLoading = false
				}, 800)
			})
		},
		methods: {
			togroup(id) {
				uni.navigateTo({
					url: '/pages/merchant/group?id=' + id
				})
			}
		}
	}
</script>
<style>
	.grid-text {
		font-size: 32upx;
	}
</style>