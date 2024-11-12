<template>
	<view class="u-p-20">
		<view class="u-border-bottom u-p-20">
			<u-input v-model="content" type="textarea" :custom-style="{fontSize:'32upx'}"
				placeholder="在此输入内容,140字以内"></u-input>
		</view>
		<view class="input-item">
			<view class="title">
				<text class="require">*</text>
				<text>标题</text>
			</view>
			<input type="text" v-model="title" class="right-input" placeholder="请输入标题">
		</view>
		<view class="u-border-bottom u-p-b-20">
			<u-upload ref="uUpload" max-count="9" :file-list="fileList" :action="action"  :header="formData" :auto-upload="false"
				@on-uploaded="afterUpload" @on-list-change="onlistchange" :before-remove="beforeRemove"></u-upload>
		</view>
		<view class="tags-input" v-for="(item,index) in jsonData" :key="index">
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
				:custom-style="{background:'#129db1'}">确认修改</u-button>
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
				jsonData: [],
				select: [],
				fileList: [],

				title: '',
				content: '',
				images: '',
				phone: '',
				tagsjson: {},
				group_id: 0,
				id: 0,
				append: [] //追加的图片
			}
		},
		onLoad(e) {
			this.api.editInfo({
				id: e.id
			}).then(data => {
				this.group_id = data.group_id
				this.title = data.title
				this.content = data.content
				this.images = data.images
				this.phone = data.phone
				this.tagsjson = data.tagsjson
				this.id = data.id

				uni.setNavigationBarTitle({
					title: '编辑-' + data.name
				})
				if (this.images != '') {
					this.images.split(',').map(item => {
						this.fileList.push({
							url: this.host + item
						})
					})
				}
				this.jsonData = JSON.parse(data.paramjson)
				this.tagsjson = JSON.parse(data.tagsjson)
				var tags = Object.values(this.tagsjson)
				var that = this
				this.jsonData.map((item, index) => {
					item.v = item.v.split(',')
					tags.map(value => {
						let indexof = item.v.indexOf(value)
						if (indexof != -1) {
							that.select.push(index + '-' + indexof)
						}
					})
				})
				setTimeout(() => {
					this.showLoading = false
				}, 1000)
			})
		},
		methods: {
			chooseTags(father, son) {
				var i = this.jsonData[father]
				var tags = this.tagsjson
				if (i['m'] == 1) {
					var count = 0
					this.select.map((vv, kk) => {
						if (vv == father + '-' + son) {
							this.select.splice(kk, 1)
							count++
						}
					})
					if (count == 0) {
						this.select.push(father + '-' + son)
						tags[i['k']] += i['v'][son] + ','
					} else {
						tags[i['k']] = tags[i['k']].replace(i['v'][son] + ',', '')
					}
				} else {
					tags[i['k']] = i['v'][son]
					this.select.map((value, key) => {
						if (value.split('-')[0] == father) {
							this.select.splice(key, 1)
						}
					})
					this.select.push(father + '-' + son)
				}
			},

			submit() {
				if (this.$u.test.isEmpty(this.content)) {
					return this.$u.toast('内容不能为空')
				}
				if (this.$u.test.isEmpty(this.title)) {
					return this.$u.toast('标题不能为空')
				}
				if (this.$u.test.isEmpty(this.phone)) {
					return this.$u.toast('电话不能为空')
				}

				for (let i in this.jsonData) {
					let j = this.jsonData[i]
					if (this.tagsjson[j['k']] == '') {
						if (j['r'] == 1) {
							return this.$u.toast(`请输入${j['k']}值`)
						} else {
							delete this.tagsjson[j['k']]
						}
					}
				}

				if (this.fileList.length > 0) {
					var check = this.fileList.some(item => {
						return item.progress == 0
					})
					if (check) {
						this.$refs.uUpload.upload();
					} else {
						this.create()
					}
				} else {
					this.create()
				}
			},
			onlistchange(lists) {
				this.fileList = lists
			},
			async beforeRemove(index, lists) {
				if (lists[index].progress == 100) {
					var imgUrl = lists[index].url
					var imgArr = this.images.split(',')
					var filter = imgArr.filter(item => {
						return imgUrl.indexOf(item) != -1
					})
					if (filter.length > 0) {
						const result = await this.api.removeImg({
							image: filter[0]
						})
						if (result) {
							imgArr = imgArr.filter(val => {
								return val !== filter[0]
							})
							this.images = imgArr.join()
							console.log(this.images)
							return true
						}
						return false
					}
				}
			},
			afterUpload(lists, name) {
				this.append = lists.filter(val => {
					return val.progress == 100 && !uni.$u.test.isEmpty(val.response);
				})
				if (this.append.length > 0) {
					this.append = this.append.map(item => {
						return item.response.data.url
					})
				}
				this.create()
			},
			create() {
				if (this.append.length == 1) {
					if (this.images == '') {
						this.images = this.append[0]
					} else {
						this.images = this.images + ',' + this.append[0]
					}
				} else {
					this.images = [...this.images.split(','), ...this.append].join()
				}

				let params = {
					id: this.id,
					group_id: this.group_id,
					title: this.title,
					content: this.content,
					phone: this.phone,
					tagsjson: this.tagsjson,
					images: this.images,
					type: 'edit'
				}

				this.api.create(params).then(res => {
					uni.showToast({
						title: '修改成功'
					})
					setTimeout(() => {
						uni.reLaunch({
							url: '/pages/index/group?id=' + this.group_id
						})
					}, 1500)
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