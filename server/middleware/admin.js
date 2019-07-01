
let admin=(req,res,next)=>{
	if(req.user.role===0){
		return res.send('you\'re not an admin')
	}
	next();
}
module.exports={admin};