<template>
	<view class="u-p-20">
		<view class="u-border-bottom u-p-20">
			<u-input v-model="content" type="textarea" :custom-style="{fontSize:'32upx'}"
				placeholder="在此输入内容,140字以内"></u-input>
		</view>
		<view class="input-item" v-if="content">
			<view class="title">
				<text class="require">*</text>
				<text>标题</text>
			</view>
			<u-input v-model="title" class="right-input" placeholder="请输入标题"></u-input>
		</view>
		<view class="u-border-bottom u-p-b-20">
			<u-upload ref="uUpload" max-count="9" :action="action" :header="formData" :auto-upload="false"
				@on-uploaded="afterUpload" @on-list-change="uploadChange"></u-upload>
		</view>
		<view class="tags-input" v-for="(item,index) in jsonParams" :key="index">
			<view class="title">
				<text class="require" v-if="item.r==1">*</text>
				<text>{{item.k}}</text>
			</view>

			<view class="u-flex-1 u-flex u-flex-wrap">
				<text :class="select.includes(index+'-'+key)?'tags active':'tags'" v-for="(val,key) in item.v"
					@click="chooseTags(index,key)">{{val}}</text>
			</view>
		</view>

		<view class="input-item">
			<view class="title">
				<text class="require">*</text>
				<text>电话</text>
			</view>
			<input type="number" v-model="phone" class="right-input" placeholder="请输入电话">
		</view>
		<view style="margin: 20upx;padding-bottom: 100px;">
			<u-button type="primary" shape="circle" @click="submit"
				:custom-style="{background:'#129db1'}">确认发布</u-button>
		</view>
		<xidicms-loading :show="showLoading"></xidicms-loading>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				formData: {
					token: uni.getStorageSync('userInfo').token
				},
				action: this.host + '/api/common/upload',
				showLoading: true,
				jsonParams: [],
				content: '',
				title: '',
				images: '',
				phone: '',
				tagsjson: {},
				select: [],
				files: [],
				group_id: 0
			}
		},

		watch: {
			content: {
				handler(newVal, oldVal) {
					this.title = newVal.substr(0, 50)
				},
				immediate: true
			}
		},
		onLoad(e) {
			this.api.group({
				id: e.id
			}).then(data => {
				uni.setNavigationBarTitle({
					title: data.name
				})
				this.group_id = data.id
				this.jsonParams = JSON.parse(data.paramjson)
				this.jsonParams.map(item => {
					this.tagsjson[item.k] = ''
					item.v = item.v.split(',')
				})
				setTimeout(() => {
					this.showLoading = false
				}, 1000)
			})
		},
		methods: {
			chooseTags(index, child) {
				var i = this.jsonParams[index]
				if (i['m'] == 1) {
					var count = 0
					this.select.map((vv, kk) => {
						if (vv == index + '-' + child) {
							this.select.splice(kk, 1)
							count++
						}
					})
					if (count == 0) {
						this.select.push(index + '-' + child)
						this.tagsjson[i['k']] += i['v'][child] + ','
					} else {
						this.tagsjson[i['k']] = this.tagsjson[i['k']].replace(i['v'][child] + ',', '')
					}
				} else {
					this.tagsjson[i['k']] = i['v'][child]
					this.select.map((value, key) => {
						if (value.split('-')[0] == index) {
							this.select.splice(key, 1)
						}
					})
					this.select.push(index + '-' + child)
				}
			},
			uploadChange(lists) {
				this.files = lists
			},
			submit() {
				 uni.showModal({
					content:'发布信息需要支付1元钱，是否继续',
					success(res) {
						
					}
				})
				if (this.$u.test.isEmpty(this.content)) {
					return this.$u.toast('内容不能为空')
				}
				if (this.$u.test.isEmpty(this.title)) {
					return this.$u.toast('标题不能为空')
				}
				if (this.$u.test.isEmpty(this.phone)) {
					return this.$u.toast('电话不能为空')
				}
				for (let i in this.jsonParams) {
					let j = this.jsonParams[i]
					if (this.tagsjson[j['k']] == '') {
						if (j['r'] == 1) {
							return this.$u.toast(`请输入${j['k']}值`)
						} else {
							delete this.tagsjson[j['k']]
						}
					}
				}
				
				if (this.files.length > 0) {
					this.$refs.uUpload.upload();
				} else {
					this.create()
				}
			},
			afterUpload(lists, name) {
				let files = lists.filter(val => {
					return val.progress == 100;
				})
				if (files.length > 0) {
					files = files.map(item => {
						return item.response.data.url
					})
					this.images = files.join()
				}
				this.create()
			},
			create() {
				let params = {
					group_id: this.group_id,
					title: this.title,
					content: this.content,
					phone: this.phone,
					tagsjson: this.tagsjson
				}
				if (this.images.length > 0) {
					params.images = this.images
				}

				this.api.create(params).then(res => {
					uni.showToast({
						title: '发布成功'
					})
					setTimeout(() => {
						uni.reLaunch({
							url: '/pages/index/group?id=' + this.group_id
						})
					}, 1500)
				}).catch(err => {

				})
			}

		}
	}
</script>

<style lang="scss" scoped>
	.input-item {
		display: flex;
		align-items: center;
		padding: 20upx;
	}

	.tags-input {
		display: flex;
		align-items: flex-start;
		padding: 40upx 20upx;
		border-bottom: solid 1px #eee;
	}

	.title {
		width: 100upx;
		margin-right: 20upx;
	}

	.right-input {
		flex: 1;
		border-bottom: solid 1px #eee;
		padding: 10upx 0;
		font-size: 32upx;
	}

	.tags {
		background: #f3f3f3;
		color: #999;
		font-size: 30upx;
		border: solid 1px #ddd;
		padding: 4upx 10upx;
		margin-right: 20upx;
		margin-bottom: 20upx;
		border-radius: 10upx;
	}

	.active {
		background: $siddhi-theme;
		color: #fff;
	}

	.require {
		color: red;
	}
</style>