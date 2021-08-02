<template>
	<view class="mine">
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText"></block>
			<block slot="content"></block>
		</cu-custom>
		<view class="head">
			<view class="cu-avatar round avatar" :style="{backgroundImage:'url('+avatar+')'}"></view>
			<view class="head-right">
				<view class="top">
					<view class="">
						<view class="text-black text-bold text-xl">5</view>
						<view class="text-grey text-sm">关注</view>
					</view>
					<view class="">
						<view class="text-black text-bold text-xl">9</view>
						<view class="text-grey text-sm">粉丝</view>
					</view>
					<view class="">
						<view class="text-black text-bold text-xl">1.7w</view>
						<view class="text-grey text-sm">热度</view>
					</view>
				</view>
				<view class="bottom">
					<button class="cu-btn bg-topic-theme radio" @tap="hrefEdit">编辑资料</button>
				</view>
			</view>
		</view>
		<view class="body">
			<view class="avatar-name text-bold text-lg">
				大西瓜
			</view>
			<view class="avatar-tags">
				<view class="cu-tag bg-olive text-xs round">#爱游戏</view>
			</view>
			<view class="avatar-des text-df">00后射手座.</view>
		</view>
		<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft">
			<view class="cu-item" :class="index==TabCur?'text-black text-bold cur':'text-grey'" v-for="(item,index) in TabCurs" :key="index" @tap="tabSelect" :data-id="index">
				{{item.name}}&nbsp;{{item.num}}
			</view>
		</scroll-view>
		<button class="cu-btn round lg bg-topic-theme issue text-bold" @tap="issue"><text class="cuIcon-add text-xl text-bold"></text>发布</button>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				avatar:"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-minitask/ebeee9ed-c349-467a-9f8f-073511449f09.jpg",
				TabCur: 0,
				scrollLeft: 0,
				TabCurs:[
					{
						id:0,
						name:"宝贝",
						num:0
					},
					{
						id:1,
						name:"任务",
						num:0
					},
					{
						id:2,
						name:"求购",
						num:0
					},
					{
						id:3,
						name:"评价",
						num:0
					}
				]
			}
		},
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			hrefEdit(){
				uni.navigateTo({
					url:"userEdit"
				})
			}
		}	
	}
</script>

<style scoped lang="scss">
	.mine{
		.issue{
			position: fixed;
			bottom: 70upx;
			left: 50%;
			transform: translateX(-50%);
		}
		.head{
			width: 100%;
			padding: 20upx 20upx 10upx 20upx;
			display: flex;
			.avatar{
				width: 180upx;
				height: 180upx;
			}
			.head-right{
				flex: 1;
				display: flex;
				padding: 10upx 20upx;
				flex-flow: column;
				.top{
					display: flex;
					justify-content: space-around;
					flex: 1;
					padding: 10upx;
					view{
						width: 100%;
						text-align: center;
					}
				}
				.bottom{
					flex: 1;
					button{
						width: 100%;
						border-radius: 1000upx;
					}
				}
			}
		}
		.body{
			padding: 10upx 20upx 30upx 20upx;
			border-bottom: 1upx solid #EEEEEE;
			view{
				margin-top: 15upx;
			}
		}
	}
	.nav .cu-item{
		position: relative;
	}
	.nav .cu-item.cur{
		border-bottom: none;
		transition: 300ms all;
	}
	
	.nav .cu-item.cur::after{
		content: ")";
		width: 30upx;
		height: 8upx;
		// -webkit-border-radius:0 10upx 10upx 0;
		border-radius:10000upx 10000upx 0 0;
		position: absolute;
		background-color: #F8D347;
		// top: 0;
		// right: 0rpx;
		left: 50%;
		transform: translateX(-50%);
		bottom: 0;
		margin: auto;
	}
</style>
