<template>
	<view>
		<z-paging ref="pagePaging" auto-show-back-to-top @onRefresh="onRefresh" @scrolltolower="scrolltolower">
			<view class="city">
				<view class="u-p-r-20" @click="showAction=true">
					<u-icon name="map-fill" :label="city" color="red" label-color="#fff"></u-icon>
					<u-icon name="arrow-down" color="#ccc"
						:custom-style="{marginLeft:'10upx',fontSize:'20upx'}"></u-icon>
				</view>
				<u-search v-model="keyword" placeholder="请输入关键字" :action-style="{color:'#fff'}" @search="search"
					@custom="search"></u-search>
			</view>
			<view class="u-m-t-10">
				<u-swiper :list="ads" name="image" height="300" effect3d></u-swiper>
			</view>
			<u-gap height="10" bg-color="#f3f3f3"></u-gap>
			<u-grid :col="4">
				<u-grid-item v-for="(item,index) in hotGroup" @click="toGroup(item.id)" v-if="index<7">
					<image :src="host+item.image" mode="widthFix" class="group-icon"></image>
					<view class="u-font-sm">{{item.name}}</view>
				</u-grid-item>
				<u-grid-item @click="toGroup(0)">
					<image src="/static/imgs/more.png" mode="widthFix" class="group-icon"></image>
					<view class="u-font-sm">更多</view>
				</u-grid-item>
			</u-grid>

			<view class="merchant">
				<u-section title="本地商家" color="#129db1" @click="tomore"></u-section>
				<view class="u-flex" style="overflow-x: auto;">
					<view class="u-m-r-10 u-p-t-10" v-for="item in merchant" @click="toMerchant(item.id)">
						<view class="cover">
							<u-lazy-load :image="item.coverimage" height="160" img-mode="aspectFill"></u-lazy-load>
						</view>
						<view class="u-line-1 u-font-sm u-text-center" style="width: 140upx;font-weight: bold">
							{{item.name}}</view>
					</view>
				</view>
			</view>
			<view class="tabs">
				<u-tabs :list="group" active-color="#129db1" font-size="34" :current="current"
					@change="tabChange"></u-tabs>
			</view>

			<swiper class="swiper" :style="[{height:swiperHeight+'px'}]" :current="current"
				@animationfinish="swiperAnimationfinish">
				<swiper-item class="swiper-item" v-for="(item, index) in group" :key="index">
					<sticky-swiper ref="swiperList" :tabIndex="index" :currentIndex="current" :groupId="group[index].id"
						@heightChanged="heightChanged">
					</sticky-swiper>
				</swiper-item>
			</swiper>
		</z-paging>
		<u-popup v-model="showAction" mode="center" border-radius="10" length="80%">
			<view style="text-align: center;font-weight: bold;padding-top: 20upx">请选择地区站点</view>
			<view class="u-flex u-flex-wrap u-p-20">
				<view class="u-p-20" v-for="(item,index) in cities" @click="chooseity(index)">{{item.text}}</view>
			</view>
		</u-popup>
		<xidicms-loading :show="showLoading"></xidicms-loading>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				city: '墨西哥城',
				keyword: '',
				ads: [],
				merchant: [],
				hotGroup: [],
				group: [],
				current: 0,
				swiperHeight: 0,
				showLoading: true,
				showAction: false,
				cities: [{
					text: '中国',
				}, {
					text: '法国'
				}, {
					text: '德国'
				}, {
					text: '西班牙'
				}, {
					text: '墨西哥'
				}, {
					text: '印度尼西亚'
				}],
			}
		},
		onLoad() {
			this.api.index({
				page: 0,
				pid: 0,
				num: 10
			}).then(data => {
				this.hotGroup = data.group.filter(item => {
					return item.is_hot == 1
				})
				this.group = [{
					id: 0,
					name: '推荐'
				}, ...data.group]
				this.ads = data.ads.map(item => {
					item.image = this.host + item.image
					return item
				})
				this.merchant = data.merchant.map(item => {
					item.coverimage = this.host + item.coverimage
					return item
				})
				setTimeout(() => {
					this.showLoading = false
				}, 800)
			})
		},
		methods: {
			chooseity(e) {
				this.city = this.cities[e].text
				this.showAction = false
			},
			tomore() {
				uni.navigateTo({
					url: '/pages/merchant/index'
				})
			},

			toMerchant(id) {
				uni.navigateTo({
					url: '/pages/merchant/detail?id=' + id
				})
			},
			toGroup(id) {
				if (id == 0) {
					uni.navigateTo({
						url: '/pages/create/index?type=1'
					})
					return false
				}
				uni.navigateTo({
					url: '/pages/index/group?id=' + id
				})
			},
			search() {
				uni.navigateTo({
					url: '/pages/search/index?keyword=' + this.keyword
				})
			},
			// 以下是z-paging插件函数
			tabChange(index) { //tabs通知swiper切换
				this._setCurrent(index);
			},
			//下拉刷新时，通知当前显示的列表进行reload操作
			onRefresh() {
				this.$refs.swiperList[this.current].reload(() => {
					//当当前显示的列表刷新结束，结束当前页面的刷新状态
					this.$refs.pagePaging.endRefresh();
				});
			},
			//当滚动到底部时，通知当前显示的列表加载更多
			scrolltolower() {
				this.$refs.swiperList[this.current].doLoadMore();
			},

			//swiper滑动结束
			swiperAnimationfinish(e) {
				this._setCurrent(e.detail.current);
			},
			//设置swiper的高度
			heightChanged(height) {
				if (height === 0) {
					//默认swiper高度为屏幕可用高度-tabsView高度-slot="top"内view的高度
					height = uni.getSystemInfoSync().windowHeight - uni.upx2px(80);
				}
				this.swiperHeight = height;
			},
			_setCurrent(current) {
				if (current !== this.current) {
					//切换tab时，将上一个tab的数据清空
					this.$refs.swiperList[this.current].clear();
				}
				this.current = current;
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #f3f3f3;
	}

	.city {
		display: flex;
		align-items: center;
		padding: 0 20upx;
		height: 50px;
		background: $siddhi-theme;
		position: sticky;
		top: 0;
		z-index: 100;
	}

	.group-icon {
		display: block;
		margin-bottom: 10upx;
		width: 40%;
	}

	.merchant {
		margin: 10upx auto;
		padding: 20upx 10upx;
		background: #fff;
	}

	.cover {
		width: 140upx;
		height: 160upx;
		border-radius: 10upx;
		margin: 10upx;
		overflow: hidden;
	}

	.tools {
		background: #fff;
		margin: 20upx 10upx;
		border-radius: 10upx;
		overflow: hidden;
	}

	.tools>view:first-child {
		display: flex;
		justify-content: space-between;
		background: $siddhi-theme;
		color: #fff;
		padding: 10upx;
	}

	.tabs {
		position: sticky;
		top: 50px;
		z-index: 99;
	}

	.swiper {
		height: 1000px;
	}

	.swiper-item {
		background: #fff;
		padding: 0 20upx;
		box-sizing: border-box;
	}
</style>