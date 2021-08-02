<template>
	<view class="page">
		<cu-custom bgColor="bg-topic-theme" :isBack="true"><block slot="content">建议反馈</block></cu-custom>
		<!-- 选择反馈类型 -->
		<!-- <view class="feedback-type">
			<view class="title">
				<text>{{TypeArray[TypeIndex]}}</text>
			</view>
			<view class="picker">
				<picker @change="FeedbackTypeCh" :value="TypeIndex" :range="TypeArray">
						<view class="uni-input">{{TypeArray[TypeIndex]}}</view>
				</picker>
			</view>
			<view class="more">
				<text class="iconfont icon-more1"></text>
			</view>
		</view> -->
		<!-- 反馈内容 -->
		
		<view class="feedback-data">
			<view class="content">
				<textarea value="" placeholder="请输入您对平台的宝贵建议" v-model="content" />
			</view>
			<!-- <view class="voucher-img">
				<view class="list">
					<image src="/static/voucher_bg.png"></image>
				</view>
				<view class="list">
					<image src="/static/img/yf_01.png"></image>
				</view>
				<view class="list">
					<image src="/static/img/yf_01.png"></image>
				</view>
			</view> -->
		</view>
		<!-- 联系方式 -->
		<view class="contact-way">
			<input type="text" placeholder="手机/邮箱/QQ" v-model="contact">
		</view>
		<!-- 提交 -->
		<view class="submit-btn" @click="subClick">
			<text>提交</text>
		</view>
	</view>
</template>

<script>
	import c from 'modules/common.js'
	import b from 'modules/bll.js'
	
	export default {
		data() {
			return {
				content:"",
				contact:"",
				TypeArray: ['商品相关', '物流状况', '客户服务', '优惠活动','产品体验','产品功能','其他问题'],
				TypeIndex: 0,
			};
		},
		methods:{
			subClick(){
				if(c.isNull(this.content))
				{
					c.show('反馈内容不能为空');
					return;
				}
				if(c.isNull(this.contact))
				{
					c.show('联系方式内容不能为空');
					return;
				}
				b.getHttpWithParam('action=feedback_insert&content='+this.content+"&contact="+this.contact,(data)=>{
					if(data.Status==1)
					{
						c.show('感谢您的建议与反馈',()=>{
								c.closePage();
						});
					
					}
				});
			},
			/**
			 * 反馈类型
			 * @param {Object} val
			 */
			FeedbackTypeCh(val){
				console.log(val);
				this.TypeIndex = val.detail.value;
			}
		}
	}
</script>

<style scoped lang="scss">
	@import 'Feedback.scss';
</style>
