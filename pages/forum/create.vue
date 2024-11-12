<template>
	<view style="padding: 0 40upx 4upx;">
		<u-form :model="form" ref="uForm" label-width="160" :error-type="['border-bottom','toast']">
			<u-form-item label="" prop="content" label-position="top" >
				<u-input v-model="form.content" type="textarea" placeholder="在此输入发布内容,140字以内" />
			</u-form-item>
			<u-form-item label="上传照片(最多4张)" prop="images" label-position="top">
				<u-upload ref="uUpload" :action="action" :auto-upload="false" :header="formData" max-count="4"
					@on-uploaded="afterUpload"></u-upload>
			</u-form-item>
			<u-form-item label="所属分类" prop="group_name" required>
				<u-input type="select" :select-open="showSelect" v-model="form.group_name" placeholder="请选择"
					@click="showSelect = true"></u-input>
			</u-form-item>
		</u-form>
		<view class="u-p-t-80">
			<u-button type="primary" shape="circle" @click="submit">立即发布</u-button>
		</view>
		<u-select mode="single-column" value-name="id" label-name="name" :list="group" v-model="showSelect"
			@confirm="selectConfirm"></u-select>
		<xidicms-loading :show="showLoading"></xidicms-loading>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showLoading: true,
				action: this.host + '/api/common/upload',
				formData: {
					token: uni.getStorageSync('userInfo').token
				},
				form: {
					group_id: '',
					group_name: '',
					content: '',
					images: ''
				},
				showSelect: false,
				group: [],
				rules: {
					group_name: [{
						required: true,
						message: '请选择分类',
						trigger: ['change', 'blur'],
					}],
					content: [{
						required: true,
						message: '内容不能为空',
						trigger: ['change', 'blur'],
					}]
				}
			}
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		onLoad() {
			this.api.forumGroup().then(data => {
				this.group = data
				setTimeout(() => {
					this.showLoading = false
				}, 800)
			})
		},
		methods: {
			selectConfirm(e) {
				this.form.group_id = '';
				this.form.group_name = '';
				e.map((item, index) => {
					this.form.group_id = item.value;
					this.form.group_name = item.label;
				})
			},
			submit() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						this.$refs.uUpload.upload();
					}
				})
			},
			afterUpload(lists, name) {
				lists = lists.map(item => {
					if (item.progress == 100) {
						return item.response.data.url
					}
				})
				this.form.images = lists.join()
				this.api.addForum(this.form).then(data => {
					uni.showModal({
						title: '发布成功',
						showCancel: false,
						success(res) {
							if (res.confirm) {
								uni.reLaunch({
									url: '/pages/forum/index'
								})
							}
						}
					})
				})
			}
		}
	}
</script>