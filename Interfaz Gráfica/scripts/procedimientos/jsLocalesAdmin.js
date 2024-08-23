// TABLA LOCALES

// ---------------------------------------
// Función: Crear una Nueva Entrada en Locales
// ---------------------------------------
async function createLocal() {
    const nom_local = document.getElementById('create_nom_local')?.value;
    const tel_local = document.getElementById('create_tel_local')?.value;
    const direccion_local = document.getElementById('create_direccion_local')?.value;

    try {
        const response = await fetch('http://127.0.0.1:5000/api/locales', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nom_local,
                tel_local,
                direccion_local
            })
        });

        if (response.ok) {
            alert('Local creado exitosamente');
            fetchLocales();
            $('#createModal').modal('hide');  // Cierra el modal de crear local
        } else {
            const errorData = await response.json();
            alert(`Error creating local: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Error creating local:', error);
        alert('Error creating local.');
    }
}

// ---------------------------------------
// Función: Obtener Datos de la Tabla Locales
// Descripción: Trae la tabla completa de la base de datos y la muestra en una tabla con botones para editar y eliminar.
// ---------------------------------------
async function fetchLocales() {
    try {
        const response = await fetch('http://127.0.0.1:5000/api/locales');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const table = document.getElementById('locales-table');
        if (table) {
            table.innerHTML = `
                <thead>
                    <tr>
                        <th>ID Local</th>
                        <th>Nombre</th>
                        <th>Teléfono</th>
                        <th>Dirección</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            `;
            const tbody = table.querySelector('tbody');
            data.sort((a, b) => a.FIDE_LOCALES_V_Id_local_PK - b.FIDE_LOCALES_V_Id_local_PK); // Ordenar por ID ascendente
            data.forEach(row => {
                tbody.innerHTML += `
                    <tr>
                        <td>${row.FIDE_LOCALES_V_Id_local_PK}</td>
                        <td>${row.V_Nom_local}</td>
                        <td>${row.V_Tel_local}</td>
                        <td>${row.V_Direccion_local}</td>
                        <td>
                            <button class="btn btn-primary edit-btn" data-local-id="${row.FIDE_LOCALES_V_Id_local_PK}">Editar</button>
                            <button class="btn btn-danger" onclick="deleteLocal(${row.FIDE_LOCALES_V_Id_local_PK})">Eliminar</button>
                        </td>
                    </tr>
                `;
            });
            setupEditButtonsLocales();
        }
    } catch (error) {
        console.error('Error fetching locales:', error);
    }
}

// ---------------------------------------
// Función: Configurar Botones de Edición
// Descripción: Añade eventos a los botones de editar para mostrar el formulario de edición con los datos del local seleccionado.
// ---------------------------------------
function setupEditButtonsLocales() {
    document.querySelectorAll('.edit-btn').forEach(button => {
        button.addEventListener('click', function () {
            const localId = this.dataset.localId;
            fetch(`http://127.0.0.1:5000/api/locales/${localId}`)
                .then(response => response.json())
                .then(data => {
                    showEditFormLocales(data);
                    $('#editModal').modal('show');  // Muestra el modal de edición
                })
                .catch(error => {
                    console.error('Error fetching local data:', error);
                });
        });
    });
}

// ---------------------------------------
// Función: Mostrar Formulario de Edición
// Descripción: Muestra el formulario de edición con los datos del local seleccionado.
// ---------------------------------------
function showEditFormLocales(localData) {
    document.getElementById('update_id_local').value = localData.FIDE_LOCALES_V_Id_local_PK;
    document.getElementById('update_nom_local').value = localData.V_Nom_local;
    document.getElementById('update_tel_local').value = localData.V_Tel_local;
    document.getElementById('update_direccion_local').value = localData.V_Direccion_local;
}

// ---------------------------------------
// Función: Actualizar una Entrada de Locales
// Descripción: Envía los datos actualizados del local al backend para modificar la base de datos.
// ---------------------------------------
async function updateLocal() {
    const id_local = document.getElementById('update_id_local')?.value;
    const nom_local = document.getElementById('update_nom_local')?.value;
    const tel_local = document.getElementById('update_tel_local')?.value;
    const direccion_local = document.getElementById('update_direccion_local')?.value;

    try {
        const response = await fetch(`http://127.0.0.1:5000/api/locales/${id_local}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nom_local,
                tel_local,
                direccion_local
            })
        });

        if (response.ok) {
            alert('Local actualizado exitosamente');
            fetchLocales();
            $('#editModal').modal('hide');  // Cierra el modal de edición
        } else {
            const errorData = await response.json();
            alert(`Error updating local: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Error updating local:', error);
        alert('Error updating local.');
    }
}

// ---------------------------------------
// Función: Borrar una Entrada de Locales
// Descripción: Cambia el estado del local a "INACTIVO" en la base de datos y oculta la entrada en la tabla.
// ---------------------------------------
async function deleteLocal(id_local) {
    if (!id_local) {
        alert('Por favor, ingresa el ID del local a eliminar.');
        return;
    }

    try {
        const response = await fetch(`http://127.0.0.1:5000/api/locales/${id_local}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert('Local eliminado exitosamente');
            fetchLocales();
        } else {
            const errorData = await response.json();
            alert(`Error deleting local: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Error deleting local:', error);
        alert('Error deleting local.');
    }
}

// ---------------------------------------
// Función: Abrir Modal de Crear Local
// ---------------------------------------
function openCreateModalLocales() {
    $('#createModal').modal('show');
}

// ---------------------------------------
// Ejecuta la función para cargar la tabla de locales al cargar la página
// ---------------------------------------
window.onload = fetchLocales;