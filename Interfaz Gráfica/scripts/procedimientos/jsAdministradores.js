// ----------------------------------------TABLAS----------------------------------------
// TABLA ADMINISTRADORES

// ---------------------------------------
// Función: Crear una Nueva Entrada en Administradores
// ---------------------------------------
async function createAdministrador() {
    const nom_administradores = document.getElementById('create_nom_administradores')?.value;
    const ape_administradores = document.getElementById('create_ape_administradores')?.value;
    const correo_administradores = document.getElementById('create_correo_administradores')?.value;
    const tel_administradores = document.getElementById('create_tel_administradores')?.value;
    const direccion_administradores = document.getElementById('create_direccion_administradores')?.value;
    const password = document.getElementById('create_password_administradores')?.value;

    try {
        const response = await fetch(`http://127.0.0.1:5000/api/administradores`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nom_administradores,
                ape_administradores,
                correo_administradores,
                tel_administradores,
                direccion_administradores,
                password
            })
        });

        if (response.ok) {
            alert('Administrador creado exitosamente');
            fetchAdministradores();
            $('#createModal').modal('hide');  // Cierra el modal de crear administrador
        } else {
            const errorData = await response.json();
            alert('Error creando administrador: ${errorData.message}');
        }
    } catch (error) {
        console.error('Error creando administrador:', error);
        alert('Error creando administrador.');
    }
}

// ---------------------------------------
// Función: Obtener Datos de la Tabla Administradores
// Descripción: Trae la tabla completa de la base de datos y la muestra en una tabla con botones para editar y eliminar.
// ---------------------------------------
async function fetchAdministradores() {
    try {
        const response = await fetch(`http://127.0.0.1:5000/api/administradores`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const table = document.getElementById('administradores-table');
        if (table) {
            table.innerHTML = `
                <thead>
                    <tr>
                        <th>ID Administrador</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Correo</th>
                        <th>Teléfono</th>
                        <th>Dirección</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            `;
            const tbody = table.querySelector('tbody');
            data.sort((a, b) => a.FIDE_ADMINISTRADORES_V_Id_administradores_PK - b.FIDE_ADMINISTRADORES_V_Id_administradores_PK);
            data.forEach(row => {
                tbody.innerHTML += `
                    <tr>
                        <td>${row.FIDE_ADMINISTRADORES_V_Id_administradores_PK}</td>
                        <td>${row.V_Nom_administradores}</td>
                        <td>${row.V_Ape_administradores}</td>
                        <td>${row.V_Correo_administradores}</td>
                        <td>${row.V_Tel_administradores}</td>
                        <td>${row.V_Direccion_administradores}</td>
                        <td>
                            <button class="btn btn-primary edit-btn" data-admin-id="${row.FIDE_ADMINISTRADORES_V_Id_administradores_PK}">Editar</button>
                            <button class="btn btn-danger" onclick="deleteAdministrador(${row.FIDE_ADMINISTRADORES_V_Id_administradores_PK})">Eliminar</button>
                        </td>
                    </tr>
                `;
            });
            setupEditButtons();
        }
    } catch (error) {
        console.error('Error fetching administradores:', error);
    }
}

// ---------------------------------------
// Función: Configurar Botones de Edición
// Descripción: Añade eventos a los botones de editar para mostrar el formulario de edición con los datos del administrador seleccionado.
// ---------------------------------------
function setupEditButtons() {
    document.querySelectorAll('.edit-btn').forEach(button => {
        button.addEventListener('click', function () {
            const adminId = this.dataset.adminId;
            fetch(`http://127.0.0.1:5000/api/administradores/${adminId}`)
                .then(response => response.json())
                .then(data => {
                    showEditForm(data);
                    $('#editModal').modal('show');  // Muestra el modal de edición
                })
                .catch(error => {
                    console.error('Error fetching admin data:', error);
                });
        });
    });
}

// ---------------------------------------
// Función: Mostrar Formulario de Edición
// Descripción: Muestra el formulario de edición con los datos del administrador seleccionado.
// ---------------------------------------
function showEditForm(adminData) {
    document.getElementById('update_id_administrador').value = adminData.FIDE_ADMINISTRADORES_V_Id_administradores_PK;
    document.getElementById('update_nom_administradores').value = adminData.V_Nom_administradores;
    document.getElementById('update_ape_administradores').value = adminData.V_Ape_administradores;
    document.getElementById('update_correo_administradores').value = adminData.V_Correo_administradores;
    document.getElementById('update_tel_administradores').value = adminData.V_Tel_administradores;
    document.getElementById('update_direccion_administradores').value = adminData.V_Direccion_administradores;
    document.getElementById('update_password_administradores').value = '';
}

// ---------------------------------------
// Función: Actualizar una Entrada de Administradores
// Descripción: Envía los datos actualizados del administrador al backend para modificar la base de datos.
// ---------------------------------------
async function updateAdministrador() {
    const id_administrador = document.getElementById('update_id_administrador')?.value;
    const nom_administradores = document.getElementById('update_nom_administradores')?.value;
    const ape_administradores = document.getElementById('update_ape_administradores')?.value;
    const correo_administradores = document.getElementById('update_correo_administradores')?.value;
    const tel_administradores = document.getElementById('update_tel_administradores')?.value;
    const direccion_administradores = document.getElementById('update_direccion_administradores')?.value;
    const password = document.getElementById('update_password_administradores')?.value || null;

    try {
        const response = await fetch(`http://127.0.0.1:5000/api/administradores/${id_administrador}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nom_administradores,
                ape_administradores,
                correo_administradores,
                tel_administradores,
                direccion_administradores,
                password
            })
        });

        if (response.ok) {
            alert('Administrador actualizado exitosamente');
            fetchAdministradores();
            $('#editModal').modal('hide');  // Cierra el modal de edición
        } else {
            const errorData = await response.json();
            alert('Error actualizando administrador: ${errorData.message}');
        }
    } catch (error) {
        console.error('Error actualizando administrador:', error);
        alert('Error actualizando administrador.');
    }
}

// ---------------------------------------
// Función: Borrar una Entrada de Administradores
// Descripción: Cambia el estado del administrador a "INACTIVO" en la base de datos y oculta la entrada en la tabla.
// ---------------------------------------
async function deleteAdministrador(id_administrador) {
    if (!id_administrador) {
        alert('Por favor, ingresa el ID del administrador a eliminar.');
        return;
    }

    try {
        const response = await fetch(`http://127.0.0.1:5000/api/administradores/${id_administrador}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert('Administrador eliminado exitosamente');
            fetchAdministradores();
        } else {
            const errorData = await response.json();
            alert('Error eliminando administrador: ${errorData.message}');
        }
    } catch (error) {
        console.error('Error eliminando administrador:', error);
        alert('Error eliminando administrador.');
    }
}

// ---------------------------------------
// Función: Filtrar Administradores
// Descripción: Filtra las entradas de la tabla administradores basado en la categoría seleccionada y la entrada del campo de búsqueda.
// ---------------------------------------
function filterAdministradores() {
    const searchCategory = document.getElementById('search-category').value.toLowerCase();
    const searchTerm = document.getElementById('search-bar').value.toLowerCase();
    const table = document.getElementById('administradores-table');
    const rows = table.getElementsByTagName('tr');

    for (let i = 1; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        let match = false;

        
        if (searchCategory === 'id' && cells[0].innerText.toLowerCase().includes(searchTerm)) {
            match = true;
        } else if (searchCategory === 'nombre' && cells[1].innerText.toLowerCase().includes(searchTerm)) {
            match = true;
        } else if (searchCategory === 'apellido' && cells[2].innerText.toLowerCase().includes(searchTerm)) {
            match = true;
        } else if (searchCategory === 'correo' && cells[3].innerText.toLowerCase().includes(searchTerm)) {
            match = true;
        } else if (searchCategory === 'teléfono' && cells[4].innerText.toLowerCase().includes(searchTerm)) {
            match = true;
        }

        rows[i].style.display = match ? '' : 'none';
    }
}

// ---------------------------------------
// Función: Abrir Modal de Crear Administrador
// ---------------------------------------
function openCreateModal() {
    $('#createModal').modal('show');
}

// ---------------------------------------
// Ejecuta la función para cargar la tabla de administradores al cargar la página
// ---------------------------------------
window.onload = fetchAdministradores;