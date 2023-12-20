const express = require('express');
const router = express.Router();
const conexion = require('./database/db');
const controller = require('./controller/controller');
const res = require('express/lib/response');
const req = require('express/lib/request');

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
    JOIN ruta r ON ru.idRuta = r.idRuta;

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

//Recargar saldo usuario
router.get('/recargar/:cedula/:saldo', (req, res)=>{
    const cedula = req.params.cedula;
    const saldo = req.params.saldo;
    const updateQuery = 'UPDATE USUARIO SET saldo = saldo + ? WHERE usuarioref = ?';

    conexion.query(updateQuery,[{saldo},cedula], (error, saldo)=>{
        if(error){
            console.log(error);
        }else{           
                    
        }
    });
})

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

router.get('/UsuarioView/:id', (req,res)=>{
    const id = req.params.id;
  console.log("Id encontrada: "+id);
  const usuario = "SELECT * FROM usuario WHERE ID=?" ;
 
  const obtenerHistorial = "SELECT * FROM transacciones WHERE idUsuario = ?";

  conexion.query(usuario, [id], (err, infousuario) => {
        if (err) {

            throw err;

        } else {
                    conexion.query(obtenerHistorial,[infousuario[0].ID],(err, historial) => {
                        if (err) {
                          console.log("Historial: " + historial[0]);
                          console.log("Historial: " + historial);
                          throw err;
          
                        } else {
          
                          console.log("Historial: " + historial[0]);
                          res.render("UsuarioView", {usuario: infousuario[0], historial: historial});
          
                        }
                    }) 
         }
    });

});

//Recargar saldo
router.get('/recargar/:cedula/:monto/:id', (req, res) => {
    const id = req.params.id;
    const cedula = req.params.cedula;
    const monto = req.params.monto;
    var nuevoSaldo = 0;
    const usuarioQuery = "SELECT * FROM usuario WHERE cedulaUsuario=?";
   const actualizarSaldoQuery = "UPDATE Usuario SET saldo = saldo + ? WHERE cedulaUsuario = ?";
   conexion.query(usuarioQuery, [cedula], (err, infousuario) => {
        if (err) {
            throw err;
        } else {
            try {
                if (infousuario.length > 0) {
                    console.log("Usuario encontrado:", infousuario[0]);
                    conexion.query(actualizarSaldoQuery, [monto, cedula], (err, resultado) => {
                        if (err) {
                            throw err;
                        } else {
                            console.log("Saldo actualizado correctamente");
                        }
                    });
                } else {
                    console.log("Usuario no encontrado");
                    res.send("Usuario no encontrado en la base de datos");
                }
            } catch (error) {
                console.log(error);
            }
        }
    });
    res.redirect('/UsuarioView/' + id);
});

//Comprobar cobrar
router.get("/cobrar/:cedula/:monto/:id/:ruta", (req, res) => {
  const id = req.params.id;
  const cedula = req.params.cedula;
  const monto = req.params.monto;
  const ruta = req.params.ruta;
  const fecha = new Date();

              const viaje = ruta;
              const costo = monto;

  const usuario = "SELECT * FROM usuario WHERE cedulaUsuario=?";

  conexion.query(usuario, [cedula], (err, infousuario) => {
    if (err) {
      console.error("Error al ejecutar la consulta de usuario:", err);
      return res.status(500).json({ error: "Error interno del servidor" });
    } else {
      try {
        if (infousuario.length > 0) {
          console.log(
            "Usuario encontrado:",
            infousuario[0].nombre + " " + infousuario[0].apellidos
          );
          if (infousuario[0].idRol === 2) {
            if (infousuario[0].saldo >= monto) {
              // Realizar la actualización del saldo

              const nuevoSaldo = infousuario[0].saldo - monto;
              const actualizarSaldo =
                "UPDATE usuario SET saldo = ? WHERE cedulaUsuario = ?";

              const id_Usuario = infousuario[0].ID;
              const fecha = new Date();
              const viaje = ruta;
              const costo = monto;

              conexion.query(actualizarSaldo,[nuevoSaldo, infousuario[0].cedulaUsuario],(err, resultado) => {
                  conexion.query("INSERT INTO transacciones SET ?",
                    {
                      idUsuario: id_Usuario,
                      fecha: fecha,
                      viaje: viaje,
                      costo: costo,
                      detalle: "Cobro ruta: "+ruta,
                    },
                    (err, results) => {
                      if (err) {
                        console.error("Error al actualizar el saldo:", err);
                        return res.status(500).json({error:"Error interno del servidor al guardar historial",});
                      }
                    });

                if (err) {
                    console.error("Error al actualizar el saldo:", err);
                    return res
                      .status(500)
                      .json({ error: "Error interno del servidor" });
                  } else {
                    res.status(200).json({ success: true });
                    console.log("Saldo actualizado correctamente");
                    // Puedes realizar otras acciones o enviar una respuesta al cliente aquí
                  }
                }
              );
            } else {
              // El saldo no es suficiente
              conexion.query("INSERT INTO transacciones SET ?",
                {
                  idUsuario: id,
                  fecha: fecha,
                  viaje: viaje,
                  costo: 0,
                  detalle: "Fallo: saldo no es suficiente en "+ruta,
                },
                (err, results) => {
                  if (err) {
                    console.error("Error al insert saldo no es suficiente:", err);
                    return res.status(500).json({error:"Error interno del servidor al guardar historial",});
                  }
                  });
              console.log("Saldo insuficiente");
              // Puedes realizar otras acciones o enviar una respuesta al cliente aquí
              res.status(400).json({ error: "Saldo insuficiente" });
            }
          } else {
            console.log("Usuario no es cliente");
            // Puedes realizar otras acciones o enviar una respuesta al cliente aquí
            conexion.query("INSERT INTO transacciones SET ?",
            {
              idUsuario: "",
              fecha: fecha,
              viaje: viaje,
              costo: 0,
              detalle: "Fallo: cliente no registrado en"+ruta,
            },
            (err, results) => {
              if (err) {
                console.error("Error al insert saldo no es suficiente:", err);
                return res.status(500).json({error:"Error interno del servidor al guardar historial",});
              }
              });
            res
              .status(400)
              .json({ error: "La cuenta registrada no se le puede cobrar" });
          }
        } else {
          console.log("Usuario no encontrado");
          //res.send("Usuario no encontrado en la base de datos");
          conexion.query("INSERT INTO transacciones SET ?",
            {
              idUsuario: "",
              fecha: fecha,
              viaje: viaje,
              costo: 0,
              detalle: "Fallo: cliente no registrado en"+ruta,
            },
            (err, results) => {
              if (err) {
                console.error("Error al insert saldo no es suficiente:", err);
                return res.status(500).json({error:"Error interno del servidor al guardar historial",});
              }
              });
          res
            .status(404)
            .json({ error: "Usuario no encontrado en la base de datos" });
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error interno del servidor" });
      }
    }
  });
});

//Cargar plantilla chofer segun ID
router.get("/ChoferView/:id", (req, res) => {
    
  const id = req.params.id;
  console.log("Id encontrada: "+id);
  const usuario = "SELECT * FROM usuario WHERE ID=?" ;
  const obtenerHistorial = "SELECT * FROM transacciones WHERE idUsuario = ?";
  const rutaus =
    "SELECT r.* FROM ruta_usuario ru JOIN ruta r ON ru.idRuta = r.idRuta WHERE ru.cedulaUsuario = ? ;";

  conexion.query(usuario, [id], (err, infousuario) => {
    if (err) {
      throw err;
    } else {
        console.log(infousuario[0]);

              conexion.query(obtenerHistorial,[infousuario[0].cedulaUsuario],(err, historial) => {
                  if (err) {
                    throw err;
                  } else {
                    console.log("Historial: " + historial[0]);
        
                    conexion.query(
                      rutaus,
                      [infousuario[0].cedulaUsuario],
                      (err, rutausuario) => {
                        if (err) {
                          throw err;
                        } else {
                          console.log("Rutas y usuario: " + rutausuario[0]);
                          res.render("ChoferView", {
                            usuario: infousuario[0],
                           
                            transaccion: historial[0],
                            rutausuario: rutausuario[0],
                          });
                        }
                      }
                    );
                  }
                }
              );
    }
  });
  
});
router.post("/loguearse", controller.loguearse);
router.post("/saveUS", controller.saveUS);
router.post("/saveRutaUsuario", controller.saveRutaUsuario);
router.post("/saveReg", controller.saveReg);
router.post("/saveRuta", controller.saveRuta);
router.post("/updateUS", controller.updateUS);
router.post("/updateRuta", controller.updateRuta);

module.exports = router;