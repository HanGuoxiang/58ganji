<template>
	<view class="index-page">
		<view class="main">
			<view class="header-box">
				<view class="handle-btn">
					<view class="btn">
						<u-icon name="setting"  size="40" color="#dbdbdb"></u-icon>
					</view>
				</view>
				<view class="head-img">
					<u-image width="100%" height="100%" border-radius="50%" src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3011893491,4249262958&fm=26&gp=0.jpg"></u-image>
				</view>
				<view class="name">
					坏人今夜不归来
				</view>
				<view class="info-box">
					<view class="right-line">
						<span class="label">
							粉丝
						</span>
						1
					</view>
					<view>
						<span class="label">
							关注
						</span>
						2
					</view>
				</view>
			</view>
			<u-gap height="30" bg-color="#f2f2f2"></u-gap>
			<view class="cell-group">
				<u-cell-item icon="edit-pen" title="我的动态"></u-cell-item>
				<u-cell-item icon="heart" title="收藏"></u-cell-item>
				<u-cell-item icon="eye" title="我的关注"></u-cell-item>
				<u-cell-item icon="email" title="投诉反馈"></u-cell-item>
			</view>
		</view>
		<button @click="logout()">退出</button>
	  <!--底部导航-->
	  <u-tabbar :hide-tab-bar="true" :list="list" :mid-button="true" inactive-color="#bfbfbf" active-color="#1296db"
	            @change="changeTab"></u-tabbar>
	</view>
</template>

<script>
	import c from '../../modules/common.js'
	
	export default{
		
		methods:{
			logout(){
				c.saveUserLogin("");
				c.closePage();
			}
		}
	}
</script>

<style>
</style>
<style>
.u-mode-center-box {
  border-radius: 20rpx !important;
}
page {
	background-color: #f2f2f2;
}
</style>
<style lang="scss" scoped>
.main{
	.header-box{
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 100rpx;
		padding-bottom: 50rpx;
		background-color: #1296db;
		position: relative;
		.handle-btn{
			position: absolute;
			right: 20rpx;
			top: 20rpx;
			.btn{
				
			}
		}
		.head-img{
			width: 200rpx;
			height: 200rpx;
			border-radius: 50%;
		}
		.name{
			font-size: 32rpx;
			font-weight: 600;
			margin: 20rpx 0;
		}
		.right-line{
			border-right: 2px solid #FFFFFF;
			margin-right: 20rpx;
			padding-right: 20rpx;
		}
		.info-box{
			display: flex;
			align-items: center;
			view{
				.label{
					color: #FFFFFF;
					margin-right: 10rpx;
				}
			}
		}
	}	
	.cell-group{
		background-color: #FFFFFF;
	}
}

</style>
