<template>
	<view>
		<cu-custom bgColor="bg-topic-theme" :isBack="true">
				<block slot="backText">返回</block>
				<block slot="content">{{title}}</block>
			</cu-custom> 
			<mp-html ref="article"  :content="html" :lazy-load=true :selectable=true  />
	</view>
	
</template>

<script>

export default {
	data() {
	 return {
		 title:"",
		html: ''
	 }
	},
	onLoad(data){
		var dataItem = JSON.parse(data.data);
		this.html=dataItem.内容;
		this.title=dataItem.标题;
	 },
	 methods:{
		 
	 }
}
</script>

<style>
</style>
