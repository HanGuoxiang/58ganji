export default{
	get,
	show,
	isNull,
	randomIndex,
	randomColorText,
	openPage,
	closePage,
	storeData,
	getData,
	getLocation,
	loading,
	hideLoading,
	showModel,
	saveUserLogin,
	getUser,
	delay,
	isPlatformWeiXin,
	isPlatformApp,
	isPlatformH5,
	uploadFiles,
	notifyEvent,
	notifyRegisterEventOnce,
	closePageToRoot,
	confirm,
	showActionSheet,
	callPhone,
	getNowFormatDate,
	startWebSocketService,
	webSocketSendMessage,
	uploadFilesWithPostDict,
	log,
}

function log(msg)
{
	console.log(msg);
}
//启动链接服务，并发送信息到服务器存储缓存
function startWebSocketService()
{
	var socketTask =uni.connectSocket({
	    url: 'ws://42.192.221.26:9999',
	    data() { 
	        return {
	            command: '1',
	            userid: '10000',
				touserid:'10001',
				extra:"123"
	        };
	    }, 
	    header: {
	        'content-type': 'application/json'
	    },
	    protocols: ['protocol1'],
	    method: 'GET',
		 fail:(error)=>{
			console.log("connectSocket=====>fail"+JSON.stringify(error));
		},
		success(){
			// console.log("connectSocket====Success");
				
		}, 
		  complete: ()=> {} 
	});
	 
	
	
	uni.onSocketOpen(function (res) {
	  console.log('WebSocket连接已打开！');
	  //连接成功，发送一条数据保存到服务器的缓存里，方便发送消息
	  let item={
	            command: '1',
	            userid: getUser(false).ID,
	  				touserid:'',
	  				extra:""
	        };
			
			webSocketSendMessage(JSON.stringify(item));
	 
	     
	});  
	
	
	uni.onSocketMessage(function (res) {
	  console.log('onSocketMessage收到服务器内容：' + res.data+JSON.stringify( res.data));
	});
	uni.onSocketError(function (res) {
		// show("startWebSocketService===>onSocketError"+JSON.stringify(res));
	  console.log('WebSocket连接打开失败，请检查！'+res+JSON.stringify(res));
	}); 
	
}
function webSocketSendMessage(msg)
{
	
	uni.sendSocketMessage({
	     data: msg 
	   });
}


//打电话
function callPhone(number)
{
	uni.makePhoneCall({
	    phoneNumber: number //仅为示例
	});
}
//['A', 'B', 'C']
function showActionSheet(textlist,callback)
{
	uni.showActionSheet({
	    itemList: textlist,
	    success: function (res) {
	        console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
			if(callback)
			{callback(res.tapIndex);}
	    },
	    fail: function (res) {
	        console.log(res.errMsg);
	    }
	});
}

//通知事件
function notifyEvent(eventName,obj)
{
	uni.$emit(eventName,obj);
}

function notifyRegisterEventOnce(eventName,callback)
{
	uni.$once(eventName,callback);
}
function getDateStamp()
{
	var timestamp = Date.parse(new Date());
	return timestamp;
}
//网络请求
// module.exports.get=()=>
function get(requestUrl,callback)
{
	
	
	// requestUrl=escape(requestUrl);
	requestUrl+="&timstamp="+getDateStamp();
	//加上后但是h5会乱码存入数据库，暂时去掉了
		//编码后需要后台解码
	// requestUrl=encodeURI(requestUrl);
	console.log("start get=============>"+requestUrl);
	uni.request({
	    url: requestUrl, //仅为示例，并非真实接口地址。
	    // data: paramDict,
	    // header: {
	    //     'custom-header': 'hello' //自定义请求头信息
	    // },
	    success: (data)=>{
			
			if(data.statusCode==200)
			{
				// console.log("result=============>"+typeof(data.data)+data+JSON.stringify(data.data));
				var serverData=data.data;
					if(serverData.Status==0)//默认服务器错误提示，其他类型的服务器错误，10000今日刷新此次数用完等不提示
				{
					show(serverData.Message);
				}
				callback(data.data,"");
			}
			else
			{	show(requestUrl+"====failed===>"+data.statusCode);
				callback("",data.statusCode);}
		},
		fail(error) {
			console.log("fail=============>"+data+JSON.stringify(data));
			show(requestUrl+"====failed===>"+error+JSON.stringify(error));
			callback("",error);
		}
	});
}


//上传文件，文件对象{name:"",uri:""}
//
function uploadFiles(url,filelist,callback)
{
	uploadFilesWithPostDict(url,{},filelist,callback);
}
function uploadFilesWithPostDict(url,paramDict,filelist,callback)
{
		url+="&timstamp="+getDateStamp();
	console.log('uploadFiles====>'+url+"=="+paramDict+JSON.stringify(paramDict)+"=="+filelist+JSON.stringify(filelist));
	// 因为api不支持没有图片单独请求，会额外上传一个错误图，则这里单独坐下判断
	if(filelist.length==0)
	{post(url,paramDict,callback);
	return;}
	
	//如果是小程序，只支持一个图，不支持list
	if(isPlatformWeiXin())
	{
		console.log('uploadFiles====isPlatformWeiXin')
		let requestFinishedCount=0;//请求结束的个数，用于判断是否所有请求结束
		let serverFileList=[];
		for(let i=0;i<filelist.length;i++)
		{
			let item=filelist[i];
			let name=item.name;
			let filepath=item.uri;
		
			uploadFileSingle(url,{},name,filepath,(data)=>{
				if(data.Status==1)
				{
					console.log('data.FileHash='+JSON.stringify(data.FileHash));
						serverFileList.push(data.FileHash);
						
					// let serverFileDict=data.Data;
					// for(let fileName in serverFileDict)
					// {
					// 	fileDict[fileName]=serverFileDict[fileName];
					// }
				}
				requestFinishedCount++;
				//n个文件上传结束
				if(requestFinishedCount==filelist.length)
				{
					//将累计的文件名字传入
					paramDict.serverFileList=JSON.stringify(serverFileList);
					post(url,paramDict,callback);
				}
			});
		 }
			 return;
	}
	
	uni.uploadFile({
	         url: url, //仅为示例，非真实的接口地址
								files:filelist,
								// files: [{name:"asdf_pic",filePath:this.fileList[0]}],
								// files:this.fileList,
	       //   name: 'file',
								// filePath:'',
	         formData: paramDict,
	         success: (data) => {
										
	       console.log("result=============>"+data+JSON.stringify(data));
				if(data.statusCode==200)
				{
					
					var serverData=JSON.parse(data.data);
					if(serverData.Status==0)//默认服务器错误提示，其他类型的服务器错误，10000今日刷新此次数用完等不提示
					{
						console.log("服务器错误："+typeof(serverData)+serverData.Status+serverData.Message)
						// show("服务器错误："+typeof(serverData)+serverData.Status+serverData.Message);
						alert("服务器错误："+typeof(serverData)+serverData.Status+serverData.Message);
					}
					callback(serverData,"");
				}
				else
				{	
					// show(requestUrl+"====failed===>"+data.statusCode);
					alert(requestUrl+"====failed===>"+data.statusCode);
					callback("",data.statusCode);
					}
					
			
	         },
			 fail: (error) => {
			 	console.log("====failed===>"+error+JSON.stringify(error));
				alert("====failed===>"+error+JSON.stringify(error));
			 	callback("",error);
			 }
	     });
							
}
function uploadFileSingle(url,paramDict,filename,filepath,callback)
{
	uni.uploadFile({
	     url: url, //仅为示例，非真实的接口地址
							// files:filelist,
							// files: [{name:"asdf_pic",filePath:this.fileList[0]}],
	     name: filename,
							filePath:filepath,
	     formData: paramDict,
	     success: (data) => {
									
	   console.log("result=============>"+data+JSON.stringify(data));
			if(data.statusCode==200)
			{
				
				var serverData=JSON.parse(data.data);
				if(serverData.Status==0)//默认服务器错误提示，其他类型的服务器错误，10000今日刷新此次数用完等不提示
				{
					console.log("服务器错误："+typeof(serverData)+serverData.Status+serverData.Message)
					// show("服务器错误："+typeof(serverData)+serverData.Status+serverData.Message);
					alert("服务器错误："+typeof(serverData)+serverData.Status+serverData.Message);
				}
				callback(serverData,"");
			}
			else
			{	
				// show(requestUrl+"====failed===>"+data.statusCode);
				alert(requestUrl+"====failed===>"+data.statusCode);
				callback("",data.statusCode);
				}
				
		
	     },
		 fail: (error) => {
		 	console.log("====failed===>"+error+JSON.stringify(error));
			alert("====failed===>"+error+JSON.stringify(error));
		 	callback("",error);
		 }
	 });
}

// //上传文件，文件对象{name:"",uri:""}
// //
// function uploadFiles(url,filelist,callback)
// {
// 		url+="&timstamp="+getDateStamp();
// 	console.log('uploadFiles====>'+url+filelist+JSON.stringify(filelist));
// 	// 因为api不支持没有图片单独请求，会额外上传一个错误图，则这里单独坐下判断
// 	if(filelist.length==0)
// 	{get(url,callback);
// 	return;}
// 	uni.uploadFile({
// 	         url: url, //仅为示例，非真实的接口地址
// 								files:filelist,
// 								// files: [{name:"asdf_pic",filePath:this.fileList[0]}],
// 								// files:this.fileList,
// 	       //   name: 'file',
// 								// filePath:'',
// 	         // formData: {
// 	         //     'user': 'test'
// 	         // },
// 	         success: (data) => {
										
// 	       console.log("result=============>"+data+JSON.stringify(data.data));
// 				if(data.statusCode==200)
// 				{
					
// 					var serverData=JSON.parse(data.data);
// 					if(serverData.Status==0)//默认服务器错误提示，其他类型的服务器错误，10000今日刷新此次数用完等不提示
// 					{
// 						show("服务器错误："+typeof(serverData)+serverData.Status+serverData.Message);
// 					}
// 					callback(serverData,"");
// 				}
// 				else
// 				{	show(requestUrl+"====failed===>"+data.statusCode);
// 					callback("",data.statusCode);
// 					}
					
			
// 	         },
// 			 fail: (error) => {
// 			 	console.log("fail=============>"+data+JSON.stringify(data));
// 			 	show(requestUrl+"====failed===>"+error+JSON.stringify(error));
// 			 	callback("",error);
// 			 }
// 	     });
							
// }

//是否是微信小程序端
function isPlatformWeiXin()
{
	var ret =false;
	// #ifdef  MP-WEIXIN
	
		ret=true;
		
	// #endif
	return ret
}

function isPlatformApp()
{
	var ret =false;
	// #ifdef  APP-PLUS
	
		ret=true;
		
	// #endif
	return ret
}
function isPlatformH5()
{
	var ret =false;
	// #ifdef  H5
	
		ret=true;
		
	// #endif
	return ret
}
function getNowFormatDate() {
	var date = new Date();
	var seperator1 = "-";
	var seperator2 = ":";
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	if (month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if (strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	var currentdate = date.getFullYear() + seperator1 + month + seperator1
			+ strDate + "" + date.getHours() + seperator2 + date.getMinutes()
			+ seperator2 + date.getSeconds();
	return currentdate;
}

//得到定位信息
//h5执行，必须有https环境，否则浏览器可能给过滤掉了
function getLocation(callback){
	//是否返回了结果
	let isCallback=false;
	uni.getLocation({
	    type: 'wgs84',
		geocode:true,
	    success: function (res) {
	    //     console.log('当前位置的经度：' + res.longitude);
	    //     console.log('当前位置的纬度：' + res.latitude);
			  // console.log('当前位置的纬度：' + res.address);
			// console.log('getLocation===>'+res.longitude+res.latitude+res.address+JSON.stringify(res))
			isCallback=true;
			if(callback)
			{
				callback(res);
			}
	    },
		fail:function(error) {
			console.log("getLocation====>fail"+error+JSON.stringify(error));
			isCallback=true;
			if(callback)
			{
				callback({});
			}
		},
		// complete: (ret) => {
		// 	console.log('getLocation====>complete')
		// 	if(callback)
		// 	{
		// 		callback({});
		// 	}
		// }
	});
	
	setTimeout(()=>{
		if(!isCallback)
		{
			console.log('getLocation没有获取到地址位置，延迟主动回调')
			if(callback)
			{
				callback({});
			}
		}
	}, 3000 )
}

function storeData(storeKey,value,callback)
{
	uni.setStorage({
	    key: storeKey,
	    data: value,
	    success: function () {
	        console.log('storeData====>success');
			if(callback)
			{
				callback();
			}
	    } ,
		fail:function(error){
			   console.log('storeData===>fail'+error+JSON.stringify(error));
			   if(callback)
			   {
			   	callback();
			   }
		}
	});
}

function getDataSync(storeKey)
{
	// return '';
	// console.log('getDataSync=====>start'+storeKey);
	 let value = uni.getStorageSync(storeKey);
	// console.log('getDataSync=====>'+value);
	 return value;
}
function getData(storeKey,callback)
{
	
	  
	uni.getStorage({
	    key: storeKey,
	    success: function (res) {
	        // console.log('getData=====>'+res.data);
			if(callback)
			{
				callback(res.data);
			}
	    },
		fail:function(error){
			console.log('getData=====>error'+storeKey+error+JSON.stringify(error));
			if(callback)
			{
				callback("",error);
			}
		}
	});
}
//是否是空值 
function isNull(data) {
	if(data==null){return true;}
	if(data==undefined){return true;}
	
	if(data=="null"){return true;}
	if(data=="undefined"){return true;}
	if(data.length==0){return true;}
	// if(Object.keys(data).length==0){return true;}
	
	
	return false;
}

//用户登录后保存信息
function saveUserLogin(obj)
{
	// console.log('saveUserLogin====>'+obj+JSON.stringify(obj));
	// storeData("UserLoginedInfo",JSON.stringify(obj));
	storeData("UserLoginedInfo",obj);
}
//得到登录的用户
function getUser(isShowLoginPage)
{	
	var data=getDataSync('UserLoginedInfo');
	
	// console.log('getUser====>'+typeof(data)+data+JSON.stringify(data));
	if(isNull(data))
	{
		// data={ID:"",EncryptID:""};
		
		//显示登录页面
		if(isShowLoginPage)
		{
			// console.log('123')
			openPage('/pagescommon/login');
		}
		
		return data;
	}
	// data=JSON.parse(data);
	return data;
}

//延迟几秒
function delay(time,callback)
{
	setTimeout(function(){
		callback();
	},time*1000)
}

function loading(msg)
{
	if(isNull(msg))
	{msg="加载中";}
	uni.showLoading({
	    title: msg
	});
}
function hideLoading()
{
	 uni.hideLoading();
}
 function show(message)
{
	 uni.showToast({
	                        title: message
	                    });
}

function confirm(msg,callback)
{
	
	uni.showModal({
	    title: '提示',
	    content: msg,
	    success: function (res) {
	        if (res.confirm) {
				callback(true);
	            console.log('用户点击确定');
	        } else if (res.cancel) {
					callback(false);
	            console.log('用户点击取消');
	        }
	    }
	});
}


function showModel(msg,callback)
{
	
	uni.showModal({
	    title: '提示',
	    content: msg,
	    success: function (res) {
	        if (res.confirm) {
				callback(true);
	            console.log('用户点击确定');
	        } else if (res.cancel) {
					callback(false);
	            console.log('用户点击取消');
	        }
	    }
	});
}

//得到一个随机数
function randomIndex(fromIndex,toIndex)
{

	// max - 期望的最大值
	// min - 期望的最小值
	parseInt(Math.random()*(toIndex-fromIndex+1)+fromIndex,10);
	return Math.floor(Math.random()*(toIndex-fromIndex+1)+fromIndex);

}

//随机得到颜色的文字
function randomColorText()
{
	var colorTextList=["red","orange",'yellow','olive','green','cyan','blue','purple','mauve','pink','brown','grey','gray','black','white'];
	var index=randomIndex(0,colorTextList.length);
	return colorTextList[index];
}
//打开一个页面
function openPage(targetUrl,data,callback){
	// console.log("openPage====>"+data);
	
	if(isNull(data))
	{
		
		uni.navigateTo({
		url:targetUrl,
		fail:function(error){
			console.log('openPage fail=====>'+JSON.stringify(error));
		}
		});
		return;
	}
	console.log('openPage=====>'+targetUrl);
	// console.log('openPage=====>'+data+JSON.stringify(data));
	uni.navigateTo({
		url:targetUrl+"?data="+JSON.stringify(data),
		fail: (error) => {
			console.log('openPage fail=====>'+JSON.stringify(error));
		}
	})
}

function closePage(backPageCount)
{
	//默认返回一页
	if(isNull(backPageCount))
	{backPageCount=1;}
	uni.navigateBack({
    delta: backPageCount
});
}
function closePageToRoot()
{
	uni.navigateBack({
    delta: 100
});
}