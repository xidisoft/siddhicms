<template>
	<z-paging ref="paging" v-model="dataList" @query="queryList" auto-show-back-to-top>
		<view class="u-p-20 u-border-bottom search">
			<u-search v-model="keyword" focus placeholder="请输入关键字" @search="search" @custom="search"
				@clear="remove"></u-search>
		</view>
		<view class="u-p-20">
			<xidicms-info-list :list="dataList"></xidicms-info-list>
		</view>
		<xidicms-loading :show="showLoading"></xidicms-loading>
	</z-paging>
</template>
<script>
	export default {
		data() {
			return {
				showLoading: false,
				keyword: '',
				dataList: []
			}
		},
		onLoad(e) {
			this.showLoading = true
			this.keyword = e.keyword;
		},
		methods: {
			queryList(pageNo, pageSize) {
				this.api.search({
					page: pageNo,
					num: pageSize,
					keyword:this.keyword
				}).then(data => {
					data.map((item) => {
						item.tags = Object.values(JSON.parse(item.tagsjson))
						if (item.images != '') {
							item.images = item.images.split(',')[0]
						}
					})
					this.$refs.paging.complete(data);
					setTimeout(() => {
						this.showLoading = false
					}, 800)
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
	.search {
		background: #fff;
		position: sticky;
		top: 0;
		z-index: 99;
	}
</style>