<template>
	<view class="buy">
		<view class="fixed">
			<cu-custom :isBack="true" bgColor="bg-topic-theme">
				<block slot="backText"></block>
				<block slot="content">提交</block>
			</cu-custom>
		</view>
		<view class="buy-nav bg-topic-theme"></view>
		<view class="buy-background"></view>
		<view class="choose-adress">
			<view class="cu-list bg-white menu card-menu shadow-custom">
				<view class="cu-item arrow">
					<view class="content">
						<text class="text-topic text-lg">选择收货地址</text>
						<text class=" text-grey text-sm"></text>
					</view>
				</view>
			</view>
		</view>
		<view class="choose-pay">
			<view class="cu-list bg-white menu card-menu shadow-custom">
				<view class="cu-item arrow">
					<view class="content list">
						<text class="text-black text-sm">支付方式</text>
						<text class=" text-grey text-sm"></text>
					</view>
				</view>
			</view>
		</view>
		<view class="info"></view>
		<view class="phone">
			<view class="cu-list bg-white menu card-menu shadow-custom">
				<view class="cu-item arrow">
					<view class="content list">
						<text class="text-black text-sm">联系方式</text>
						<text class=" text-grey text-sm">17625495599</text>
					</view>
				</view>
			</view>
		</view>
		<view class="remark">
			<view class="cu-list bg-white menu card-menu shadow-custom">
				<view class="cu-item arrow">
					<view class="content list">
						<text class="text-black text-sm">备注</text>
						<text class=" text-grey text-sm"></text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		}
	}
</script>

<style scoped lang="scss">
	.list{
		display: flex;
		justify-content: flex-start;
		.text-grey{
			margin-left: auto;
		}
	}
	.shadow-custom{
		box-shadow: 0rpx 0rpx 15rpx rgba(26, 26, 26, 0.06);
	}
	.buy{
		width:100vw;
		min-height: 100vh;
		.choose-adress{
			width: 100%;
			padding:5upx 10upx;
			margin-top: 200upx;
			z-index: 10;
			border-radius: 15upx;
			view{
				border-radius: 15upx;
			}
			.cu-item{
				min-height: 200upx;
			}
		}
		.choose-pay{
			width: 100%;
			padding:5upx 10upx;
			margin-top: 6upx;
			z-index: 10;
			border-radius: 15upx;
			view{
				border-radius: 15upx;
			}
		}
		.phone{
			width: 100%;
			padding:5upx 10upx;
			margin-top: 6upx;
			z-index: 10;
			border-radius: 15upx;
			view{
				border-radius: 15upx;
			}
		}
		.remark{
			width: 100%;
			padding:5upx 10upx;
			margin-top: 6upx;
			z-index: 10;
			border-radius: 15upx;
			view{
				border-radius: 15upx;
			}
		}
		.fixed{
			position: fixed;
			z-index: 999999;
		}
		.buy-nav{
			width: 100vw;
			position: fixed;
			height: 180rpx;
			top: 0;
			left: 0;
			z-index: -1;
		}
		.buy-background{
			position: fixed;
			width: 100vw;
			top: 180rpx;
			z-index: -1;
			left: 0;
			height: 25vh;
			background-image: linear-gradient(180deg, #F8D347, #ffffff);
		}
	}
</style>
