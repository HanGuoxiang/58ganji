<template>
	<view>
		<cu-custom bgColor="bg-topic-theme" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">签到</block>
		</cu-custom>
		<model-calendar 
		:sendYear="toYear" :sendMonth="toMonth"
		:dataSource="signData" :totalNum="sumCount"
		 @dateChange="getData" @clickChange="clickSign"	 >
		 </model-calendar>
		<view class='count'>
			<text>截至目前，已坚持打卡</text>
			<view class='daynumber'>
				<text class='number'>{{sumCount}}</text>
				<text class='day'>天</text>
			</view>

			<view>本月累积打卡<text class="monthSum">{{signData.length}}</text>天</view>
			<text>请再接再厉，继续努力!</text>
		</view>
	</view>
</template>

<script>
	import modelCalendar from '@/components/calendar.vue';

	export default {
		data() {
			return {
				toYear: parseInt(new Date().getFullYear()), //本日
				toMonth: parseInt(new Date().getMonth() + 1), //本月
				sumCount: 0,
				signData: []
			};
		},
		components: {
			modelCalendar
		},
		created() {
			//获取当前用户当前任务的签到状态  			
			this.getData(this.toYear+"-"+this.toMonth);
		},
		methods: {
			clickSign(day) {
				//console.log("在模版页签到了", day);
				this.signData.push(day);
				this.sumCount++
				//this.$http.postHttp("Comment/UpdateRecord", day, (res) => {//可以通过后台接口添加当前用户当日打卡记录，
				// 		//console.log(res);
				// 		//if (res!= undefined) {
				// 			uni.showToast({
				// 				title: "打卡成功"+day,
				// 				icon: 'success',
				// 				duration: 2000
				// 			});
				// 		
				// 		//}
				//  })	
			},
			//当模板的时候可以直接引入，然后触发子组件事件到父界面去控制数据

			//获取当前用户该任务的签到数组
			getData(val) {
				let y=val.split('-')[0];
				let m=val.split('-')[1];
				//this.$http.postHttp("Comment/GetRecord", {//可以通过后台接口去获取你的打卡数据
				// 	Year: y,
				// 	Month: m,
				// }, (res) => {
				//console.log(res);
				this.sumCount = 88; //res.SumCount
				
				if (y == this.toYear && m == this.toMonth) {
					//这是我造的假数据！！！
					let num=["2","3","6","8","12","15"],newSign=[],today=new Date().getDate();
					for(let i=0;i<6;i++){
						if(parseInt(num[i])>today){
							break;
						}
						newSign.push(y+"-"+m+"-"+num[i])
					}
					
					//console.log(newSign);//最后传给组件的格式看这里-------------
					this.signData = newSign;
				} else {
				 	this.signData = [];
				 }
				// })
			},
		}
	}
</script>

<style lang='scss' scoped>
	.count .daynumber {
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	.count .daynumber .day {
		margin-top: 50rpx;
	}

	.count {
		margin: 20rpx;
		padding: 30rpx;
		display: flex;
		text-align: center;
		border-radius: 10px;
		flex-direction: column;
		justify-content: center;
		background-color: #fff;
		align-items: center;
	}

	.count .number {
		color: #fff;
		font-size: 60rpx;
		background-color: #94db98;
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin: 20rpx;
	}

	.monthSum {
		color: red;
		font-size: 40rpx;
	}

	.count text {
		margin: 10rpx;
	}
</style>
