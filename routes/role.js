const rolesControler=require('../controllers/roles')
const router=require('express').Router()

router.post('/',rolesControler.create)
router.get('/:id/urls',rolesControler.getRoleUrls)
router.get('/:id',rolesControler.get)
module.exports=router