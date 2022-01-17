//create mini express app
const exp = require('express')
const userApi = exp.Router();
const expressErrorHandler = require("express-async-handler")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")

const checkToken = require("./middlewares/verifyToken")

const multerObj=require("./middlewares/multerCloudinary")





//add body parsing middleware
userApi.use(exp.json())







//http://localhost:3000/user/getusers
//get users
userApi.get("/getusers", expressErrorHandler(async (req, res) => {

    let userCollectionObj = req.app.get("userCollectionObj")

    let userList = await userCollectionObj.find().toArray()
    res.send({ message: userList })

}))





//get user by username
userApi.get("/getuser/:Username", expressErrorHandler(async (req, res, next) => {


    let userCollectionObj = req.app.get("userCollectionObj")

    //get username from url
    let un = req.params.Username;
    //search
    let userObj = await userCollectionObj.findOne({ Username: un })

    if (userObj === null) {
        res.send({ message: "User not existed" })
    }
    else {
        res.send({ message: userObj })
    }
}))



















//http://localhost:3000/user/createuser
//create user
userApi.post("/createuser", multerObj.single('photo'), expressErrorHandler(async (req, res, next) => {

    let userCollectionObj = req.app.get("userCollectionObj")

    //get user obj
    let newUser = JSON.parse(req.body.userObj)
    

    //search for existing user
    let user = await userCollectionObj.findOne({ Username: newUser.Username })
    //if user existed
    if (user !== null) {
        res.send({ message: "User already existed" });
    }
    else {
        //hash password
        let hashedPassword = await bcryptjs.hash(newUser.password, 7)
        //replace password
        newUser.password = hashedPassword;
        //add image url
        newUser.profileImage=req.file.path;
        delete newUser.photo;
        //insert
        await userCollectionObj.insertOne(newUser)
        res.send({ message: "User created" })
    }
}))




//http://localhost:3000/user/updateuser/<username>

userApi.put("/updateuser/:Username", expressErrorHandler(async (req, res, next) => {
    let userCollectionObj = req.app.get("userCollectionObj")

    //get modified user
    let modifiedUser = req.body;
    //update
    await userCollectionObj.updateOne({ Username: modifiedUser.Username }, { $set: { ...modifiedUser } })
    //send res
    res.send({ message: "User modified" })

}))




//delete user
userApi.delete("/deleteuser/:Username", expressErrorHandler(async (req, res) => {
    let userCollectionObj = req.app.get("userCollectionObj")

    //get username from url
    let un = req.params.Username;
    //find the user
    let user = await userCollectionObj.findOne({ Username: un })

    if (user === null) {
        res.send({ message: "User not existed" })
    }
    else {
        await userCollectionObj.deleteOne({ Username: un })
        res.send({ message: "user removed" })
    }
}))




//user login
userApi.post('/login', expressErrorHandler(async (req, res) => {
    let userCollectionObj = req.app.get("userCollectionObj")
    
    //get user credetials
    let credentials = req.body;
    //search user by username
    let user = await userCollectionObj.findOne({ Username: credentials.Username })
    //if user not found
    if (user === null) {
        res.send({ message: "invalid username" })
    }
    else {
        //compare the password
        let result = await bcryptjs.compare(credentials.password, user.password)
        //if not matched
        if (result === false) {
            res.send({ message: "Invalid password" })
        }
        else {
            //create a token
            let signedToken = jwt.sign({ Username: credentials.Username }, 'abcdef', { expiresIn: 10 })
            //send token to client
            res.send({ message: "login success", token: signedToken, Username: credentials.Username, userObj: user })
        }

    }

}))


//add to cart 
userApi.post("/add-to-cart",expressErrorHandler(async (req,res,next)=>{

    let userCartCollectionObject=req.app.get("userCartCollectionObject")

    let newProdObject=req.body;

    //find userCartCollection
    let userCartObj=await userCartCollectionObject.findOne({Username:newProdObject.Username})

    //if userCartObj is not existed
    if(userCartObj===null){

        //create new object
        let products=[];
        products.push(newProdObject.productObject)

        let newUserCartObject={Username:newProdObject.Username,products}
        //insert it
        await userCartCollectionObject.insertOne(newUserCartObject)

        res.send({message:"New Product Added"})

    }
    //if existed
    else{

        //push productObject to products array
        userCartObj.products.push(newProdObject.productObject)
        //update document
        await userCartCollectionObject.updateOne({Username:newProdObject.Username},{ $set:{...userCartObj}})
        res.send({message:"New Product Added"})
    }
}))

//get products from user cart
userApi.get("/getproducts/:Username",expressErrorHandler(async(req,res,next)=>{

    let userCartCollectionObject=req.app.get("userCartCollectionObject")

    let un=req.params.Username;

    let userProdObj=await userCartCollectionObject.findOne({Username:un})

    if(userProdObj===null){
        res.send({message:"Card Empty"})
    }
    else{
        res.send({message:userProdObj})
    }

    
}))





//dummy route to create protected resource
userApi.get("/testing", checkToken, (req, res) => {
    res.send({ message: "This is protected data" })
})



//export
module.exports = userApi;