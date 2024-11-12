<template>
	<view>
		<view class="u-p-20 u-p-b-40 u-flex u-col-top" v-for="item in list">
			<u-avatar :src="host+item.avatar"></u-avatar>
			<view class="u-p-l-20 u-p-r-20 u-flex-1">
				<view class="u-flex u-row-between" @click.stop="showMenu(item)">
					<view>
						<view class="u-main-color" style="font-weight: 300;">{{item.nickname}}</view>
						<view class="u-tips-color u-font-xs">{{$u.timeFrom(item.updatetime)}}</view>
					</view>
					<u-icon name="more-dot-fill" size="40" color="#999"></u-icon>
				</view>
				<view class="u-p-t-20 u-p-b-20" @click="todetail(item.id)">
					<rich-text class="u-line-2" :nodes="item.content"></rich-text>
				</view>
				<view class="u-flex u-flex-wrap">
					<image :src="img" mode="aspectFill" :class="{'image':true,'more':item.images.length>1}"
						@click="preview(index,item.images)" v-for="(img,index) in item.images" />
				</view>
				<view class="u-flex u-p-t-40">
					<u-icon name="chat" :label="item.comments||'评论'" color="#999" label-color="#999"
						:customStyle="{marginRight:'40upx'}"></u-icon>
					<u-icon name="eye" :label="item.pv" color="#999" label-color="#999"></u-icon>
					<view class="u-flex-1 u-text-right" @click.stop="share(item)">
						<u-icon name="share" label="分享" color="#999" label-color="#999"></u-icon>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "siddhicms-forum-list",
		props: {
			list: {
				type: Array,
				default () {
					return []
				}
			},
		},
		data() {
			return {};
		},
		methods: {
			todetail(id) {
				uni.navigateTo({
					url: '/pages/forum/detail?id=' + id
				})
			},
			preview(e, imgs) {
				console.log(e)
				uni.previewImage({
					current: e,
					urls: imgs

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
			showMenu(e) {
				uni.showActionSheet({
					itemList: ['关注', '私信'],
					success: function(res) {
						if (res.tapIndex == 0) {
							var user = uni.getStorageSync('userInfo')
							if (e.user_id == user.id) {
								return uni.$u.toast('不能关注自己')
							}
							uni.api.focus({
								other_id: e.user_id
							}).then(data => {
								uni.$u.toast('关注成功')
							})
						}
						if (res.tapIndex == 1) {
							uni.navigateTo({
								url: '/pages/message/chat?id=' + e.user_id
							})
						}
					}
				});
			}
		}
	}
</script>

<style>
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