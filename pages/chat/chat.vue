<template>
	<view class="pages-height">
		<cu-custom bgColor="bg-topic-theme" :isBack="false"><block slot="content">消息</block></cu-custom>
		<scroll-view :scroll-y="modalName==null" class="page" :class="modalName!=null?'show':''">
			<!-- 最近消息-Begin -->
			<view class="cu-bar bg-white solid-bottom margin-top" v-if="isLogin">
				<view class="action">
					<text class="cuIcon-title text-orange "></text> 最近消息列表
				</view>
			</view> 
			<view class="cu-list menu-avatar">
				<view class="cu-item" :class="modalName=='move-box-'+ index?'move-cur':''" v-for="(item,index) in chatlist" :key="index"
				 @touchstart="ListTouchStart" @touchmove="ListTouchMove" @touchend="ListTouchEnd" :data-target="'move-box-' + index"
				 @click="hrefChatRoom(item)">
					<view class="cu-avatar round lg" :style="[{backgroundImage:'url()'}]">
						<image class="cu-avatar round lg" :src="item.photoUrl"></image>
					</view>
					<view class="content">
						<view class="text-grey">
							<view class="text-cut">{{item.name}}</view>
							<!-- <view class="cu-tag round bg-topic-theme sm">From:{{item.from}}</view> -->
						</view>
						<view class="text-gray text-sm flex">
							<view class="text-cut">
								{{item.LastText}}
						 	</view> 
						</view>
					</view>
					<view class="action"> 
						<view class="text-grey text-xs">{{item.LastMessageTime}}</view>
						<view class="cu-tag round bg-red sm" v-if="item.UnReadCount!=0">{{item.UnReadCount}}</view>
					</view>
					<view class="move">  
						<!-- <view class="bg-grey">置顶</view> -->
						<view class="bg-red">删除</view>
					</view>
				</view>
			</view>
			<!-- 最近消息-End -->

		<view v-if="!isLogin" class="noLogin-img">
			<image src="static/empty/empty_groupon.png"></image>
		</view>
		<view v-if="!isLogin" class="noLogin-text" @tap="hrefLogin">
			<text class="text-gray text-lg">请先登陆~</text>
		</view>
		
			<!-- 更早的消息记录-Begin -->
			<!-- <view class="cu-bar bg-white solid-bottom margin-top">
				<view class="action">
					<text class="cuIcon-title text-orange "></text> 更早消息列表
				</view> 
			</view> -->

			<!-- 更早的消息记录-End -->
		</scroll-view>
		<!-- 加载 -->
		<!-- <view class="cu-load" :class="!isLoad?'loading':'over'"></view> -->
	</view>
</template>

<script>
	import c from 'modules/common.js'
	import b from 'modules/bll.js'
	
	export default {
		data() {
			return {
				isLogin:false,
				modalName: null,
				skin: false,
				listTouchStart: 0,
				listTouchStartY:0,
				listTouchDirection: null,
				isLoad: true,
				chatlist: []
			};
		},
		onLoad() { 
			
			
		},
		onShow() {
			// console.log('123');
	var user=c.getUser(false);
	if(!user)
	{
		this.isLogin=false;
		return;
	}
		this.isLogin=true;
			
			uni.onSocketMessage((data)=>{
							  console.log('onSocketMessage=====>chat'+data+JSON.stringify(data));
						let newMsgItem=JSON.parse(data.data);
							if(newMsgItem.command=="1"
							||newMsgItem.command=="0")//私聊
							{
								
							 	let extraItem=JSON.parse(newMsgItem.extra);
								
								let isNew=true;//是否新增消息
								for(let index in this.chatlist)
								{
									let item=this.chatlist[index];
									if(item.ChatType==extraItem.chattype)
									{
										if(extraItem.chattype=="0")//私聊
										{
											if(item.ToUserID==extraItem.fromuser.ID)
											{
												isNew=false;
												item.LastText=extraItem.msg;
												item.LastMessageTime=c.getNowFormatDate();
												item.name=extraItem.fromuser.姓名;
												item.photoUrl="https://local.softmarket.cn/UploadFiles/"+extraItem.fromuser.头像;
												item.ChatType=extraItem.chattype;
												item.UnReadCount=(parseInt(item.UnReadCount)+ 1);
											}
										}
										else//群聊
										{
											if(item.ChatID==extraItem.ChatID)//聊天室id相同，则更新
											{
												isNew=false;
												
												item.LastText=extraItem.msg;
												item.LastMessageTime=c.getNowFormatDate();
												item.name=extraItem.fromuser.姓名;
												item.photoUrl="https://local.softmarket.cn/UploadFiles/"+extraItem.fromuser.头像;
												item.ChatType=extraItem.chattype;
												item.UnReadCount=(parseInt(item.UnReadCount)+ 1);
											}
										}
									}
								}
								if(isNew)
								{
									extraItem.LastText=extraItem.msg;
									extraItem.LastMessageTime=c.getNowFormatDate();
									extraItem.name=extraItem.fromuser.姓名;
									extraItem.photoUrl="https://local.softmarket.cn/UploadFiles/"+extraItem.fromuser.头像;
									extraItem.ChatType=extraItem.chattype;
									extraItem.UnReadCount=1;
										this.chatlist.push(extraItem);
								}
								// tmpItem.MessageType=tmpItem.messagetype;
								// tmpItem.LastText=tmpItem.msg;
								// tmpItem.创建日期=c.getNowFormatDate();
								// tmpItem.FromUserID=tmpItem.fromuser.ID;
								// tmpItem.template=this.getTemplateByMessageType(tmpItem.MessageType,tmpItem.FromUserID);
								// tmpItem.photoUrl="https://local.softmarket.cn/UploadFiles/"+tmpItem.fromuser.头像;
								// this.chatlist.push(tmpItem);
							} 
			})
			
			
			// console.log('456');
			c.loading();
			 
				// b.getHttpWithLocation("action=chattemplatelist&db=本地圈儿1004&ordertype=10000&pageindex=0&pagesize=50&"
				// +"&fromuserencryptid="+c.getUser().EncryptID,(data)=>{
					b.getHttpWithParam("action=chattemplatelist&db=本地圈儿1004&ordertype=10000&pageindex=0&pagesize=50&"
					+"&fromuserencryptid="+c.getUser().EncryptID,(data)=>{
					 // console.log('data'+data+JSON.stringify(data));
					  
					 if(data.Status==1)
					 {
						this.chatlist=data.Data;
						}
							c.hideLoading();
				});	 
		},
		methods: {
			showModal(e) { 
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			hrefChatRoom(item) {
				 
				if(item.ChatType=="0")//私聊
				{	b.openChatPage(item.ToUserID,item.ChatType);}
				else{	b.openChatPage(item.ChatID,item.ChatType);}
				
				// b.openChatPageWithChatID(item.ChatID);
				// uni.navigateTo({
				// 	url: "../../view/chatRoom"
				// })
			},
			hrefLogin(){
				c.getUser(true);
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

<style scoped lang="scss">
	@import 'pages/me/my.scss';
 
	.marginLeft { 
		margin-left: 2px;
	}
	.myoperate{
		 width: 94%;
		 margin: 20rpx auto;
		 margin-left: 3%;
		 border-radius: 20rpx;
		 overflow: hidden;
	}
</style>
 