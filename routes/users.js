const userControler=require('../controllers/users')
const {isAuth,hasAuth} = require('../middelwares/auth')
const router=require('express').Router()

router.post('/register',userControler.register)
router.post('/login',userControler.login)
router.post('/me',isAuth,hasAuth,userControler.profile)

module.exports=router