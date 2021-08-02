<template>
	<view class='productSort copy-data'>
		<cu-custom bgColor="bg-topic-theme" :isBack="true">
		  		<block slot="backText">返回</block> 
		  		<block slot="content">{{title}}</block>
				<!-- <block slot="right" class="action" @click="publish()">发布</block> -->
				<view slot="right" class="action">
					<!-- <navigator :url="'chat/chat'">全国</navigator> -->
					<!-- <text class="cuIcon text" @tap="publish()">发布</text> -->
				</view> 
		  </cu-custom>
			 
				
		<view  class="grid col-4 padding-sm">
				<view class="padding-sm"   v-for="(item,index) in productList" :key="index"   @tap="itemClick(item.tagObject)">
					<view v-bind:class="item.itemBgColorText" >
					<u-image :src="item.tagObject.url"></u-image>
						<view class="text-lg">{{item.tagObject['分类名称']}}</view>  
						<!-- <view class="margin-top-sm text-Abc">red </view> -->
					</view>
				</view>
				
		</view>
		
	</view>
</template>

<script>
	// import tabBar from "@/pages/index/components/tabBar.vue";
	// import {
	// 	getCategoryList
	// } from '@/api/store.js';
	
	import c from 'modules/common.js'
	import b from 'modules/bll.js'
	var dataItem={};
	// isPublishing  是否发布过程
	export default {
		// components:{
		// 	tabBar
		// },
		data() {
			return {
				navlist: [],
				productList: [],
				navActive: 0,
				number: "",
				height: 0,
				hightArr: [],
				toView: ""
			}
		},
		onLoad(data) {
			// data.data="{\"ID\":\"10005\",\"创建日期\":\"2021/5/25 15:17:26\",\"操作人\":\"10000\",\"父账号ID\":\"10000\",\"分类名称\":\"二手物品\",\"图片\":\"6ba897eb-172a-4484-9e08-c14cb00a0830.png\",\"父分类ID\":\"10000\",\"层级\":\"1\",\"所属分类类型\":\"10000\",\"url\":\"https://local.softmarket.cn/UploadFiles/6ba897eb-172a-4484-9e08-c14cb00a0830.png\",\"SubCatalogTotalLevelCount\":1,\"isPublishing\":true}"
			
			console.log('onLoad========》'+data+JSON.stringify(data));
			
					if(c.isNull(data.data))
					{
					  c.show('缺少父级类目ID');
					  return;
					  }
					  
			 dataItem=JSON.parse(data.data);
		
		this.title=dataItem.分类名称;
			this.reload();
		},
		onReady() {
			// this.$nextTick(()=>{
			// 	const query = uni.createSelectorQuery();
			// 	query.select('#tabbar').boundingClientRect(data => {
			// 		console.log(data)
			// 	}).exec();
			// });
		},
		methods: {
			reload(){
				c.loading();
				 
				b.getHttpWithLocation("action=cataloglistbyparentid&db=本地圈儿1004&ordertype=10000&pageindex=0&pagesize=50&id="+dataItem.ID+"&levelcount=1",(data)=>{
					 // console.log('data'+data+JSON.stringify(data));
					 
					 this.productList=data.Data;
					
							c.hideLoading();
				});
			},
			//点击子分类后进行
			itemClick(item){
				console.log('item='+JSON.stringify(item));
				item.CatalogID=item.ID;
				b.openPublishPage(item);
				// c.openPage('../publish/publishfinished',item);
			},
			
		}
	}
</script>

<style scoped lang="scss">
	.productSort .header {
		width: 100%;
		height: 96rpx;
		background-color: #fff;
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		z-index: 9;
		border-bottom: 1rpx solid #f5f5f5;
	}

	.productSort .header .input {
		width: 700rpx;
		height: 60rpx;
		background-color: #f5f5f5;
		border-radius: 50rpx;
		box-sizing: border-box;
		padding: 0 25rpx;
	}

	.productSort .header .input .iconfont {
		font-size: 35rpx;
		color: #555;
	}

	.productSort .header .input .placeholder {
		color: #999;
	}

	.productSort .header .input input {
		font-size: 26rpx;
		height: 100%;
		width: 597rpx;
	}

	.productSort .aside {
		position: fixed;
		width: 24%;
		left: 0;
		top:0;
		background-color: #f7f7f7;
		overflow-y: auto;
		overflow-x: hidden;
		height: auto;
		margin-top: 96rpx;
		/* 兼容 IOS<11.2 */
		bottom: calc(100rpx+ constant(safe-area-inset-bottom));
		/* 兼容 IOS>11.2 */
		bottom: calc(100rpx + env(safe-area-inset-bottom));
	}

	.productSort .aside .item {
		height: 100rpx;
		width: 100%;
		font-size: 26rpx;
		color: #424242;
	}

	.productSort .aside .item.on {
		background-color: #fff;
		border-left: 4rpx solid #fc4141;
		width: 100%;
		text-align: center;
		color: #fc4141;
		font-weight: bold;
	}

	.productSort .conter {
		margin: 96rpx 0 0 180rpx;
		padding: 0 14rpx;
		background-color: #fff;
	}

	.productSort .conter .listw {
		padding-top: 20rpx;
	}

	.productSort .conter .listw .title {
		height: 90rpx;
	}

	.productSort .conter .listw .title .line {
		width: 100rpx;
		height: 2rpx;
		background-color: #f0f0f0;
	}

	.productSort .conter .listw .title .name {
		font-size: 28rpx;
		color: #333;
		margin: 0 30rpx;
		font-weight: bold;
	}

	.productSort .conter .list {
		flex-wrap: wrap;
	}

	.productSort .conter .list .item {
		width: 177rpx;
		margin-top: 26rpx;
	}

	.productSort .conter .list .item .picture {
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
	}

	.productSort .conter .list .item .picture image {
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}

	.productSort .conter .list .item .name {
		font-size: 24rpx;
		color: #333;
		height: 56rpx;
		line-height: 56rpx;
		width: 120rpx;
		text-align: center;
	}

	.category {

		.category-wrapper {
			width: 100%;
			display: flex;
			flex-direction: row;
			position: absolute;
			top: 0;
			bottom: 0;

			.left-wrapper {
				width: 200rpx;
				flex: 0 0 200rpx;
				background-color: #f6f6f6;

				.left-content {

					.title-content {
						width: 100%;
						height: 100rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						font-size: 25rpx;
						border-bottom: 1px solid #dedede;
						cursor: pointer;

						&:last-child {
							border-bottom: 0;
						}

						&.onSelected {
							background-color: #fff;
							position: relative;
							color: #feb436;

							&::before {
								content: '';
								position: absolute;
								left: 0;
								top: 0;
								width: 10rpx;
								height: 100%;
								background: linear-gradient(124deg, #feb436 0%, #fb7c22 100%);
							}
						}
					}
				}
			}

			.right-wrapper {
				flex: 1;

				.right-content {
					width: 100%;
					padding: 20rpx 0;
					border-left: 1rpx solid #efefef;
					box-sizing: border-box;

					.banner-wrapper {
						padding: 0 20rpx;

						.swiper-content {
							width: 100%;
							height: 180rpx;
							margin-bottom: 20rpx;

							.swiper-item {
								.swiper-img {
									width: 100%;
									height: 180rpx;
								}
							}
						}
					}

					.product-wrapper {
						.category-item {

							.category-title {
								height: 60rpx;
								font-size: 26rpx;
								line-height: 60rpx;
								font-weight: 500;
								background-color: #f6f6f6;
								padding-left: 20rpx;
								color: #000;
							}

							.category-content {
								display: flex;
								flex-direction: row;
								flex-flow: wrap;
								padding: 20rpx 20rpx 0;


								.product-item {
									width: 33%;
									display: flex;
									flex-direction: column;
									justify-content: center;
									align-items: center;
									margin-bottom: 20rpx;

									.product-img {
										width: 120rpx;
										height: 140rpx;
										margin-bottom: 10rpx;
									}

									.product-title {
										font-size: 23rpx;
									}
								}
							}
						}
					}
				}
			}
		}

	}
</style>
