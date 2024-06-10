const router = require('express').Router()
const filesRouter = require('./files/softjobfile')

router.use('/', filesRouter)

module.exports = router