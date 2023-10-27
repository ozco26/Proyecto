const express = require('express');
const router = express.Router();

const conexion = require('./database/db')

router.get('/', (req,res)=>{
    conexion.query('SELECT * from usuario', (error,results)=>{
        if(error){
            throw error;
        }else{
            res.send(results)
        }
    })
})

router.get ('/create',(req, res)=>{
    res.render('CrearUsuario');
})

const crud =require('./Controller/crud');
router.post('/save', crud.save)

module.exports =router;