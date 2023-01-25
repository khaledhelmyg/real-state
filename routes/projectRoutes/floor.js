const floorCont=require('../../controllers/projectControllers/floor')
const router=require('express').Router()

router.post('/:buildId',floorCont.add)


router.get('/all',floorCont.getAll)
router.get('/single/:id',floorCont.getSingle)
router.get('/:id/units',floorCont.getFloorUnits)
router.put('/update/:id',floorCont.updateFloor)
router.delete('/delete/:id',floorCont.deleteFloor)

module.exports=router