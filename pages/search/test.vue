<!-- 聊天记录模式演示(vue)，vue中目前无法解决分页闪动问题，使用nvue可实现聊天记录无闪动分页 -->
<template>
	<view class="content">
		<z-paging ref="paging" v-model="dataList" use-page-scroll use-chat-record-mode @query="queryList">
			<!-- 聊天item -->
			<view :id="`z-paging-${index}`" v-for="(item,index) in dataList" :key="index">
				<view class="chat-item">
					<text class="chat-time" v-if="item.time&&item.time.length">
						{{item.time}}
					</text>
					<view :class="{'chat-container':true,'chat-location-me':item.isMe}">
						<view class="chat-icon-container">
							<image class="chat-icon" :src="item.icon" mode="aspectFill" />
						</view>
						<view class="chat-content-container">
							<text :class="{'chat-user-name':true,'chat-location-me':item.isMe}">
								{{item.name}}
							</text>
							<view :class="{'chat-text-container':true,'chat-text-container-me':item.isMe}">
								<text :class="{'char-text':true,'char-text-me':item.isMe}">{{item.content}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>

			<!-- 底部聊天输入框 -->
			<template #bottom>
				<view class="chat-input-bar">
					
					<view class="chat-input-container">
						<input class="chat-input" v-model="input" :cursor-spacing="20" confirm-type="send" type="text"
							placeholder="请输入内容" @confirm="doSend">
					</view>
					<view class="chat-input-send" @click="doSend">
						<text class="chat-input-send-text">发送</text>
					</view>
				</view>
			</template>
		</z-paging>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//v-model绑定的这个变量不要在分页请求结束中自己赋值！！！
				dataList: [],
				chat:[],
				input: '',
				newses: [
					'神舟十三凯旋归来，神舟十四号正在进行紧锣密鼓地组装和测试。',
					'差不多3个小时的等待后，终于等来了警察。',
					'根据世卫组织最新实时统计数据，截至欧洲中部夏令时间4月29日17时47分',
					'话剧《简·爱》经典再启 朱杰濮存昕携手演绎',
					'年初北京冬奥会，中国男冰首次参赛，虽没能拿到一场胜利，',
					'中国物流与采购联合会、国家统计局服务业调查中心今天（4月30日）发布，',
					'德国化工巨头巴斯夫官网4月29日消息，2022年一季度，公司实现销售额230.83亿欧元',
					'北京时间2022年4月30日11时30分，我国在东海海域使用长征十一号海射遥三火箭发射吉林卫星，',
					'人民日报写在“五一”国际劳动节：团结奋斗，在新征程上创造新的历史伟业'
				]
			}
		},
		onPageScroll(e) {
			//如果滚动到顶部，触发加载更多聊天记录
			if (e.scrollTop < 10) {
				console.log('top')
				this.$refs.paging.doChatRecordLoadMore();
			}
		},
		methods: {
			queryList(pageNo, pageSize) {
				const params = {
					pageNo: pageNo,
					pageSize: pageSize,
				}
				setTimeout(() => {
					this.newses.map(item => {
						console.log(item)
						item = {
							name: '哆啦A梦',
							icon: '/static/duola.jpg',
							content: item,
							isMe: false
						};
						this.chat.push(item)
					})
					console.log(this.chat)

					this.$refs.paging.complete(this.chat);
				}, 1000)
			},
			doSend(msg) {
				uni.showLoading({
					title: '发送中...'
				})
				setTimeout(() => {
					uni.hideLoading();
					this.$refs.paging.addChatRecordData({
						time: '现在',
						icon: '/static/daxiong.jpg',
						name: '大雄',
						content: this.input,
						isMe: true
					});
				}, 500)
			}
		}
	}
</script>

<style>
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

	.chat-container {
		display: flex;
		flex-direction: row;
	}

	.chat-location-me {
		flex-direction: row-reverse;
		text-align: right;
	}

	.chat-icon-container {
		margin-top: 12rpx;
	}

	.chat-icon {
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
		background-color: #eeeeee;
	}

	.chat-content-container {
		margin: 0rpx 15rpx;
	}

	.chat-user-name {
		font-size: 26rpx;
		color: #888888;
	}

	.chat-text-container {
		background-color: #f1f1f1;
		border-radius: 8rpx;
		padding: 10rpx 15rpx;
		margin-top: 10rpx;
		/* #ifndef APP-NVUE */
		max-width: 500rpx;
		/* #endif */
	}

	.chat-text-container-me {
		background-color: #007AFF;
	}

	.char-text {
		font-size: 28rpx;
		/* #ifndef APP-NVUE */
		word-break: break-all;
		/* #endif */
		/* #ifdef APP-NVUE */
		max-width: 500rpx;
		/* #endif */
	}

	.char-text-me {
		color: white;
	}

	.chat-input-bar {
		display: flex;
		flex-direction: row;
		align-items: center;
		border-top: solid 1px #f5f5f5;
		background-color: #f8f8f8;
		padding: 10rpx 15rpx;
		position: relative;
	}

	.chat-input-container {
		flex: 1;
		display: flex;
		/* #ifndef APP-NVUE */
		padding: 15rpx;
		/* #endif */
		/* #ifdef APP-NVUE */
		padding: 10rpx;
		/* #endif */
		background-color: white;
		border-radius: 10rpx;
	}

	.chat-input {
		flex: 1;
		font-size: 28rpx;
	}

	.chat-input-send {
		background-color: #007AFF;
		margin: 10rpx 10rpx 10rpx 20rpx;
		border-radius: 10rpx;
		padding: 10rpx 30rpx;

	}

	.chat-input-send-text {
		color: white;
		font-size: 26rpx;
	}
</style>