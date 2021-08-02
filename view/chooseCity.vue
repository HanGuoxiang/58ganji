<template>
	<view>
		<cu-custom bgColor="bg-topic-theme" :isBack="true">
				<block slot="backText">返回</block>
				<block slot="content">选择城市</block>
			</cu-custom>
					
		<ss-select-city
		  v-model="defaultCity"
		  :hot-citys="hotCitys"
		  @on-select="City"
		/>
	</view>
</template>

<script>
	import ssSelectCity from '@/components/ss-select-city/index.vue'
		import b from 'modules/bll.js'
			import c from '../modules/common.js'
		
	export default {
		data() {
			   return {
			      hotCitys: [
					  '全国',
			        '杭州',
			        '天津', 
			        '北京',
			        '上海',
			        '深圳',
			        '广州',
			        '成都',
			        '重庆',
			        '厦门'
			      ],
			      defaultCity: '杭州'
			    }
			  },
			  onLoad() {
				  var that=this;
				  b.getAppUsingCity(true,(data)=>{
					  // console.log(123);
					  // c.show(data);
					  this.defaultCity=data;
					  // this.closePageWithCity(this.defaultCity); 
					  
				  });
				  // c.show(b.getAppUsingCity());
			  	
			  },
			  components: {
			    ssSelectCity
			  },
			  methods: {
			    City(city) {
					this.closePageWithCity(city);
			    },
				closePageWithCity(city)
				{
								  b.setAppUsingCity(city);
								  	 
								  	 uni.$emit("chooseCityFinished",city);
								    console.log(city);
								  
								  uni.navigateBack();
				}
			  },
			 
	}
</script>

<style>

</style>
