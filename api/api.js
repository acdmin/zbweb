const _env = 'production' // production
const BASE_URL = (_env == 'development' ? 'http://szylfy.oicp.net:9999/api' : 'https://zp.yilianfy.com/api');
export const $http = (options) => {
	if(!!options._showToast){
		uni.showLoading({
			title:'加载中...'
		})
	}
	return new Promise((resolve, reject) => {
		uni.request({
			url: BASE_URL + options.url,
			method: options.method || 'GET',
			header: options.header || {},
			data: options.data || {},
			success: (res) => {
				if(!!options._showToast){
					uni.hideLoading()
				}
				uni.stopPullDownRefresh()
				if( res.statusCode !== 200 ){
					return uni.showToast({
						title: '获取数据失败',
						icon: 'none'
					})
				}else{
					if( res.data.status_code == 401 ){// 未登录
						uni.removeStorageSync('api_token')
					}
					resolve(res)
				}
			},
			fail: (err) => {
				if(!!options._showToast){
					uni.hideLoading()
				}
				uni.stopPullDownRefresh()
				uni.showToast({
					title: "请求失败"
				})
				reject(err)
			}
		})
	})
}