const user={
    namespaced:true,
    state:{
		status:{
			isLogin:false,
			phone:""
		},
        user:{
   //      	phone:"17625495599",
   //      	nickname:"奇怪的上单",
			// avatar:"http://img2.imgtn.bdimg.com/it/u=1039075865,3371165857&fm=26&gp=0.jpg",
   //      	university:"北京大学",
   //      	injoin:"2020-10-22 15:36:25",
   //      	level:"1",
   //      	grow:"65",
   //      	integral:"421",
   //      	hot:"15"
        }
    },
    mutations:{
        setStatus(state,status){
            state.status = status;
        },
        removeStatus(state){
            state.status='';
        },
		setUser(state,user){
		    state.user = user;
		},
		removeUser(state){
		    state.user='';
		},
        
        
    },
    actions:{

    },
    getters:{
        getbaseUserInfo:state=>state.user,
        // getUsername:state=>state.username,
        
        // getUserpassword:state=>state.userpassword
    },
	

}

export default user