const urlsControler=require('../controllers/urls')
const { isAuth } = require('../middelwares/auth')
const router=require('express').Router()

router.post('/',isAuth,urlsControler.create)
module.exports=router