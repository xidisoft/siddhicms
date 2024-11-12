<template>
	<z-paging ref="paging" v-model="dataList" use-page-scroll use-chat-record-mode @query="queryList" :auto="false">
		<!-- 聊天item -->
		<view :id="`z-paging-${index}`" v-for="(item,index) in dataList" :key="index" @touchstart="hideDrawer">
			<view class="chat-item">
				<text class="chat-time" v-if="checkTime(index)">{{$u.timeFrom(item.createtime)}}</text>
				<view class="u-flex u-col-top me" v-if="item.user_id==me.id">
					<u-avatar :src="host+me.avatar"></u-avatar>
					<view class="u-m-r-20 u-m-l-20">
						<view :class="{'chat-content':true,'my-bg':true,'image-bg':item.image!=''}">
							<rich-text :nodes="item.content" v-if="item.image==''"></rich-text>
							<image :src="host+item.image" mode="aspectFit" class="chat-image"
								@click="preview(host+item.image)" v-else></image>
						</view>
					</view>
				</view>
				<view class="u-flex u-col-top" v-else>
					<u-avatar :src="host+to.avatar"></u-avatar>
					<view class="u-m-r-20 u-m-l-20">
						<text class="u-tips-color">{{to.nickname}}</text>
						<view :class="{'chat-content':true,'image-bg':item.image!=''}">
							<rich-text :nodes="item.content" v-if="item.image==''"></rich-text>
							<image :src="host+item.image" mode="aspectFit" class="chat-image"
								@click="preview(host+item.image)" v-else></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 底部聊天输入框 -->
		<view slot="bottom">
			<view class="chat-input-bar">
				<u-icon name="plus-circle" size="70" color="#777" @click="showMore"></u-icon>
				<textarea v-model="inputContent" class="chat-input" :cursor-spacing="20" auto-height confirm-type="send"
					@focus="hideDrawer" @confirm="sendMsg" />

				<image :src="'/static/emoji/'+emojiList[0][0].url" mode="widthFix" class="emoji-btn"
					@click="chooseEmoji"></image>
				<view class="u-m-l-20" v-if="!$u.test.isEmpty(inputContent)">
					<u-button type="primary" size="mini" @click="sendMsg">发送</u-button>
				</view>
			</view>
			<swiper :class="{hidden:hideEmoji}" indicator-dots duration="150">
				<swiper-item v-for="(page,pid) in emojiList" :key="pid">
					<view v-for="(em,eid) in page" :key="eid">
						<image mode="widthFix" :src="'/static/emoji/'+em.url" @tap="addEmoji(em)"></image>
					</view>
				</swiper-item>
			</swiper>
			<view :class="{'more-menu':true,'hidden':hideMore}">
				<view class="menu-item" @click="getImage('album')">
					<u-icon name="photo" size="60"></u-icon>
				</view>
				<view class="menu-item" @click="getImage('camera')">
					<u-icon name="camera-fill" size="60"></u-icon>
				</view>
			</view>
		</view>
	</z-paging>
</template>
<script>
	import emoji from '@/common/emoji.js'
	export default {
		data() {
			return {
				dataList: [], //聊天记录
				me: uni.getStorageSync('userInfo'), //发送者
				to: {}, //接收者
				inputContent: '', //文字消息
				image: '', //发送图片
				hideMore: true, // more参数
				hideEmoji: true, //表情定义
			};
		},
		computed: { //计算属性
			emojiList() {
				var chunk = 24;
				var result = [];
				for (let i = 0; i < emoji.list.length; i += chunk) {
					result.push(emoji.list.slice(i, i + chunk)) // 每页24个表情      
				}
				return result
			}
		},
		onPageScroll(e) {
			if (e.scrollTop < 10) {
				this.$refs.paging.doChatRecordLoadMore();
			}
		},

		onUnload() {
			uni.$off('receive-msg')
		},
		onLoad(e) {
			uni.$on('receive-msg', data => {
				data.content = this.replaceEmoji(data.content);
				this.$refs.paging.addChatRecordData(data)
			})
			this.api.record({
				page: 0,
				num: 10,
				id: e.id
			}).then(data => {
				if (this.$u.test.isEmpty(data.recipient)) {
					return this.$u.toast('用户不存在')
				}
				this.to = data.recipient
				uni.setNavigationBarTitle({
					title: '与' + this.to.nickname + '聊天中'
				})
				data.record.map(item => {
					if (item.content != '') {
						item.content = this.replaceEmoji(item.content)
					}
				})
				this.$refs.paging.complete(data.record);
			})
		},
		methods: {
			checkTime(e) { //相隔半小时显示时间
				if (e < this.dataList.length - 1) {
					if (this.dataList[e]['createtime'] + 300 < this.dataList[e + 1]['createtime']) {
						return true
					} else {
						return false
					}
				}
			},
			queryList(p, n) {
				let params = {
					page: p,
					num: n,
					id: this.to.id
				}
				this.api.record(params).then(data => {
					data.record.map(item => {
						if (item.content != '') {
							item.content = this.replaceEmoji(item.content)
						}
					})
					this.$refs.paging.complete(data.record);
				})
			},
			// 发送文字消息
			sendMsg() {
				this.hideDrawer(); //隐藏抽屉
				if (this.inputContent == '' && this.image == '') {
					return this.$u.toast('消息不能为空')
				}
				if (this.$u.test.isEmpty(this.to)) {
					return this.$u.toast('用户不存在')
				}

				var params = {
					recipient: this.to.id,
					content: this.inputContent,
					image: this.image,
					user_id: this.me.id
				}
				this.api.send(params).then(data => {
					params.content = this.inputContent == '' ? this.inputContent : this.replaceEmoji(this
						.inputContent)
					this.$refs.paging.addChatRecordData(params)
					this.inputContent = '' //清空输入框
					this.image = ''
				})
			},

			//更多功能(点击+号) 
			showMore() {
				this.hideEmoji = true;
				if (this.hideMore) {
					this.hideMore = false;
				} else {
					this.hideDrawer();
				}
			},

			// 隐藏抽屉
			hideDrawer() {
				this.hideMore = true;
				this.hideEmoji = true;
			},

			//选照片 or 拍照
			getImage(type) {
				var that = this
				this.hideDrawer();
				uni.chooseImage({
					sourceType: [type],
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					success: async (res) => {
						for (var i = 0; i < res.tempFilePaths.length; i++) {
							const result = await that.uploadImage(res.tempFilePaths[i])
							that.image = result.data.url
							that.sendMsg();
						}
					}
				});
			},
			/* 上传图片 */
			uploadImage: (url) => {
				return new Promise((resolve, reject) => {
					uni.uploadFile({
						url: uni.$u.http.config.baseUrl + '/api/common/upload',
						filePath: url,
						name: 'file',
						header: {
							token: uni.getStorageSync('userInfo').token
						},
						success: (res) => {
							let data = JSON.parse(res.data);
							if (res.statusCode === 200 && data.code === 1) {
								resolve(data)
							} else {
								uni.$u.toast(data.msg)
								return new Promise(() => {})
							}
						}
					});
				})
			},
			// 选择表情
			chooseEmoji() {
				this.hideMore = true;
				if (this.hideEmoji) {
					this.hideEmoji = false;
				} else {
					this.hideDrawer();
				}
			},
			//添加表情
			addEmoji(em) {
				this.inputContent += em.alt;
			},

			//获取焦点，如果不是选表情ing,则关闭抽屉
			textareaFocus() {
				if (this.hideMore == false) {
					this.hideDrawer();
				}
			},

			//替换表情符号为图片
			replaceEmoji(str) {
				return str.replace(/\[([^(\]|\[)]*)\]/g, item => {
					for (let i = 0; i < emoji.list.length; i++) {
						let row = emoji.list[i];
						if (row.alt == item) {
							return `<img src="/static/emoji/${row.url}" style="vertical-align: middle;">`;
						}
					}
				});
			},
			// 预览图片
			preview(url) {
				uni.previewImage({
					current: url,
					urls: [url]
				});
			}
		}
	}
</script>
<style lang="scss" scoped>
	.chat-item {
		display: flex;
		flex-direction: column;
		padding: 20rpx;
	}

	.chat-time {
		padding: 4rpx 0rpx;
		text-align: center;
		font-size: 22rpx;
		color: #aaaaaa;
	}

	.me {
		flex-direction: row-reverse;
	}

	.chat-content {
		background-color: #f1f1f1;
		border-radius: 8rpx;
		padding: 10rpx 14rpx;
		margin-top: 10rpx;
		margin-right: 80upx;
	}

	.my-bg {
		background-color: #00aa00;
		color: #fff;
		margin-right: 0;
		margin-left: 80upx;
	}

	.image-bg {
		background: transparent;
	}

	.chat-image {
		max-width: 350upx;
		max-height: 350upx;
	}

	.chat-input-bar {
		display: flex;
		flex-direction: row;
		align-items: center;
		border-top: solid 1px #eee;
		background-color: #f5f5f5;
		padding: 20upx;
		margin: 0;
	}

	.chat-input {
		flex: 1;
		padding: 12upx 20upx;
		margin: 0 20upx;
		background-color: #fff;
		border-radius: 10rpx;
	}

	.emoji-btn {
		width: 30px;
		height: 30px;
	}

	.more-menu {
		background: #fff;
		display: flex;
		padding: 20upx;
		margin: 0;
	}

	.menu-item {
		background: #eee;
		border-radius: 10upx;
		padding: 30upx;
		margin: 20upx;
	}

	swiper {
		background: #fff;
		height: 43vw;

		swiper-item {
			display: flex;
			align-content: flex-start;
			justify-content: center;
			flex-wrap: wrap;

			image {
				width: 12vw;
				height: 12vw;
				padding: 2vw;
				box-sizing: border-box;
			}
		}
	}

	.hidden {
		display: none;
	}
</style>