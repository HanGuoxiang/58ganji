<template>
<view>
<!-- 	<uni-nav-bar class="bg-topic-theme">
	    <view>标题栏</view>
	    <view slot="left">left</view>
	    <view slot="right">right</view>
	</uni-nav-bar> -->
		<cu-custom bgColor="bg-topic-theme" :isBack="false">
					<!-- <block slot="backText">返回</block> -->
					  <!-- <view slot="left">left</view> -->
					
					 <view slot="right" class="action">
					 	<!-- <navigator :url="'chat/chat'">全国</navigator> -->
					 	<text class="cuIcon text" @tap="chooseCityClick()">{{curCity}}</text>
					 </view> 
					<block slot="content">话题</block>
					<view slot="right" class="action">
						<!-- <navigator :url="'chat/chat'">全国</navigator> -->
						<text class="cuIcon text" @tap="publish()">发布</text>
					</view> 
					<!-- <block slot="right" class="action" @click="publish()">发布</block> -->
				</cu-custom>

	<!-- 	<u-navbar :is-back="false"  title="话题" background="background"  class="bg-topic-theme">
			<view class="cuIcon text" @tap="chooseCityClick()">{{curCity}}</view>
			 <view slot="right">right</view>
			
		</u-navbar> -->

			 
		<swiper class="card-swiper square-dot" :indicator-dots="true" :circular="true" :autoplay="true" interval="5000"
		 duration="500" @change="cardSwiper" indicator-color="#8799a3" indicator-active-color="#F8D347">
			<swiper-item v-for="(item,index) in topBannerList" :key="index" :class="cardCur==index?'cur':''">
				<view class="swiper-item" @click="topBannerClick(item)">
					<image :src="item.picurl" mode="aspectFill" v-if="item.type!='image'"></image>
					<!-- <video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video> -->
				</view>
			</swiper-item>
		</swiper>  
			
		<view  class="grid col-4 padding-sm">
				<view class="padding-sm"   v-for="(item,index) in labelList" :key="index"   @tap="labelClick(item)">
					<view v-bind:class="item.itemBgColorText" > 
						<view class="text-lg">{{item.title}}</view>  
						<!-- <view class="margin-top-sm text-Abc">red </view> -->
					</view>
				</view>
				
		</view>
	</view>
</template>

<script>
	import c from 'modules/common.js' 
	import b from 'modules/bll.js'
	// console.log(123)
	
	
	export default{
		
		data(){ 
			return{
			
								background: {
									backgroundColor: '#F8D347',
									
									// 导航栏背景图
									// background: 'url(https://cdn.uviewui.com/uview/swiper/1.jpg) no-repeat',
									// 还可以设置背景图size属性
									// backgroundSize: 'cover',
									
									// 渐变色
									// backgroundImage: 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
								},
				cardCur:0,
				itemBgColorText:"",//每个话题的背景色
				topBannerList:[],
				labelList:[], 
				curCity:"全国",
			}
		},
		onPullDownRefresh() {
			console.log('123');
			// this.reload();
		},
		
		methods:{ 
			
			topBannerClick(data){
				// c.show("adasd");
				b.openBannerPage(data);
			},
			
					reload(isCheckLocationReal)
					{
						uni.startPullDownRefresh({
							
						});
						c.loading();
						b.getAppUsingCity(isCheckLocationReal,(data)=>{
							this.curCity=data;
							
							b.getHttpWithLocation("db=本地圈儿1004&action=labellist",
							(data,error)=>{ 
							
								// this.title='请求后';
								var list=data.Data.TopBanner;
								for(var i=0;i<list.length;i++)
								{
									var item=list[i];
								  item.picurl=b.getHostFile()+item.封面;
								  }
								this.topBannerList=list;
								
								for(var i=0;i<data.Data.LabelList.length;i++)
								{
									var item =data.Data.LabelList[i];
									item.itemBgColorText='padding radius text-center shadow-blur bg-'+ c.randomColorText();
								}
								// console.log(JSON.stringify(data.Data.LabelList));
								this.labelList=data.Data.LabelList;
								c.hideLoading();
								uni.stopPullDownRefresh();
							});
						});
									
						
					}, 
			onLoad(){ 
				
								
				this.reload(true);
				
			}, 
			//点击话题分类进入
			labelClick(item){
				console.log('123');
				c.openPage('/pagestopic/topiclist',item);
				// c.show(JSON.stringify(item));
			},
			//发布
			publish(){
				  // c.show('123');
				 // c.openPage('topicdetail');
				  if(!c.getUser(1))
				  {return;} 
				  c.openPage('/pagestopic/topiccomment');
				  uni.$once('publish_reload',()=>{
				  		  this.reload();
				  })
			},
			//定位城市
			chooseCityClick(){
				// c.show('2');
				// uni.navigateTo({
				// 	url:'view/chooseCity'+"?data="
				// });
				c.openPage('../../view/chooseCity');
				// uni.$once("chooseCityFinished",function(data){
					uni.$once("chooseCityFinished",(data)=>{
					console.log('asdf'+data);
					// c.show('asds'+data);
				
					this.reload(false);
					
					
				});
			}, 
			//轮播图的事件
			cardSwiper(e) {
				// c.show(12);
				this.cardCur = e.detail.current
			},
		}
	
		
	}
</script>

<style>
	
</style>
