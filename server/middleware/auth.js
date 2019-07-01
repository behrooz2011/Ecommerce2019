const {User}=require('../models/user');

let auth=(req,res,next)=>{
	let token=req.cookies.g_auth;
	User.findByToken(token,(err,user)=>{
        if(err)throw err;
        if(!user) return res.json({ //if the user doesnt exist ie token is invalid
            isAuth:false,
            error:true,
            //test:
            // user:user,// this will retrun null
            // user2:user.token// this will lead to an error
            // user3:token // this will show the token above with the cookie method,
        });
        	// console.log("user2: ",user);// this test shows the whole user data IF the orange user exists and
        	//the second "if" function is not invoked.
        req.token=token;//for future use
        req.user=user;//user data
        next();// go to the next line of code;the next line of code is what is gonna be written in the first endpoint (by far,it is '../auth' in server.js)
        
        
        

	})
}


module.exports={auth}
