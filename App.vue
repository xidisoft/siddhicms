<script>
	export default {
		globalData: {
			unread: 0,
			message: []
		},
		onLaunch() {
			uni.onTabBarMidButtonTap(() => {
				uni.navigateTo({
					url: '/pages/create/choose'
				})
			})
			if (uni.getStorageSync('userInfo').token) {
				this.openSocket()
				this.api.unread().then(data => {
					getApp().globalData.unread = data
					this.setBridge()
				})
			}
		},
		methods: {
			openSocket() {
				uni.connectSocket({
					url: 'ws://106.14.156.8:8282'
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
					// console.log(res)
					var that = this;
					var page = getCurrentPages()
					res.data = JSON.parse(res.data)
					switch (res.data.type) {
						case 'bind':
							that.api.bind({
								client_id: res.data.client_id
							})
							break;
						case 'ping':
							break;
						case 'say':
							uni.$emit('receive-msg', res.data)
							var music = uni.createInnerAudioContext()
							music.src = '/static/receive.mp3'
							music.play()
							getApp().globalData.message.push(res.data)
							getApp().globalData.unread++
							this.setBridge()
							break;
					}
				});
				uni.onSocketClose((res) => {
					that.openSocket()
				})
			},
			setBridge() {
				var count = getApp().globalData.unread
				if (count > 0) {
					uni.setTabBarBadge({
						index: 2,
						text: count.toString()
					})
				} else {
					uni.removeTabBarBadge({
						index: 2
					})
				}
			}
		}
	}
</script>
<style lang="scss">
	@import "uview-ui/index.scss";

	view,
	text {
		font-size: 32upx;
	}
</style>