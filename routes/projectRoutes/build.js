const buildCont=require('../../controllers/projectControllers/build')
const router=require('express').Router()

router.post('/:projectId',buildCont.add)

router.get('/all',buildCont.getAll)
router.get('/single/:id',buildCont.getSingle)
router.get('/:id/floors',buildCont.getBuildFloors)
router.put('/update/:id',buildCont.updateBuild)
router.delete('/delete/:id',buildCont.deleteBuild)

module.exports=router