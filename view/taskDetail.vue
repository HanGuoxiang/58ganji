<template>
	<view class="storeDetail">
		<cu-custom bgColor="bg-topic-theme" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">详情</block>
		</cu-custom>
		<view class="cu-bar bg-white">
			<view class="action">
				<text class="cuIcon-titles text-green"></text>
				<text class="text-xl text-bold">基础信息</text>
			</view>
		</view>
		<view class="cu-list menu sm-border card-menu margin-top">
			<view class="cu-item" >
				<view class="content">
					<text class="cuIcon-circlefill text-grey"></text>
					<text class="text-grey">类型</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{info.sorts}}</text>
				</view>
			</view>
			<view class="cu-item" >
				<view class="content">
					<text class="cuIcon-sort text-grey"></text>
					<text class="text-grey">分类</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{info.detailSort}}</text>
				</view>
			</view>
			<view class="cu-item" >
				<view class="content">
					<text class="cuIcon-choicenessfill text-grey"></text>
					<text class="text-grey">价格</text>
				</view>
				<view class="action">
					<text class="text-price text-red text-lg">{{info.price}}</text>
				</view>
			</view>
			<view class="cu-item" >
				<view class="content">
					<text class="cuIcon-sort text-grey"></text>
					<text class="text-grey">学校</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{info.auth.campus}}</text>
				</view>
			</view>
			<view class="cu-item" >
				<view class="content">
					<text class="cuIcon-sort text-grey"></text>
					<text class="text-grey">发布时间</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{info.createTime}}</text>
				</view>
			</view>
			<view class="cu-item" >
				<view class="content">
					<text class="cuIcon-tagfill text-red  margin-right-xs"></text>
					<text class="text-grey">标签</text>
				</view>
				<view class="action">
					<view class="cu-tag round bg-orange" :class="'light-'+k" v-for="(v,k) in info.tags" :key="k">{{v}}</view>
				</view>
			</view>
		</view>
		<view class="cu-bar bg-white">
			<view class="action">
				<text class="cuIcon-titles text-green"></text>
				<text class="text-xl text-bold">详细描述</text>
			</view>
		</view>
		<view class="description">
			<text class="text-lg">{{info.textareaAValue}}</text>
		</view>
		
		<!-- <view class="operate-nav " :style="{opacity:isShowBottomNav?'1':'0'}">
			<view class="operate-left">
				<image mode="widthFix" class="round" src="http://img2.imgtn.bdimg.com/it/u=1039075865,3371165857&fm=26&gp=0.jpg"
				 @tap="hrefCard"></image>
				<view class="username">
					<text>{{info.auth.name}}</text>
				</view>
			</view>
			<view class="operate-right">
				<view class="like">
					<text class="cuIcon-favor text-gray"></text>
					<text>收藏</text>
				</view>
				<view class="concat" @tap="hrefChat">
					<text class="cuIcon-messagefill text-black"></text>
					<text>联系</text>
				</view>
			</view>
		</view> -->
		<view class="seat-height" :style="[{height:footer_bottom+20 + 'px'}]"></view>
		<view class="cu-bar bg-white tabbar border shop store" :style="[{height:footer_bottom + 'px',bottom:footer_state + 'px'}]">
			<view class="action">
				<view class="cu-avatar-group">
					<view class="cu-avatar lg radius" :style="{backgroundImage:'url('+info.auth.avatar+')'}"></view>
				</view>
				<view class="info">
					<view>
						<text class="text-bold text-lg">{{info.auth.name}}</text>
					</view>
					<view>
						<text class="text-xs text-olive">查看楼主</text>
					</view>
				</view>
			</view>
			<view class="btn-group" style="justify-content: flex-end;">
				<button class="cu-btn bg-red round shadow-blur" @tap="hrefChat">我感兴趣</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: null,
				swiperList: [],
				dotStyle: false,
				towerStart: 0,
				direction: '',
				isShowBottomNav: true,
				isOwner: false,
				timer: null,
				footer_bottom:this.CustomBar,
				footer_state:0,
				isCollection:false
			};
		},
		onLoad(option) {
			this.info = JSON.parse(decodeURIComponent(option.item))
			console.log(this.info)
			// this.isOwner = option.isOwner
			let that = this
			
			// 初始化towerSwiper 传已有的数组名即可
		},
		methods: {
			//滚动条监听
			onPageScroll(res) {
				clearTimeout(this.timer) // 每次滚动前 清除一次
				this.isShowBottomNav = false;
				let that = this
				this.timer = setTimeout(function() {
					that.isShowBottomNav = true;
				}, 500);
			},
			hrefChat(){
				uni.navigateTo({
					url:"chatRoom"
				})
			},
			hrefCard(){
				uni.navigateTo({
					url:"myCard"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	$foot:40rpx;

	.storeDetail {
		.store{
			border-top: 1upx solid #EEEEEE;
			.btn-group{
				justify-content: flex-end;
				padding: 0 30upx!important;
			}
			.action{
				flex: 2;
				display: flex;
				justify-content: flex-start;
				padding-left: 10upx;
				.cu-avatar-group{
					padding: 0 10upx;
					.radius{
						border-radius: 10upx!important;
					}
				}
				.info{
					margin-left: 10upx;
					height: 45px;
					display: flex;
					flex-flow: column;
					justify-content: center;
					view:last-child{
						margin-top: 10upx;
						text-align: left;
					}
				}
			}
		}
		.operate-nav {
			position: fixed;
			bottom: 110rpx;
			z-index: 99;
			left: 50%;
			height: 90rpx;
			border-radius: 65rpx;
			display: flex;
			justify-content: flex-start;
			width: 600rpx;
			transition: .8s all;
			background-color: #EEEEEE;
			transform: translateX(-50%);
			box-shadow: 0 0 10rpx 1rpx #EEEEEE;
		
			.operate-left {
				width: 300rpx;
				display: flex;
				align-items: center;
		
				image {
					margin: 0 20rpx;
					width: 60rpx;
					height: 60rpx;
				}
		
				.username {
					flex: 1;
					max-width: 220rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}
		
			.operate-right {
				margin-left: auto;
				height: 100%;
				width: 300rpx;
				display: flex;
		
				.like {
					flex: 1;
					display: flex;
					justify-content: center;
					align-items: center;
					background-image: linear-gradient(-90deg, #F8D347, #EEEEEE);
				}
		
				.concat {
					flex: 1;
					display: flex;
					justify-content: center;
					border-top-right-radius: 65rpx;
					border-bottom-right-radius: 65rpx;
					// background-image: linear-gradient(to right , #9B63FF, #462188);
					background-image: linear-gradient(-90deg, #FB7E22, #F8D347);
					align-items: center;
				}
			}
		}
		.delete-thing{
			width: 100vw;
			position: fixed;
			bottom: 40rpx;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.description{
			width: 100vw;
			padding: 15rpx;
		}
		.screen-swiper {
			height: 700rpx;
		}
		.recommend{
			width: 100vw;
			height: 100rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			.line{
				border: none;
				width: 20vw;
				height: 1px;
				background-color: #f37b1d;
			}
			.circle{
				width: 5px;
				height: 5px;
				border-radius: 50%;
				background-color: #f37b1d;
			}
			.text-lg{
				padding: 0 15rpx;
			}
		}
		.store-title {
			max-width: 100vw;
			padding: 0rpx 20rpx 20rpx 20rpx;
			display: -webkit-box;
			/*设置为弹性盒子*/
			-webkit-line-clamp: 4;
			/*最多显示1行*/
			overflow: hidden;
			/*超出隐藏*/
			text-overflow: ellipsis;
			/*超出显示为省略号*/
			-webkit-box-orient: vertical;
			word-break: break-all;
			/*强制英文单词自动换行*/
		}

		.store-tag {
			padding: 0rpx 20rpx 20rpx 20rpx;
		}

		.store-price {
			width: 100vw;
			padding: 20rpx 20rpx;
		}

		.help {
			position: fixed;
			background-color: #FFFFFF;
			display: flex;
			justify-content: center;
			align-items: center;
			height: $foot;
			width: 100vw;
			text-align: center;
			bottom: 0;
		}

		.shop {
			width: 100vw;
			position: fixed;
			bottom: $foot;
			.submit{
				max-width: 300rpx;
			}
		}
	}

	.tower-swiper .tower-item {
		transform: scale(calc(0.5 + var(--index) / 10));
		margin-left: calc(var(--left) * 100upx - 150upx);
		z-index: var(--index);
	}
</style>
