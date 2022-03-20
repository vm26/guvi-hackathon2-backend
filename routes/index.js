var express = require('express');
var router = express.Router();
const {dbUrl,MongoClient}=require('../dbConfig')

router.post('/register',async(req,res)=>{
  let client=await MongoClient.connect(dbUrl);
  try {
    let db=await client.db('b28we');
    let data=await db.collection('userslist').insertOne(req.body);
  res.send({
  statusCode:200,
  message:"User account created"
})
  } catch (error) {
    res.send({
      statusCode:500,
     message:"Internal server error"
    })
  } 
 
})

router.post('/login',async(req,res)=>{
  let client=await MongoClient.connect(dbUrl);
  try {
    let db=await client.db('b28we');
    let data1=await db.collection('userslist').findOne({email:req.body.email});
    if(data1){
      if(req.body.password==data1.password){
        res.send({
          statusCode:200,
          data:data1.name,
          message:"Login successful"
      })
    }else{
      res.send({
        statusCode:401,
        message:"Invalid password"
    })
    }
  }
  } catch (error) {
    console.log(error);
    res.send({
      statusCode:500,
      message:"Intenal server error"
    })
  }
})

  
router.post('/addrmodifyproducts',async(req,res)=>{
  let client=await MongoClient.connect(dbUrl);
  try {
    let db=await client.db('b28we');
    let data=await db.collection('products').findOne({name:req.body.name});
    console.log(data);
    if(data){
      await db.collection('products').findOneAndReplace({name:req.body.name},req.body);
      res.send({
        statusCode:401,
        message:"Product updated"
    })
    }else{
      await db.collection('products').insertOne(req.body);
      res.send({
        statusCode:201,
        message:"Product added"
    })
    }
  }
   catch (error) {
    console.log(error);
    res.send({
      statusCode:500,
      message:"Intenal server error"
    })
  }
  
 
})
router.post('/addqueries',async(req,res)=>{
  let client=await MongoClient.connect(dbUrl);
  try {
    let db=await client.db('b28we');     
      await db.collection('queries').insertOne(req.body);
      res.send({
        statusCode:201,
        message:"Query saved"
    })
    }
  
   catch (error) {
    console.log(error);
    res.send({
      statusCode:500,
      message:"Intenal server error"
    })
  }
  
 
})
router.get('/getproducts',async(req,res)=>{
  let client=await MongoClient.connect(dbUrl);
  try {
    let db=await client.db('b28we');
    let data1=await db.collection('products').find().toArray();
    console.log(data1);
    if(data1){
      res.send({
        statusCode:200,
        data:data1,
        message:"All products fetched successfully"
    })
    }else{
      await db.collection('products').insertOne(req.body);
      res.send({
        statusCode:401,
        message:"No product available"
    })
    }
  }
   catch (error) {
    console.log(error);
    res.send({
      statusCode:500,
      message:"Intenal server error"
    })
  }
  
 
})
router.get('/getproducts/:name',async(req,res)=>{
  let client=await MongoClient.connect(dbUrl);
  try {
    let db=await client.db('b28we');
    let data1=await db.collection('products').find({name:req.params.name}).toArray();
    console.log(data1);
    if(data1){
      res.send({
        statusCode:200,
        data2:data1,
        message:"All products fetched successfully"
    })
    }else{
      await db.collection('products').insertOne(req.body);
      res.send({
        statusCode:401,
        message:"No product available"
    })
    }
  }
   catch (error) {
    console.log(error);
    res.send({
      statusCode:500,
      message:"Intenal server error"
    })
  }
  
 
})
router.get('/getproductsbycategory/:category',async(req,res)=>{
  console.log(req.params.category);
  let client=await MongoClient.connect(dbUrl);
  try {
    let db=await client.db('b28we');
    let data1=await db.collection('products').find({category:req.params.category}).toArray();
    console.log(data1);
    if(data1){
      res.send({
        statusCode:200,
        data2:data1,
        message:"All products fetched successfully"
    })
    }else{
      await db.collection('products').insertOne(req.body);
      res.send({
        statusCode:401,
        message:"No product available"
    })
    }
  }
   catch (error) {
    console.log(error);
    res.send({
      statusCode:500,
      message:"Intenal server error"
    })
  }
  
 
})
router.get('/getcategories',async(req,res)=>{
  let client=await MongoClient.connect(dbUrl);
  try {
    let db=await client.db('b28we');
    let data1=await db.collection('products').distinct('category');
    console.log(data1);
    if(data1){
      res.send({
        statusCode:200,
        data:data1,
        message:"All categories fetched successfully"
    })
    }
      }
   catch (error) {
    console.log(error);
    res.send({
      statusCode:500,
      message:"Intenal server error"
    })
  }
  
 
})

router.post('/addservice',async(req,res)=>{
  let client=await MongoClient.connect(dbUrl);
  try {
    let db=await client.db('b28we');
    let data1=await db.collection('services').insertOne(req.body);   
    if(data1){
      res.send({
        statusCode:200,
        data:data1,
        message:"Service added successfully"
    })
    }
      }
   catch (error) {
    console.log(error);
    res.send({
      statusCode:500,
      message:"Intenal server error"
    })
  }
  
 
})
router.get('/getServices',async(req,res)=>{
  let client=await MongoClient.connect(dbUrl);
  try {
    let db=await client.db('b28we');
    let data1=await db.collection('services').distinct('service');   
    if(data1){
      res.send({
        statusCode:200,
        data:data1,
        message:"Services fetched successfully"
    })
    }
      }
   catch (error) {
    console.log(error);
    res.send({
      statusCode:500,
      message:"Intenal server error"
    })
  }
  
 
})

module.exports = router;
