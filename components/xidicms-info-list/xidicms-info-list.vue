<template>
	<view>
		<navigator :url="'/pages/index/detail?id='+item.id" hover-class="none" class="info-item"
			v-for="(item,index) in list">
			<view style="flex: 1;">
				<view class="u-line-2">
					<text class="is-top" v-if="item.is_top==1">置顶</text>
					<text style="font-size: 32upx;">{{item.title}}</text>
				</view>
				<view class="tags">
					<text class="tag" v-for="v in item.tags">{{v}}</text>
				</view>
				<text space="nbsp" class="nickname-time">{{item.nickname||''}} {{$u.timeFrom(item.updatetime)}}</text>
			</view>
			<view class="cover" v-if="item.images">
				<u-lazy-load :image="host+item.images" loading-img="/static/imgs/loading.jpg" height="160" img-mode="aspectFill"></u-lazy-load>
			</view>
		</navigator>
	</view>
</template>

<script>
	export default {
		name: "xidicms-info-list",
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
		}
	}
</script>

<style lang="scss" scoped>
	.info-item {
		display: flex;
		padding: 20upx 0;
		border-bottom: solid 1px #eee;
	}

	.cover {
		width: 200upx;
		height: 160upx;
		border-radius: 10upx;
		margin-left: 10upx;
		overflow: hidden;
	}

	.is-top {
		background: red;
		color: #fff;
		font-size: 26upx;
		padding: 4upx 10upx;
		line-height: 1rem;
		border-radius: 6upx;
		margin-right: 6upx;
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

	.nickname-time {
		font-size: 28upx;
		color: #999;
	}
</style>