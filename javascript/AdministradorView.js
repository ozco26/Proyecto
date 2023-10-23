document.addEventListener("DOMContentLoaded", function () {
    const tablaactual = document.getElementById("generar__tabla");

    const generar = (tipo) => {
        // Limpia cualquier contenido anterior en la tabla
        tablaactual.innerHTML = '';

        // Realiza una solicitud a la API para obtener los datos
        fetch(`https://tu-api.com/${tipo}`)
            .then(response => response.json())
            .then(data => {
                // Crea la estructura de la tabla
                let tablaHTML = `
                    <table class="Tabla${tipo}"><thead><tr>`;

                if (tipo === "Cliente") {
                    tablaHTML += `
                        <th>Cedula</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Fecha Nacimiento</th>
                        <th>Contraseña</th>
                        <th>Rol</th>`;
                }
                if (tipo === "Chofer") {
                    tablaHTML += `
                        <th>Chofer</th>
                        <th>Email</th>`;
                }
                if (tipo === "Ruta") {
                    tablaHTML += `<th>Ruta</th><th>Email</th>`;
                }

                tablaHTML += `</tr></thead><tbody>`;

                // Recorre los datos y crea filas en la tabla
                data.forEach(item => {
                    tablaHTML += '<tr>';
                    if (tipo === "Cliente") {
                        tablaHTML += `<td>${item.Cedula}</td>`;
                        tablaHTML += `<td>${item.Nombre}</td>`;
                        tablaHTML += `<td>${item.Apellido}</td>`;
                        tablaHTML += `<td>${item.FechaNacimiento}</td>`;
                        tablaHTML += `<td>${item.Contraseña}</td>`;
                        tablaHTML += `<td>${item.Rol}</td>`;
                    }
                    if (tipo === "Chofer") {
                        tablaHTML += `<td>${item.Chofer}</td>`;
                        tablaHTML += `<td>${item.Email}</td>`;
                    }
                    if (tipo === "Ruta") {
                        tablaHTML += `<td>${item.Ruta}</td>`;
                        tablaHTML += `<td>${item.Email}</td>`;
                    }
                    tablaHTML += '</tr>';
                });

                tablaHTML += `</tbody></table>`;
                tablaactual.innerHTML = tablaHTML;
            })
            .catch(error => {
                console.error("Error al obtener datos de la API:", error);
            });
    };

    document.getElementById("btn__cliente").addEventListener("click", () => generar("Cliente"));
    document.getElementById("btn__chofer").addEventListener("click", () => generar("Chofer"));
    document.getElementById("btn__ruta").addEventListener("click", () => generar("Ruta"));
});

