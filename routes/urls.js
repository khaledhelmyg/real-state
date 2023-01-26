const urlsControler=require('../controllers/urls')
const { isAuth } = require('../middelwares/auth')
const router=require('express').Router()

router.post('/',isAuth,urlsControler.create)
router.get('/:id',isAuth,urlsControler.get)

module.exports=router