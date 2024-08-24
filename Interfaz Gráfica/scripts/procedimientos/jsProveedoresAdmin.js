// TABLA PROVEEDORES

// ---------------------------------------
// Función: Crear una Nueva Entrada en Proveedores
// ---------------------------------------
async function createProveedor() {
    const nom_provedor = document.getElementById('create_nom_provedor')?.value;
    const correo_proveedor = document.getElementById('create_correo_proveedor')?.value;
    const producto_proveedor = document.getElementById('create_producto_proveedor')?.value;
    const tel_proveedor = document.getElementById('create_tel_proveedor')?.value;
    const direccion_proveedor = document.getElementById('create_direccion_proveedor')?.value;

    try {
        const response = await fetch('http://127.0.0.1:5000/api/proveedores', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nom_provedor,
                correo_proveedor,
                producto_proveedor,
                tel_proveedor,
                direccion_proveedor
            })
        });

        if (response.ok) {
            alert('Proveedor creado exitosamente');
            fetchProveedores();
            $('#createModal').modal('hide');  // Cierra el modal de crear proveedor
        } else {
            const errorData = await response.json();
            alert(`Error creating proveedor: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Error creating proveedor:', error);
        alert('Error creating proveedor.');
    }
}

// ---------------------------------------
// Función: Obtener Datos de la Tabla Proveedores
// Descripción: Trae la tabla completa de la base de datos y la muestra en una tabla con botones para editar y eliminar.
// ---------------------------------------
async function fetchProveedores() {
    try {
        const response = await fetch('http://127.0.0.1:5000/api/proveedores');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const table = document.getElementById('proveedores-table');
        if (table) {
            table.innerHTML = `
                <thead>
                    <tr>
                        <th>ID Proveedor</th>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Producto</th>
                        <th>Teléfono</th>
                        <th>Dirección</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            `;
            const tbody = table.querySelector('tbody');
            data.sort((a, b) => a.FIDE_PROVEEDORES_V_Id_proveedor_PK - b.FIDE_PROVEEDORES_V_Id_proveedor_PK); // Ordenar por ID ascendente
            data.forEach(row => {
                tbody.innerHTML += `
                    <tr>
                        <td>${row.FIDE_PROVEEDORES_V_Id_proveedor_PK}</td>
                        <td>${row.V_Nom_provedor}</td>
                        <td>${row.V_Correo_proveedor}</td>
                        <td>${row.V_Producto_proveedor}</td>
                        <td>${row.V_Tel_proveedor}</td>
                        <td>${row.V_Direccion_proveedor}</td>
                        <td>
                            <button class="btn btn-primary edit-btn" data-provider-id="${row.FIDE_PROVEEDORES_V_Id_proveedor_PK}">Editar</button>
                            <button class="btn btn-danger" onclick="deleteProveedor(${row.FIDE_PROVEEDORES_V_Id_proveedor_PK})">Eliminar</button>
                        </td>
                    </tr>
                `;
            });
            setupEditButtonsProveedores();
        }
    } catch (error) {
        console.error('Error fetching proveedores:', error);
    }
}

// ---------------------------------------
// Función: Configurar Botones de Edición
// Descripción: Añade eventos a los botones de editar para mostrar el formulario de edición con los datos del proveedor seleccionado.
// ---------------------------------------
function setupEditButtonsProveedores() {
    document.querySelectorAll('.edit-btn').forEach(button => {
        button.addEventListener('click', function () {
            const providerId = this.dataset.providerId;
            fetch(`http://127.0.0.1:5000/api/proveedores/${providerId}`)
                .then(response => response.json())
                .then(data => {
                    showEditFormProveedor(data);
                    $('#editModal').modal('show');  // Muestra el modal de edición
                })
                .catch(error => {
                    console.error('Error fetching provider data:', error);
                });
        });
    });
}

// ---------------------------------------
// Función: Mostrar Formulario de Edición
// Descripción: Muestra el formulario de edición con los datos del proveedor seleccionado.
// ---------------------------------------
function showEditFormProveedor(providerData) {
    document.getElementById('update_id_proveedor').value = providerData.FIDE_PROVEEDORES_V_Id_proveedor_PK;
    document.getElementById('update_nom_provedor').value = providerData.V_Nom_provedor;
    document.getElementById('update_correo_proveedor').value = providerData.V_Correo_proveedor;
    document.getElementById('update_producto_proveedor').value = providerData.V_Producto_proveedor;
    document.getElementById('update_tel_proveedor').value = providerData.V_Tel_proveedor;
    document.getElementById('update_direccion_proveedor').value = providerData.V_Direccion_proveedor;
}

// ---------------------------------------
// Función: Actualizar una Entrada de Proveedores
// Descripción: Envía los datos actualizados del proveedor al backend para modificar la base de datos.
// ---------------------------------------
async function updateProveedor() {
    const id_proveedor = document.getElementById('update_id_proveedor')?.value;
    const nom_provedor = document.getElementById('update_nom_provedor')?.value;
    const correo_proveedor = document.getElementById('update_correo_proveedor')?.value;
    const producto_proveedor = document.getElementById('update_producto_proveedor')?.value;
    const tel_proveedor = document.getElementById('update_tel_proveedor')?.value;
    const direccion_proveedor = document.getElementById('update_direccion_proveedor')?.value;

    try {
        const response = await fetch(`http://127.0.0.1:5000/api/proveedores/${id_proveedor}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nom_provedor,
                correo_proveedor,
                producto_proveedor,
                tel_proveedor,
                direccion_proveedor
            })
        });

        if (response.ok) {
            alert('Proveedor actualizado exitosamente');
            fetchProveedores();
            $('#editModal').modal('hide');  // Cierra el modal de edición
        } else {
            const errorData = await response.json();
            alert(`Error updating proveedor: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Error updating proveedor:', error);
        alert('Error updating proveedor.');
    }
}

// ---------------------------------------
// Función: Borrar una Entrada de Proveedores
// Descripción: Cambia el estado del proveedor a "INACTIVO" en la base de datos y oculta la entrada en la tabla.
// ---------------------------------------
async function deleteProveedor(id_proveedor) {
    if (!id_proveedor) {
        alert('Por favor, ingresa el ID del proveedor a eliminar.');
        return;
    }

    try {
        const response = await fetch(`http://127.0.0.1:5000/api/proveedores/${id_proveedor}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert('Proveedor eliminado exitosamente');
            fetchProveedores();
        } else {
            const errorData = await response.json();
            alert(`Error deleting proveedor: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Error deleting proveedor:', error);
        alert('Error deleting proveedor.');
    }
}

// ---------------------------------------
// Función: Abrir Modal de Crear Proveedor
// ---------------------------------------
function openCreateModalProveedor() {
    $('#createModal').modal('show');
}

// ---------------------------------------
// Función: Filtrar Proveedores
// Descripción: Filtra las entradas de la tabla proveedores basado en la categoría seleccionada y la entrada del campo de búsqueda.
// ---------------------------------------
function filterProveedores() {
    const searchCategory = document.getElementById('search-category').value.toLowerCase();
    const searchTerm = document.getElementById('search-bar').value.toLowerCase();
    const table = document.getElementById('proveedores-table');
    const rows = table.getElementsByTagName('tr');

    for (let i = 1; i < rows.length; i++) { 
        const cells = rows[i].getElementsByTagName('td');
        let match = false;

        if (searchCategory === 'id' && cells[0].innerText.toLowerCase().includes(searchTerm)) {
            match = true;
        } else if (searchCategory === 'nombre' && cells[1].innerText.toLowerCase().includes(searchTerm)) {
            match = true;
        } else if (searchCategory === 'correo' && cells[2].innerText.toLowerCase().includes(searchTerm)) {
            match = true;
        } else if (searchCategory === 'producto' && cells[3].innerText.toLowerCase().includes(searchTerm)) {
            match = true;
        }

        rows[i].style.display = match ? '' : 'none';
    }
}

// ---------------------------------------
// Ejecuta la función para cargar la tabla de proveedores al cargar la página
// ---------------------------------------
window.onload = fetchProveedores;