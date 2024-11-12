<template>
	<view class="u-p-20">
		<u-button type="primary" @click="create(0)">发布信息</u-button>
		<u-button type="success" :custom-style="{margin:'20upx auto'}" @click="create(1)">分享动态</u-button>
		<u-button type="error" @click="create(2)">商家入驻</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			create(e) {
				uni.navigateTo({
					url: ['/pages/create/index', '/pages/forum/create', '/pages/merchant/create'][e]
				})
			}
		}
	}
</script>

<style lang="scss">


</style>