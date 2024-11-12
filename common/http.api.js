module.exports = (Vue) => {
	const http = uni.$u.http
	uni.api = {

		index: params => http.post('api/index/index', params), //首页
		group: params => http.post('api/info/group', params), //信息分类
		create: params => http.post('api/info/add', params), //发布信息
		detail: params => http.post('api/index/detail', params), //信息详情
		infoList: params => http.post('api/info/index', params), //信息列表
		delete: params => http.post('api/info/delete', params), //删除信息
		editInfo: params => http.post('api/info/edit', params), //编辑信息
		refresh: params => http.post('api/info/update', params), //更新信息
		removeImg: params => http.post('api/info/delImage', params), //删除图片

		search: params => http.post('api/info/search', params), //搜索

		forum: params => http.post('api/forum/index', params), //分享
		forumDetail: params => http.post('api/forum/detail', params), //分享详情
		comment: params => http.post('api/forum/comment', params), //评论
		getCommentList: params => http.post('api/forum/more', params), //获取评论内容
		forumGroup: params => http.post('api/forum/group', params), //分享分类
		addForum: params => http.post('api/forum/add', params), //发布分享
		deleteForum: params => http.post('api/forum/delete', params), //删除分享
		refreshForum: params => http.post('api/forum/update', params), //刷新分享

		merchant: params => http.post('api/merchant/index', params), //商家首页
		merchantGroup: params => http.post('api/merchant/group', params), //商户分类
		addMerchant: params => http.post('api/merchant/add', params), //商户入驻
		merchantDetail: params => http.post('api/merchant/detail', params), //商户详情
		deleteMerchant: params => http.post('api/merchant/delete', params), //删除商户
		refreshMerchant: params => http.post('api/merchant/update', params), //刷新商户

		login: params => http.post('api/user/login', params), //登录
		register: params => http.post('api/user/register', params), //注册
		logout: params => http.post('api/user/logout', params), //退出登录

		my: params => http.post('api/my/index', params), //我的
		myInfo: params => http.post('api/my/info', params), //我发布的信息
		myShop: params => http.post('api/my/shop', params), //我的店铺
		focus: params => http.post('api/my/focus', params), //关注
		
		profile: params => http.post('api/user/profile', params), //个人资料
		modify: params => http.post('api/user/resetpwd', params), //修改密码

		chatList: params => http.post('api/chat/index', params), //获取聊天用户列表
		record: params => http.post('api/chat/record', params), //获取聊天记录
		bind: params => http.post('api/chat/bind', params), //聊天服务器绑定uid
		send: params => http.post('api/chat/send', params), //发送消息
		unread: params => http.post('api/chat/unread', params), //未读消息数
		
		sendSms:params => http.post('api/sms/send', params), //发送验证码
		


	}
	// #ifndef APP-NVUE
	Vue.prototype.api = uni.api
	Vue.prototype.host = uni.$u.http.config.baseUrl
	// #endif
}