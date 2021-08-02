<script>
	import c from 'modules/common.js'
	import b from 'modules/bll.js'
	import Vue from 'vue'
		export default {
			globalData: {
				baseURL: 'http://localhost:9091'
			},
			onLaunch: function() {
				// console.log('获取appid')
				// 			const accountInfo = uni.getAccountInfoSync();
				// 			console.log(accountInfo.miniProgram.appId); // 小程序 appId
							
							//分享出去的h5页面会自动执行这里，自动弹窗登录页面，暂时不需要
							// b.loginAuto();
				console.log("onLaunch");
				uni.getSystemInfo({
					success: function(e) {
						console.log(e) 
						Vue.prototype.screenWidth = e.screenWidth
						// #ifndef MP
						Vue.prototype.StatusBar = e.statusBarHeight;
						if (e.platform == 'android') {
							Vue.prototype.CustomBar = e.statusBarHeight + 50;
						} else {
							Vue.prototype.CustomBar = e.statusBarHeight + 45;
						};
						// #endif 
						// #ifdef MP-WEIXIN
						Vue.prototype.StatusBar = e.statusBarHeight;
						let custom = wx.getMenuButtonBoundingClientRect();
						Vue.prototype.Custom = custom;
						Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
						// #endif       
						// #ifdef MP-ALIPAY
						Vue.prototype.StatusBar = e.statusBarHeight;
						Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
						// #endif
					}
				})
				
			
			
			},
			onShow: function() {
				
				c.startWebSocketService();
				
			
				console.log('App Show')
			},
			onHide: function() {
				console.log('App Hide')
			}
		}
	</script>
	
	<style lang="scss">
		/* color-ui库 */
		@import "colorui/main.css";
		@import "colorui/icon.css";
		@import "colorui/animation.css";
	
		/*每个页面公共css */
		page {
			background-color: #FFFFFF;
			overflow-x: hidden;
			
		}
	
		.Messange-box {
			position: fixed;
			right: 0;
			top: 50%;
			background: #272822;
			width: 30px;
			height: 50px;
			z-index: 99999;
		}
	</style>
<style lang="scss">
@import "uview-ui/index.scss";
@import 'static/css/base.css';
</style>