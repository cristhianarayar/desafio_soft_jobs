require('dotenv').config()
const jwt = require('jsonwebtoken');
const { queryssoftjobs } = require('../database/querys/queryssoftjobs')

const authSoftJobs = async (req, res, next) => {

    try {
        const Authorization = req.header("Authorization")

        const token = Authorization.split("Bearer ")[1]

        jwt.verify(token, process.env.JWT_JOB)

        const  {email}  = jwt.decode(token)

        req.user =  { email } 

        next()

    } catch (error) {
        next(error)
    }
}

module.exports = {
    authSoftJobs
}