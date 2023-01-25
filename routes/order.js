const orderCont=require('../controllers/order')
const router=require('express').Router()

router.post('/',orderCont.create)

// router.get('/all',orderCont.getAll)
// router.get('/single/:id',orderCont.getSingle)
// router.get('/:id/builds',orderCont.getProjectBuilds)
// router.put('/update/:id',orderCont.updateProject)
// router.delete('/delete/:id',orderCont.deleteProject)


module.exports=router