<template>
	<z-paging ref="paging" v-model="dataList" @query="queryList" auto-show-back-to-top auto-show-system-loading>
		<view slot="top">
			<u-tabs :list="group" :current="current" bg-color="#f3f3f3" @change="changetabs"></u-tabs>
		</view>
		<siddhicms-forum-list :list="dataList"></siddhicms-forum-list>
	</z-paging>
</template>

<script>
	export default {
		data() {
			return {
				dataList: [],
				group: [],
				current: 0
			}
		},

		onLoad() {
			this.api.forumGroup().then(data => {
				data.unshift({
					id: 0,
					name: '推荐'
				})
				this.group = data
			})
		},

		methods: {
			queryList(page, num) {
				var that = this
				this.api.forum({
					page: page,
					num: num,
					pid: this.group[this.current]?.id || 0
				}).then(data => {
					data.map(item => {
						item.images = item.images == '' ? [] : item.images.split(',')
						item.images = item.images.map(img => {
							return img = that.host + img
						})
						return item
					})
					this.$refs.paging.complete(data);
				})
			},
			changetabs(e) {
				this.current = e
				this.$refs.paging.reload()
			},
		}
	}
</script>