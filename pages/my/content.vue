<template>
	<view>
		<view style="position: sticky;top: 0;z-index: 99;">
			<u-tabs :list="list" :current="current" :is-scroll="false" bg-color="#f3f3f3" @change="changetabs"></u-tabs>
		</view>
		<block v-if="current==0">
			<z-paging ref="paging" v-model="dataList" @query="queryList" use-page-scroll auto-show-back-to-top>
				<u-empty slot="empty" mode="list" text="你还没有发布任何内容" src="/static/imgs/nodata.png" icon-size="300">
					<view slot="bottom">
						<u-button shape="circle" type="primary" size="mini" @click="toCreate">立即发布</u-button>
					</view>
				</u-empty>
				<navigator :url="'/pages/index/detail?id='+item.id" hover-class="none" class="u-p-20"
					v-for="(item,index) in dataList">
					<view class="info-item">
						<view class="u-flex-1">
							<view class="u-line-2">
								<text class="group" @click.stop="toGroup(item.group_id)">{{item.name}}</text>
								<text class="group is-top" v-if="item.is_top==1">置顶</text>
								<text class="u-font-xl">{{item.title}}</text>
							</view>
							<view class="tags">
								<text class="tag" v-for="v in item.tags">{{v}}</text>
							</view>
						</view>
						<image :src="item.images" mode="aspectFill" v-if="item.images"></image>
					</view>
					<view class="u-tips-color u-m-b-20">
						<text class="u-font-xs u-m-r-40">浏览量：{{item.pv}}</text>
						<text class="u-font-xs">更新时间：{{$u.timeFrom(item.updatetime)}}</text>
					</view>
					<u-button type="error" size="mini" :custom-style="{marginRight:'20upx'}"
						@click="showQrcode=true">置顶</u-button>
					<u-button size="mini" @click="edit(item.id)">编辑</u-button>
					<u-button size="mini" @click="update(item.id)" :custom-style="{margin:'20upx'}">更新</u-button>
					<u-button size="mini" @click="remove(index)">删除</u-button>
				</navigator>

				<u-popup v-model="showQrcode" mode="center" length="50%" border-radius="10">
					<view class="u-p-20 u-text-center u-font-xl">
						<u-alert-tips type="warning" show-icon title="置顶请联系管理员"></u-alert-tips>
						<image src="/static/imgs/qrcode.jpg" mode="widthFix" style="width: 100%;margin-top: 20upx;">
						</image>
					</view>
				</u-popup>
			</z-paging>
		</block>
		<block v-if="current==1">
			<z-paging ref="forum" v-model="forumList" @query="getForum" use-page-scroll auto-show-back-to-top>
				<view class="u-p-20" v-for="(item,index) in forumList" @click="todetail(item.id)">
					<view class="u-flex u-row-between" @click.stop="showMenu(item,index)">
						<view class="u-tips-color u-font-xs">{{$u.timeFrom(item.updatetime)}}</view>
						<u-icon name="more-dot-fill"></u-icon>
					</view>
					<view class="u-p-t-20 u-p-b-20">
						<rich-text class="u-line-2" :nodes="item.content"></rich-text>
					</view>
					<view class="u-flex u-flex-wrap">
						<block v-for="img in item.images">
							<image :src="host+img" mode="aspectFill"
								:class="{'image':true,'more':item.images.length>1}"></image>
						</block>
					</view>
					<view class="u-flex u-p-t-40">
						<u-icon name="chat" :label="item.comments||'评论'" :customStyle="{marginRight:'40upx'}"></u-icon>
						<u-icon name="eye" :label="item.pv"></u-icon>
						<view class="u-flex-1 u-text-right" @click.stop="share(item)">
							<u-icon name="share" label="分享"></u-icon>
						</view>
					</view>
				</view>
			</z-paging>
		</block>
		<xidicms-loading :show="showLoading"></xidicms-loading>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showLoading: true,
				dataList: [],
				forumList: [],
				showQrcode: false,
				list: [{
						name: '我发布的信息'
					},
					{
						name: '我发布的分享'
					}
				],
				current: 0
			}
		},

		methods: {
			changetabs(e) {
				this.current = e
				this.$nextTick(()=>{
					if (this.current == 0) {
						this.$refs.paging.reload()
					} else {
						this.$refs.forum.reload()
					}
				})
			},
			queryList(page, num) {
				this.api.myInfo({
					page: page,
					num: num,
					type: this.current
				}).then(data => {
					data.map((item) => {
						item.tags = Object.values(JSON.parse(item.tagsjson))
						if (item.images != '') {
							item.images = this.host + item.images.split(',')[0]
						}
					})
					this.$refs.paging.complete(data);
					setTimeout(() => {
						this.showLoading = false
					}, 800)
				})
			},
			getForum(page, num) {
				this.api.myInfo({
					page: page,
					num: num,
					type: this.current
				}).then(data => {
					data.map((item) => {
						item.images = item.images == '' ? [] : item.images.split(',')
					})
					this.$refs.forum.complete(data);
				})
			},
			edit(id) {
				uni.navigateTo({
					url: '/pages/create/edit?id=' + id
				})
			},
			remove(index) {
				var that = this
				uni.showModal({
					title: '确定要删除吗？',
					success(res) {
						if (res.confirm) {
							that.api.delete({
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
			update(e) {
				this.api.refresh({
					id: e
				}).then(data => {
					var that = this
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
			},
			toGroup(id) {
				uni.navigateTo({
					url: '/pages/index/group?id=' + id
				})
			},
			toCreate() {
				uni.navigateTo({
					url: '/pages/create/choose'
				})
			},
			share(e) {
				uni.setClipboardData({
					data: e.content.substr(0, 20) + '...，' + this.host + '/index.html#/pages/forum/detail?id=' + e
						.id,
					success() {
						uni.$u.toast('分享链接已复制')
					}
				})
			},

			todetail(id) {
				uni.navigateTo({
					url: '/pages/forum/detail?id=' + id
				})
			},

			showMenu(item, index) {
				var that = this
				uni.showActionSheet({
					itemList: ['刷新', '删除'],
					success: function(res) {
						if (res.tapIndex == 0) {
							uni.api.refreshForum({
								id: item.id
							}).then(data => {
								uni.showModal({
									title: '更新成功',
									showCancel: false,
									success(res) {
										if (res.confirm) {
											that.$refs.forum.reload();
										}
									}
								})
							})
						}
						if (res.tapIndex == 1) {
							uni.showModal({
								title: '确定要删除吗？',
								success(res) {
									if (res.confirm) {
										that.api.deleteForum({
											id: that.forumList[index].id
										}).then(data => {
											that.forumList.splice(index, 1)
											uni.showToast({
												title: '删除成功'
											})
										})
									}
								}
							})
						}
					}
				});
			}


		}
	}
</script>

<style lang="scss" scoped>
	navigator {
		border-bottom: solid 1px #eee;
	}

	.info-item {
		display: flex;
		padding-top: 20upx;
	}

	.info-item>image {
		display: block;
		width: 200upx;
		height: 160upx;
		border-radius: 10upx;
		margin-left: 10upx;
	}

	.group {
		background: $siddhi-theme;
		color: #fff;
		font-size: 26upx;
		padding: 4upx 10upx;
		line-height: 1rem;
		border-radius: 6upx;
		margin-right: 6upx;
	}

	.is-top {
		background: red;
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		margin: 10upx auto;
	}

	.tag {
		background: #ecf5ff;
		color: $siddhi-theme;
		font-size: 28upx;
		padding: 4upx 10upx;
		margin-right: 10upx;
		margin-bottom: 10upx;
	}

	.image {
		flex: 1;
		width: 100%;
		border-radius: 10upx;
		margin-right: 10upx;
	}

	.more {
		flex: unset;
		width: 200upx;
		height: 200upx;
		margin-bottom: 10upx;
	}
</style>