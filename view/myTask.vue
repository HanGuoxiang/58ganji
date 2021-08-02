<template>
	<view class="mytask">
		<cu-custom bgColor="bg-topic-theme" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">我的任务</block>
		</cu-custom>
		<taskItem @hrefTask="hrefTask" :taskList="taskList"></taskItem>
		<view class="cu-load text-black" :class="isLoad?'loading':'over'"></view>
	</view>
</template>

<script>
	import taskItem from "@/components/taskItem.vue"
	export default {
		components:{
			taskItem
		},
		data() {
			return{
				taskList: [],
				isLoad:true
			}
		},
		mounted() {
			uniCloud.callFunction({
				name:"selectMyTask",
				data:{
					phone:this.$store.state.user.user.phone
				}
			}).then((res)=>{
				this.taskList=res.result.data
				this.isLoad=false
			}).catch((err) => {
				uni.showModal({
					content: `操作失败：${err.message}`,
					showCancel: false
				})
			})
		},
		methods: {
			hrefTask(item) {
				uni.navigateTo({
					url: '../view/taskDetail?item=' + encodeURIComponent(JSON.stringify(item))
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.mytask{
		background-color: #EEEEEE;
		min-height: 100vh;
		padding-bottom: 10rpx;
	}
</style>
