const { resHelper } = require('..')
const ordertModel=require('../models/order')
class Order{
    static create=async(req,res)=>{
        try {
            
        } catch (err) {
            resHelper(res,400,false,err,err.message)
        }
    }
}

module.exports=Order