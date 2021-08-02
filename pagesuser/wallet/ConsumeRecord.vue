<template>
	<view class="page">
		<cu-custom bgColor="bg-topic-theme" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">明细</block>
		
			<view slot="right" class="action">
				<!-- <navigator :url="'chat/chat'">全国</navigator> -->
				<!-- <text class="cuIcon text" @tap="shareClick()">分享</text> -->
			</view> 
		</cu-custom>
		
		<!-- 头部背景 -->
		<view class="head-bg">
			<view class="wallet-balance">
				<view class="wallet">
					<text class="number">￥{{loginedUser['余额']}}</text>
					<text><text class="iconfont icon-qianbao" style="margin-right: 20rpx;"></text>当前余额</text>
				</view>
			</view>
			<view class="bg">
				<image src="/static/integral_bg1.png" mode=""></image>
			</view>
		</view>
		<!-- 记录列表 -->
		<view class="record-list">
			<view class="list" v-for="(item,index) in orderlist" :key="index">
				<view class="title-date">
					<view class="title">
						<text>{{item['订单名称']}}</text>
					</view>
					<view class="date">
						<text>{{item['创建日期']}}</text>
					</view>
				</view>
				<view class="integral">
					<text v-if="index > 3" style="color: #22AA44;">{{item['订单价格']}}</text>
					<text v-else>-100</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	
	import c from '../../modules/common.js'
	import b from '../../modules/bll.js'
	
	
	export default {
		data() {
			return {
				loginedUser:{},
				orderlist:[],
			};
		},
		onLoad() {
		this.reload();
		}, 
		methods:{
			reload(){
				c.loading();
				b.getHttpWithParam("action=orderlist&filterwalletlog=1",(data)=>{
					if(data.Status==1)
					{
						
						this.orderlist=data.Data;
					}
					c.hideLoading();
					}
					);
					
				b.getUserInfo(()=>{
					this.loginedUser=c.getUser();
			
				});
			},
			}
	}
</script>

<style scoped lang="scss">
	@import 'ConsumeRecord.scss';
</style>
