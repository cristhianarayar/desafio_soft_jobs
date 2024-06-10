require('dotenv').config()

const jwt = require('jsonwebtoken');
const { verifyPasswordEncrypt } = require('../util/utils');
const { queryssoftjobs } = require('../database/querys/queryssoftjobs')


const validateLoginMiddleware = async (req, res, next) => {

    try {
        const { email, password } = req.body

        const passwordHash = await queryssoftjobs.verificaCredencial(email)
        const match = await verifyPasswordEncrypt(password, passwordHash)
        if (match) {

            const token = jwt.sign({ email }, process.env.JWT_JOB) 
            req.token = token
            next()

        }else if (!match){
            res.status(500).json({ code: 403, message: "No se encontró ningún usuario con estas credenciales" })
        }
        
    } catch (error) {
        res.status(500).json({code: 404,message:'No se encontró ningún usuario con estas credenciales'})
    }


}

module.exports = {
    validateLoginMiddleware
}