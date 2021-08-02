<template>
	<view>
	
			<cu-custom bgColor="bg-topic-theme" :isBack="false">
			  		<!-- <block slot="backText">返回</block> -->
			  		<block slot="content">快捷发布</block>
					<!-- <block slot="right" class="action" @click="publish()">发布</block> -->
					<view slot="right" class="action">
						<!-- <navigator :url="'chat/chat'">全国</navigator> -->
						<!-- <text class="cuIcon text" @tap="publish()">发布</text> -->
					</view> 
			  </cu-custom>
			  
			  <view class="cu-list grid" :class="['col-' + gridCol,'no-border']">
			  		<view class="cu-item" v-for="(item,index) in cuIconList" :key="index" v-if="index<gridCol*2"  @tap="hrefSort(item)">
			  			<image :src="item.url" mode="aspectFit"   style="height: 50px;"></image>
			  <!-- <u-image :src="item.url"></u-image> -->
			  			<!-- <view :class="['cuIcon-' + item.cuIcon,'text-' + item.color]">
			  				<view class="cu-tag badge" v-if="item.badge!=0">
			  					<block v-if="item.badge!=1">{{item.badge>99?'99+':item.badge}}</block>
			  				</view>
			  			</view> -->
			  			<text>{{item["标题"]}}</text>
			  		</view>
			  	</view>
	</view> 
</template> 

<script>   
	import c from 'modules/common.js'
	import b from 'modules/bll.js'
	
	
	export default {
		data() {
			return {
				gridCol:4,
				cuIconList:[],
			}
		},
		onLoad(data) {
			
			console.log('onLoad====>'+data+JSON.stringify(data))
			c.loading();
			 
			b.getHttpWithLocation("action=publishcatalog&db=本地圈儿1004&ordertype=10000&pageindex=0&pagesize=50&",(data)=>{
				 // console.log('data'+data+JSON.stringify(data));
				 
				
				this.cuIconList=data.Data.SystemCatalogList;
				
						c.hideLoading();
			});
			
			
		},
		methods: {
			hrefSort(item){
				// console.log('item====>'+JSON.stringify(item));
				item.isPublishing=true;
				b.openBannerPage(item);
			
			},
		}
	}
</script>

<style>

</style>
