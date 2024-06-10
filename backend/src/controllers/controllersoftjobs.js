const  {queryssoftjobs} = require ('../database/querys/queryssoftjobs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const postCtrLogin = async (req,res,next) => {

    try {
        
        const token = req.token
        res.send({token})

    } catch (error) {
         console.log(error)
         res.status(error.code || 404).send(error)
    }
 
}

const postCtrRegistro = async (req,res,next) => {

    try {
    
    const {email,password,rol,lenguage} = req.body
    const response = await queryssoftjobs.registraJobs(email,password,rol,lenguage)

    res.send(response)

    } catch (error) {
        console.log(error)
        res.status(500).json({message:'Internal Server Error'})
        next(error)
    }
    
}

const getCtrPerfil = async (req,res,next) => {
    try {
        
        const  {email}  = req.user
        const user = await queryssoftjobs.mostrarUsuario(email)
        res.send ([user])

    } catch (error) {
        console.log(error)
        res.status(500).json({message:'Internal Server Error'})
        next(error)
    }
    
}

module.exports = {postCtrLogin,postCtrRegistro,getCtrPerfil}