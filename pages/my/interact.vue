<template>
	<view>
		<z-paging ref="paging" v-model="dataList" @query="queryList" auto-show-back-to-top auto-show-system-loading>
			<view slot="top">
				<u-tabs :list="list" :current="current" :is-scroll="false" bg-color="#f3f3f3"
					@change="changetabs"></u-tabs>
			</view>
			<view v-if="current==0">
				<siddhicms-forum-list :list="dataList"></siddhicms-forum-list>
			</view>
			<view class="focus" v-if="current==1">
				<view class="u-flex u-p-20 u-m-20 my-bg" v-for="(item,index) in dataList">
					<u-avatar :src="host+item.avatar"></u-avatar>
					<view class="u-flex-1 u-p-30">{{item.nickname}}</view>
					<u-button type="warning" size="mini" :custom-style="{marginRight:'20upx'}"
						@click="chat(item.other_id)">私信</u-button>
					<u-button type="error" size="mini" @click="cancelFocus(index)">取关</u-button>
				</view>
			</view>
			<view class="focus" v-if="current==2">
				<view class="u-flex u-p-20 u-m-20 my-bg" v-for="item in dataList">
					<u-avatar :src="host+item.avatar"></u-avatar>
					<view class="u-flex-1 u-p-30">{{item.nickname}}</view>
					<u-button type="warning" size="mini" :custom-style="{marginRight:'20upx'}"
						@click="chat(item.user_id)">私信</u-button>
					<u-button type="success" size="mini" @click="returnFocus(item)"
						v-if="item.is_friend==0">回关</u-button>
					<u-button size="mini" v-else>好友</u-button>
				</view>
			</view>
		</z-paging>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
						name: '评论'
					},
					{
						name: '关注'
					},
					{
						name: '粉丝'
					}
				],
				dataList: [],
				current: 0
			}
		},
		onLoad(e) {
			this.current = e.type
		},
		methods: {
			queryList(page, num) {
				this.api.my({
					page: page,
					num: num,
					type: this.current
				}).then(data => {
					if (this.current == 0) {
						data.map(item => {
							return item.images = item.images == '' ? [] : item.images.split(',')
						})
					}

					this.$refs.paging.complete(data);
				})
			},
			changetabs(e) {
				this.current = e
				this.$refs.paging.reload()
			},
			returnFocus(e) {
				this.api.focus({
					back_id: e.user_id
				}).then(data => {
					uni.$u.toast('回关成功')
					e.is_friend = 1
				})
			},
			cancelFocus(index) {
				this.api.focus({
					cancel_id: this.dataList[index].other_id
				}).then(data => {
					this.dataList.splice(index, 1)
					uni.$u.toast('取关成功')
				})
			},
			chat(id) {
				this.$u.route('/pages/message/chat', {
					id: id
				})
			}
		}
	}
</script>

<style>
	.my-bg {
		background: #f3f3f3;
	}
</style>