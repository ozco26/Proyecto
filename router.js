const express = require('express');
const router = express.Router();
const conexion = require('./database/db');
const controller = require('./controller/controller');

//Inicio de usuario

router.get('/', (req,res)=>{

    res.render('Login');
    
});

//Registro de usuario
router.get('/Register', (req,res)=>{

    res.render('Register');
    
});

//Llena la tabla usuario\

router.get('/MainAdmin', (req, res) => {
    const sql = `
    SELECT usuario.*, rol.nombreRol
    FROM usuario
    INNER JOIN rol ON usuario.idRol = rol.idRol;
    `;

    const sql2=`
    SELECT * FROM ruta;
    `;

    const sql3=`
    SELECT ru.idRutaAsignada, u.nombre, r.localidad 
    FROM ruta_usuario ru 
    JOIN usuario u ON ru.cedulaUsuario = u.cedulaUsuario 
    JOIN ruta r ON ru.idRutaAsignada = r.idRuta;



    `;
    
    conexion.query(sql, (err, results) => {
        if (err) {
            throw err;
        } else {
            conexion.query(sql2, (err,results2)=>{
                if (err) {
                    throw err;
                } else {
                    conexion.query(sql3,(err,results3)=>{
                        if (err){
                            throw err;
                        }else{
                            res.render('AdministradorView', { results: results, results2:results2, results3:results3});
                        }
                    })
                }
            })
            
        }
    });
});

//Ruta eliminar usuario
router.get('/delete/:id', (req, res) => {
    const id = req.params.id;
    conexion.query('DELETE FROM usuario WHERE cedulaUsuario = ?',[id], (error, results)=>{
        if(error){
            console.log(error);
        }else{           
            res.redirect('/MainAdmin');         
        }
    })
});
//Ruta eliminar choferruta

router.get('/delete2/:id', (req, res) => {
    const id = req.params.id;
    conexion.query('DELETE FROM ruta_usuario WHERE idRutaAsignada = ?',[id], (error, results)=>{
        if(error){
            console.log(error);
        }else{           
            res.redirect('/MainAdmin');         
        }
    })
});
//Ruta eliminar ruta

router.get('/delete3/:id', (req, res) => {
    const id = req.params.id;
    conexion.query('DELETE FROM ruta WHERE idRuta = ?',[id], (error, results)=>{
        if(error){
            console.log(error);
        }else{           
            res.redirect('/MainAdmin');         
        }
    })
});


router.get('/AdministradorViewAsi', (req,res)=>{
    const consultarchofer=`

    SELECT * FROM usuario WHERE idRol='3'
    
    `;
    const consultarruta=`

    SELECT * FROM ruta
    
    `;

    conexion.query(consultarchofer, (err,chofer)=>{
        if (err) {
            throw err;
        } else {
            conexion.query(consultarruta, (err,ruta)=>{
                if (err) {
                    throw err;
                } else {
                    res.render('AdministradorViewAsi',{chofer:chofer, ruta:ruta});
                };
            });
            
        };
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

router.get('/AdministradorViewEditRuta/:id', (req,res)=>{
    const id=req.params.id;
    conexion.query('SELECT * FROM `ruta` where idRuta=?',[id], (err, results)=>{
        if (err) {
        
            throw err;

        }else{
            res.render('AdministradorViewEditRuta',{ruta:results[0]});
        }
    })
});

router.get('/AdministradorViewCreateUS', (req,res)=>{

    res.render('AdministradorViewCreateUS');
    
});

router.get('/AdministradorViewCreateRuta', (req,res)=>{

    res.render('AdministradorViewCreateRuta');
    
});

router.get('/BloqueadoView', (req,res)=>{

    res.render('BloqueadoView');
    
});
router.get('/UsuarioView', (req,res)=>{

    res.render('UsuarioView');
    
});
router.get('/ChoferView', (req,res)=>{

    res.render('ChoferView');
    
});
router.post("/loguearse", controller.loguearse);
router.post('/saveUS',controller.saveUS);
router.post('/saveRutaUsuario',controller.saveRutaUsuario);
router.post('/saveReg',controller.saveReg);
router.post('/saveRuta',controller.saveRuta);
router.post('/updateUS',controller.updateUS);
router.post('/updateRuta',controller.updateRuta);

module.exports=router;