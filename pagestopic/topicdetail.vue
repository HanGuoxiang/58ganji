<template>
	<view>
		<cu-custom bgColor="bg-topic-theme" :isBack="true">
				<block slot="backText">返回</block>
				<block slot="content">话题详情</block>
			</cu-custom> 
			<!-- <view class="single-box-1" v-for="(article_info ,index) in topiclist"> -->
			<view class="single-box-1" >
				<view class="contain-box" >
			
				<view class="header-box">
					<view class="left">
						<view class="head-img">
							<u-image width="70rpx" height="70rpx" border-radius="35rpx" :src="article_info.userimgurl"></u-image>
						</view>
						<view class="info">
							<view class="name">
								{{article_info.name}}
							</view>
							<view class="tip">
								{{article_info['创建日期']}} 来自{{article_info.machine}}
							</view>
						</view>
					</view> 
					<view class="right"> 
						<view class="btn">
							<u-icon name="plus" color="#FFFFFF"></u-icon>
							<span class="text">
								关注
							</span>
							
						</view>
					</view>
				</view> 
				<view class="main-text">
					{{article_info.content}}
				</view>
				<view class="img-list-box">
					<view class="row-box" v-if="article_info.piclist.length > 1" v-for="(imgItem, imgIndex) in getImgList(article_info.piclist)" :key="imgIndex">
						
						<view class="column-box" v-for="bkitem in imgItem">
							
						<!--  #ifdef  MP-WEIXIN -->
						<!-- <view class="column-box" v-for="(bkitem, bkIndex) in imgItem" :key="bkIndex"> -->
						<!--  #endif -->
						<!--  #ifdef   H5 -->
						<!-- <view class="column-box" v-for="bkitem in imgItem"> -->
						<!--  #endif -->
							<view class="img-single">
								<!-- {{bkitem.url}} -->
								<u-image width="100%" height="100%" border-radius="10rpx" :src="bkitem.url"></u-image>
								<!-- <u-image border-radius="20rpx" :src="bkitem.imgSrc" mode="widthFix"></u-image> -->
							</view>
						</view>
						<view class="column-box" v-if="" v-for="(citem, cindex) in (3 - imgItem.length)" :key="cindex">
							<view class="img-single">
							</view>
						</view>
					</view> 
					
		<!-- 只有一个图显示大图 -->
			<u-image v-if="article_info.piclist.length==1" border-radius="20rpx" :src="article_info.piclist[0].url" mode="widthFix"></u-image>
		
					
				</view>
				
<!-- 				<view style="clear: both;"></view>
				<view class="tag-list-box">
					<view v-for="n in 6">
						#秋日序章 
					</view>
				</view> -->
			
				
				<view style="clear: both;"></view>
				<view class="handle-box">
					<view @click="zanClick(article_info)">
						<span class="label">
							<u-icon name="thumb-up"></u-icon>
						</span>
						<span>
							点赞 ({{article_info["点赞个数"]}})
						</span>
					</view>
					<!-- <view>
						<span class="label">
							<u-icon name="chat"></u-icon>
						</span>
						<span>
							评论 ({{article_info.replycount}})
						</span>
					</view> -->
					<view @tap="shareClick(article_info)">
						<span class="label">
							<u-icon name="moments"></u-icon>
						</span>
						<span>
							分享
						</span>
					</view>
					
				</view>
				
				
				</view>
				
			<!-- <u-gap height="20" bg-color="#f2f2f2" v-if="index < topiclist.length-1"></u-gap> -->
			
			</view>
			
			
			<view class="comment">
				<view class="item" v-for="(item, index) in replylist" :key="index">
					<view class="avatar"><image :src="item.url"></image></view>
					<view class="comment-info">
						<view class="nickname-like">
							<view class="nickname">{{ item.name }}</view>
							<view class="like">
								<image @tap="commentLike(item.id, index)" v-show="!item.is_like" src="/static/images/icon_like_01.png"></image>
								<image @tap="commentLike(item.id, index)" v-show="item.is_like" src="/static/images/icon_like_01_hover.png"></image>
								<view class="like-count">{{ item.like_count }}</view>
							</view>
						</view>
						<navigator class="comment-desc" :url="'commentDetail?id=' + item.id" hover-class="none">{{ item.content }}</navigator>
						<view class="date-reply">
							<navigator class="date" :url="'commentDetail?id=' + item.id" hover-class="none">{{ item['创建日期'] }}</navigator>
							<navigator class="reply" :url="'commentDetail?operate=reply' + '&id=' + item.id">回复TA</navigator>
						</view>
						<navigator class="reply-count" v-if="item.reply_count > 0" :url="'commentDetail?id=' + item.id" hover-class="none">
							全部{{ item.reply_count }}条回复 >
						</navigator>
					</view>
				</view>
				<loading v-if="hasMoreData"></loading>
				<view class="no-comment" v-if="article_info.replycount == 0">暂无评论，快来抢占沙发吧~</view>
			</view>
			
			
			
			<view class="float-empty"></view>
				<view class="bg-masker" v-if="showAddComment" @tap="initAddComment(false)"></view>
				<view class="add-comment" v-if="!showPageLoading">
					<view class="info">
						<view class="input">
							<textarea
								:cursor-spacing="20"
								ref="commentContent"
								:show-confirm-bar="false"
								@focus="initAddComment(true)"
								:maxlength="200"
								:focus="addCommentFocus"
								:fixed="true"
								:auto-height="true"
								v-model.trim="commentContent"
								placeholder-class="input-bg"
								:placeholder="replyCommentId > 0 ? '回复 ' + replyNickname + '：' : '发表评论'"
							/>
						</view>
						<view class="add">
							<button class="mini-btn" type="primary" size="mini" @click="addCommentOrReply()">{{ replyCommentId > 0 ? '回复' : '发表' }}</button>
						</view>
					</view>
				</view>
			</view>
	</view>
	
</template>

<script>
import c from 'modules/common.js'
	import b from 'modules/bll.js'
	var dataItem={};
export default {
	data() {
	 return {
		 article_info:{
			 piclist:[],
		 },
		showAddComment: true,
		addCommentFocus: true,
		commentContent: '',
		replyCommentId: -1,
		replyNickname: '',
		page_index: 1,
		page_size: 10,
		hasMoreData: false,
		showPageLoading: false,
		replylist:[],
	 }
	},
	onLoad(data){
		console.log('onLoad========》'+JSON.stringify(data)); 
		// data.data="{\"InfoType\":\"10002\",\"ID\":\"11149\",\"点赞个数\":\"0\",\"创建日期\":\"2021/5/24 19:17:50\",\"content\":\"\",\"name\":\"管理员\",\"头像\":\"53826800-6b03-4ada-b101-f940010f6466.jpg\",\"发货地址省份\":\"\",\"发货地址城市\":\"全国\",\"发货地址县区\":\"\",\"发布用户\":\"10000\",\"PublishUserID\":\"94A7DAF5-5690-45A0-930C-9C7B305F5C8F\",\"是否置顶\":\"10001\",\"置顶排序数字\":\"\",\"userimgurl\":\"http://local.softmarket.cn/UploadFiles/53826800-6b03-4ada-b101-f940010f6466.jpg\",\"unReadReplyCount\":0,\"ShowCount\":2,\"showtime\":\"17天前\",\"replylist\":[],\"replycount\":0,\"piclist\":[],\"videolist\":[],\"IsFocus\":0,\"CatalogList\":[{\"ID\":\"11014\",\"title\":\"身边的公园\"}]}";
			// data.data="{\"ID\":\"11005\"}";
		console.log('onLoad========》'+data+JSON.stringify(data)); 
		 
		if(c.isNull(data.data))
		{
			c.show('缺少话题帖子ID');
			return;}
			
		 dataItem = JSON.parse(data.data);
		
		// this.article_info=dataItem;
		
		this.reload();
	 },
	 methods:{
		 zanClick(item){
		 	  c.loading();
		 	  b.getHttpWithParam("action=businesszan&bussinessid="+item.ID+"&iszan=1",(data)=>{
		 		  item["点赞个数"]=parseInt(item["点赞个数"]+"")+1;
		 		  c.hideLoading();
		 	  });
		 },
		 reload(){
			 
			 c.loading();
			 b.getHttpWithLocation("action=bussinessreplaylist&db=本地圈儿1004&type=10001&queryuserencryptid="+c.getUser(false).EncryptID+"&catalogid="+dataItem.ID
			 ,(data)=>{
			 
			 	if(data.Status==1)
			 	{
					this.article_info=data.Data.Topic;
					var tmpPiclist=[];
					for(var i=0;i<this.article_info.piclist.length;i++)
					{
						tmpPiclist.push({url:b.getHostFile()+this.article_info.piclist[i]["图片"]});
					}
					this.article_info.piclist=tmpPiclist;
					console.log('tmpPiclist'+JSON.stringify(this.article_info.piclist))
					
			 		this.replylist=data.Data.ReplyList;
			 	}
			 	c.hideLoading();
			 });
		 },
		 /*初始化添加评论*/
		 initAddComment(status) {
		 	this.showAddComment = status;
		 	if (this.replyCommentId > 0) {
		 		this.replyCommentId = 0;
		 		this.replyNickname = '';
		 	}
		 	setTimeout(() => {
		 		this.addCommentFocus = status;
		 	}, 200);
		 },
		 
		 /*添加评论或回复*/
		 addCommentOrReply() {
		 
			if (this.commentContent == '') {
				c.show('评论内容不能为空');
				return;
			}
			
			let loginedEncryptID=c.getUser(true).EncryptID;
			c.loading();
			b.getHttpWithLocation("action=buiness_reply&db=本地圈儿1004&type=10001&queryuserencryptid="+loginedEncryptID+"&id="+dataItem.ID
			+"&content="+this.commentContent,(data)=>{
				
				if(data.Status==1)
				{
					let newReplyItem=data.Data;
					newReplyItem.content=this.commentContent;
					newReplyItem.name=c.getUser().姓名;
					newReplyItem.url=c.getUser().url;//头像
					this.replylist.unshift(newReplyItem);
					
					// this.info.comment = res.data;
					this.showAddComment = false;
					this.replyCommentId = 0;
					this.replyNickname = '';
					this.commentContent = '';
					c.show('评论成功');
					// this.reload();
					
				}
					c.hideLoading();
			});
			
		 	// if (this.replyCommentId > 0) {
		 	// 	this.addReply();
		 	// } else {
		 	// 	this.addComment();
		 	// }
		 },
		 shareClick(item) {
		 // let loginedUser=c.getUser(true);
		 // if(!loginedUser)
		 // {return;}
		 
		 let shareUrl="";
		 if(item.piclist.length>0)
		 {shareUrl=item.piclist[0];}
		 
		 let title="";
		 if(item.CatalogList.length>0)
		 {
			 title=item.CatalogList[0].title;
		 }
		 
		 				 b.share(b.getHost()+"/topic/topicdetail?data="+JSON.stringify(this.item),title,item.content,shareUrl);
		 				 },
		 /*添加评论*/
		 addComment() {
		 	if (this.commentContent == '') {
		 		c.show('评论内容不能为空');
		 		return;
		 	}
		 	
		 	b.getHttpWithLocation('',(data)=>{
		 		if(data.Status==1)
		 		{
		 			this.info.comment = res.data;
		 			this.showAddComment = false;
		 			this.replyCommentId = 0;
		 			this.replyNickname = '';
		 			this.commentContent = '';
		 			c.show('评论成功');
		 		}
		 	});
		 },
		 
		 /*初始化回复*/
		 initAddReply(comment_id, nickname) {
		 	this.initAddComment(true);
		 	this.replyCommentId = comment_id;
		 	this.replyNickname = nickname;
		 },
		 
		 /*添加回复*/
		 addReply() {
		 	if (this.commentContent == '') {
		 		c.show('回复内容不能为空');
		 		return;
		 	}
		 	
			b.getHttpWithLocation('',(data)=>{
				if(data.Status==1)
				{
					this.info.comment = res.data;
					this.showAddComment = false;
					this.replyCommentId = 0;
					this.replyNickname = '';
					this.commentContent = '';
					c.show('评论成功');
				}
			});
			
		 		
		 	
		 },
		 //获取图片的二维数组
		 getImgList(list){
			
			 if(c.isNull(list)){return [];};
		 	if(list.length <= 0)
		 	return []
		 	let newList = [[]]
		 	for(let i = 0; i < list.length; i++){
		 		newList[newList.length-1].push(list[i])
		 		if((i+1)%3 == 0){
		 			newList.push([])
		 		} 
		 	}
		 	// console.log('数组', newList)
		 	return newList
		 }
	 }
}
</script>

<style>
</style>

<style lang="scss" scoped>
	.contain-box{
		color: #222222;
		padding: 20rpx;
		background-color: #FFFFFF;
		.header-box{
			display: flex;
			.left{
				flex: 1;
				display: flex;
				align-items: center;
				.head-img{
					width: 70rpx;
					height: 70rpx;
					border-radius: 50%;
					image{
						width: 70rpx;
						height: 70rpx;
						border-radius: 50%;
					}
				}
				.info{
					margin-left: 15rpx;
					.name{
						font-size: 32rpx;
						font-weight: 550;
						margin-bottom: 10rpx;
					}
					.tip{
						font-size: 23rpx;
						color: #bfbfbf;
					}
				}
					
			}
				
			.right{
				display: flex;
				align-items: center;
				.btn{
					color: #FFFFFF;
					background: linear-gradient(to right, #FF623E, #FCBC27);
					height: 50rpx;
					border-radius: 25rpx;
					font-size: 25rpx;
					display: flex;
					align-items: center;
					padding: 0 20rpx;
					.text{
						margin-left: 8rpx;
					}
				}
			}
		}	
		.main-text{
			margin-top: 20rpx;
			margin-bottom: 20rpx;
			font-size: 26rpx;
			font-weight: 500;
			color: #222222;
		}
		.img-list-box{
			.row-box{
				display: flex;
				justify-content: space-between;
				margin-bottom: 2vw;
				.column-box{
					display: flex;
					
					.img-single{
						width: 30vw;
						height: 30vw;
					}
				}
			}
		}
		.tag-list-box{
			margin-bottom: 20rpx;
			display: flex;
			flex-wrap: wrap;
			view{
				margin-right: 15rpx;
				margin-bottom: 15rpx;
				background-color: #e6e6e6;
				color: #707070;
				height: 40rpx;
				border-radius: 20rpx;
				font-size: 23rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				padding: 0 20rpx;
			}
		}
		.handle-box{
			display: flex;
			border-top: 1px solid #f2f2f2;
			padding-top: 20rpx;
			view{
				flex: 1;
				display: flex;
				justify-content: center;
				align-items: center;
				.label{
					margin-right: 10rpx;
				}
			}
		}
	}
		
</style>


<style scoped lang="scss">
.comment {
	padding: 0 32rpx;
	background: #fff;
	.title {
		display: flex;
		align-items: center;
		font-size: 34rpx;
		color: #262626;
		font-weight: bold;
		padding-bottom: 20rpx;
		border-bottom: 1rpx solid #eee;
		text {
			font-size: 28rpx;
			color: #999;
			margin-left: 10rpx;
		}
	}
	.item {
		display: flex;
		justify-content: space-between;
		padding: 30rpx 0 20rpx;
		border-bottom: 1rpx solid #eee;
		&:last-child {
			border-bottom: 0;
		}
		.avatar {
			flex-grow: 0;
			flex-shrink: 0;
			margin-right: 20rpx;
			image {
				width: 56rpx;
				height: 56rpx;
				border-radius: 50%;
			}
		}
		.comment-info {
			flex-grow: 1;
			flex-shrink: 1;
			.nickname-like {
				display: flex;
				justify-content: space-between;
				.nickname {
					font-size: 32rpx;
					color: #444;
					font-weight: bold;
				}
				.like {
					display: flex;
					align-items: center;
					image {
						width: 30rpx;
						height: 30rpx;
						margin-right: 14rpx;
					}
					.like-count {
						color: #999;
						font-size: 28rpx;
					}
				}
			}
			.comment-desc {
				color: #444;
				font-size: 32rpx;
				line-height: 1.6;
				margin-top: 15rpx;
			}
			.reply-count {
				background: #f2f2f2;
				padding: 8rpx 20rpx;
				font-size: 30rpx;
				color: #999;
				margin: 20rpx 0 24rpx;
			}
			.date-reply {
				display: flex;
				justify-content: space-between;
				align-items: center;
				.date {
					display: flex;
					align-items: center;
					color: #b4b4b4;
					font-size: 28rpx;
					margin-right: 20rpx;
					margin-top: 4rpx;
				}
				.reply {
					flex-grow: 0;
					flex-shrink: 0;
					font-size: 28rpx;
					color: #999;
				}
			}
		}
	}
	.no-comment {
		padding: 20rpx 0;
		color: #999;
		font-size: 30rpx;
	}
}
.comment-bar {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 120rpx;
	background-color: #ffffff;
	box-shadow: 0 1px 1px 1px rgba(0, 0, 0, 0.4);
	display: flex;
	flex-direction: row;
	.input {
		flex-grow: 0;
		flex-shrink: 0;
		margin: 20rpx 10rpx 20rpx 20rpx;
		display: flex;
		align-items: center;
		background: #f2f2f2;
		width: 420rpx;
		border-radius: 40rpx 40rpx 0 40rpx;
		text {
			font-size: 32rpx;
			color: #aaa;
			margin-left: 38rpx;
		}
	}
	.operate {
		width: 100%;
		flex-grow: 1;
		flex-shrink: 1;
		display: flex;
		justify-content: space-around;
		align-items: center;
		margin-right: 10rpx;
		view,
		navigator {
			display: flex;
			justify-content: space-around;
			align-items: center;
			width: 25%;
			image {
				width: 45rpx;
				height: 45rpx;
			}
		}
		.info,
		.like {
			position: relative;
			.count {
				position: absolute;
				top: -15rpx;
				right: -4rpx;
				background-image: linear-gradient(140deg, #BEEDC7 9%, #8CC7B5 75%);
				display: flex;
				align-items: center;
				border-radius: 50rpx;
				padding: 0 10rpx;
				font-size: 22rpx;
				color: #fff;
				height: 30rpx;
				line-height: 30rpx;
			}
		}
		.share {
			display: flex;
			justify-content: space-around;
			padding: 0;
			background: transparent;
			image {
				width: 45rpx;
				height: 45rpx;
				border: 0;
			}
			&:after {
				display: none;
			}
		}
	}
}
.float-empty {
	height: 120rpx;
	width: 100%;
	display: block;
	background: #fff;
}
.add-comment {
	box-shadow: 0 1px 1px 1px rgba(0, 0, 0, 0.2);
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	background-color: #ffffff;
	z-index: 9999;
	.info {
		display: flex;
		flex-direction: row;
		padding: 20rpx 20rpx 20rpx 20rpx;
		.input {
			flex-grow: 1;
			flex-shrink: 1;
			display: flex;
			align-items: center;
			background: #f2f2f2;
			border-radius: 40rpx 40rpx 0 40rpx;
			padding: 20rpx 32rpx 20rpx;
			line-height: normal;
			textarea {
				//padding: 10rpx 0;
				width: 100%;
				font-size: 32rpx;
				line-height: 42rpx;
				background: #f2f2f2;
			}
		}
		.add {
			flex-grow: 0;
			flex-shrink: 0;
			width: 150rpx;
			display: flex;
			align-items: center;
			margin-left: 10rpx;
		}
		.cancel {
			position: absolute;
			right: 10rpx;
			top: 2rpx;
			/deep/.icon {
				font-size: 40rpx;
				color: #ccc;
			}
		}
	}
}
</style>
