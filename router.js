const express = require('express');
const router = express.Router();
const conexion = require('./database/db');
const controller = require('./controller/controller');

//Llena la tabla usuario\

router.get('/', (req, res) => {
    const sql = `
    SELECT usuario.*, rol.nombreRol
    FROM usuario
    INNER JOIN rol ON usuario.idRol = rol.idRol;
    `;
    
    conexion.query(sql, (err, results) => {
        if (err) {
            throw err;
        } else {
            res.render('AdministradorView', { results: results });
        }
    });
});

//Ruta eliminar registro
router.get('/delete/:id', (req, res) => {
    const id = req.params.id;
    conexion.query('DELETE FROM usuario WHERE cedulaUsuario = ?',[id], (error, results)=>{
        if(error){
            console.log(error);
        }else{           
            res.redirect('/');         
        }
    })
});

//Ruta Editar registros
router.get('/AdministradorViewEdit/:id', (req,res)=>{
    const id=req.params.id;
    conexion.query('SELECT * FROM `usuario` where cedulaUsuario=?',[id], (err, results)=>{
        if (err) {
        
            throw err;

        }else{
            res.render('AdministradorViewEdit',{user:results[0]});
        }
    })
});

router.get('/AdministradorViewCreateUS', (req,res)=>{
    res.render('AdministradorViewCreateUS');
});

router.post('/saveUS',controller.saveUS);
router.post('/updateUS',controller.updateUS);

module.exports=router;