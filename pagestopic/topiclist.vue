<template>
	
  <view class="indexContent">
	  <!-- <uni-nav-bar  left-icon="back" left-text="返回" right-text="菜单" title="导航栏组件"></uni-nav-bar> -->
	<!-- <u-navbar back-text="返回" title="话题列表">
		  <u-button type="primary">主要按钮</u-button>
	  </u-navbar> -->
	<cu-custom bgColor="bg-topic-theme" :isBack="true">
	  		<block slot="backText">返回</block> 
	  		<block slot="content">话题列表</block>
			<!-- <block slot="right" class="action" @click="publish()">发布</block> -->
			<view slot="right" class="action">
				<!-- <navigator :url="'chat/chat'">全国</navigator> -->
				<text class="cuIcon text" @tap="publish()">发布</text>
			</view> 
	  </cu-custom>
		 
		<view class="content">
			
	<view class="goods-list">
	    <view class="single-box-1" v-for="(article_info ,index) in topiclist">
		
			<view class="contain-box" >

			<view class="header-box" @click="itemClick(article_info)" >
				<view class="left">
					<view class="head-img">
						<u-image width="70rpx" height="70rpx" border-radius="35rpx" :src="article_info.userimgurl"></u-image>
					</view>
					<view class="info">
						<view class="name">
							{{article_info.name}}
						</view>
						<view class="tip">
							{{article_info['创建日期']}} 
							<!-- 来自	{{article_info.machine}} -->
						</view>
					</view>
				</view> 
				<view class="right"> 
					<view class="btn" >
						<span class="text" v-if="article_info.IsFocus==0">
							<u-icon name="plus" color="#FFFFFF"></u-icon>
							关注
						</span>
						<span class="text" v-if="article_info.IsFocus==1">
							已关注
						</span>
					</view>
				</view>
			</view> 
			<view class="main-text" @click="itemClick(article_info)" >
				{{article_info.content}}
			</view>
			<view class="img-list-box">
				<view class="row-box" v-if="imgItem.length > 1" v-for="(imgItem, imgIndex) in getImgList(article_info.piclist)" :key="imgIndex">
					
					<view class="column-box" v-for="bkitem in imgItem">
						
					<!--  #ifdef  MP-WEIXIN -->
					<!-- <view class="column-box" v-for="(bkitem, bkIndex) in imgItem" :key="bkIndex"> -->
					<!--  #endif -->
					<!--  #ifdef   H5 -->
					<!-- <view class="column-box" v-for="bkitem in imgItem"> -->
					<!--  #endif -->
						<view class="img-single">
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
			  
			<view style="clear: both;"></view>
			<view class="tag-list-box">
				<view v-for="item in article_info.CatalogList">
					{{item.title}}
				</view>
			</view>

			
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
				<view @click="itemClick(article_info)">
					<span class="label">
						<u-icon name="chat"></u-icon>
					</span>
					<span>
						评论 ({{article_info.replycount}})
					</span>
				</view>
				<view @click="shareClick(article_info)">
					<span class="label">
						<u-icon name="moments"></u-icon>
					</span>
					<span>
						分享
					</span>
				</view>
				
			</view>
			
			
			</view>
	
		<u-gap height="20" bg-color="#f2f2f2" v-if="index < topiclist.length-1"></u-gap>

		</view>
	 </view>
	 </view>
	<!-- <me-tabs v-if="isShowSticky" v-model="tabIndex" :fixed="true" :tabs="tabs" @change="tabChange"></me-tabs> -->
	<!-- <mescroll-body ref="mescrollRef" 
		@init="mescrollInit" 
		@down="downCallback" 
		@up="upCallback" 
		:up="upOption"
	    @scroll="scroll" 
		@topclick="topClick"> -->
	<!--  <view id="tabInList">
	    <me-tabs v-model="tabIndex" :tabs="tabs" @change="tabChange"></me-tabs>
	  </view> -->
	 <!-- <view class="goods-list">
	    <view class="single-box-1" v-for="(aitem, index) in goods" :key="index">
		  <view>
			  <articlebox :article_info="articleItem"></articlebox>
		  </view>
		  <u-gap height="20" bg-color="#f2f2f2" v-if="index < goods.length-1"></u-gap>
	    </view>
	  </view> -->
	<!-- </mescroll-body> -->
	
    
    

  
  </view>
</template>

<script>
	import c from 'modules/common.js'
	import b from 'modules/bll.js'
	// import articlebox from '@/components/article_box.vue'
// import constant from '@/common/js/utils/constant.js'
// import api from '@/common/js/utils/api.js'
// import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";

let tabItem = [
  {name: '推荐', goods: null, num: 1, y: 0, curPageLen: 0, hasNext: true},
  {name: '关注', goods: null, num: 1, y: 0, curPageLen: 0, hasNext: true}
]

var dataItem={};
export default {
  // mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
  // components: {articlebox},
  data() { 
    return {
		// tabs: tabItem,
		upOption: {},
		topiclist:[],
		// tabIndex: 0, // 当前菜单下标
		preIndex: 0, // 前一个菜单下标
		navTop: null, // nav距离到顶部的距离 (如计算不准确,可直接写死某个值)
		isShowSticky: false,// 是否悬浮
		/*吸顶悬浮，上拉加载，下拉刷新组件 end*/
		list: [],
		
		
		windowWidth: 0
    }
  },

  onLoad(data) { 
	  //测试数据{Command:10000,selCatalog:{xxx}}
	  // data.data='{\"ID\":\"11016\",\"title\":\"不忘初心\",\"版块是否置顶\":\"\",\"版块置顶排序号码\":\"\",\"itemBgColorText\":\"padding radius text-center shadow-blur bg-black\"}';
	   
	   console.log('onLoad========》'+data+JSON.stringify(data)); 
		if(c.isNull(data.data))
		{
		  c.show('缺少话题类目ID');
		  return;
		  }
		  
	  dataItem=JSON.parse(data.data);
	this.reload();
 //    this.list = this.$tabList;
 //    uni.getSystemInfo({
 //      success: (res) => {
 //        this.windowWidth = res.windowWidth;
 //      }
 //    })
	// return
    
   
  },
  computed: {
    // goods() {
    //   return this.tabs[this.tabIndex].goods
    // }
  },

  methods: {
	  reload(){ 
	
		  c.loading();
		  var loginedEncryptID='';
		  if(c.getUser()) 
		  {
		  	 loginedEncryptID=c.getUser().EncryptID;
		  }
		  b.getHttpWithLocation("action=bussinesslist&db=本地圈儿1004&type=10001&queryuserencryptid="+loginedEncryptID+"&catalogid="+dataItem.ID+"&ordertype=10000&pageindex=0&pagesize=50&",(data)=>{
		  	 // console.log('data'+data+JSON.stringify(data));
		  	this.topiclist=data.Data.TopicList;
			c.hideLoading();
		  });
	  },
	  //点击item，进去某一个话题详情页
	  itemClick(data){
		  c.openPage('topicdetail',data);
	  },
	  //发布
  publish(){
	  // c.show('123');
	 // c.openPage('topicdetail');
	  if(!c.getUser(1))
	  {return;}
	  c.openPage('topiccomment',dataItem);
	  uni.$once('publish_reload',()=>{
	  		  this.reload();
	  })
  },
  zanClick(item){
	  c.loading();
	  b.getHttpWithParam("action=businesszan&bussinessid="+item.ID+"&iszan=1",(data)=>{
		  item["点赞个数"]=parseInt(item["点赞个数"]+"")+1;
		  c.hideLoading();
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
    	return newList;
    },
 shareClick(item) {
		 // let loginedUser=c.getUser(true);
		 // if(!loginedUser)
		 // {return;}
		 console.log("item=="+JSON.stringify(item));
		 
		 let shareUrl="";
		 if(item.piclist.length>0)
		 {shareUrl=item.piclist[0];}
		  
		 let title="";
		 if(item.CatalogList.length>0)
		 {
			 title=item.CatalogList[0].title;
		 }
		   
		   let idItem={ID:item.ID};
		 				 b.share(b.getHost()+"h5/#/pagestopic/topicdetail?data="+JSON.stringify(idItem),title,item.content,shareUrl);
		 				 },
    // downCallback() {
    //   this.mescroll.resetUpScroll()
    // },

    // upCallback(page) {
    //   if (this.isChangeTab) {
    //     this.mescroll.hideUpScroll();
    //     uni.showLoading();
    //   }
    //   let keyword = this.tabs[this.tabIndex].name;

    //   let curPageData = []//curPageData后台返回的列表的数组
    //   // 当前tab数据
    //   let curTab = this.tabs[this.tabIndex]
    //   //设置列表数据
    //   if (page.num == 1) curTab.goods = []; //如果是第一页需手动制空列表

    //   let newGoodsData = []
    //   for (let i = 0; i < 10; i++) {
    //     newGoodsData.push({
    //       id: 0,
    //       name: '索引' + this.tabIndex + '菠萝炒饭桂林山水甲天下，张家界凤凰古镇',
    //       tipText: '菠萝炒饭桂林山水甲天下，张家界凤凰古镇',
    //       price: '99.99',
		  // boxType: (this.tabIndex == 0)?'goods':'shop'
    //     })
    //   }
    //   if (curTab.goods.length < 20) {
    //     curPageData = newGoodsData
    //   }

    //   curTab.goods = curTab.goods.concat(curPageData); //追加新数据

    //   // 数据渲染完毕再隐藏加载状态 this.$nextTick在iOS真机不触发,需改成setTimeout
    //   setTimeout(() => {
    //     // 需先隐藏加载状态
    //     this.mescroll.endSuccess(curPageData.length);
    //     // 再记录当前页的数据
    //     curTab.num = page.num; // 页码
    //     curTab.curPageLen = curPageData.length; // 当前页长
    //     curTab.hasNext = this.mescroll.optUp.hasNext; // 是否还有下一页

    //     // 设置nav到顶部的距离 (需根据自身的情况获取navTop的值, 这里放到列表数据渲染完毕之后)
    //     // 也可以放到onReady里面,或者菜单顶部的数据(轮播等)加载完毕之后..
    //     if (!this.navTop) this.setNavTop()
    //     // 保持tab悬浮,列表数据显示第一条
    //     if (this.isChangeTab) {
    //       this.isChangeTab = false;
    //       uni.hideLoading();
    //       if (this.isShowSticky) this.mescroll.scrollTo(this.navTop, 0)
    //     }
    //   }, 20)

    // },

    // 设置nav到顶部的距离 (滚动条为0, 菜单顶部的数据加载完毕获取到的navTop数值是最精确的)
    // setNavTop() {
    //   let view = uni.createSelectorQuery().select('#tabInList');
    //   view.boundingClientRect(data => {
    //     this.navTop = data.top // 到屏幕顶部的距离
    //   }).exec();
    // },

 //    scroll() {
 //      // 菜单悬浮的原理: 监听滚动条的位置大于某个值时,控制顶部菜单的显示和隐藏
 //      if (this.mescroll.getScrollTop() >= this.navTop) {
 //        this.isShowSticky = true // 显示悬浮菜单
 //      } else {
 //        this.isShowSticky = false // 隐藏悬浮菜单
 //      }
 //    },
 //    // 点击回到顶部按钮时,先隐藏悬浮菜单,避免闪动
 //    topClick() {
 //      this.isShowSticky = false
 //    },
	// toPageBtn(index) {
	// 	uni.navigateTo({
	// 		url: this.boxList[index].pageUrl
	// 	})
 //    }
  // },

  // onPageScroll(e) {
  //   /*吸顶悬浮，上拉加载，下拉刷新组件*/
  //   if (e.scrollTop >= this.navTop) {
  //     this.isShowSticky = true // 显示悬浮菜单
  //   } else {
  //     this.isShowSticky = false // 隐藏悬浮菜单
  //   }
    /*吸顶悬浮，上拉加载，下拉刷新组件end*/
  }
}
</script>
 
<style>
.u-mode-center-box {
  border-radius: 20rpx !important;
}
page {
	background-color: #f2f2f2;
}
</style>
<style lang="scss" scoped>
.indexContent {
  position: relative;
}

.authorBtn {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1000;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0;
}

/*吸顶悬浮，上拉加载，下拉刷新组件*/
.demo-tip {
  padding: 18rpx;
  font-size: 24rpx;
  text-align: center;
}

/*吸顶悬浮，上拉加载，下拉刷新组件end*/

.popup-content {
  border-radius: 20rpx;
  padding: 40rpx 20rpx;
  font-family: "Microsoft YaHei UI";

  .loginTip {
    font-size: 40rpx;
    text-align: center;
  }

  .loginBtn {
    position: relative;
    display: flex;
    width: 90%;
    height: 100rpx;
    margin: 60rpx auto;
    border-radius: 20rpx;
    background-color: #C69C6C;
    justify-content: center;
    align-items: center;
    font-size: 35rpx;
    color: #ffffff;

    .item {
      flex: auto;
      &:nth-child(2) {
        padding-right: 10rpx;
      }
    }
  }
}
 
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
