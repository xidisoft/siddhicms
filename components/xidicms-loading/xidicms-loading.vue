<template>
	<view>
		<u-mask :show="show">
			<view class="mask">
				<view class="inner">
					<u-loading color="#129db1" size="60" />
					<image src="/static/imgs/logo.png" mode="widthFix"></image>
				</view>
			</view>
		</u-mask>
	</view>
</template>

<script>
	export default {
		name: "xidicms-loading",
		props: {
			show: {
				type: Boolean,
				default: false
			},
		},
		data() {
			return {

			};
		}
	}
</script>

<style scoped>
	.mask {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		background: #fff;
	}

	.inner {
		text-align: center;
	}

	.inner>image {
		display: block;
		width: 200upx;
	}

	.tips {
		color: #c7c7c7;
		margin-top: 20upx;
	}
</style>