<template>
	<view class="operate-nav shadow shadow-lg">
		<view class="operate-left">
			<view class="gift">
				<image mode="widthFix" class="round" src="../static/gift.png"
				  @tap="showModal" data-target="bottomModal"></image>
				  <view class='cu-tag badge' v-if="total!=0">{{total}}</view>
			</view>
			
			<view class="username">
				<text class="text-price text-white text-xl">{{price}}</text>
				<text class="text-white text-xs"></text>
			</view>
		</view>
		<view class="operate-right">
			<view class="like" @tap="collection" v-if="false">
				<text :class="isCollection?'cuIcon-favorfill text-orange':'cuIcon-favor text-orange'"></text>
				<text>{{isCollection?'已收藏':'收藏'}}</text>
			</view>
			<view class="concat bg-topic-theme" @tap="hrefBuy">
				<text class="text-bold">去结算</text>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default{
		props:{
			buyTotal:Array
		},
		data(){
			return{
				
			}
		},
		computed:{
			price(){
				let price=0
				this.buyTotal.forEach(function(item,index){
					price+=item.store.price*item.total
				})
				return price
			},
			total(){
				let total=0
				this.buyTotal.forEach(function(item,index){
					console.log(item)
					total+=item.total
				})
				return total
			}
		},
		methods:{
			showModal(e) {
				this.modalNameBottom = e.currentTarget.dataset.target
				console.log("1:",this.modalNameBottom)
				this.$emit("showModalBottom",this.modalNameBottom)
			},
			hideModal(e) {
				this.modalNameBottom = null
			},
			hrefBuy(){
				console.log("buy")
				this.$emit("hrefBuy")
				// uni.navigateTo({
				// 	url:"../view/buy"
				// })
			}
		}
	}
</script>

<style lang="scss" scoped>
	.operate-nav {
		position: fixed;
		bottom: 110rpx;
		z-index: 999999;
		left: 50%;
		height: 100rpx;
		border-radius: 65rpx;
		display: flex;
		justify-content: flex-start;
		width: 600rpx;
		transition: .8s all;
		background-color: #333333;
		transform: translateX(-50%);
	
		.operate-left {
			width: 300rpx;
			display: flex;
			align-items: center;
			position: relative;
			.gift{
				position: relative;
				left: 20rpx;
				bottom: 0;
				width: 85rpx;
				height: 85rpx;
				border-radius: 50%;
				image {
					width: 100%;
					height: 100%;
					border-radius: 50%;
					background-color: #FFFFFF;
				}
			}
			
	
			.username {
				flex: 1;
				margin-left: 45rpx;
				max-width: 220rpx;
				display: flex;
				flex-flow: column;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}
	
		.operate-right {
			margin-left: auto;
			height: 100%;
			width: 180rpx;
			display: flex;
	
			.like {
				flex: 1;
				display: flex;
				justify-content: center;
				align-items: center;
			}
	
			.concat {
				flex: 1;
				display: flex;
				justify-content: center;
				border-top-right-radius: 65rpx;
				border-bottom-right-radius: 65rpx;
				// background-image: linear-gradient(to right , #9B63FF, #462188);
				align-items: center;
			}
		}
	}
</style>
