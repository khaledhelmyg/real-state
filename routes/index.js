const express=require("express")
const cors =require('cors')
const path=require('path')
const usersRoute=require('./users')
const rolesRouter=require('./role')
const urlsRouter=require('./urls')

const projectsRouter=require('./projectRoutes/project')
const buildsRouter=require('./projectRoutes/build')
const floorsRouter=require('./projectRoutes/floor')
const unitsRouter=require('./projectRoutes/unit')

const ordersRouter=require('./order')


require('../models/connect')
const app=express()
app.use(cors())

app.use(express.static('public'));

app.use(express.json())

app.use('/api/users',usersRoute)
app.use('/api/roles',rolesRouter)
app.use('/api/urls',urlsRouter)

app.use('/api/projects',projectsRouter)
app.use('/api/building',buildsRouter)
app.use('/api/floors',floorsRouter)
app.use('/api/units',unitsRouter)

app.use('/api/orders',ordersRouter)

module.exports=app