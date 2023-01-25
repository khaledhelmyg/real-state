const rolesControler=require('../controllers/roles')
const router=require('express').Router()

router.post('/',rolesControler.create)
module.exports=router