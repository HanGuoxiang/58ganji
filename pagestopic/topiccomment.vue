<template>
	
  <view class="indextopicContentText">
	  <cu-custom bgColor="bg-topic-theme" :isBack="true">
	    		<block slot="backText">返回</block> 
	    		<block slot="content">发布新话题</block>
	  		<!-- <block slot="right" class="action" @click="publish()">发布</block> -->
	  		<view slot="right" class="action">
	  			<!-- <navigator :url="'chat/chat'">全国</navigator> -->
	  			<text class="cuIcon text" @tap="saveArticle()">提交</text>
	  		</view> 
	    </cu-custom>
	 <!-- <view class="header">
		<view class="left">
			<view @click="toLastPage">
				<u-icon name="close"></u-icon>
			</view>
		</view>
		<view class="right">
		  <view class="btn" @click="saveArticle">
			  发表
		  </view>
		</view>
	  </view> -->
	  <view class="text-box">
		  <u-field
		  v-model="topicContentText"
			
		  	label-width="0"
		  	type="textarea"
		  	placeholder="聊个感兴趣的圈子话题"
		  	:border-bottom="false"
		  >
		  </u-field>
	  </view>
	  
	  <view style="width: 100%;height: 1px;background-color: #0FAEFF;"></view>
	   
	   <!-- <u-gap height="20" bg-color="#f2f2f2" v-if="index < topiclist.length-1"></u-gap> -->
	   <view style="display: flex; padding: 20rpx;align-items: center;">
		   <input  v-model="topicCatalogText" placeholder="请输入话题" style="border: #000000;" />
			<u-button type="priamry" @click="insertTopicClick()">#</u-button> 
	   </view>
	   
	   <view style="width: 100%;height: 1px;background-color: #0FAEFF;"></view>
	  <view class="img-box">
		  <view>
			  <!-- <uni-file-picker 
			      v-model="fileList" 
				  auto-upload=false
			      fileMediatype="image" 
			      mode="grid" 
			      @select="select" 
			  /> -->
			     <fjj-images title="话题配图" :pageImgList="fileList"  v-bind:imgCount="imgCount" @addImg="editParkImg"   @deleteImg="deleteImg"></fjj-images>
				<!-- <u-upload  :file-list="fileList" ></u-upload> -->
		  </view>
		  
	  </view>
	  <view>
		  
	  </view>
  </view>
</template>

<script>
	
	import c from 'modules/common.js'
	import b from 'modules/bll.js'
	
	let dataItem={};
	let that=this;
	export default {
	// name: "qrcode",
		data() {
			return {
				topicCatalogText:'',
				imgCount:9,
				topicContentText:'',
				systemNavHeight: 0,
				// 演示地址，请勿直接使用
				// action: 'http://www.example.com/upload',//图片服务器上传地址
				fileList: []
			}
		},
		onLoad:(data)=>{
		c.getUser(true);
		
		
		
		//微信小程序，一次只能上传1个图
		// if(c.isPlatformWeiXin())
		// {
		// 	this.imgCount=1;
		// }
		// else
		// {
		// 	this.imgCount=9;
		// }
			//系统组件默认微信小程序只能选择一次图上传
			// if(c.isPlatformWeiXin())
			// {
			// 	this.imgCount=1;
			// }
			// else
			// {this.imgCount=9;}
			
			// c.show(data+JSON.stringify(data))
			//测试
			// data.data='{\"ID\":\"11015\",\"title\":\"不忘初心\",\"版块是否置顶\":\"\",\"版块置顶排序号码\":\"\",\"itemBgColorText\":\"padding radius text-center shadow-blur bg-black\"}';
			console.log('onLoad====>'+data+JSON.stringify(data));
			//如果不为空，则显示传递过来的话题
			if(!c.isNull(data.data))
			{
				dataItem=JSON.parse(data.data);
				
				// this.topicContentText="#"+dataItem.title;
			}
			else
			{
				dataItem={ID:'',title:''};
			}
			// c.delay(3,()=>{
			// 	that.topicContentText+='阿道夫';
			// });
		},
		onReady(data)
		{
			console.log('onReady====>'+data+JSON.stringify(data));
			if(!c.isNull(dataItem.title))
			{
				this.topicContentText="#"+dataItem.title+" ";
			}
		},
		methods: {
			
			
			insertTopicClick(){
				
				if(c.isNull(this.topicCatalogText))
				{c.show('话题不能为空');return;}
				this.topicContentText+="#"+this.topicCatalogText+" ";
			},
			// select(e){
			// 	console.log('select====>'+e+JSON.stringify(e));
			// },
			 editParkImg(currentTempFilePath) {
			                //执行增加操作
							this.fileList=this.fileList.concat(currentTempFilePath);
							// this.fileList.push(currentTempFilePath);
			                console.log('currentTempFilePath===》'+currentTempFilePath);
								
			                // uni.uploadFile({
			                //  url: '链接地址',
			                //  filePath: currentTempFilePath,
			                //  name: 'file',
			                //  formData: {},
			                //  success: (res) => {
			
			                //  },
			                //  fail: (res) => {
			
			                //  },
			                // });
			
			            },
			            deleteImg(index) {
			                //删除操作 index数组中的下标
			                console.log(index);
							this.fileList.splice(index,1);
			            },
			toLastPage(){
				c.closePage();
			},
			saveArticle(){
				// c.show(this.topicContentText.length+"asd");
				if(this.topicContentText.length<6)
				{
					c.show('内容不能少于6个字');
					return;
				}
				console.log(JSON.stringify(dataItem));
				// this.fileList[0];
				let uploadfiles=this.fileList.map((value,index)=>{
				return{
				name:'tupian'+index, 
				uri:value
				} 
				}); 
				// console.log('uploadfiles'+JSON.stringify(uploadfiles));
				// return;
				c.loading();
				//没有图片不用上传的upload，app无图会报错
				console.log('this.fileList.length=====>'+typeof(this.fileList.length)+this.fileList.length); 
				
				if(this.fileList.length <= 0 )
				{ 
					b.getHttpWithLocation("action=business_insert&db=本地圈儿1004&type=10001&content="+escape(this.topicContentText)+"&catalog="+dataItem.ID,
					(data)=>{
						console.log('data==>'+data+JSON.stringify(data));
						// c.show(data); 
						if(data.Status==1) 
							 {
								 uni.$emit('publish_reload');
								 c.closePage();
									
								c.show('发表成功');
								// c.delay(2,function(){
								// 	c.closePage();
								// })
							}
						c.hideLoading();
					});
					return;
				}
				//
				b.uploadFiles("action=business_insert&db=本地圈儿1004&type=10001&topicContentText="+escape(this.topicContentText)+"&catalog="+dataItem.ID,
				uploadfiles,(data)=>{
					console.log('data==>'+data+JSON.stringify(data));
					// c.show(data);
					if(data.Status==1)
						 {
							 uni.$emit('publish_reload');
							 	c.closePage();
								
							c.show('发表成功');
							// c.delay(2,function(){
							// 	c.closePage();
							// })
						}
					c.hideLoading();
				});
				
				   // uni.uploadFile({
				   //          url: "https://local.softmarket.cn/A接口/DataHandler.ashx?action=business_insert&db=本地圈儿1004&type=10001&topicContentText="+this.topicContentText+"&catalog="+dataItem.ID, //仅为示例，非真实的接口地址
							// files:uploadfiles,
							// // files: [{name:"asdf_pic",filePath:this.fileList[0]}],
							// // files:this.fileList,
				   //          name: 'file',
							// filePath:'',
				   //          // formData: {
				   //          //     'user': 'test'
				   //          // },
				   //          success: (uploadFileRes) => {
									
				   //              console.log('uploadFileRes=======>'+uploadFileRes.data);
							// 	if(uploadFileRes.data.Status==1)
							// 	 {
							// 		 uni.$emit('publish_reload');
							// 		c.show('发表成功');
							// 		c.delay(2,function(){
							// 			c.closePage();
							// 		})
							// 	}
							// c.hideLoading();
				   //          }
				   //      });
						
				// b.getHttpWithLocation("action=business_insert&db=本地圈儿1004&type=10001&topicContentText="+this.topicContentText+"&catalog="+dataItem.ID,(data)=>{
				// 	 if(data.Status==1)
				// 	 {
				// 		 uni.$emit('publish_reload');
				// 		c.show('发表成功');
				// 		c.delay(2,function(){
				// 			c.closePage();
				// 		})
				// 	}
				// });
			}
		}
}
</script>
<style>
page {
	background-color: #FFFFFF;
}
</style>
<style scoped lang="scss">
.header{
	display: flex;
	padding: 20rpx;
	.left{
		flex: 1;
		view{
			padding: 10rpx;
		}
	}
	.right{
		.btn{
			height: 50rpx;
			padding: 0 20rpx;
			border-radius: 25rpx;
			font-size: 25rpx;
			display: flex;
			align-items: center;
			justify-topicContentText: center;
			background: linear-gradient(to right, #2FC1DF, #057ED6);
			color: #FFFFFF;
		}
	}
}
.img-box{
	padding: 20rpx;
}
</style>
