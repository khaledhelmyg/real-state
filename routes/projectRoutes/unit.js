const unitCont=require('../../controllers/projectControllers/unit')
const router=require('express').Router()

router.post('/:floorId',unitCont.add)

router.get('/all',unitCont.getAll)
router.get('/single/:id',unitCont.getSingle)
router.put('/update/:id',unitCont.updateUnit)
router.delete('/delete/:id',unitCont.deleteUnit)

module.exports=router