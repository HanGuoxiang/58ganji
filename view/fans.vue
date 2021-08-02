<template>
	<view>
		<cu-custom bgColor="bg-topic-theme" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">粉丝</block>
		</cu-custom>
		<view class="cu-item" v-for="(items,sub) in 10" :key="sub">
			<view class="cu-avatar round lg">{{sub}}</view>
			<view class="content">
				<view class="text-black">{{sub}}<text class="text-abc">{{}}</text>君</view>
				<view class="text-gray text-sm">
					有{{sub+2}}个主子需要伺候
				</view>
			</view>
			<button class="cu-btn round sm bg-gradual-Topic">关注</button>
			
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	.cu-item{
		padding: 10rpx 30rpx;
		align-items: center;
		display: flex;
		justify-content: flex-start;
		.cu-btn{
			margin-left: auto;
		}
		.content{
			padding-left: 10rpx;
		}
	}
</style>
