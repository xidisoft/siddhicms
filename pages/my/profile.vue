<template>
	<view class="u-p-30">
		<u-form :model="userinfo" label-width="160">
			<u-form-item label="头像">
				<u-avatar :src="userinfo.avatar" slot="right" @click="chooseAvatar"></u-avatar>
			</u-form-item>
			<u-form-item label="用户名">
				<u-input v-model="userinfo.username" input-align="right" />
			</u-form-item>
			<u-form-item label="昵称">
				<u-input v-model="userinfo.nickname" input-align="right" />
			</u-form-item>
			<u-form-item label="简介">
				<u-input v-model="userinfo.bio" input-align="right" />
			</u-form-item>
			<u-form-item label="性别">
				<u-input type="select" :select-open="selectShow" v-model="gender" placeholder="请选择"
					@click="selectShow = true" input-align="right" />
			</u-form-item>
			<u-form-item label="密码">
				<view slot="right">
					<u-button type="error" size="mini" @click="pwdShow=true">修改</u-button>
				</view>
			</u-form-item>
		</u-form>
		<view class="u-m-t-60">
			<u-button type="primary" shape="circle" @click="saveProfile">保存资料</u-button>
		</view>
		<u-select mode="single-column" :list="sexs" v-model="selectShow" @confirm="selectConfirm"></u-select>
		<u-popup v-model="pwdShow" mode="center" width="80%" border-radius="20">
			<view class=" u-p-80">
				<u-field v-model="newpassword" :password="true" label-width="20" placeholder="请输入新密码" required>
				</u-field>
				<u-field v-model="repassword" :password="true" label-width="20" placeholder="请输入确认密码" required>
				</u-field>
				<view class="u-m-t-50">
					<u-button type="primary" @click="modify">确定</u-button>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userinfo: {},
				newpassword: '',
				repassword: '',
				sexs: [{
						label: '女',
						value: 0
					},
					{
						label: '男',
						value: 1
					},
					{
						label: '保密',
						value: 2
					}
				],
				selectShow: false,
				pwdShow: false,
			};
		},
		computed: {
			gender() {
				return ['女', '男', '保密'][this.userinfo.gender]
			}
		},
		created() {
			// 监听从裁剪页发布的事件，获得裁剪结果
			uni.$on('uAvatarCropper', path => {
				this.userinfo.avatar = path;
			})
		},
		onLoad() {
			this.userinfo = uni.getStorageSync('userInfo')
			this.userinfo.avatar = this.host + this.userinfo.avatar
		},
		methods: {
			chooseAvatar() {
				uni.$u.route({
					url: '/uview-ui/components/u-avatar-cropper/u-avatar-cropper',
					params: {
						destWidth: 200,
						rectWidth: 200,
						fileType: 'jpg',
					}
				})
			},
			selectConfirm(e) {
				this.userinfo.gender = e[0].value;
			},
			modify() {
				var item = this.$u.test.enOrNum(this.newpassword) && this.$u.test.rangeLength(this.newpassword, [6,
					30
				])
				if (!item) {
					return this.$u.toast('密码只能是字母或数字，长度为6~30位');
				}
				if (this.newpassword !== this.repassword) {
					return this.$u.toast('两次密码不一致');
				}
				this.api.modify({
					newpassword: this.newpassword,
					type: 'other'
				}).then(data => {
					this.pwdShow = false
					this.newpassword = ''
					this.repassword = ''
					uni.showToast({
						title: '修改成功'
					})
				})
			},
			async saveProfile() {

				if (!this.$u.test.rangeLength(this.userinfo.nickname, [3, 20])) {
					return this.$u.toast('昵称长度4~20位')
				}
				if (!this.$u.test.rangeLength(this.userinfo.bio, [3, 30])) {
					return this.$u.toast('简介字数30个以内')
				}

				if (this.userinfo.avatar.substr(0, 4) == 'data') {
					let img = await this.uploadImage(this.userinfo.avatar, this.host)
					this.userinfo.avatar = img.data.url
				} else {
					delete this.userinfo.avatar
				}
				this.api.profile(this.userinfo).then(data => {
					// uni.removeStorageSync('userInfo')
					uni.setStorageSync('userInfo', data)
					uni.showToast({
						title: '修改成功'
					})
					setTimeout(() => {
						uni.reLaunch({
							url: '/pages/my/index'
						})
					}, 1500)
				})
			},
			/* 上传图片 */
			uploadImage: (url, host) => {
				return new Promise((resolve, reject) => {
					uni.uploadFile({
						url: host + '/api/common/upload',
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
								return new Promise(() => {})
							}
						}
					});
				})
			}
		}
	}
</script>