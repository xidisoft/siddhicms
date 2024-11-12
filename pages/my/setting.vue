<template>
	<view>
		<view class="logout">
			<u-button type="error" shape="circle" @click="logout">退出登录</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			logout(){
				var that = this
				uni.showModal({
					title:'确定要退出登录吗',
					success(res) {
						if(res.confirm){
							that.api.logout().then(data=>{
								uni.removeStorageSync('userInfo')
								uni.showToast({
									title:'退出成功'
								})
								setTimeout(()=>{
									uni.reLaunch({
										url:'/pages/my/index'
									})
								},1500)
							})
						}
					}
				})
			}
			
		}
	}
</script>

<style>
	.logout{
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 20upx;
	}

</style>
