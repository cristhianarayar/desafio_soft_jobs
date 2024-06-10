const { postCtrLogin,postCtrRegistro,getCtrPerfil } = require ("../../controllers/controllersoftjobs")
const { validateLoginMiddleware } = require ('../../middlewares/softjobsLogin') 
const { authSoftJobs } = require ('../../middlewares/softjobsAuth')
const fileroute = require('express').Router()

fileroute.post("/login",validateLoginMiddleware,postCtrLogin)
fileroute.post("/usuarios",postCtrRegistro)
fileroute.get("/usuarios",authSoftJobs,getCtrPerfil)


module.exports = fileroute