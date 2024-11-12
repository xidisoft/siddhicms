<template>
	<view>
		<u-grid :col="3">
			<u-grid-item v-for="item in group" @click="toCreate(item)">
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
				type: null
			}
		},
		onLoad(e) {
			this.type = e.type
			this.showLoading = true
			this.api.group().then(data => {
				this.group = data
				setTimeout(() => {
					this.showLoading = false
				}, 1000)
			})
		},
		methods: {
			toCreate(e) {
				if(this.$u.test.isEmpty(this.type)){
					uni.navigateTo({
						url: '/pages/create/template?id=' + e.id
					})
				}else{
					uni.navigateTo({
						url: '/pages/index/group?id=' + e.id
					})
				}
				
			}
		}
	}
</script>
<style>
	.grid-text {
		font-size: 32upx;
	}
</style>