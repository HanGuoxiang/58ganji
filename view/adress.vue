<template>
	<view class="pages-height">
		<cu-custom bgColor="bg-topic-theme" :isBack="true"><block slot="content">收货地址</block></cu-custom>
		<scroll-view :scroll-y="modalName==null" class="page" :class="modalName!=null?'show':''">
			<!-- 添加收货地址-Begin -->
			<view class="cu-bar bg-white solid-bottom margin-top">
				<view class="action">
					<text class="cuIcon-title text-orange "></text> 添加收货地址<text class="addAdress text-sm text-gray" @tap="showModalADD" data-target="DialogModalAdd">添加</text>
				</view>
			</view>
			<view class="cu-list menu-avatar">
				<view class="cu-item" :class="modalName=='move-box-'+ index?'move-cur':''" v-for="(item,index) in recentyList" :key="index"
				 @touchstart="ListTouchStart" @touchmove="ListTouchMove" @touchend="ListTouchEnd" :data-target="'move-box-' + index"
				 @click="hrefChatRoom">
					<view class="cu-avatar round lg" >
						<text>{{item.name.substr(0,1)}}</text>
					</view>
					<view class="content">
						<view class="text-grey">
							<view class="text-cut">{{item.name}}</view>
						</view>
						<view class="text-gray text-sm flex">
							<view class="text-cut">
								{{item.adress}}
							</view>
						</view>
					</view>
					<view class="action" style="width: 100px;">
						<view class="text-black" style="font-size: 32rpx;">{{item.phone}}</view>
					</view>
					<view class="move">
						<!-- <view class="bg-grey">置顶</view> -->
						<view class="bg-red">删除</view>
					</view>
				</view>
			</view>
			<!-- 添加收货地址-End -->
		</scroll-view>
		<view class="cu-modal" :class="modalNameADD=='DialogModalAdd'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">联系方式</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl" style="padding: 50rpx 20rpx;background-color: #FFFFFF;">
					<view class="cu-form-group">
						<view class="title">姓名：</view>
						<input placeholder="输入姓名" name="input" @input="inutName"></input>
					</view>
					<view class="cu-form-group">
						<view class="title">电话：</view>
						<input placeholder="输入电话" name="input" @input="inputPhone"></input>
					</view>
					<view class="cu-form-group">
						<view class="title">地址：</view>
					</view>
					<textarea maxlength="50"  @input="inputAdress" placeholder="请输入详细地址..." style="height: 100px;text-align: left;padding: 5rpx 30rpx;"></textarea>
				</view>
				<view class="cu-bar bg-white">
					<view class="action margin-0 flex-sub text-green solid-left" @tap="hideModal">算了</view>
					<view class="action margin-0 flex-sub  solid-left" @tap="enterModal">添加</view>
				</view>
			</view>
		</view>
		<!-- 加载 -->
		<view class="cu-load" :class="!isLoad?'loading':'over'"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				modalNameADD:null,
				modalName: null,
				skin: false,
				listTouchStart: 0,
				listTouchStartY:0,
				listTouchDirection: null,
				isLoad: true,
				recentyList: [{
						id: "001",
						name: "西瓜",
						phone: "17625495599",
						adress:"北京科技大学"
					},
					{
						id: "002",
						name: "橙子",
						phone: "18311543663",
						adress:"北京科技大学"
					}
				]
			};
		},
		methods: {
			showModalADD(e){
				this.modalNameADD = e.currentTarget.dataset.target
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
				this.modalNameADD=null
			},
			hrefChatRoom() {
				uni.navigateTo({
					url: "../../view/chatRoom"
				})
			},

			// ListTouch触摸开始
			ListTouchStart(e) {
				this.listTouchStart = e.touches[0].pageX
				this.listTouchStartY=e.touches[0].pageY
			},

			// ListTouch计算方向
			ListTouchMove(e) {
				if(e.touches[0].pageX - this.listTouchStart < 0)
				{
					if((Math.abs(e.touches[0].pageY - this.listTouchStartY)<20))
					{
						this.listTouchDirection = 'left'
					}
					else{
						this.listTouchDirection = 'right'
					}
				}
				else{
					this.listTouchDirection = 'right'
				}
				// this.listTouchDirection = (e.touches[0].pageX - this.listTouchStart > 0)&&(Math.abs(e.touches[0].pageY - this.listTouchStartY)<20)? 'right' : 'left'
			},

			// ListTouch计算滚动
			ListTouchEnd(e) {
				// console.log(this.listTouchDirection)
				if (this.listTouchDirection == 'left') {
					this.modalName = e.currentTarget.dataset.target
				} else {
					this.modalName = null
				}
				this.listTouchDirection = null
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		width: 100vw;
		padding-bottom: 120rpx;

	}
	.cu-item{
		// border-bottom: 2px dashed #8dc63f;
	}
	.addAdress{
		margin-left: 25rpx;
	}
	.header {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 220rpx;
		display: flex;
		align-items: flex-end;
		background-color: #FFFFFF;
		z-index: 99999;
	}
	.page.show {
		overflow: hidden;
	}

	.cu-load {
		background-color: #FFFFFF;
		padding-bottom: 30rpx;
		color: black;
	}

	.switch-sex::after {
		content: "\e716";
	}

	.switch-sex::before {
		content: "\e7a9";
	}

	.switch-music::after {
		content: "\e66a";
	}

	.switch-music::before {
		content: "\e6db";
	}
</style>
