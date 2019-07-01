const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const productSchema=mongoose.Schema({
	name:{
		required:true,
		type:String,
		unique:1,
		maxlength:100
	},
	description:{
		required:true,
		type:String,
		maxlength:100000  
	},
	price:{
		required:true,
		type:Number,
		maxlength:255
	},
	brand:{
		// type:mongoose.Schema.Types.ObjectID,
		//we should bring Schema on the top
		type:Schema.Types.ObjectId,
		ref:'Brand',
		required:true
		//let's refer to the collection "Brand"
		
	},
	shipping:{
		required:true,
		type:Boolean
	},
	available:{
		required:true,
		type:Boolean
	},
	wood:{
		type:Schema.Types.ObjectId,
		ref:'Wood',
		required:true
	},
	frets:{
		require:true,
		type:Number
	},
	sold:{
		type:Number,
		maxlength:100,
		default:0
	},
	publish:{
		required:true,
		type:Boolean
	},
	images:{
		type:Array,
		default:[]
	}

},{timestamps:true});//generate time when adding new product

const Product=mongoose.model('Product',productSchema);
module.exports={Product};