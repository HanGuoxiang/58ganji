<template>
	<view>
		<cu-custom bgColor="bg-topic-theme" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">聊天</block>
		</cu-custom>
		<view class="cu-chat" ref="chatRoom">
			<block v-for="item in messageList" >
				<view class="cu-item self" v-if="item.template==0">
					<view class="main">
						<view class="content bg-green shadow">
							<text>{{item.Message}}</text>
						</view>
					</view>
					<view class="cu-avatar radius">
						<image  class="cu-avatar radius"  :src="item.photoUrl"></image>
					</view>
					<view class="date">{{item['创建日期']}}</view>
				</view>
				
				<view class="cu-item self" v-if="item.template==1">
					<view class="main">
						<image :src="item.photoUrl" class="radius" mode="widthFix"></image>
					</view>
					<view class="cu-avatar radius" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big107000.jpg);"></view>
					<view class="date"> 13:23</view>
				</view>
				
				
				<view class="cu-item"  v-if="item.template==2">
					<view class="cu-avatar radius">
						<image  class="cu-avatar radius"  :src="item.photoUrl"></image>
					</view>
					<view class="main">
						<view class="content shadow">
							<text>{{item.Message}}</text>
						</view>
					</view>
					<view class="date "> {{item['创建日期']}}</view>
				</view>
				
				
				
				
				<view class="cu-item " v-if="item.template==3">
					<view class="main">
						<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg" class="radius" mode="widthFix"></image>
					</view>
					<view class="cu-avatar radius" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big107000.jpg);"></view>
					<view class="date"> {{item['创建日期']}}</view>
				</view>
				
			</block>
			
		</view>

		<view class="cu-bar foot input" :style="[{bottom:InputBottom+'px'}]">
			<view class="action">
				<text class="cuIcon-sound text-grey"></text>
			</view>
			<input class="solid-bottom" :adjust-position="false" :focus="false" maxlength="300" v-model="inputText" cursor-spacing="10" @focus="InputFocus"
			 @blur="InputBlur"></input>
			<view class="action">
				<text class="cuIcon-emojifill text-grey"></text>
			</view>
			<button class="cu-btn bg-green shadow" @tap="sendClick">发送</button>
		</view>

	</view>
</template>

<script>
	import c from 'modules/common.js'
	import b from 'modules/bll.js'
	
	export default {
		data() {
			return {
				inputText:'',
				dataItem:{},
				ChatItem:{},
				InputBottom: 0,
				messageList:[],
			};
		},
		onLoad(data) {
			// data.data="{\"ToUserEncryptID\":\"94A7DAF5-5690-45A0-930C-9C7B305F5C8F\"}";
			
			console.log('onLoad========》'+data+JSON.stringify(data));
			
					if(c.isNull(data.data))
					{
					  c.show('缺少父级类目ID');
					  return;
					  }
					  
			 this.dataItem=JSON.parse(data.data);
			 
			this.reloadMessage();
			  
			  uni.onSocketMessage((data)=>{
				  console.log('onSocketMessage=====>chatlist'+data+JSON.stringify(data));
			  	let newMsgItem=JSON.parse(data.data);
				if(newMsgItem.command=="1"
				||newMsgItem.command=="0")//私聊
				{
					
					let tmpItem=JSON.parse(newMsgItem.extra);
					tmpItem.MessageType=tmpItem.messagetype;
					tmpItem.Message=tmpItem.msg;
					tmpItem.创建日期=c.getNowFormatDate();
					tmpItem.FromUserID=tmpItem.fromuser.ID;
					tmpItem.template=this.getTemplateByMessageType(tmpItem.MessageType,tmpItem.FromUserID);
					tmpItem.photoUrl="https://local.softmarket.cn/UploadFiles/"+tmpItem.fromuser.头像;
					this.messageList.push(tmpItem);
				}
			  })
			  
			 // c.loading();
			  
			 // 	b.getHttpWithLocation("action=createchat&db=本地圈儿1004&ordertype=10000&pageindex=0&pagesize=50&"
			 // 	+"&fromuserid="+c.getUser().EncryptID+"&targetid="+this.dataItem.TargetID,(data)=>{
			 // 		 console.log('data'+data+JSON.stringify(data));
			 		 
			 // 		 if(data.Status==1)
			 // 		 {
				// 		 this.ChatItem=data.Data;
				// 		 this.reloadMessage();
				// 		 }
				// 		 });
						
					
		
		},
		methods: {
			 scrollToBottom() {
			      // // 聊天定位到底部
			      // let chatRoom = this.$refs.chatRoom    //通过$refs获取到该元素
			      // chatRoom.scrollTop = chatRoom.scrollHeight
			      // console.log('聊天定位到底部！')
			    },
		
			sendClick(){
				
				if(c.isNull(this.inputText))
				{
					c.show("发送信息不能为空");
					return;
				}
				
				c.loading();
				 b.getHttpWithParam
					b.getHttpWithParam("action=messagesend&db=本地圈儿1004&ordertype=10000&pageindex=0&pagesize=50&"
					+"&targetid="+this.dataItem.TargetID+"&chattype="+this.dataItem.ChatType+"&fromuserencryptid="+c.getUser().EncryptID+"&touserencryptid="+this.dataItem.ToUserEncryptID+"&msg="+this.inputText,(data)=>{
						 console.log('data'+data+JSON.stringify(data));
						 
						 if(data.Status==1)
						 {
							 let tmpItem={};
							 tmpItem.MessageType='10234';
							 tmpItem.Message=this.inputText;
							 tmpItem.创建日期=c.getNowFormatDate();
							 tmpItem.FromUserID=c.getUser().ID;
							 tmpItem.template=this.getTemplateByMessageType(tmpItem.MessageType,tmpItem.FromUserID);
							 tmpItem.photoUrl="https://local.softmarket.cn/UploadFiles/"+c.getUser().头像;
							 this.messageList.push(tmpItem);
							 
							 
							 
							 // b.webSocketSendMessagePrivate(this.inputText,this.dataItem.TargetID);
							 this.inputText="";
							}
								c.hideLoading();
					});	
			},
			reloadMessage(){
				c.loading();
				 
					b.getHttpWithParam("action=messagelist&db=本地圈儿1004&ordertype=10000&pageindex=0&pagesize=50&"
					+"&chattype="+this.dataItem.ChatType+"&targetid="+this.dataItem.TargetID+"&fromuserencryptid="+c.getUser().EncryptID+"&touserencryptid="+this.dataItem.ToUserEncryptID,(data)=>{
						 console.log('data'+data+JSON.stringify(data));
						 
						 if(data.Status==1)
						 {
							 this.ChatItem=data.Data.Chat;
							 let tmplist=data.Data.Message;
							 for(let index in tmplist)
							 {
								 let item=tmplist[index];
								 console.log("item="+JSON.stringify(item));
								 
								 // if(item.FromUserID==c.getUser().ID)
								 // {
									//  item.photoUrl=item.FromUserPhotoUrl;
								 // }
								 // else
								 // {item.photoUrl=item.ToUserPhotoUrl;}
								item.template=this.getTemplateByMessageType(item.MessageType,item.FromUserID);
								
							 }
							 console.log("tmplist="+JSON.stringify(tmplist));
								this.messageList=tmplist;
								
								this.scrollToBottom();
							}
								c.hideLoading();
					});	
			},
			InputFocus(e) {
				this.InputBottom = e.detail.height
			},
			InputBlur(e) {
				this.InputBottom = 0
			},
			getTemplateByMessageType(messageType,fromUserID)
			{
				let template=0;
				if(fromUserID==c.getUser().ID)//自己
				{
											 if(messageType=="10234")
											 {
												  template="0";
											 }
											 
											 if(messageType=="10235")
											 {
											 	 template="1";
											 }
				}
				else{
											if(messageType=="10234")
											{
												template="2";
											}
											
											if(messageType=="10235")
											{
												 template="3";
											}
				}
				return template;
			}
		}
	}
</script>

<style> 
	page {
		padding-bottom: 100upx;
	}
</style>
