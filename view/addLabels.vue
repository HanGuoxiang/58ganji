<template>
	<view class="addLabels">
		<cu-custom bgColor="bg-topic-theme" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">标签</block>
		</cu-custom>
		<view class="label-container">
			<view class="cu-tag round bg-orange light" :class="'light-'+index" v-for="(item,index) in tagList" :key="index" :data-index="index" @tap="deletTag">{{item}}</view>
		</view>
		<view class="action text-green addinput">
			<input cursor-spacing="10" @focus="InputFocus" @blur="InputBlur" v-model="tagValue" placeholder="添加标签"></input>
			<button :style="[{opacity:showAdd_btn?'0':'1'}]" class="cu-btn bg-green sm shadow" @click="addTag"><text class="cuIcon-add"></text></button>
		</view>
		<view class="btn-box flex align-center justify-center"><button class="cu-btn confirem-btn" @tap="editDescript">保存</button></view>
		<view class="label-comment">
			<view class="cu-bar bg-white">
				<view class="action">
					<text class="cuIcon-title text-green"></text>
					<text class="text-xl text-bold">推荐标签</text>
				</view>
			</view>
			<view class="labels-Chosse">
				<view class="cu-tag round bg-orange light" :class="'light-'+index" v-for="(item,index) in labels" :key="index" :data-index="index" @tap="addSystemTag">{{item}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				tagValue:"",
				tagList:['二次元','居家'],
				labels:['绿植','摄影','绘画','时尚','运动','宠物','音乐','二次元','居家','数码'],
				showAdd_btn:false
			}
		},
		methods:{
			//添加标签
			addTag() {
				if (this.tagValue != null && this.tagValue != '' && !this.showAdd_btn) {
					if(this.tagValue.length<=5){
						this.tagList.push(this.tagValue)
						if (this.tagList.length >= 5) {
							this.showAdd_btn = true
						}
					}else{
						uni.showToast({
							title:"标签太长",
							icon:"none"
						})
					}
					
				}
			},
			addSystemTag(e){
				let key = e.currentTarget.dataset.index
				this.tagList.push(this.labels[key])
				if (this.tagList.length >= 5) {
					this.showAdd_btn = true
				}
			},
			//删除标签
			deletTag(e) {
				let key = e.currentTarget.dataset.index
				this.tagList.splice(key, 1)
				if (this.tagList.length < 5) {
					this.showAdd_btn = false
				}
			},
			//显
		}
	}
</script>

<style scoped lang="scss">
	.addLabels{
		.label-container{
			width: 100%;
			padding: 15upx;
			min-height: 15vh;
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
		.addinput {
			display: flex;
			width: 90%;
			margin-left: 5%;
			border-bottom: 0.5px solid #e6e6e6;
			input{
				flex: 1;
			}
		}
		.labels-Chosse{
			padding: 15upx;
			view{
				margin-top: 15upx;
			}
		}
	}
</style>
