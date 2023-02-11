const jwt=require('jsonwebtoken')
const { resHelper } = require('../controllers')
const roleModel = require('../models/role')
const userModel = require('../models/user')

const Authanticated = async(req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.SECRET)
        const userData = await userModel.findOne({
            _id: decodedToken._id,
            "tokens.token": token
        })
        //check url inside user role
        if(!userData)throw new Error("Ops you are not authorized!")
        const userRole=await roleModel.findById(userData.roleId)
        if(!userRole)throw new Error("Ops you have not role !")
        req.user=userData
        req.token=token
        req.role=userRole
        next()
    } catch (err) {
        resHelper(res,401,false,err.message,"invalid token!")
    }
}

const Authorized =async(req,res,next)=>{
    try {
        const role=await req.role.populate("roleUrls")
        // if(req.path == roleUrls.path && req.method  === roleUrls.method)
        const isAuth=role.roleUrls.find(roleUrl=>{
            const firstRoote=req.path.split('/')[1]
            const firstRooteToMatch=roleUrl.path.split('/')[1]
            return firstRoote === firstRooteToMatch && req.method == roleUrl.method
        })
        // console.log(isAuth)
        if(!isAuth)throw new Error
        ("don't have peremission!\n if you need to get access ask super admin please")
        next()
    } catch (err) {
        resHelper(res,401,false,err.message,"UnAuthorized!")
        
    }
}

module.exports={
    isAuth:Authanticated,
    hasAuth:Authorized
}
