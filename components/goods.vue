<template>
	<view class="shopPanel">
		<view class="content"> 
			<view v-for="(item1,index) in col" :key="index" :style="{width:colWidth+'px'}" :class="index!=0?'marginLeft':''">
				<view v-for="(item,index1) of goods[index]" :key="index1" class="item animation-bottom-top" :style="{'animationDelay': (index + 1)*0.1 + 's'}" @tap="hrefstoreDetail(item)">
					<image
					class="img-item"
					  mode="widthFix"
					  :style="{width:colWidth+'px'}"
					  :src="item.imgList[0]"
					/>
					<view class="cnt">
						<view class="item-name text-lg">
							<text class="text-black">{{item["需求标题"]}}</text>
						</view>
						<view class="item-tag">
							<view class='cu-tag round sm' v-for="(v,k) in item.tags" :key="k">{{v}}</view>
						</view>
						<view class="item-price text-xl">
							<text class="text-price text-red">{{item.price}}</text>
							<text class="text-grey text-sm costPrice text-price">{{item.costPrice}}</text>
							<text class="text-grey text-sm look">{{item.look}}次浏览</text>
						</view>
						<view class="item-auther">
							<view class="cu-avatar sm round" :style="{backgroundImage:'url('+item.avatar+')'}"></view>
							<text class="text-black text-sm">{{item.nickname}}</text>
						</view>
						<view class="item-university">
							<text class="text-grey text-sm">{{item.university}}</text>
						</view>
					</view>
				</view>
			</view>
		<!-- 	<goodPanel @wapperlick="hrefstoreDetail" :list="goods">
				<view v-for="(item,index) of goods" :key="index" slot="slot{{index}}">
					<view class="cnt">
						<view class="item-name text-lg">
							<text class="text-black">{{item.title}}</text>
						</view>
						<view class="item-tag">
							<view class='cu-tag round sm' v-for="(v,k) in item.tags" :key="k">{{v}}</view>
						</view>
						<view class="item-price text-xl">
							<text class="text-price text-red">{{item.price}}</text>
							<text class="text-grey text-sm costPrice text-price">{{item.costPrice}}</text>
							<text class="text-grey text-sm look">{{item.look}}次浏览</text>
						</view>
						<view class="item-auther">
							<view class="cu-avatar sm round" :style="{backgroundImage:'url('+item.avatar+')'}"></view>
							<text class="text-black text-sm">{{item.nickname}}</text>
						</view>
						<view class="item-university">
							<text class="text-grey text-sm">{{item.university}}</text>
						</view>
					</view>
				</view>
				<template v-slot:default="item">
					<view class="cnt">
						<view class="item-name text-lg">
							<text class="text-black">{{item.title}}</text>
						</view>
						<view class="item-tag">
							<view class='cu-tag round sm' v-for="(v,k) in item.tags" :key="k">{{v}}</view>
						</view>
						<view class="item-price text-xl">
							<text class="text-price text-red">{{item.price}}</text>
							<text class="text-grey text-sm costPrice text-price">{{item.costPrice}}</text>
							<text class="text-grey text-sm look">{{item.look}}次浏览</text>
						</view>
						<view class="item-auther">
							<view class="cu-avatar sm round" :style="{backgroundImage:'url('+item.avatar+')'}"></view>
							<text class="text-black text-sm">{{item.nickname}}</text>
						</view>
						<view class="item-university">
							<text class="text-grey text-sm">{{item.university}}</text>
						</view>
					</view>
				</template>
			</goodPanel> -->
		</view>
		<view class="cu-load text-black" :class="isMore?'loading':'over'"></view>
	</view>
</template>

<script>
	import goodPanel from "@/components/goodPanel.vue";
	export default {
		props: {
			goods: Array,
			isMore:Boolean,
			colWidth:Number,
			col:Number
		},
		components: {
			goodPanel
		},
		data() {
			return {
				
			}
		},
		methods: {
			hrefstoreDetail(item) {
				console.log("godds:",item)
				this.$emit("clickHref", item)
			},
			
		}
	};
</script>
<style lang="scss" scoped>

	.shopPanel {
		min-width: 100vw;
		max-width: 100vw;
		background-color: #eee;
		overflow-x: hidden;
	}
	.item{
		border-radius: 6px;
		background-color: #FFFFFF;
		margin-top: 10px;
	}
	.img-item{
		max-height: 280px;
		border-top-left-radius: 6px;
		border-top-right-radius: 6px;
	}
	.content {
		padding: 10px;
		display: flex;
		.marginLeft{
			margin-left: 10px;
		}
		.cnt {
			padding: 10px;

			.item-name {
				padding: 10rpx 10rpx 0rpx 10rpx;
				display: -webkit-box;
				/*设置为弹性盒子*/
				-webkit-line-clamp: 2;
				/*最多显示1行*/
				overflow: hidden;
				/*超出隐藏*/
				text-overflow: ellipsis;
				/*超出显示为省略号*/
				-webkit-box-orient: vertical;
				word-break: break-all;
				/*强制英文单词自动换行*/
				max-width: 170px;
			}

			.item-tag {
				padding: 10rpx;
				display: flex;

				view {
					margin-left: 5rpx;
				}
			}

			.item-price {
				padding: 10rpx;

				.look {
					padding-left: 5rpx;
					padding-right: 5rpx;
				}
				.costPrice{
					text-decoration:line-through;
					padding-left: 5rpx;
					padding-right: 5rpx;
				}
			}
				
				.item-university{
					display: flex;
					justify-content: flex-end;
					align-items: center;
					padding: 0 10rpx 0 0;
					
					text {
						margin-left: 5px;
						display: -webkit-box;
						/*设置为弹性盒子*/
						-webkit-line-clamp: 1;
						/*最多显示1行*/
						overflow: hidden;
						/*超出隐藏*/
						text-overflow: ellipsis;
						/*超出显示为省略号*/
						-webkit-box-orient: vertical;
						word-break: break-all;
						/*强制英文单词自动换行*/
						max-width: 120px;
					}
				}
			.item-auther {
				display: flex;
				align-items: center;
				padding: 10rpx;

				text {
					margin-left: 5px;
					display: -webkit-box;
					/*设置为弹性盒子*/
					-webkit-line-clamp: 1;
					/*最多显示1行*/
					overflow: hidden;
					/*超出隐藏*/
					text-overflow: ellipsis;
					/*超出显示为省略号*/
					-webkit-box-orient: vertical;
					word-break: break-all;
					/*强制英文单词自动换行*/
					max-width: 120px;
				}
			}

			.title {
				font-size: 16px;
			}

			.text {
				font-size: 14px;
				margin-top: 5px;
			}
		}
	}
</style>
