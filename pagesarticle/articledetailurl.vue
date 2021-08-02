<template>
	<view>
		<cu-custom bgColor="bg-topic-theme" :isBack="true">
				<block slot="backText">返回</block>
				<block slot="content">{{title}}</block>
			</cu-custom> 
		 <web-view :src="url"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url:'',
			}
		},
		onLoad(data) {
			console.log('data====>'+JSON.stringify(data));
			var dataItem = JSON.parse(data.data);
			this.url=dataItem.url;
			this.title=dataItem.标题;
		},
		methods: {
			 
		}
	}
</script>

<style>

</style>
