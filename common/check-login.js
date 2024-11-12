// 页面白名单
const whiteList = [
	'/',
	'/pages/index/index',
	'/pages/index/group',
	'/pages/index/detail',
	'/pages/search/index',
	'/pages/auth/login',
	'/pages/auth/register',
	'/pages/merchant/index',
	'/pages/merchant/group',
	'/pages/merchant/detail',
	'/pages/merchant/category',
	'/pages/forum/index',
	'/pages/forum/detail',
	'/pages/create/index'
]
function hasPermission(url) {
	const userInfo = uni.getStorageSync('userInfo')
	if (whiteList.includes(url) || userInfo?.token) {
		return true
	}
	return false
}

uni.addInterceptor('navigateTo', {
	invoke(e) {
		let page = e.url.split('?')[0]
		if (!hasPermission(page)) {
			uni.showModal({
				title: '请登录后操作',
				success(res) {
					if (res.confirm) {
						uni.navigateTo({
							url: '/pages/auth/login'
						})
					}
				}
			})
			return false
		}
		return true
	}
})

uni.addInterceptor('switchTab', {
	// tabbar页面跳转前进行拦截
	invoke(e) {
		if (!hasPermission(e.url)) {
			uni.showModal({
				title: '请登录后操作',
				success(res) {
					if (res.confirm) {
						uni.navigateTo({
							url: '/pages/auth/login'
						})
					}
				}
			})
			return false
		}
		return true
	}
})