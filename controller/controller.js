const conexion = require('../database/db');


function contarSimilitudes(query, params) {
  return new Promise((resolve, reject) => {
    conexion.query(query, params, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result[0].count);
      }
    });
  });
};

//Metodo para guardar Rutas Creadas

exports.saveReg = async (req,res)=>{
  const Cedula = req.body.Cedula;
  const Nombre = req.body.Nombre;
  const Apellidos = req.body.Apellidos;
  const FechaNacimiento = req.body.FechaNacimiento;
  const Correo = req.body.Correo;
  const Contrasena = req.body.Contrasena;
  const rol = req.body.rol;

  const check1 = 'SELECT COUNT(*) as count FROM usuario WHERE cedulaUsuario = ?';
  const check2 = 'SELECT COUNT(*) as count FROM usuario WHERE correo = ?';

  try {
    const cedulacheck = await contarSimilitudes(check1, [Cedula]);
    const checkcorreo = await contarSimilitudes(check2, [Correo]);

    if (cedulacheck > 0) {

      console.log('Las cedulas similares fueron: '+cedulacheck);
      res.redirect('/AdministradorViewCreateUS');
      
    } else if (checkcorreo > 0) {
      console.log('Los correos similares fueron: '+checkcorreo);
      res.redirect('/AdministradorViewCreateUS');

    } else {
      
      conexion.query(
        'INSERT INTO usuario SET ?',
        {
          cedulaUsuario: Cedula,
          nombre: Nombre,
          apellidos: Apellidos,
          fechaNacimiento: FechaNacimiento,
          correo: Correo,
          contrasena: Contrasena,
          idRol: rol,
        },
        (err, results) => {
          if (err) {
            console.log(err);
          } else {
            
            res.redirect('/');
          }
        }
      );
    }
  } catch (err) {
    console.log(err);
  }
};


exports.saveRuta = async (req,res)=>{
  const IDRuta = req.body.Id;
  const Localidad = req.body.Localidad;
  const Indicacion = req.body.Indicacion;

  const check = 'SELECT COUNT(*) AS count FROM `ruta` WHERE idRuta = ?';

  try {

    const rutascheck = await contarSimilitudes(check, [IDRuta]);

    if (rutascheck>0) {

      console.log('Ya existe una ruta con esa ID');
      res.render('/AdministradorViewCreateRuta')
      
    } else {
      conexion.query('Insert into ruta SET ?', [{idRuta:IDRuta, localidad:Localidad, indicaciones:Indicacion}, IDRuta], (error, results) => {
        if (error) {
            console.log(error);
        } else {
            res.redirect('/MainAdmin');
        }
      });
    }
    
  } catch (error) {
    console.log(err);
  }

};

//Metodo para guardar Usuarios Creados
exports.saveUS = async (req, res) => {
  const Cedula = req.body.Cedula;
  const Nombre = req.body.Nombre;
  const Apellidos = req.body.Apellidos;
  const FechaNacimiento = req.body.FechaNacimiento;
  const Correo = req.body.Correo;
  const Contrasena = req.body.Contrasena;
  const rol = req.body.rol;

  const check1 = 'SELECT COUNT(*) as count FROM usuario WHERE cedulaUsuario = ?';
  const check2 = 'SELECT COUNT(*) as count FROM usuario WHERE correo = ?';

  try {
    const cedulacheck = await contarSimilitudes(check1, [Cedula]);
    const checkcorreo = await contarSimilitudes(check2, [Correo]);

    if (cedulacheck > 0) {

      console.log('Las cedulas similares fueron: '+cedulacheck);
      res.redirect('/AdministradorViewCreateUS');
      
    } else if (checkcorreo > 0) {
      console.log('Los correos similares fueron: '+checkcorreo);
      res.redirect('/AdministradorViewCreateUS');

    } else {
      
      conexion.query(
        'INSERT INTO usuario SET ?',
        {
          cedulaUsuario: Cedula,
          nombre: Nombre,
          apellidos: Apellidos,
          fechaNacimiento: FechaNacimiento,
          correo: Correo,
          contrasena: Contrasena,
          idRol: rol,
        },
        (err, results) => {
          if (err) {
            console.log(err);
          } else {
            
            res.redirect('/MainAdmin');
          }
        }
      );
    }
  } catch (err) {
    console.log(err);
  }
};


//Actualizar 
exports.updateRuta = async (req, res)=>{
  const IDRuta = req.body.Id;
  const Localidad = req.body.Localidad;
  const Indicacion = req.body.Indicacion;

  conexion.query('UPDATE ruta SET ? WHERE idRuta = ?', [{localidad:Localidad, indicaciones:Indicacion}, IDRuta], (error, results) => {
    if (error) {
        console.log(error);
    } else {
        res.redirect('/MainAdmin');
    }
  });
}

exports.updateUS = (req, res)=>{
  const Cedula = req.body.Cedula;
  const Nombre = req.body.Nombre;
  const Apellidos = req.body.Apellidos;
  const FechaNacimiento = req.body.FechaNacimiento;
  const Correo = req.body.Correo;
  const Contrasena = req.body.Contrasena;
  const rol = req.body.rol;

  conexion.query('UPDATE usuario SET ? WHERE cedulaUsuario = ?', [{nombre:Nombre, apellidos:Apellidos, fechaNacimiento:FechaNacimiento, correo:Correo, contrasena:Contrasena, idRol:rol}, Cedula], (error, results) => {
      if (error) {
          console.log(error);
      } else {
          res.redirect('/MainAdmin');
      }
  });
  
};

// Método de LogIn para validar el correo y la contraseña
exports.loguearse = (req, res) => {
  const correo = req.body.correo;
  const contrasena = req.body.contrasena;

  conexion.query(
    "SELECT * FROM usuario WHERE correo = ? AND contrasena = ?",
    [correo, contrasena],
    (err, results) => {
      if (err) {
        throw err;
      } else {
        if (results.length > 0) {
          res.redirect("/MainAdmin");
        } else {
          res.render("login", {
            error: "Credenciales incorrectas. Inténtalo de nuevo.",
          });
        }
      }
    }
  );
};