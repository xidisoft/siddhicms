<template>
	<view class="u-p-40">
		<u-form :model="form" ref="uForm" label-width="160" :error-type="['border-bottom','toast']">
			<u-form-item label="所属行业" prop="group_name" required>
				<u-input type="select" :select-open="showSelect" v-model="form.group_name" placeholder="请选择所属行业"
					@click="showSelect = true"></u-input>
			</u-form-item>
			<u-form-item label="商户名称" prop="name" required>
				<u-input v-model="form.name" placeholder="请填写商户名称" />
			</u-form-item>
			<u-form-item label="商户简介" prop="content" label-position="top" required>
				<u-input v-model="form.content" type="textarea" placeholder="请填写简介,140字以内" />
			</u-form-item>
			<u-form-item label="营业时间" prop="timerange" right-icon="clock" required>
				<u-input v-model="form.timerange" placeholder="请输入,如 08:00 - 23:00" />
			</u-form-item>
			<u-form-item label="地址" prop="address" right-icon="map" required>
				<u-input v-model="form.address" placeholder="请输入店铺地址" />
			</u-form-item>
			<u-form-item label="电话" prop="phone" right-icon="phone" required>
				<u-input v-model="form.phone" type="number" placeholder="请输入电话" />
			</u-form-item>
			<u-form-item label="上传门头照" prop="coverimage" label-position="top" required>
				<u-upload :action="action" :header="formData" max-count="1" @on-uploaded="afterUpload"
					index="coverimage"></u-upload>
			</u-form-item>
			<u-form-item label="上传店铺相册(最多8张)" prop="shopimages" label-position="top" required>
				<u-upload :action="action" :header="formData" max-count="8" @on-uploaded="afterUpload" index="shopimages"></u-upload>
			</u-form-item>
			<u-form-item label="上传营业执照" prop="licenseimage" label-position="top" required>
				<u-upload :action="action" :header="formData" max-count="1" @on-uploaded="afterUpload" index="licenseimage"></u-upload>
			</u-form-item>
			<u-form-item label="上传微信二维码" prop="qrcodeimage" label-position="top" required>
				<u-upload :action="action" :header="formData" max-count="1" @on-uploaded="afterUpload" index="qrcodeimage"></u-upload>
			</u-form-item>
		</u-form>
		<view class="u-p-80">
			<u-button type="primary" shape="circle" @click="submit">申请入驻</u-button>
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
					name: '',
					content: '',
					timerange: '',
					address: '',
					phone: '',
					coverimage: '',
					shopimages: '',
					licenseimage: '',
					qrcodeimage: ''
				},
				showSelect: false,
				group: [],
				rules: {
					group_name: [{
						required: true,
						message: '请选择所属行业',
						trigger: ['change', 'blur'],
					}],
					name: [{
						required: true,
						message: '请填写商户名称',
						trigger: ['change', 'blur'],
					}],
					content: [{
						required: true,
						message: '请填写简介',
						trigger: ['change', 'blur'],
					}],
					timerange: [{
						required: true,
						message: '请填写营业时间',
						trigger: ['change', 'blur'],
					}],
					address: [{
						required: true,
						message: '请填写店铺地址',
						trigger: ['change', 'blur'],
					}],
					phone: [{
						required: true,
						message: '请填写商户联系电话',
						trigger: ['change', 'blur'],
					}],
					coverimage: [{
						required: true,
						message: '请上传门头照',
						trigger: ['change', 'blur'],
					}],
					shopimages: [{
						required: true,
						message: '请上传店铺相册',
						trigger: ['change', 'blur'],
					}],
					licenseimage: [{
						required: true,
						message: '请上传营业执照',
						trigger: ['change', 'blur'],
					}],
					qrcodeimage: [{
						required: true,
						message: '请上传微信二维码',
						trigger: ['change', 'blur'],
					}]
				}
			}
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		onLoad() {
			this.api.merchantGroup().then(data => {
				this.group = data
				setTimeout(() => {
					this.showLoading = false
				}, 800)
			})
		},
		methods: {
			afterUpload(lists, name) {
				lists = lists.map(item => {
					if (item.progress == 100) {
						return item.response.data.url
					}
				})
				lists = lists.join()
				if (name == 'coverimage') {
					this.form.coverimage = lists
				}
				if (name == 'shopimages') {
					this.form.shopimages = lists
				}
				if (name == 'licenseimage') {
					this.form.licenseimage = lists
				}
				if (name == 'qrcodeimage') {
					this.form.qrcodeimage = lists
				}
			},
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
						this.api.addMerchant(this.form).then(data => {
							uni.showModal({
								title: '提交成功',
								showCancel: false,
								success(res) {
									if (res.confirm) {
										uni.reLaunch({
											url: '/pages/my/shop'
										})
									}
								}
							})

						})
					}
				})
			}

		}
	}
</script>
