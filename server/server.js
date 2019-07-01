const express=require('express');
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');
//admin client-part 
const formidable = require('express-formidable');
const cloudinary = require('cloudinary');
const moment = require("moment");

const app=express();
const mongoose=require('mongoose');
const async = require('async');
require('dotenv').config();

//mongoose connection
mongoose.Promise=global.Promise;
mongoose.connect(process.env.MONGODB_URI);
  
//middleware
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());//so whenever we get a request,we'll be able to read it.
app.use(cookieParser());

app.use(express.static('client/build'));

//cloudinary for img upload
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})



//models and created middleware
const {User}=require('./models/user');
const {Brand}=require('./models/brand');
const {Wood}=require('./models/wood');
const {Product}=require('./models/product');
const { Payment } = require('./models/payment');//after paypal section
const { Site } = require('./models/site');// to update website info

const {auth}=require('./middleware/auth');
const {admin}=require('./middleware/admin');

//*********************************
//          Products
//*********************************

app.post('/api/product/shop',(req,res)=>{

    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100; 
    let skip = parseInt(req.body.skip);
    let findArgs = {};

    for(let key in req.body.filters){
        if(req.body.filters[key].length >0 ){
            if(key === 'price'){
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                }
            }else{
                findArgs[key] = req.body.filters[key]
            }
        }
    }

    findArgs['publish'] = true;

    Product.
    find(findArgs).
    populate('brand').
    populate('wood').
    sort([[sortBy,order]]).
    skip(skip).
    limit(limit).
    exec((err,articles)=>{
        if(err) return res.status(400).send(err);
        res.status(200).json({
            size: articles.length,
            articles
        })
    })
})


//test :
// app.get('/',(req,res)=>{
// 	console.log('hi');
// 	console.log('req:'+req);
// });

//By Arrival,
//query strings: articles?sortBy=createdAt&order=desc&limit=4

// By   
//articles?sortBy=sold&order=desc&limit=100&skip5//yani 95ta neshoon bede
app.get('/api/product/articles',(req,res)=>{
	//console test req.query
	//console.log("req.query :",req.query);//result: 
	//{ sortBy: 'createdAt', order: 'desc', limit: '4' }
	//the values above are created by the query string values


//3 elements on the query address
	let order=req.query.order? req.query.order: 'asc'; 
	//sometime the orders ca not be found in the query
	//string so, we use asc
	let sortBy=req.query.sortBy? req.query.sortBy:"_id";
	// let limit= req.query.limit?req.query.limit:100;
	let limit= req.query.limit?parseInt(req.query.limit):100;
	// if we want to skip the first 5 articles ,we can
	//define let skip and add it to the address bar like:
	//&skip=5

	//now go to db and find it/them
	Product.find().
	populate('brand').
	populate('wood').
	sort([[sortBy,order]]).
	limit(limit).
	exec((err,articles)=>{
		if(err) return res.status(400).send(err);
		res.send(articles)
	})
})

//query string approach (not json) stemming from
//(bodyParser.urlencoded({extended:true}));
//example: /api/product/articles?id=hghg,dtdgj,ytr
//&type=single 
app.get('/api/product/articles_by_id',(req,res)=>{
	let type=req.query.type;
	let items=req.query.id;
	//console tests
	// console.log("req.query.type:",req.query.type);//array
	// console.log("req.query.id:",req.query.id);//3ids comma separated string
	// console.log("req.query :",req.query);// result: {id: 'wanut11,pie22,pump33', type: 'array'}
	// in case of: postman==> http://localhost:3002/api/product/articles_by_id?id=wanut11,pie22,pump33&type=array
	if(type==="array"){
		let ids=req.query.id.split(',');
		//console test
		// console.log("ids:",ids);// 3 ids with quatation in a bracket

		items=[];//convert to an array
		// console.log('items 1st: ',items);//[]
		// items=ids.map(item=>{
		// 	return item//id of items are 
		// 	//converted to ObjectI
		// });
  //       console.log("items map: ",items);//result: items map:  [ '5b2d38027d75e2cdcb31cf04', 
  //       //'5b2d38217d75e2cdcb31cf05' ]

		items=ids.map(item=>{
			return mongoose.Types.ObjectId(item)//id of items are 
			//converted to ObjectI
		});
		// console.log("items map: ",items);//3 ids in a bracket without quotation
		//result: items map:  [ 5b2d38027d75e2cdcb31cf04, 5b2d38217d75e2cdcb31cf05 ] notice the difference

	};
	Product.
	find({'_id':{$in:items}}).
	populate('brand').
	populate('wood').
	exec((err,docs)=>{
			return res.status(200).send(docs)
	})
});

app.post('/api/product/article',auth,admin,(req,res)=>{
	const product =new Product(req.body);
	product.save((err,doc)=>{
		if(err) return res.json({success:false,err});
		res.status(200).json({
			success:true,
			article:doc
		})
	})
});

//*********************************
//          Woods
//*********************************
app.post('/api/product/wood',auth,admin,(req,res)=>{
	const wood= new Wood(req.body);
	wood.save((err,doc)=>{
		if(err) return res.json({success:false,err});
		res.status(200).json({
			success:true,
			wood: doc
		})

	})
});

app.get('/api/product/get_woods',(req,res)=>{
	Wood.find({},(err,woods)=>{
		if(err) return res.status(400).send(err);
			res.status(200).send(woods)
	//Find all the woods(a kind of product in this project)
	//then let's test it on postman,we should have some
	//examples written in the model Wood first
	})
})

//*********************************
//          Brands
//*********************************
app.post('/api/product/brand',auth,admin,(req,res)=>{
	const brand=new Brand(req.body);

	brand.save((err,doc)=>{
		if(err) return res.json({success:false,err});
		res.status(200).json({
			success:true,
			brand:doc
		})
	})
});

app.get('/api/product/get_brands',(req,res)=>{
	Brand.find({},(err,brands)=>{
		if(err) return res.status(400).send(err);
		res.status(200).send(brands)
	})//Find all the brands
})

//*********************************
//          USERS
//*********************************

app.get('/api/users/auth',auth,(req,res)=>{
	//if the "user" is authenticated after going through auth function:
	res.status(200).json({

	// user:req.user// Not a good selection because it send a lot of
	// information later on the client side including token,password,email..
	isAdmin:req.user.role===0 ?false : true,//check if the user is admin or not
	isAuth:true,
	email:req.user.email,
	lastname:req.user.lastname,
	role:req.user.role,
	cart: req.user.cart,
	history:req.user.history,
	//let's not send all the data when registering by ../register' endpoint 
	//so userdata:doc is uncommented
	//do some testing a get request on postman for /auth' endpoint

	// mytoken: req.user.token,//test: it gives the token
	// urtoken:req.token,//test: the same token as above!
	

	})

})


app.post('/api/users/register',(req,res)=>{
	const user=new User(req.body);
	user.save((err,doc)=>{
		if(err)return res.json({success:false,err});
		res.status(200).json({
			success:true
			// userdata:doc uncommented after the above endpoint tips
			//doc would bring all the info of db
		})
	})	
});


app.post('/api/users/login',(req,res)=>{

	User.findOne({'email':req.body.email},(err,user)=>{
		if(!user) return res.json({loginSuccess:false,message:'Auth failed,No email found'});

		user.comparePass(req.body.password,(err,isMatch)=>{
			if(!isMatch) return res.json({loginSuccess:false,message:"wrong password!"});
			// if(isMatch) return res.json({l oginSuc:true,message:'pass matched',"isMatch":isMatch})
			// console.log('isMatch:',isMatch);
		

			user.generateToken((err,user)=>{
			if(err) return res.status(400).send(err);
			res.cookie('g_auth',user.token).status(200).json({loginSuccess:true, message:" login successful, token created"})
			})
			// console.log('user:',user);saving token "g_auth" as a cookie
	
	    })
	})
	
})


app.get('/api/users/logout',auth,(req,res)=>{
	User.findOneAndUpdate(
		{ _id:req.user._id },//find the authorized user
		{ token: '' },//and destroy his token and updata the DB
		(err,doc)=>{// a call back function
			if(err) return res.json({success:false,err});
			return res.status(200).send({
				success:true
			})
		}	
	);
	// console.log("id: ",req.user._id) ;
	// console.log("token :",req.user.token);
});
//afterthe admin and cloudinary image upload process:

app.post('/api/users/uploadimage',auth,admin,formidable(),(req,res)=>{
    cloudinary.uploader.upload(req.files.file.path,(result)=>{
        console.log(result);
        res.status(200).send({
            public_id: result.public_id,
            url: result.url
        })
    },{
        public_id: `${Date.now()}`,
        resource_type: 'auto'
    })
})

app.get('/api/users/removeimage',auth,admin,(req,res)=>{
    let image_id = req.query.public_id;

    cloudinary.uploader.destroy(image_id,(error,result)=>{
        if(error) return res.json({succes:false,error});
        res.status(200).send('ok');
    })
})

app.post('/api/users/addToCart',auth,(req,res)=>{

    User.findOne({_id: req.user._id},(err,doc)=>{
        let duplicate = false;

        doc.cart.forEach((item)=>{
            if(item.id == req.query.productId){
                  duplicate = true;  
            }
        })

        if(duplicate){
            User.findOneAndUpdate(
                {_id: req.user._id, "cart.id":mongoose.Types.ObjectId(req.query.productId)},
                { $inc: { "cart.$.quantity":1 } },
                { new:true },
                ()=>{
                    if(err) return res.json({success:false,err});
                    res.status(200).json(doc.cart)
                }
            )
        } else {
            User.findOneAndUpdate(
                {_id: req.user._id},
                { $push:{ cart:{
                    id: mongoose.Types.ObjectId(req.query.productId),
                    quantity:1,
                    date: Date.now()
                } }},
                { new: true },
                (err,doc)=>{
                    if(err) return res.json({success:false,err});
                    res.status(200).json(doc.cart)
                }
            )
        }
    })
})
//after the Remove Cart section
app.get('/api/users/removeFromCart',auth,(req,res)=>{

    User.findOneAndUpdate(
        {_id: req.user._id },
        { "$pull":
            { "cart": {"id":mongoose.Types.ObjectId(req.query._id)} }
        },
        { new: true },
        (err,doc)=>{
            let cart = doc.cart;
            let array = cart.map(item=>{
                return mongoose.Types.ObjectId(item.id)
            });

            Product.
            find({'_id':{ $in: array }}).
            populate('brand').
            populate('wood').
            exec((err,cartDetail)=>{
                return res.status(200).json({
                    cartDetail,
                    cart
                })
            })
        }
    );
})

app.post('/api/users/successBuy',auth,(req,res)=>{
    let history = [];
    let transactionData = {}

    // user history
    req.body.cartDetail.forEach((item)=>{
        history.push({
            dateOfPurchase: Date.now(),
            name: item.name,
            brand: item.brand.name,
            id: item._id,
            price: item.price,
            quantity: item.quantity,
            paymentId: req.body.paymentData.paymentID
        })
    })

    // PAYMENTS DASH
    transactionData.user = {
        id: req.user._id,
        name: req.user.name,
        lastname: req.user.lastname,
        email: req.user.email
    }
    transactionData.data = req.body.paymentData;
    transactionData.product = history;
        
    User.findOneAndUpdate(
        { _id: req.user._id },
        { $push:{ history:history }, $set:{ cart:[] } },
        { new: true },
        (err,user)=>{
            if(err) return res.json({success:false,err});

            const payment = new Payment(transactionData);
            payment.save((err,doc)=>{
                if(err) return res.json({success:false,err});
                let products = [];
                doc.product.forEach(item=>{
                    products.push({id:item.id,quantity:item.quantity})
                 })
              
                async.eachSeries(products,(item,callback)=>{ 
                    Product.update(
                        {_id: item.id},
                        { $inc:{
                            "sold": item.quantity
                        }},
                        {new:false},
                        callback
                    )
                },(err)=>{
                    if(err) return res.json({success:false,err})
                    res.status(200).json({
                        success:true,
                        cart: user.cart,
                        cartDetail:[]
                    })
                })
            });
        }
    )
})


app.post('/api/users/update_profile',auth,(req,res)=>{

    User.findOneAndUpdate(
        { _id: req.user._id },
        {
            "$set": req.body
        },
        { new: true },
        (err,doc)=>{
            if(err) return res.json({success:false,err});
            return res.status(200).send({
                success:true
            })
        }
    );
})

//=================================
//              SITE
//=================================

app.get('/api/site/site_data',(req,res)=>{
    Site.find({},(err,site)=>{
        if(err) return res.status(400).send(err);
        res.status(200).send(site[0].siteInfo)
    });
});

app.post('/api/site/site_data',auth,admin,(req,res)=>{
    Site.findOneAndUpdate(
        { name: 'Site'},
        { "$set": { siteInfo: req.body }},
        { new: true },
        (err,doc )=>{
            if(err) return res.json({success:false,err});
            return res.status(200).send({
                success: true,
                siteInfo: doc.siteInfo
            })
        }
    )
})
//************************************
//          DEFAULT (Heroku)
//************************************
if(process.env.NODE_ENV === 'production'){
    const path = require('path');
    app.get('/*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'../client','build','index.html'))

    })
}

const port=process.env.PORT||3002;
app.listen(port,()=>{
	console.log(`Server is running on port ${port}`)
});