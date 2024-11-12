const install = (Vue, vm) => {
	Vue.prototype.$u.http.setConfig({
		baseUrl: 'http://hrq.xidicom.cn',
		originalData: true,
	});
	Vue.prototype.$u.http.interceptor.request = (config) => {
		const userInfo = uni.getStorageSync('userInfo');
		config.header.token = userInfo.token || '';
		return config;
	}
	Vue.prototype.$u.http.interceptor.response = (res) => {
		if (res.statusCode == 200) {
			if (res.data.code == 1) {
				return res.data.data;
			} else {
				uni.$u.toast(res.data.msg);
				return new Promise(() => {})
			}
		} else {
			uni.$emit('z-paging-error-emit');
			uni.$u.toast(uni.$u.test.isEmpty(res.data?.msg) ? '程序错误，请重试！' : res.data.msg);
			return new Promise(() => {})
		}
	}
}

export default {
	install
}
