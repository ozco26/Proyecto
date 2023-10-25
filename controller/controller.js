const conexion = require('../database/db');
const Swal = require('sweetalert2');


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
}

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
            res.redirect('/');
          }
        }
      );
    }
  } catch (err) {
    console.log(err);
    // Manejar errores de consulta
  }
};


//Actualizar 
exports.updateUS = (req, res)=>{
  const Cedula = req.body.Cedula;
  const Nombre = req.body.Nombre;
  const Apellidos = req.body.Apellidos;
  const FechaNacimiento = req.body.FechaNacimiento;
  const Correo = req.body.Correo;
  const Contrasena = req.body.Contrasena;
  const rol = req.body.rol;
  
  // Verificar si alguno de los campos requeridos está vacío o igual a un espacio en blanco
  if (
      Cedula.trim() === '' ||
      Nombre.trim() === '' ||
      Apellidos.trim() === '' ||
      FechaNacimiento.trim() === '' ||
      Correo.trim() === '' ||
      Contrasena.trim() === '' ||
      rol.trim() === ''
  ) {
      // Al menos uno de los campos está vacío, muestra una alerta
     console.log('Por favor, completa todos los campos.');
      return res.redirect('/');
  }
  
  // Si todos los campos requeridos están llenos, ejecuta la consulta SQL
  
  conexion.query('UPDATE usuario SET ? WHERE cedulaUsuario = ?', [{nombre:Nombre, apellidos:Apellidos, fechaNacimiento:FechaNacimiento, correo:Correo, contrasena:Contrasena, idRol:rol}, Cedula], (error, results) => {
      if (error) {
          console.log(error);
      } else {
          res.redirect('/');
      }
  });
  
};