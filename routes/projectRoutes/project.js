const projectCont=require('../../controllers/projectControllers/project')
const router=require('express').Router()

router.post('/',projectCont.add)
router.get('/all',projectCont.getAll)
router.get('/single/:id',projectCont.getSingle)
router.get('/:id/builds',projectCont.getProjectBuilds)
router.put('/update/:id',projectCont.updateProject)
router.delete('/delete/:id',projectCont.deleteProject)


module.exports=router