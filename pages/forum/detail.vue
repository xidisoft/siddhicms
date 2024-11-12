<template>
	<view>
		<view class="u-flex u-p-20 u-border-bottom">
			<u-avatar :src="host+forum.avatar"></u-avatar>
			<view class="u-flex-1 u-flex u-row-between u-p-l-20">
				<view>
					<view class="u-main-color">{{forum.nickname}}</view>
					<view class="u-tips-color u-font-md">{{$u.timeFrom(forum.createtime)}}</view>
				</view>
				<view><u-button type="warning" shape="circle" size="mini" @click="chat">私信</u-button></view>
			</view>
		</view>
		<view class="u-p-20">
			<rich-text style="line-height: 1.5em;" :nodes="forum.content"></rich-text>
		</view>
		<view class="u-p-20">
			<image :src="host+item" mode="widthFix" style="width: 100%;" v-for="item in forum.images"></image>
		</view>
		<view class="u-flex u-p-20">
			<u-icon name="chat" :label="forum.comments||'评论'" :customStyle="{marginRight:'40upx'}"></u-icon>
			<u-icon name="eye" :label="forum.pv"></u-icon>
			<view class="u-flex-1 u-text-right">
				<u-icon name="share" label="分享" @click="share"></u-icon>
			</view>
		</view>
		<u-gap bg-color="#f3f3f3"></u-gap>
		<view class="u-p-20">
			<u-section title="评论区" sub-title="查看更多"></u-section>
			<z-paging ref="paging" v-model="dataList" use-page-scroll @query="queryList">
				<view class="u-flex u-col-top u-p-t-40  u-p-b-20 u-border-bottom" v-for="item in dataList"
					@click="reply(item)">
					<u-avatar :src="host+item.avatar"></u-avatar>
					<view class="u-p-l-20">
						<view class="u-main-color">{{forum.user_id==item.user_id?'楼主':item.nickname}}</view>
						<view class="u-tips-color u-font-xs">{{$u.timeFrom(item.createtime)}}</view>
						<view class="u-p-t-20 wrap">{{item.content}}</view>
						<view class="u-flex u-col-top u-p-t-20" v-for="val in item.child">
							<u-avatar size="60" :src="host+val.avatar"></u-avatar>
							<view class="u-p-l-20">
								<view class="u-main-color">{{forum.user_id==val.user_id?'楼主':val.nickname}}</view>
								<view class="u-tips-color u-font-xs">{{$u.timeFrom(val.createtime)}}</view>
								<view class="u-p-t-20 wrap">{{val.content}}</view>
							</view>
						</view>
					</view>
				</view>
			</z-paging>
		</view>

		<u-gap height="200"></u-gap>
		<view class="right-menu">
			<view class="icons" @click="operate(1)"><u-icon name="home" size="40" color="#129db1"></u-icon></view>
			<view class="icons" @click="operate(2)"><u-icon name="chat" size="40" color="#129db1"></u-icon></view>
			<view class="icons" @click="operate(3)"><u-icon name="arrow-up" size="40" color="#129db1"></u-icon></view>
		</view>
		<view class="comment u-p-20 u-flex">
			<!-- <u-input v-model="input" border :placeholder="placeholder"></u-input> -->
			<u-search v-model="input" search-icon="chat" bg-color="#fff" :show-action="false"
				:placeholder="placeholder"></u-search>
			<u-button type="primary" :custom-style="{height:'35px','marginLeft':'20upx',borderRadius:'20px'}"
				v-if="input" @click="comment">评论</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				forum: {},
				input: '',
				dataList: [],
				id: 0,
				placeholder: '请输入评论内容',
				pid: 0
			}
		},
		onLoad(e) {
			this.id = e.id
			this.api.forumDetail({
				id: e.id
			}).then(data => {
				uni.setNavigationBarTitle({
					title: data.content.substr(0, 20) + '...'
				})
				data.images = data.images == '' ? [] : data.images.split(',')
				this.forum = data
			})
		},
		methods: {
			queryList(page, num) {
				const params = {
					page: page,
					num: num,
					id: this.id
				}
				this.api.getCommentList(params).then(data => {
					this.$refs.paging.complete(data);
				})
			},
			share() {
				uni.setClipboardData({
					data: this.forum.content.substr(0, 20) + '...，' + this.host +
						'/index.html#/pages/forum/detail?id=' + this.forum.id,
					success() {
						uni.$u.toast('分享链接已复制')
					}
				})
			},
			chat() {
				uni.navigateTo({
					url: '/pages/message/chat?id=' + this.forum.user_id
				})
			},

			comment() {
				this.api.comment({
					forum_id: this.forum.id,
					content: this.input,
					pid: this.pid
				}).then(data => {
					this.input = ''
					this.$refs.paging.reload();
					uni.$u.toast('评论成功')
				})
			},
			reply(e) {
				this.pid = e.id
				this.placeholder = '回复' + e.nickname
			},
			operate(e) {
				switch (e) {
					case 1:
						uni.switchTab({
							url: '/pages/index/index'
						})
						break;
					case 2:
						uni.navigateTo({
							url: '/pages/message/chat?id=' + this.forum.user_id
						})
						break;
					case 3:
						uni.pageScrollTo({
							scrollTop: 0
						})
						break;
				}
			}
		}
	}
</script>

<style>
	.comment {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background: #f3f3f3;
		z-index: 99;
	}

	.wrap {
		word-break: break-all;
		color: #666;
	}

	.right-menu {
		position: fixed;
		bottom: 200upx;
		right: 20upx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 260upx;
		z-index: 99;
	}

	.icons {
		background: rgba(0, 0, 0, 0.1);
		border-radius: 50%;
		padding: 10upx;
	}
</style>