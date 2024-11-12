<template>
	<z-paging ref="paging" v-model="dataList" @query="queryList" auto-show-back-to-top auto-show-system-loading>
		<u-gap bg-color="#f3f3f3" height="10"></u-gap>
		<view v-for="item in dataList">
			<uni-list-chat :avatar-circle="true" :title="item.nickname"
				:avatar="item.avatar?host+item.avatar:'/static/imgs/avatar.jpg'"
				:note="item.content==''?'[图片]':item.content" :time="$u.timeFrom(item.createtime)"
				:badge-text="item.unread==0?'':item.unread" clickable @click="tochat(item.id)">
			</uni-list-chat>
		</view>
	</z-paging>
</template>

<script>
	export default {
		data() {
			return {
				dataList: [],
			}
		},
		watch: {
			dataList: {
				deep: true,
				handler: function(newVal, oldVal) {
					var unread = 0
					this.dataList.map(item => {
						unread += parseInt(item.unread)
					})
					getApp().globalData.unread = unread
					if (unread > 0) {
						uni.setTabBarBadge({
							index: 2,
							text: unread.toString()
						})
					} else {
						uni.removeTabBarBadge({
							index: 2
						})
					}
				}
			}
		},
		onShow() {
			var msg = getApp().globalData.message
			if (msg.length > 0) {
				msg.map(val => {
					var res = this.dataList.filter(item => {
						if (item.id == val.user_id) {
							item.content = val.content
							item.createtime = val.createtime
							item.unread++
							return item
						}
					})
					if (res.length == 0) {
						val.id = val.user_id
						val.unread = 1
						this.dataList.unshift(val)
					}
				})
				getApp().globalData.message = []
			}
		},

		methods: {
			queryList(pageNo, pageSize) {
				this.api.chatList({
					page: pageNo,
					num: pageSize
				}).then(data => {
					this.$refs.paging.complete(data);
				})
			},

			tochat(id) {
				this.dataList.map(item => {
					if (item.id == id) {
						item.unread = 0
					}
				})
				this.$nextTick(() => {
					uni.navigateTo({
						url: '/pages/message/chat?id=' + id
					})
				})
			}
		}
	}
</script>

<style>

</style>