<template>
	<view>
		<scroll-view class="msg-list" scroll-y="true" :scroll-with-animation="scrollAnimation" :scroll-top="scrollTop"
			:scroll-into-view="scrollToView" @scrolltoupper="loadmore" @touchstart="hideDrawer">
			<!-- 加载历史数据waitingUI -->
			<view class="loading" v-if="!nomore">
				<view class="rect1"></view>
				<view class="rect2"></view>
				<view class="rect3"></view>
				<view class="rect4"></view>
				<view class="rect5"></view>
			</view>
			<view class="row" v-for="(row,index) in msgList" :key="index" :id="'msg'+row.id">
				<!-- 自己发出的消息 -->
				<view class="my" v-if="row.user_id==myself.id">
					<view class="left">
						<view v-if="row.image==''" class="bubble">
							<rich-text :nodes="row.content"></rich-text>
						</view>
						<view v-else class="bubble img" @tap="showPic(row.image)">
							<image :src="row.image" mode="aspectFit"></image>
						</view>
					</view>
					<view class="right">
						<image :src="myself.avatar==''?'/static/icons/avatar.jpg':myself.avatar" mode="aspectFill">
						</image>
					</view>
				</view>
				<!-- 别人发出的消息 -->
				<view class="other" v-if="row.user_id==recipient.id">
					<!-- 左-头像 -->
					<view class="left">
						<image :src="recipient.avatar==''?'/static/icons/avatar.jpg':recipient.avatar"
							mode="aspectFill"></image>
					</view>
					<!-- 右-用户名称-时间-消息 -->
					<view class="right">
						<view class="username">
							<view class="name">{{recipient.nickname}}</view>
							<view class="time">{{$u.timeFrom(row.createtime)}}</view>
						</view>
						<!-- 文字消息 -->
						<view v-if="row.image==''" class="bubble">
							<rich-text :nodes="row.content"></rich-text>
						</view>
						<!-- 图片消息 -->
						<view v-else class="bubble img" @tap="showPic(row.image)">
							<image :src="row.image" mode="aspectFit"></image>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>

		<!-- 抽屉栏 -->
		<view class="popup-layer" :class="popupLayerClass">
			<!-- 表情 -->
			<swiper class="emoji-swiper" :class="{hidden:hideEmoji}" indicator-dots="true" duration="150">
				<swiper-item v-for="(page,pid) in emojiList" :key="pid">
					<view v-for="(em,eid) in page" :key="eid" @tap="addEmoji(em)">
						<image mode="widthFix" :src="'/static/emoji/'+em.url"></image>
					</view>
				</swiper-item>
			</swiper>
			<!-- 更多功能 相册-拍照 -->
			<view class="more-layer" :class="{hidden:hideMore}">
				<view class="list">
					<view class="box" @tap="getImage('album')">
						<view class="icon tupian2"></view>
					</view>
					<view class="box" @tap="getImage('camera')">
						<view class="icon paizhao"></view>
					</view>
				</view>
			</view>
		</view>
		<!-- 底部输入栏 -->
		<view class="input-box" :class="popupLayerClass">
			<view class="add-icon">
				<view class="icon add" @tap="showMore"></view>
			</view>
			<view class="text-mode">
				<textarea auto-height v-model="textMsg" @focus="textareaFocus" />
				<view class="u-p-r-10">
					<view class="icon biaoqing" @tap="chooseEmoji"></view>
				</view>
			</view>
			<button type="primary" size="mini" @tap="sendText('')" v-if="!$u.test.isEmpty(textMsg)">发送</button>
		</view>
	</view>
</template>
<script>
	import emoji from '@/common/emoji.js'
	export default {
		data() {
			return {
				recipient: {}, //接收者
				textMsg: '', //文字消息
				isHistoryLoading: false, //消息列表
				scrollAnimation: false,
				scrollTop: 0,
				scrollToView: '',
				msgList: [],
				image: '',
				myself: uni.getStorageSync('userInfo'),
				popupLayerClass: '', // 抽屉参数
				hideMore: true, // more参数
				hideEmoji: true, //表情定义
				page: 0,
				nomore: false
			};
		},

		computed: {
			emojiList() {
				var chunk = 24;
				var result = [];
				for (let i = 0; i < emoji.list.length; i += chunk) {
					result.push(emoji.list.slice(i, i + chunk)) // 每10项分成一组        
				}
				return result
			}
		},
		async onLoad(e) {
			const chatInfo = await this.api.record({
				id: e.id,
				page: this.page
			})
			chatInfo.record.map(item => {
				if (item.content != '') {
					item.content = this.replaceEmoji(item.content)
				}
			})
			this.recipient = chatInfo.recipient
			uni.setNavigationBarTitle({
				title: '与' + this.recipient.nickname + '聊天中'
			})
			this.msgList = chatInfo.record.reverse()
			if (this.msgList.length == 0 || this.msgList.length < 10) {
				this.nomore = true
			}
			this.$nextTick(function() { //进入页面滚动到底部
				this.scrollTop = 9999;
				this.$nextTick(function() {
					this.scrollAnimation = true;
				});
			});
			this.openSocket()
		},

		methods: {
			openSocket() {
				var that = this;
				uni.connectSocket({
					url: 'ws://47.100.225.253:7272'
				});
				uni.onSocketError((res) => {
					uni.$u.toast('网络连接失败,请重试')
				});
				uni.onSocketOpen((res) => {
					setInterval(() => {
						uni.sendSocketMessage({
							data: `{"type":"pong"}`
						})
					}, 20000)
				});
				uni.onSocketMessage((res) => {
					res.data = JSON.parse(res.data)
					switch (res.data.type) {
						case 'bind':
							that.api.bind({
								client_id: res.data.client_id
							})
							break;
						case 'ping':
							break;
						default:
							uni.$emit('receive-msg', res.data)
							var music = uni.createInnerAudioContext()
							music.src = '/static/receive.mp3'
							music.play()
							let lastid = 0;
							if (that.msgList.length > 0) {
								lastid = that.msgList[that.msgList.length - 1].id;
							}
							lastid++;
							res.data.id = lastid;
							res.data.content = that.replaceEmoji(res.data.content);
							that.receiveMsg(res.data)
							break;
					}
				});
				uni.onSocketClose((res) => {
					that.openSocket()
				})
			},

			// 发送文字消息
			sendText(img = '') {
				this.hideDrawer(); //隐藏抽屉
				var that = this
				this.api.send({
					recipient: this.recipient.id,
					content: this.textMsg,
					image: this.image
				}).then(data => {
					console.log('online', data)
					that.sendMsg(img);
					that.textMsg = ''; //清空输入框
					that.image = ''
				})
			},
			// 发送消息
			sendMsg(img) {
				let lastid = 0
				if (this.msgList.length > 0) {
					lastid = this.msgList[this.msgList.length - 1].id;
					lastid++
				}
				this.receiveMsg({
					id: lastid,
					user_id: this.myself.id,
					content: this.textMsg == '' ? '' : this.replaceEmoji(this.textMsg),
					image: img
				});
			},

			// 接收消息(筛选处理)
			receiveMsg(msg) {
				this.msgList.push(msg);
				//对方发来消息时 震动
				if (msg.uid == this.recipient.id) {
					console.log('振动');
					uni.vibrateLong();
				}
				this.$nextTick(function() { // 滚动到底
					this.scrollToView = 'msg' + msg.id
				});
			},
			//下拉加载聊天记录
			loadmore(e) {
				if (this.isHistoryLoading) {
					return;
				}
				this.page++;
				this.isHistoryLoading = true; //参数作为进入请求标识，防止重复请求
				this.scrollAnimation = false; //关闭滑动动画
				let Viewid = this.msgList[0].id; //记住第一个信息ID
				this.api.record({ //分页加载
					id: this.recipient.id,
					page: this.page
				}).then(data => {
					data.map(item => {
						if (item.content != '') {
							item.content = this.replaceEmoji(item.content)
						}
					})
					this.msgList = [...data.reverse(), ...this.msgList]
					this.$nextTick(function() {
						this.scrollToView = 'msg' + Viewid; //跳转上次的第一行信息位置
						this.$nextTick(function() {
							this.scrollAnimation = true; //恢复滚动动画
						});
					});
					if (data.length < 10 || data.length == 0) {
						this.nomore = true
						return uni.$u.toast('没有更多了')
					}
					this.isHistoryLoading = false;
				})
			},

			//更多功能(点击+弹出) 
			showMore() {
				this.hideEmoji = true;
				if (this.hideMore) {
					this.hideMore = false;
					this.openDrawer();
				} else {
					this.hideDrawer();
				}
			},
			// 打开抽屉
			openDrawer() {
				this.popupLayerClass = 'showLayer';
			},
			// 隐藏抽屉
			hideDrawer() {
				this.popupLayerClass = '';
				setTimeout(() => {
					this.hideMore = true;
					this.hideEmoji = true;
				}, 150);
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
							that.image = result.data.fullurl
							that.sendText(res.tempFilePaths[i]);
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
								// reject(data)
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
					this.openDrawer();
				} else {
					this.hideDrawer();
				}
			},
			//添加表情
			addEmoji(em) {
				this.textMsg += em.alt;
			},

			//获取焦点，如果不是选表情ing,则关闭抽屉
			textareaFocus() {
				if (this.popupLayerClass == 'showLayer' && this.hideMore == false) {
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
			showPic(url) {
				uni.previewImage({
					current: url,
					urls: [url]
				});
			}

		}
	}
</script>
<style lang="scss" scoped>
	@import "@/static/css/style.scss";
</style>