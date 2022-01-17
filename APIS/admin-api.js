const exp = require("express")
const adminApi = exp.Router()
const expressErrorHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")
const multerCloudinary=require("./middlewares/multerCloudinary")
adminApi.use(exp.json())

//login
adminApi.post("/login", expressErrorHandler(async (req, res, next) => {

    let credentials = req.body;
    if (req.body.Username !== 'admin') {
        res.send({ message: "Invalid username" })
    }
    else if (req.body.password !== 'admin') {
        res.send({ message: "Invalid password" })
    } else {
        //create a token
        let signedToken = jwt.sign({ Username: credentials.Username }, 'abcdef', { expiresIn: 10 })
        //send token to client
        res.send({ message: "login success", token: signedToken, Username: credentials.Username })
    }
}))
//get products
adminApi.get("/getproducts", expressErrorHandler(async (req, res, next) => {

    let productCollectionObject = req.app.get("productCollectionObject")
    console.log(productCollectionObject)

    let products=await productCollectionObject.find().toArray()
    res.send({message:products})
 

}))
//add product 
adminApi.post("/add-product",multerCloudinary.single('photo'),expressErrorHandler(async (req,res,next)=>{

    let productCollectionObject = req.app.get("productCollectionObject")
    let newProduct=JSON.parse(req.body.productCollectionObject)
    newProduct.productImage=req.file.path;
    await productCollectionObject.insertOne(newProduct)
    res.send({message:"New Product added"})

}))
 
module.exports = adminApi;