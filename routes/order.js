const orderCont=require('../controllers/order')
const { hasAuth, isAuth } = require('../middelwares/auth')
const router=require('express').Router()

router.post('/new',isAuth,hasAuth,orderCont.create)

// router.get('/all',orderCont.getAll)
// router.get('/single/:id',orderCont.getSingle)
router.get('/receipt/:id',isAuth,hasAuth,orderCont.getReceipt)
router.get('/receipt/pdf/:id',isAuth,hasAuth,orderCont.getReceiptPdf)
// router.put('/update/:id',orderCont.updateProject)
// router.delete('/delete/:id',orderCont.deleteProject)


module.exports=router