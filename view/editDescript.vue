<template>
	<view class="editDescript">
		<cu-custom bgColor="bg-topic-theme" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">介绍</block>
		</cu-custom>
		<view class="edit-area">
			<textarea @input="textDescript" placeholder="请输入简单的自我介绍吧~"></textarea>
		</view>
		<view class="btn-box flex align-center justify-center"><button class="cu-btn confirem-btn" @tap="editDescript">保存</button></view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				textDescript:""
			}
		}
	}
</script>

<style scoped lang="scss">
	.editDescript{
		.edit-area{
			padding: 15upx;
			background-color: #FFFFFF;
			textarea{
				width: 100%;
				min-height: 15vh;
			}
		}
		.btn-box {
			margin-top: 60rpx;
		
			.confirem-btn {
				width: 710rpx;
				height: 80rpx;
				background: linear-gradient(90deg, rgba(233, 180, 97, 1), rgba(238, 204, 137, 1));
				border: 1rpx solid rgba(238, 238, 238, 1);
				border-radius: 40rpx;
				font-size: 30rpx;
				color: rgba(#fff, 0.9);
			}
		}
	}
</style>
