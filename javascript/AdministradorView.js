document.addEventListener("DOMContentLoaded", function (){

    document.getElementById("btn__cliente").addEventListener("click", () => {
        // Llamar a la función de consulta de usuarios desde el archivo de conexión
        consultarUsuarios((error, usuarios) => {
            if (error) {
                console.error("Error al consultar usuarios:", error);
            } else {
                // Datos de usuarios disponibles en "usuarios"
                console.log("Datos de usuarios:", usuarios);
    
                // Crear la tabla HTML
                const tablaHTML = `
                    <table>
                        <thead>
                            <tr>
                                <th>Cedula</th>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Fecha de Nacimiento</th>
                                <th>Correo</th>
                                <th>Contraseña</th>
                                <th>ID Rol</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${usuarios.map((usuario) => `
                                <tr>
                                    <td>${usuario.cedulaUsuario}</td>
                                    <td>${usuario.nombre}</td>
                                    <td>${usuario.apellido}</td>
                                    <td>${usuario.fechaNacimiento}</td>
                                    <td>${usuario.correo}</td>
                                    <td>${usuario.contrasena}</td>
                                    <td>${usuario.idRol}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                `;
    
                // Mostrar la tabla en el elemento con id "generar__tabla"
                document.getElementById("generar__tabla").innerHTML = tablaHTML;
            }
        });
    });

});
