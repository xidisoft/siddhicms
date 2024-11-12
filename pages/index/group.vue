<template>
	<view>
		<z-paging ref="paging" v-model="dataList" @query="queryList" auto-show-back-to-top back-to-top-bottom="60upx">
			<!-- <u-swiper :list="ads" borderRadius="0" v-if="ads"></u-swiper> -->
			<block v-if="ads && ads.image">
				<u-image :src="host+ads.image" height="300" mode="aspectFill" @click="toDetail(ads.link)"></u-image>
			</block>
			<view class="selector" v-if="group.length>0">
				<u-dropdown ref="uDropdown">
					<u-dropdown-item :title="item.k" v-for="(item,index) in group" :key="index">
						<scroll-view scroll-y="true">
							<view class="options" @click="select(index,k)" v-for="(v,k) in item.v">{{v}}</view>
						</scroll-view>
					</u-dropdown-item>
				</u-dropdown>
			</view>
			<view class="u-p-20">
				<xidicms-info-list :list="dataList"></xidicms-info-list>
			</view>
		</z-paging>
		<xidicms-loading :show="showLoading"></xidicms-loading>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showLoading: true,
				group: [],
				dataList: [],
				keywords: [],
				ads: null,
				selectKey: [],
				id: 0,
			}
		},
		onLoad(e) {
			this.id = e.id
		},

		methods: {
			queryList(pageNo, pageSize) {
				const params = {
					page: pageNo,
					num: pageSize,
					pid: this.id,
					keywords: this.selectKey
				}
				this.api.infoList(params).then(data => {
					if (this.$u.test.isEmpty(this.keywords)) {
						uni.setNavigationBarTitle({
							title: data.group.name
						})
						if (data.group.paramjson == '') {
							data.group = []
						} else {
							data.group = JSON.parse(data.group.paramjson)
						}
						data.group.map(item => {
							item.v = item.v.split(',')
						})
						this.group = data.group
						this.ads = data.ads
						// this.ads = data.ads.map(item => {
						// 	item.image = this.host + item.image
						// 	return item
						// })
					}
					data.list.map(item => {
						item.tags = Object.values(JSON.parse(item.tagsjson))
						if (item.images != '') {
							item.images = item.images.split(',')[0]
						}
					})
					this.$refs.paging.complete(data.list);
					setTimeout(() => {
						this.showLoading = false
					}, 800)
				})
			},
			toDetail(e){
				console.log(e)
				uni.navigateTo({
					url:e
				})
			},

			select(father, son) {
				this.group[father]['k'] = this.group[father]['v'][son]
				this.keywords.map((value, key) => {
					if (value.split('-')[0] == father) {
						this.keywords.splice(key, 1)
					}
				})
				this.keywords.push(father + '-' + son)
				this.selectKey = []
				this.keywords.map(item => {
					var arr = item.split('-')
					this.selectKey.push(this.group[arr[0]]['v'][arr[1]])
				})
				this.$refs.uDropdown.close();
				this.$refs.paging.reload();
			}
		}
	}
</script>

<style>
	.options {
		background: #fff;
		padding: 20upx;
	}

	.selector {
		background: #fff;
		box-shadow: 0 4upx 20upx 2upx #eee;
		position: sticky;
		top: 0;
		z-index: 99;
	}
</style>