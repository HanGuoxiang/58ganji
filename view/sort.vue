<template>
	<view class="sort">
		<cu-custom bgColor="bg-topic-theme" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">{{title}}</block>
		</cu-custom>
		<!-- tab栏切换-begin -->
	<!-- 	<scroll-view scroll-x class="nav nav-liner" scroll-with-animation :scroll-left="scrollLeft">
			<view class="cu-item" :class="index==TabCur?'text-black':''" v-for="(item,index) in sortList" :key="index" @tap="tabSelect" :data-id="index">
				<view class="cu-bar justify-center">
					<view class="action sub-title">
						<text class="text-sm text-bold text-black" :class="index==TabCur?'text-focus':''">{{item.title}}</text>
						<text class="bg-topic-theme" :class="index==TabCur?'isFocus':'foucus-no'" style="width:3rem"></text>
						
					</view>
				</view>
			</view>
		</scroll-view> -->
		<scroll-view scroll-x class="bg-white nav" :style="{position:'fixed',zIndex:'99',top:custombar+'px'}" scroll-with-animation :scroll-left="scrollLeft">
			<view class="cu-item" :class="index==TabCur?'text-green cur':''" v-for="(item,index) in detailList" :key="index" @tap="tabSelect" :data-id="index">
				{{item.title}}
			</view>
		</scroll-view>
		<!-- tab栏切换-end -->
		<view class="goods" :style="{marginLeft:'-'+TabCur*100+'vw',width:sortList.length*100+'vw'}">
			<view class="good" v-for="(item,index) in detailList" :key="index">
				<Goods @clickHref="hrefstoreDetail"></Goods>
			</view>
		</view>
	</view>
</template>

<script>
	import c from 'modules/common.js'
	import b from 'modules/bll.js'
	
	
	import Goods from "@/components/goods.vue"
	export default{
		components:{
			Goods
		},
		data(){
			return{
				TabCur: 0,
				scrollLeft: 0,
				type:null,
				custombar:this.CustomBar,
				title:'',
				sortList:[
				],
				detailList:[
					{
						id:1,
						name:"水族用1品"
					},
					{
						id:2,
						name:"宠物营养"
					},
					{
						id:3,
						name:"宠物玩具"
					},
					{
						id:4,
						name:"餐具"
					},
					{
						id:5,
						name:"收纳用品"
					},
					{
						id:6,
						name:"钟表"
					},
				]
			}
		},
		onLoad(data) {
			
			data.data='{\"ID\":\"10000\",\"创建日期\":\"2021/5/25 10:47:18\",\"操作人\":\"10000\",\"父账号ID\":\"-1\",\"分类名称\":\"本地服务\",\"图片\":\"\",\"备注\":\"\",\"url\":\"https://local.softmarket.cn/UploadFiles/\",\"SubCatalogList\":[{\"ID\":\"10000\",\"创建日期\":\"2020/6/12 18:07:59\",\"分类名称\":\"跑腿\",\"图片\":\"de5b486a-76c2-4d00-b465-3a779846513e.jpg\",\"操作人\":\"10000\",\"url\":\"https://local.softmarket.cn/UploadFiles/de5b486a-76c2-4d00-b465-3a779846513e.jpg\",\"title\":\"跑腿\"},{\"ID\":\"10001\",\"创建日期\":\"2020/6/12 18:07:59\",\"分类名称\":\"餐饮\",\"图片\":\"\",\"操作人\":\"\",\"url\":\"https://local.softmarket.cn/UploadFiles/\",\"title\":\"餐饮\"},{\"ID\":\"10002\",\"创建日期\":\"2020/6/12 18:07:59\",\"分类名称\":\"顺风车\",\"图片\":\"79e26326-3651-4633-ab5c-d2d9d8dd848d.jpeg\",\"操作人\":\"10000\",\"url\":\"https://local.softmarket.cn/UploadFiles/79e26326-3651-4633-ab5c-d2d9d8dd848d.jpeg\",\"title\":\"顺风车\"},{\"ID\":\"10003\",\"创建日期\":\"2021/4/28 15:24:52\",\"分类名称\":\"教育培训\",\"图片\":\"3afeddc5-645b-493c-b879-3f4d351e6ac0.png\",\"操作人\":\"10000\",\"url\":\"https://local.softmarket.cn/UploadFiles/3afeddc5-645b-493c-b879-3f4d351e6ac0.png\",\"title\":\"教育培训\"},{\"ID\":\"10004\",\"创建日期\":\"2021/4/28 15:28:00\",\"分类名称\":\"上门服务\",\"图片\":\"470724c9-de7a-4455-8f66-19dddeb4ee57.png\",\"操作人\":\"10000\",\"url\":\"https://local.softmarket.cn/UploadFiles/470724c9-de7a-4455-8f66-19dddeb4ee57.png\",\"title\":\"上门服务\"},{\"ID\":\"10005\",\"创建日期\":\"2021/4/28 15:28:13\",\"分类名称\":\"二手市场\",\"图片\":\"bde0c64a-8413-46b4-848e-b89600ee5ce3.png\",\"操作人\":\"10000\",\"url\":\"https://local.softmarket.cn/UploadFiles/bde0c64a-8413-46b4-848e-b89600ee5ce3.png\",\"title\":\"二手市场\"},{\"ID\":\"10006\",\"创建日期\":\"2021/4/28 15:28:23\",\"分类名称\":\"招聘兼职\",\"图片\":\"4c3b9f3d-56c3-412e-bb2a-27c52074a317.png\",\"操作人\":\"10000\",\"url\":\"https://local.softmarket.cn/UploadFiles/4c3b9f3d-56c3-412e-bb2a-27c52074a317.png\",\"title\":\"招聘兼职\"},{\"ID\":\"10007\",\"创建日期\":\"2021/4/28 15:28:29\",\"分类名称\":\"租房\",\"图片\":\"ab9d9de2-1877-49eb-b971-8c9a51283cb0.png\",\"操作人\":\"10000\",\"url\":\"https://local.softmarket.cn/UploadFiles/ab9d9de2-1877-49eb-b971-8c9a51283cb0.png\",\"title\":\"租房\"},{\"ID\":\"10008\",\"创建日期\":\"2021/4/28 15:28:36\",\"分类名称\":\"家装建材\",\"图片\":\"ed9e7af3-08a0-4580-bbfc-4cfe5620d27e.png\",\"操作人\":\"10000\",\"url\":\"https://local.softmarket.cn/UploadFiles/ed9e7af3-08a0-4580-bbfc-4cfe5620d27e.png\",\"title\":\"家装建材\"},{\"ID\":\"10009\",\"创建日期\":\"2021/4/28 15:28:46\",\"分类名称\":\"婚庆服务\",\"图片\":\"025c98c7-b321-433a-ae76-9dad5f9fedc4.png\",\"操作人\":\"10000\",\"url\":\"https://local.softmarket.cn/UploadFiles/025c98c7-b321-433a-ae76-9dad5f9fedc4.png\",\"title\":\"婚庆服务\"},{\"ID\":\"10010\",\"创建日期\":\"2021/5/17 15:23:00\",\"分类名称\":\"起名\",\"图片\":\"1fe6878f-bdbb-4270-8435-ba12d8b1bf84.jpg\",\"操作人\":\"10000\",\"url\":\"https://local.softmarket.cn/UploadFiles/1fe6878f-bdbb-4270-8435-ba12d8b1bf84.jpg\",\"title\":\"起名\"}]}';
			console.log('onLoad======>'+data+JSON.stringify(data));
			
			if(c.isNull(data.data)){
				c.show('缺少传入参数');
				return;
			}
			
			var dataItem=JSON.parse(data.data);
			this.title==dataItem.分类名称;
			this.detailList=dataItem.SubCatalogList;
		c.loading();
		 
		b.getHttpWithLocation("action=cataloglistbyparentid&db=本地圈儿1004&ordertype=10000&pageindex=0&pagesize=50&parentid="+dataItem.ID+"&levelcount=3",(data)=>{
			 console.log('data'+data+JSON.stringify(data));
			 
					c.hideLoading();
		});
			
			
			// 初始化towerSwiper 传已有的数组名即可
		},
		methods:{
			//tab栏切换事件
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			hrefstoreDetail(item){
				uni.navigateTo({
					url:"storeDetail?item=" + encodeURIComponent(JSON.stringify(item))
				})
			}
		},
		
	}
</script>

<style lang="scss" scoped>
	.sort{
		min-height: 100vh;
		background-color: #EEEEEE;
		overflow-x: hidden;
		.goods{
			display: flex;
			position: relative;
			margin-left: 0;
			transition: .5s all;
			margin-top: 90rpx;
			.good{
				flex: 1;
			}
		}
	}
</style>
