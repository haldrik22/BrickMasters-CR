// ---------------------------------------
// Función: Mostrar Formulario de Entrada
// ---------------------------------------
function showInputForm() {
    const tableSelect = document.getElementById('table-select');
    const inputFormContainer = document.getElementById('input-form-container');
    const catalogoTableDisplay = document.getElementById('catalogo-table');
    const localesTableDisplay = document.getElementById('locales-table');
    const clientesTableDisplay = document.getElementById('clientes-table');
    const productosTableDisplay = document.getElementById('productos-table');
    const proveedoresTableDisplay = document.getElementById('proveedores-table');
    const tipoDescuentoTableDisplay = document.getElementById('tipo_descuento-table');
    const descuentosTableDisplay = document.getElementById('descuentos-table');
    const proveedoresProductoTableDisplay = document.getElementById('proveedores_producto-table');
    const facturacionTableDisplay = document.getElementById('facturacion-table');
    const ventasTableDisplay = document.getElementById('ventas-table');

    // Oculta todas las tablas y botones de CRUD
    if (catalogoTableDisplay) catalogoTableDisplay.style.display = 'none';
    if (localesTableDisplay) localesTableDisplay.style.display = 'none';
    if (clientesTableDisplay) clientesTableDisplay.style.display = 'none';
    if (productosTableDisplay) productosTableDisplay.style.display = 'none';
    if (proveedoresTableDisplay) proveedoresTableDisplay.style.display = 'none';
    if (tipoDescuentoTableDisplay) tipoDescuentoTableDisplay.style.display = 'none';
    if (descuentosTableDisplay) descuentosTableDisplay.style.display = 'none';
    if (proveedoresProductoTableDisplay) proveedoresProductoTableDisplay.style.display = 'none';
    if (facturacionTableDisplay) facturacionTableDisplay.style.display = 'none';
    if (ventasTableDisplay) ventasTableDisplay.style.display = 'none';

    const catalogoButtons = document.getElementById('catalogo-buttons');
    const localesButtons = document.getElementById('locales-buttons');
    const clientesButtons = document.getElementById('clientes-buttons');
    const productosButtons = document.getElementById('productos-buttons');
    const proveedoresButtons = document.getElementById('proveedores-buttons');
    const tipoDescuentoButtons = document.getElementById('tipo_descuento-buttons');
    const descuentosButtons = document.getElementById('descuentos-buttons');
    const proveedoresProductoButtons = document.getElementById('proveedores_producto-buttons');
    const facturacionButtons = document.getElementById('facturacion-buttons');
    const ventasButtons = document.getElementById('ventas-buttons');

    if (catalogoButtons) catalogoButtons.style.display = 'none';
    if (localesButtons) localesButtons.style.display = 'none';
    if (clientesButtons) clientesButtons.style.display = 'none';
    if (productosButtons) productosButtons.style.display = 'none';
    if (proveedoresButtons) proveedoresButtons.style.display = 'none';
    if (tipoDescuentoButtons) tipoDescuentoButtons.style.display = 'none';
    if (descuentosButtons) descuentosButtons.style.display = 'none';
    if (proveedoresProductoButtons) proveedoresProductoButtons.style.display = 'none';
    if (facturacionButtons) facturacionButtons.style.display = 'none';
    if (ventasButtons) ventasButtons.style.display = 'none';

    if (tableSelect && tableSelect.value === 'catalogo') {
        fetchCatalogo();
        if (inputFormContainer) inputFormContainer.style.display = 'block';
        if (catalogoTableDisplay) catalogoTableDisplay.style.display = 'block';
        if (catalogoButtons) catalogoButtons.style.display = 'block';
    } else if (tableSelect && tableSelect.value === 'locales') {
        fetchLocales();
        if (inputFormContainer) inputFormContainer.style.display = 'block';
        if (localesTableDisplay) localesTableDisplay.style.display = 'block';
        if (localesButtons) localesButtons.style.display = 'block';
    } else if (tableSelect && tableSelect.value === 'clientes') {
        fetchClientes();
        if (inputFormContainer) inputFormContainer.style.display = 'block';
        if (clientesTableDisplay) clientesTableDisplay.style.display = 'block';
        if (clientesButtons) clientesButtons.style.display = 'block';
    } else if (tableSelect && tableSelect.value === 'productos') {
        fetchProductos();
        if (inputFormContainer) inputFormContainer.style.display = 'block';
        if (productosTableDisplay) productosTableDisplay.style.display = 'block';
        if (productosButtons) productosButtons.style.display = 'block';
    } else if (tableSelect && tableSelect.value === 'proveedores') {
        fetchProveedores();
        if (inputFormContainer) inputFormContainer.style.display = 'block';
        if (proveedoresTableDisplay) proveedoresTableDisplay.style.display = 'block';
        if (proveedoresButtons) proveedoresButtons.style.display = 'block';
    } else if (tableSelect && tableSelect.value === 'tipo_descuento') {
        fetchTipoDescuento();
        if (inputFormContainer) inputFormContainer.style.display = 'block';
        if (tipoDescuentoTableDisplay) tipoDescuentoTableDisplay.style.display = 'block';
        if (tipoDescuentoButtons) tipoDescuentoButtons.style.display = 'block';
    } else if (tableSelect && tableSelect.value === 'descuentos') {
        fetchDescuentos();
        if (inputFormContainer) inputFormContainer.style.display = 'block';
        if (descuentosTableDisplay) descuentosTableDisplay.style.display = 'block';
        if (descuentosButtons) descuentosButtons.style.display = 'block';
    } else if (tableSelect && tableSelect.value === 'proveedores_producto') {
        fetchProveedoresProducto();
        if (inputFormContainer) inputFormContainer.style.display = 'block';
        if (proveedoresProductoTableDisplay) proveedoresProductoTableDisplay.style.display = 'block';
        if (proveedoresProductoButtons) proveedoresProductoButtons.style.display = 'block';
    } else if (tableSelect && tableSelect.value === 'facturacion') {
        fetchFacturacion();
        if (inputFormContainer) inputFormContainer.style.display = 'block';
        if (facturacionTableDisplay) facturacionTableDisplay.style.display = 'block';
        if (facturacionButtons) facturacionButtons.style.display = 'block';
    } else if (tableSelect && tableSelect.value === 'ventas') {
        fetchVentas();
        if (inputFormContainer) inputFormContainer.style.display = 'block';
        if (ventasTableDisplay) ventasTableDisplay.style.display = 'block';
        if (ventasButtons) ventasButtons.style.display = 'block';
    } else {
        if (inputFormContainer) inputFormContainer.style.display = 'none';
        if (catalogoTableDisplay) catalogoTableDisplay.innerHTML = '<p>Selecciona una tabla para mostrar el formulario.</p>';
        if (localesTableDisplay) localesTableDisplay.innerHTML = '<p>Selecciona una tabla para mostrar el formulario.</p>';
        if (clientesTableDisplay) clientesTableDisplay.innerHTML = '<p>Selecciona una tabla para mostrar el formulario.</p>';
        if (productosTableDisplay) productosTableDisplay.innerHTML = '<p>Selecciona una tabla para mostrar el formulario.</p>';
        if (proveedoresTableDisplay) proveedoresTableDisplay.innerHTML = '<p>Selecciona una tabla para mostrar el formulario.</p>';
        if (tipoDescuentoTableDisplay) tipoDescuentoTableDisplay.innerHTML = '<p>Selecciona una tabla para mostrar el formulario.</p>';
        if (descuentosTableDisplay) descuentosTableDisplay.innerHTML = '<p>Selecciona una tabla para mostrar el formulario.</p>';
        if (proveedoresProductoTableDisplay) proveedoresProductoTableDisplay.innerHTML = '<p>Selecciona una tabla para mostrar el formulario.</p>';
        if (facturacionTableDisplay) facturacionTableDisplay.innerHTML = '<p>Selecciona una tabla para mostrar el formulario.</p>';
        if (ventasTableDisplay) ventasTableDisplay.innerHTML = '<p>Selecciona una tabla para mostrar el formulario.</p>';
    }
}

// ---------------------------------------
// Función: Mostrar Formulario Específico
// ---------------------------------------
function showForm(formId) {
    const forms = document.querySelectorAll('#input-form-container .form-container');
    forms.forEach(form => {
        form.style.display = 'none';
    });
    const selectedForm = document.getElementById(formId);
    if (selectedForm) {
        selectedForm.style.display = 'block';
    } else {
        console.error(`Form with ID ${formId} not found.`);
    }
}

// ----------------------------------------TABLAS----------------------------------------
// TABLA LOCALES
// ---------------------------------------
// Función: Obtener Datos de la Tabla Locales
// ---------------------------------------
async function fetchLocales() {
    try {
        const response = await fetch('http://localhost:5000/api/locales');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const table = document.getElementById('locales-table');
        if (table) {
            table.innerHTML = `
                <table>
                    <thead>
                        <tr>
                            <th>ID Local</th>
                            <th>Nombre Local</th>
                            <th>Teléfono Local</th>
                            <th>Dirección Local</th>
                            <th>Creado Por</th>
                            <th>Modificado Por</th>
                            <th>Fecha de Creación</th>
                            <th>Fecha de Modificación</th>
                            <th>Acción</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            `;
            const tbody = table.querySelector('tbody');
            data.forEach(row => {
                tbody.innerHTML += `
                    <tr>
                        <td>${row.FIDE_LOCALES_V_Id_local_PK}</td>
                        <td>${row.V_Nom_local}</td>
                        <td>${row.V_Tel_local}</td>
                        <td>${row.V_Direccion_local}</td>
                        <td>${row.V_Creado_por}</td>
                        <td>${row.V_Modificado_por}</td>
                        <td>${row.V_Fecha_de_creacion}</td>
                        <td>${row.V_Fecha_de_modificacion}</td>
                        <td>${row.V_Accion}</td>
                        <td>${row.V_Estado}</td>
                    </tr>
                `;
            });
        }
    } catch (error) {
        console.error('Error fetching locales:', error);
    }
}

// ---------------------------------------
// Función: Crear una Nueva Entrada en Locales
// ---------------------------------------
async function createLocal() {
    const id_local = document.getElementById('create_id_local')?.value;
    const nom_local = document.getElementById('create_nom_local')?.value;
    const tel_local = document.getElementById('create_tel_local')?.value;
    const direccion_local = document.getElementById('create_direccion_local')?.value;
    const creado_por = document.getElementById('create_local_creado_por')?.value;
    const fecha_creacion = document.getElementById('create_local_fecha_creacion')?.value;

    try {
        const response = await fetch('http://127.0.0.1:5000/api/locales', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id_local,
                nom_local,
                tel_local,
                direccion_local,
                creado_por,
                fecha_creacion
            })
        });

        if (response.ok) {
            alert('Local creado exitosamente');
            fetchLocales();
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
// Función: Leer una Entrada de Locales
// ---------------------------------------
async function readLocal() {
    const idLocal = document.getElementById('read_id_local').value;

    try {
        const response = await fetch(`http://127.0.0.1:5000/api/locales/${idLocal}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('API response:', data);

        const localTableContainer = document.getElementById('local-read-table');
        if (data.length > 0) {
            localTableContainer.innerHTML = '';

            const table = document.createElement('table');
            const thead = document.createElement('thead');
            const tbody = document.createElement('tbody');

            const columns = [
                'ID Local',
                'Nombre Local',
                'Teléfono Local',
                'Dirección Local',
                'Creado Por',
                'Modificado Por',
                'Fecha de Creación',
                'Fecha de Modificación',
                'Acción',
                'Estado'
            ];

            const headers = columns.map(column => {
                const th = document.createElement('th');
                th.textContent = column;
                return th;
            });

            const headerRow = document.createElement('tr');
            headers.forEach(th => headerRow.appendChild(th));
            thead.appendChild(headerRow);
            table.appendChild(thead);

            data.forEach(item => {
                const row = document.createElement('tr');

                const idCell = document.createElement('td');
                idCell.textContent = item.FIDE_LOCALES_V_ID_LOCAL_PK || '';
                row.appendChild(idCell);

                const nameCell = document.createElement('td');
                nameCell.textContent = item.V_NOM_LOCAL || '';
                row.appendChild(nameCell);

                const phoneCell = document.createElement('td');
                phoneCell.textContent = item.V_TEL_LOCAL || '';
                row.appendChild(phoneCell);

                const addressCell = document.createElement('td');
                addressCell.textContent = item.V_DIRECCION_LOCAL || '';
                row.appendChild(addressCell);

                const createdByCell = document.createElement('td');
                createdByCell.textContent = item.V_CREADO_POR || '';
                row.appendChild(createdByCell);

                const modifiedByCell = document.createElement('td');
                modifiedByCell.textContent = item.V_MODIFICADO_POR || '';
                row.appendChild(modifiedByCell);

                const creationDateCell = document.createElement('td');
                creationDateCell.textContent = item.V_FECHA_DE_CREACION || '';
                row.appendChild(creationDateCell);

                const modificationDateCell = document.createElement('td');
                modificationDateCell.textContent = item.V_FECHA_DE_MODIFICACION || '';
                row.appendChild(modificationDateCell);

                const actionCell = document.createElement('td');
                actionCell.textContent = item.V_ACCION || '';
                row.appendChild(actionCell);

                const statusCell = document.createElement('td');
                statusCell.textContent = item.V_ESTADO || '';
                row.appendChild(statusCell);

                tbody.appendChild(row);
            });

            table.appendChild(tbody);
            localTableContainer.appendChild(table);
        } else {
            localTableContainer.innerHTML = '<p>No se encontraron datos.</p>';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('local-read-table').innerHTML = `<p>Ocurrió un error al leer el local: ${error.message}</p>`;
    }
}

// ---------------------------------------
// Función: Actualizar una Entrada de Locales
// ---------------------------------------
async function updateLocal() {
    const id_local = document.getElementById('update_id_local')?.value;
    const nom_local = document.getElementById('update_nom_local')?.value;
    const tel_local = document.getElementById('update_tel_local')?.value;
    const direccion_local = document.getElementById('update_direccion_local')?.value;
    const modificado_por = document.getElementById('update_local_modificado_por')?.value;
    const fecha_modificacion = document.getElementById('update_local_fecha_modificacion')?.value;

    try {
        const response = await fetch(`http://127.0.0.1:5000/api/locales/${id_local}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nom_local,
                tel_local,
                direccion_local,
                modificado_por,
                fecha_modificacion
            })
        });

        if (response.ok) {
            alert('Local actualizado exitosamente');
            fetchLocales();
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
// ---------------------------------------
async function deleteLocal() {
    const id_local = document.getElementById('delete_id_local')?.value;

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

// TABLA CLIENTES

// ---------------------------------------
// Función: Crear una Nueva Entrada en Clientes
// ---------------------------------------
async function createCliente() {
    const nom_cliente = document.getElementById('create_nom_cliente')?.value;
    const ape_cliente = document.getElementById('create_ape_cliente')?.value;
    const correo_cliente = document.getElementById('create_correo_cliente')?.value;
    const tel_cliente = document.getElementById('create_tel_cliente')?.value;
    const direccion_cliente = document.getElementById('create_direccion_cliente')?.value;
    const password = document.getElementById('create_password_cliente')?.value;

    try {
        const response = await fetch('http://127.0.0.1:5000/api/clientes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nom_cliente,
                ape_cliente,
                correo_cliente,
                tel_cliente,
                direccion_cliente,
                password
            })
        });

        if (response.ok) {
            alert('Cliente creado exitosamente');
            fetchClientes();
            $('#createModal').modal('hide');  // Cierra el modal de crear cliente
        } else {
            const errorData = await response.json();
            alert(`Error creating cliente: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Error creating cliente:', error);
        alert('Error creating cliente.');
    }
}

// ---------------------------------------
// Función: Obtener Datos de la Tabla Clientes
// Descripción: Trae la tabla completa de la base de datos y la muestra en una tabla con botones para editar y eliminar.
// ---------------------------------------
async function fetchClientes() {
    try {
        const response = await fetch('http://127.0.0.1:5000/api/clientes');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const table = document.getElementById('clientes-table');
        if (table) {
            table.innerHTML = `
                <thead>
                    <tr>
                        <th>ID Cliente</th>
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
            data.sort((a, b) => a.FIDE_CLIENTES_V_Id_cliente_PK - b.FIDE_CLIENTES_V_Id_cliente_PK); // Ordenar por ID ascendente
            data.forEach(row => {
                tbody.innerHTML += `
                    <tr>
                        <td>${row.FIDE_CLIENTES_V_Id_cliente_PK}</td>
                        <td>${row.V_Nom_cliente}</td>
                        <td>${row.V_Ape_cliente}</td>
                        <td>${row.V_Correo_cliente}</td>
                        <td>${row.V_Tel_cliente}</td>
                        <td>${row.V_Direccion_cliente}</td>
                        <td>
                            <button class="btn btn-primary edit-btn" data-client-id="${row.FIDE_CLIENTES_V_Id_cliente_PK}">Editar</button>
                            <button class="btn btn-danger" onclick="deleteCliente(${row.FIDE_CLIENTES_V_Id_cliente_PK})">Eliminar</button>
                        </td>
                    </tr>
                `;
            });
            setupEditButtons();
        }
    } catch (error) {
        console.error('Error fetching clientes:', error);
    }
}

// ---------------------------------------
// Función: Configurar Botones de Edición
// Descripción: Añade eventos a los botones de editar para mostrar el formulario de edición con los datos del cliente seleccionado.
// ---------------------------------------
function setupEditButtons() {
    document.querySelectorAll('.edit-btn').forEach(button => {
        button.addEventListener('click', function () {
            const clientId = this.dataset.clientId;
            fetch(`http://127.0.0.1:5000/api/clientes/${clientId}`)
                .then(response => response.json())
                .then(data => {
                    showEditForm(data);
                    $('#editModal').modal('show');  // Muestra el modal de edición
                })
                .catch(error => {
                    console.error('Error fetching client data:', error);
                });
        });
    });
}

// ---------------------------------------
// Función: Mostrar Formulario de Edición
// Descripción: Muestra el formulario de edición con los datos del cliente seleccionado.
// ---------------------------------------
function showEditForm(clientData) {
    document.getElementById('update_id_cliente').value = clientData.FIDE_CLIENTES_V_Id_cliente_PK;
    document.getElementById('update_nom_cliente').value = clientData.V_Nom_cliente;
    document.getElementById('update_ape_cliente').value = clientData.V_Ape_cliente;
    document.getElementById('update_correo_cliente').value = clientData.V_Correo_cliente;
    document.getElementById('update_tel_cliente').value = clientData.V_Tel_cliente;
    document.getElementById('update_direccion_cliente').value = clientData.V_Direccion_cliente;
    document.getElementById('update_password_cliente').value = '';
}

// ---------------------------------------
// Función: Actualizar una Entrada de Clientes
// Descripción: Envía los datos actualizados del cliente al backend para modificar la base de datos.
// ---------------------------------------
async function updateCliente() {
    const id_cliente = document.getElementById('update_id_cliente')?.value;
    const nom_cliente = document.getElementById('update_nom_cliente')?.value;
    const ape_cliente = document.getElementById('update_ape_cliente')?.value;
    const correo_cliente = document.getElementById('update_correo_cliente')?.value;
    const tel_cliente = document.getElementById('update_tel_cliente')?.value;
    const direccion_cliente = document.getElementById('update_direccion_cliente')?.value;
    const password = document.getElementById('update_password_cliente')?.value || null;

    try {
        const response = await fetch(`http://127.0.0.1:5000/api/clientes/${id_cliente}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nom_cliente,
                ape_cliente,
                correo_cliente,
                tel_cliente,
                direccion_cliente,
                password
            })
        });

        if (response.ok) {
            alert('Cliente actualizado exitosamente');
            fetchClientes();
            $('#editModal').modal('hide');  // Cierra el modal de edición
        } else {
            const errorData = await response.json();
            alert(`Error updating cliente: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Error updating cliente:', error);
        alert('Error updating cliente.');
    }
}

// ---------------------------------------
// Función: Borrar una Entrada de Clientes
// Descripción: Cambia el estado del cliente a "INACTIVO" en la base de datos y oculta la entrada en la tabla.
// ---------------------------------------
async function deleteCliente(id_cliente) {
    if (!id_cliente) {
        alert('Por favor, ingresa el ID del cliente a eliminar.');
        return;
    }

    try {
        const response = await fetch(`http://127.0.0.1:5000/api/clientes/${id_cliente}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert('Cliente eliminado exitosamente');
            fetchClientes();
        } else {
            const errorData = await response.json();
            alert(`Error deleting cliente: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Error deleting cliente:', error);
        alert('Error deleting cliente.');
    }
}

// ---------------------------------------
// Función: Abrir Modal de Crear Cliente
// ---------------------------------------
function openCreateModal() {
    $('#createModal').modal('show');
}

// ---------------------------------------
// Función: Filtrar Clientes
// Descripción: Filtra las entradas de la tabla clientes basado en la categoría seleccionada y la entrada del campo de búsqueda.
// ---------------------------------------
function filterClientes() {
    const searchCategory = document.getElementById('search-category').value.toLowerCase();
    const searchTerm = document.getElementById('search-bar').value.toLowerCase();
    const table = document.getElementById('clientes-table');
    const rows = table.getElementsByTagName('tr');

    for (let i = 1; i < rows.length; i++) { // Start from 1 to skip header row
        const cells = rows[i].getElementsByTagName('td');
        let match = false;

        // Check the appropriate cell based on search category
        if (searchCategory === 'id' && cells[0].innerText.toLowerCase().includes(searchTerm)) {
            match = true;
        } else if (searchCategory === 'nombre' && cells[1].innerText.toLowerCase().includes(searchTerm)) {
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
// Ejecuta la función para cargar la tabla de clientes al cargar la página
// ---------------------------------------
window.onload = fetchClientes;


// TABLA PRODUCTOS
// ---------------------------------------
// Función: Obtener Datos de la Tabla Productos
// ---------------------------------------
async function fetchProductos() {
    try {
        const response = await fetch('http://localhost:5000/api/productos');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const table = document.getElementById('productos-table');
        if (table) {
            table.innerHTML = `
                <table>
                    <thead>
                        <tr>
                            <th>ID Producto</th>
                            <th>Nombre Producto</th>
                            <th>Piezas Producto</th>
                            <th>Precio Producto</th>
                            <th>Cantidad Producto</th>
                            <th>Descripción Producto</th>
                            <th>Creado Por</th>
                            <th>Modificado Por</th>
                            <th>Fecha de Creación</th>
                            <th>Fecha de Modificación</th>
                            <th>Acción</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            `;
            const tbody = table.querySelector('tbody');
            data.forEach(row => {
                tbody.innerHTML += `
                    <tr>
                        <td>${row.FIDE_PRODUCTOS_V_Id_producto_PK}</td>
                        <td>${row.V_Nom_producto}</td>
                        <td>${row.V_Piezas_producto}</td>
                        <td>${row.V_Precio_producto}</td>
                        <td>${row.V_Cantidad_producto}</td>
                        <td>${row.V_Descripcion_producto}</td>
                        <td>${row.V_Creado_por}</td>
                        <td>${row.V_Modificado_por}</td>
                        <td>${row.V_Fecha_de_creacion}</td>
                        <td>${row.V_Fecha_de_modificacion}</td>
                        <td>${row.V_Accion}</td>
                        <td>${row.V_Estado}</td>
                    </tr>
                `;
            });
        }
    } catch (error) {
        console.error('Error fetching productos:', error);
    }
}

// ---------------------------------------
// Función: Crear una Nueva Entrada en Productos
// ---------------------------------------
async function createProducto() {
    const id_producto = document.getElementById('create_id_producto_producto').value;
    const nom_producto = document.getElementById('create_nom_producto_producto').value;
    const piezas_producto = document.getElementById('create_piezas_producto_producto').value;
    const precio_producto = document.getElementById('create_precio_producto_producto').value;
    const cantidad_producto = document.getElementById('create_cantidad_producto_producto').value;
    const descripcion_producto = document.getElementById('create_descripcion_producto_producto').value;
    const creado_por = document.getElementById('create_producto_creado_por').value;
    const fecha_creacion = document.getElementById('create_producto_fecha_creacion').value;

    try {
        const response = await fetch('http://127.0.0.1:5000/api/productos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id_producto,
                nom_producto,
                piezas_producto,
                precio_producto,
                cantidad_producto,
                descripcion_producto,
                creado_por,
                fecha_creacion
            })
        });

        if (response.ok) {
            alert('Producto creado exitosamente');
            fetchProductos();
        } else {
            const errorData = await response.json();
            alert(`Error creating producto: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Error creating producto:', error);
        alert('Error creating producto.');
    }
}

// ---------------------------------------
// Función: Leer una Entrada de Productos
// ---------------------------------------
async function readProducto() {
    const id_producto = document.getElementById('read_id_producto_producto').value;

    try {
        const response = await fetch(`http://127.0.0.1:5000/api/productos/${id_producto}`, {
            method: 'GET'
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('API response:', data);

        const productoTableContainer = document.getElementById('producto-read-table');
        if (data.length > 0) {
            productoTableContainer.innerHTML = '';

            const table = document.createElement('table');
            const thead = document.createElement('thead');
            const tbody = document.createElement('tbody');

            const columns = [
                'ID Producto',
                'Nombre Producto',
                'Piezas Producto',
                'Precio Producto',
                'Cantidad Producto',
                'Descripción Producto',
                'Creado Por',
                'Modificado Por',
                'Fecha de Creación',
                'Fecha de Modificación',
                'Acción',
                'Estado'
            ];

            const headers = columns.map(column => {
                const th = document.createElement('th');
                th.textContent = column;
                return th;
            });

            const headerRow = document.createElement('tr');
            headers.forEach(th => headerRow.appendChild(th));
            thead.appendChild(headerRow);
            table.appendChild(thead);

            data.forEach(item => {
                const row = document.createElement('tr');

                const idCell = document.createElement('td');
                idCell.textContent = item.FIDE_PRODUCTOS_V_ID_PRODUCTO_PK || '';
                row.appendChild(idCell);

                const nameCell = document.createElement('td');
                nameCell.textContent = item.V_NOM_PRODUCTO || '';
                row.appendChild(nameCell);

                const piecesCell = document.createElement('td');
                piecesCell.textContent = item.V_PIEZAS_PRODUCTO || '';
                row.appendChild(piecesCell);

                const priceCell = document.createElement('td');
                priceCell.textContent = item.V_PRECIO_PRODUCTO || '';
                row.appendChild(priceCell);

                const quantityCell = document.createElement('td');
                quantityCell.textContent = item.V_CANTIDAD_PRODUCTO || '';
                row.appendChild(quantityCell);

                const descriptionCell = document.createElement('td');
                descriptionCell.textContent = item.V_DESCRIPCION_PRODUCTO || '';
                row.appendChild(descriptionCell);

                const createdByCell = document.createElement('td');
                createdByCell.textContent = item.V_CREADO_POR || '';
                row.appendChild(createdByCell);

                const modifiedByCell = document.createElement('td');
                modifiedByCell.textContent = item.V_MODIFICADO_POR || '';
                row.appendChild(modifiedByCell);

                const creationDateCell = document.createElement('td');
                creationDateCell.textContent = item.V_FECHA_DE_CREACION || '';
                row.appendChild(creationDateCell);

                const modificationDateCell = document.createElement('td');
                modificationDateCell.textContent = item.V_FECHA_DE_MODIFICACION || '';
                row.appendChild(modificationDateCell);

                const actionCell = document.createElement('td');
                actionCell.textContent = item.V_ACCION || '';
                row.appendChild(actionCell);

                const statusCell = document.createElement('td');
                statusCell.textContent = item.V_ESTADO || '';
                row.appendChild(statusCell);

                tbody.appendChild(row);
            });

            table.appendChild(tbody);
            productoTableContainer.appendChild(table);
        } else {
            productoTableContainer.innerHTML = '<p>No se encontraron datos.</p>';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('producto-read-table').innerHTML = `<p>Ocurrió un error al leer el producto: ${error.message}</p>`;
    }
}

// ---------------------------------------
// Función: Actualizar una Entrada de Productos
// ---------------------------------------
async function updateProducto() {
    const id_producto = document.getElementById('update_id_producto_producto')?.value;
    const nom_producto = document.getElementById('update_nom_producto_producto')?.value;
    const piezas_producto = document.getElementById('update_piezas_producto_producto')?.value;
    const precio_producto = document.getElementById('update_precio_producto_producto')?.value;
    const cantidad_producto = document.getElementById('update_cantidad_producto_producto')?.value;
    const descripcion_producto = document.getElementById('update_descripcion_producto_producto')?.value;
    const modificado_por = document.getElementById('update_producto_modificado_por')?.value;
    const fecha_modificacion = document.getElementById('update_producto_fecha_modificacion')?.value;

    try {
        const response = await fetch(`http://127.0.0.1:5000/api/productos/${id_producto}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nom_producto,
                piezas_producto,
                precio_producto,
                cantidad_producto,
                descripcion_producto,
                modificado_por,
                fecha_modificacion
            })
        });

        if (response.ok) {
            alert('Producto actualizado exitosamente');
            fetchProductos();
        } else {
            const errorData = await response.json();
            alert(`Error updating producto: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Error updating producto:', error);
        alert('Error updating producto.');
    }
}

// ---------------------------------------
// Función: Borrar una Entrada de Productos
// ---------------------------------------
async function deleteProducto() {
    const id_producto = document.getElementById('delete_id_producto_producto')?.value;

    if (!id_producto) {
        alert('Por favor, ingresa el ID del producto a eliminar.');
        return;
    }

    try {
        const response = await fetch(`http://127.0.0.1:5000/api/productos/${id_producto}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert('Producto eliminado exitosamente');
            fetchProductos();
        } else {
            const errorData = await response.json();
            alert(`Error deleting producto: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Error deleting producto:', error);
        alert('Error deleting producto.');
    }
}

// ---------------------------------------
// TABLA PROVEEDORES
// ---------------------------------------
// Función: Obtener Datos de la Tabla Proveedores
// ---------------------------------------
async function fetchProveedores() {
    try {
        const response = await fetch('http://localhost:5000/api/proveedores');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const table = document.getElementById('proveedores-table');
        if (table) {
            table.innerHTML = `
                <table>
                    <thead>
                        <tr>
                            <th>ID Proveedor</th>
                            <th>Nombre Proveedor</th>
                            <th>Correo Proveedor</th>
                            <th>Producto Proveedor</th>
                            <th>Teléfono Proveedor</th>
                            <th>Dirección Proveedor</th>
                            <th>Creado Por</th>
                            <th>Modificado Por</th>
                            <th>Fecha de Creación</th>
                            <th>Fecha de Modificación</th>
                            <th>Acción</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            `;
            const tbody = table.querySelector('tbody');
            data.forEach(row => {
                tbody.innerHTML += `
                    <tr>
                        <td>${row.FIDE_PROVEEDORES_V_Id_proveedor_PK}</td>
                        <td>${row.V_Nom_provedor}</td>
                        <td>${row.V_Correo_proveedor}</td>
                        <td>${row.V_Producto_proveedor}</td>
                        <td>${row.V_Tel_proveedor}</td>
                        <td>${row.V_Direccion_proveedor}</td>
                        <td>${row.V_Creado_por}</td>
                        <td>${row.V_Modificado_por}</td>
                        <td>${row.V_Fecha_de_creacion}</td>
                        <td>${row.V_Fecha_de_modificacion}</td>
                        <td>${row.V_Accion}</td>
                        <td>${row.V_Estado}</td>
                    </tr>
                `;
            });
        }
    } catch (error) {
        console.error('Error fetching proveedores:', error);
    }
}

// ---------------------------------------
// Función: Crear una Nueva Entrada en Proveedores
// ---------------------------------------
async function createProveedor() {
    const id_proveedor = document.getElementById('create_id_proveedor').value;
    const nom_provedor = document.getElementById('create_nom_provedor').value;
    const correo_proveedor = document.getElementById('create_correo_proveedor').value;
    const producto_proveedor = document.getElementById('create_producto_proveedor').value;
    const tel_proveedor = document.getElementById('create_tel_proveedor').value;
    const direccion_proveedor = document.getElementById('create_direccion_proveedor').value;
    const creado_por = document.getElementById('create_creado_por_proveedor').value;
    const fecha_creacion = document.getElementById('create_fecha_creacion_proveedor').value;

    try {
        const response = await fetch('http://127.0.0.1:5000/api/proveedores', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id_proveedor,
                nom_provedor,
                correo_proveedor,
                producto_proveedor,
                tel_proveedor,
                direccion_proveedor,
                creado_por,
                fecha_creacion
            })
        });

        if (response.ok) {
            alert('Proveedor creado exitosamente');
            fetchProveedores();
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
// Función: Leer una Entrada de Proveedores
// ---------------------------------------
async function readProveedor() {
    const id_proveedor = document.getElementById('read_id_proveedor').value;

    try {
        const response = await fetch(`http://127.0.0.1:5000/api/proveedores/${id_proveedor}`, {
            method: 'GET'
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('API response:', data);

        const proveedorTableContainer = document.getElementById('proveedor-read-table');
        if (data.length > 0) {
            proveedorTableContainer.innerHTML = '';

            const table = document.createElement('table');
            const thead = document.createElement('thead');
            const tbody = document.createElement('tbody');

            const columns = [
                'ID Proveedor',
                'Nombre Proveedor',
                'Correo Proveedor',
                'Producto Proveedor',
                'Teléfono Proveedor',
                'Dirección Proveedor',
                'Creado Por',
                'Modificado Por',
                'Fecha de Creación',
                'Fecha de Modificación',
                'Acción',
                'Estado'
            ];

            const headers = columns.map(column => {
                const th = document.createElement('th');
                th.textContent = column;
                return th;
            });

            const headerRow = document.createElement('tr');
            headers.forEach(th => headerRow.appendChild(th));
            thead.appendChild(headerRow);
            table.appendChild(thead);

            data.forEach(item => {
                const row = document.createElement('tr');

                const idCell = document.createElement('td');
                idCell.textContent = item.FIDE_PROVEEDORES_V_ID_PROVEEDOR_PK || '';
                row.appendChild(idCell);

                const nameCell = document.createElement('td');
                nameCell.textContent = item.V_NOM_PROVEDOR || '';
                row.appendChild(nameCell);

                const emailCell = document.createElement('td');
                emailCell.textContent = item.V_CORREO_PROVEEDOR || '';
                row.appendChild(emailCell);

                const productCell = document.createElement('td');
                productCell.textContent = item.V_PRODUCTO_PROVEEDOR || '';
                row.appendChild(productCell);

                const phoneCell = document.createElement('td');
                phoneCell.textContent = item.V_TEL_PROVEEDOR || '';
                row.appendChild(phoneCell);

                const addressCell = document.createElement('td');
                addressCell.textContent = item.V_DIRECCION_PROVEEDOR || '';
                row.appendChild(addressCell);

                const createdByCell = document.createElement('td');
                createdByCell.textContent = item.V_CREADO_POR || '';
                row.appendChild(createdByCell);

                const modifiedByCell = document.createElement('td');
                modifiedByCell.textContent = item.V_MODIFICADO_POR || '';
                row.appendChild(modifiedByCell);

                const creationDateCell = document.createElement('td');
                creationDateCell.textContent = item.V_FECHA_DE_CREACION || '';
                row.appendChild(creationDateCell);

                const modificationDateCell = document.createElement('td');
                modificationDateCell.textContent = item.V_FECHA_DE_MODIFICACION || '';
                row.appendChild(modificationDateCell);

                const actionCell = document.createElement('td');
                actionCell.textContent = item.V_ACCION || '';
                row.appendChild(actionCell);

                const statusCell = document.createElement('td');
                statusCell.textContent = item.V_ESTADO || '';
                row.appendChild(statusCell);

                tbody.appendChild(row);
            });

            table.appendChild(tbody);
            proveedorTableContainer.appendChild(table);
        } else {
            proveedorTableContainer.innerHTML = '<p>No se encontraron datos.</p>';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('proveedor-read-table').innerHTML = `<p>Ocurrió un error al leer el proveedor: ${error.message}</p>`;
    }
}

// ---------------------------------------
// Función: Actualizar una Entrada de Proveedores
// ---------------------------------------
async function updateProveedor() {
    const id_proveedor = document.getElementById('update_id_proveedor').value;
    const nom_provedor = document.getElementById('update_nom_provedor').value;
    const correo_proveedor = document.getElementById('update_correo_proveedor').value;
    const producto_proveedor = document.getElementById('update_producto_proveedor').value;
    const tel_proveedor = document.getElementById('update_tel_proveedor').value;
    const direccion_proveedor = document.getElementById('update_direccion_proveedor').value;
    const modificado_por = document.getElementById('update_modificado_por_proveedor').value;
    const fecha_modificacion = document.getElementById('update_fecha_modificacion_proveedor').value;

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
                direccion_proveedor,
                modificado_por,
                fecha_modificacion
            })
        });

        if (response.ok) {
            alert('Proveedor actualizado exitosamente');
            fetchProveedores();
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
// ---------------------------------------
async function deleteProveedor() {
    const id_proveedor = document.getElementById('delete_id_proveedor').value;

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
// Función: Obtener Datos de la Tabla Tipo Descuento
// ---------------------------------------
async function fetchTipoDescuento() {
    try {
        const response = await fetch('http://localhost:5000/api/tipo_descuento');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const table = document.getElementById('tipo_descuento-table');
        if (table) {
            table.innerHTML = `
                <table>
                    <thead>
                        <tr>
                            <th>ID Tipo Descuento</th>
                            <th>ID Cliente</th>
                            <th>Porcentaje Descuento</th>
                            <th>Creado Por</th>
                            <th>Modificado Por</th>
                            <th>Fecha de Creación</th>
                            <th>Fecha de Modificación</th>
                            <th>Acción</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            `;
            const tbody = table.querySelector('tbody');
            data.forEach(row => {
                tbody.innerHTML += `
                    <tr>
                        <td>${row.FIDE_TIPO_DESCUENTO_V_ID_TIPO_DESCUENTO_PK}</td>
                        <td>${row.FIDE_TIPO_DESCUENTO_V_ID_CLIENTE_FK}</td>
                        <td>${row.V_PORCENTAJE_DESCUENTO}</td>
                        <td>${row.V_CREADO_POR}</td>
                        <td>${row.V_MODIFICADO_POR}</td>
                        <td>${row.V_FECHA_DE_CREACION}</td>
                        <td>${row.V_FECHA_DE_MODIFICACION}</td>
                        <td>${row.V_ACCION}</td>
                        <td>${row.V_ESTADO}</td>
                    </tr>
                `;
            });
        }
    } catch (error) {
        console.error('Error fetching tipo descuento:', error);
    }
}

// ---------------------------------------
// Función: Crear una Nueva Entrada en Tipo Descuento
// ---------------------------------------
async function createTipoDescuento() {
    const id_tipo_descuento = document.getElementById('create_id_tipo_descuento').value;
    const id_cliente = document.getElementById('create_id_cliente_tipo_descuento').value;
    const porcentaje_descuento = document.getElementById('create_porcentaje_descuento').value;
    const creado_por = document.getElementById('create_tipo_descuento_creado_por').value;
    const fecha_creacion = document.getElementById('create_tipo_descuento_fecha_creacion').value;

    try {
        const response = await fetch('http://127.0.0.1:5000/api/tipo_descuento', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id_tipo_descuento,
                id_cliente,
                porcentaje_descuento,
                creado_por,
                fecha_creacion
            })
        });

        if (response.ok) {
            alert('Tipo Descuento creado exitosamente');
            fetchTipoDescuento();
        } else {
            const errorData = await response.json();
            alert(`Error creating tipo descuento: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Error creating tipo descuento:', error);
        alert('Error creating tipo descuento.');
    }
}

// ---------------------------------------
// Función: Leer una Entrada de Tipo Descuento
// ---------------------------------------
async function readTipoDescuento() {
    const idTipoDescuento = document.getElementById('read_id_tipo_descuento').value;

    try {
        const response = await fetch(`http://127.0.0.1:5000/api/tipo_descuento/${idTipoDescuento}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('API response:', data);

        const tipoDescuentoTableContainer = document.getElementById('tipo_descuento-read-table');
        if (data.length > 0) {
            tipoDescuentoTableContainer.innerHTML = '';

            const table = document.createElement('table');
            const thead = document.createElement('thead');
            const tbody = document.createElement('tbody');

            const columns = [
                'ID Tipo Descuento',
                'ID Cliente',
                'Porcentaje Descuento',
                'Creado Por',
                'Modificado Por',
                'Fecha de Creación',
                'Fecha de Modificación',
                'Acción',
                'Estado'
            ];

            const headers = columns.map(column => {
                const th = document.createElement('th');
                th.textContent = column;
                return th;
            });

            const headerRow = document.createElement('tr');
            headers.forEach(th => headerRow.appendChild(th));
            thead.appendChild(headerRow);
            table.appendChild(thead);

            data.forEach(item => {
                const row = document.createElement('tr');

                const idCell = document.createElement('td');
                idCell.textContent = item.FIDE_TIPO_DESCUENTO_V_ID_TIPO_DESCUENTO_PK || '';
                row.appendChild(idCell);

                const idClienteCell = document.createElement('td');
                idClienteCell.textContent = item.FIDE_TIPO_DESCUENTO_V_ID_CLIENTE_FK || '';
                row.appendChild(idClienteCell);

                const porcentajeCell = document.createElement('td');
                porcentajeCell.textContent = item.V_PORCENTAJE_DESCUENTO || '';
                row.appendChild(porcentajeCell);

                const creadoPorCell = document.createElement('td');
                creadoPorCell.textContent = item.V_CREADO_POR || '';
                row.appendChild(creadoPorCell);

                const modificadoPorCell = document.createElement('td');
                modificadoPorCell.textContent = item.V_MODIFICADO_POR || '';
                row.appendChild(modificadoPorCell);

                const fechaCreacionCell = document.createElement('td');
                fechaCreacionCell.textContent = item.V_FECHA_DE_CREACION || '';
                row.appendChild(fechaCreacionCell);

                const fechaModificacionCell = document.createElement('td');
                fechaModificacionCell.textContent = item.V_FECHA_DE_MODIFICACION || '';
                row.appendChild(fechaModificacionCell);

                const accionCell = document.createElement('td');
                accionCell.textContent = item.V_ACCION || '';
                row.appendChild(accionCell);

                const estadoCell = document.createElement('td');
                estadoCell.textContent = item.V_ESTADO || '';
                row.appendChild(estadoCell);

                tbody.appendChild(row);
            });

            table.appendChild(tbody);
            tipoDescuentoTableContainer.appendChild(table);
        } else {
            tipoDescuentoTableContainer.innerHTML = '<p>No se encontraron datos.</p>';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('tipo_descuento-read-table').innerHTML = `<p>Ocurrió un error al leer el tipo descuento: ${error.message}</p>`;
    }
}

// ---------------------------------------
// Función: Actualizar una Entrada de Tipo Descuento
// ---------------------------------------
async function updateTipoDescuento() {
    const id_tipo_descuento = document.getElementById('update_id_tipo_descuento').value;
    const id_cliente = document.getElementById('update_id_cliente_tipo_descuento').value;
    const porcentaje_descuento = document.getElementById('update_porcentaje_descuento').value;
    const modificado_por = document.getElementById('update_modificado_por_tipo_descuento').value;
    const fecha_modificacion = document.getElementById('update_fecha_modificacion_tipo_descuento').value;

    try {
        const response = await fetch(`http://127.0.0.1:5000/api/tipo_descuento/${id_tipo_descuento}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id_cliente,
                porcentaje_descuento,
                modificado_por,
                fecha_modificacion
            })
        });

        if (response.ok) {
            alert('Tipo Descuento actualizado exitosamente');
            fetchTipoDescuento();
        } else {
            const errorData = await response.json();
            alert(`Error updating tipo descuento: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Error updating tipo descuento:', error);
        alert('Error updating tipo descuento.');
    }
}

// ---------------------------------------
// Función: Borrar una Entrada de Tipo Descuento
// ---------------------------------------
async function deleteTipoDescuento() {
    const id_tipo_descuento = document.getElementById('delete_id_tipo_descuento')?.value;

    if (!id_tipo_descuento) {
        alert('Por favor, ingresa el ID del tipo descuento a eliminar.');
        return;
    }

    try {
        const response = await fetch(`http://127.0.0.1:5000/api/tipo_descuento/${id_tipo_descuento}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert('Tipo Descuento eliminado exitosamente');
            fetchTipoDescuento();
        } else {
            const errorData = await response.json();
            alert(`Error deleting tipo descuento: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Error deleting tipo descuento:', error);
        alert('Error deleting tipo descuento.');
    }
}

// ---------------------------------------
// Función: Obtener Datos de la Tabla Descuentos
// ---------------------------------------
async function fetchDescuentos() {
    try {
        const response = await fetch('http://localhost:5000/api/descuentos');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const table = document.getElementById('descuentos-table');
        if (table) {
            table.innerHTML = `
                <table>
                    <thead>
                        <tr>
                            <th>ID Descuento</th>
                            <th>ID Cliente</th>
                            <th>ID Tipo Descuento</th>
                            <th>Creado Por</th>
                            <th>Modificado Por</th>
                            <th>Fecha de Creación</th>
                            <th>Fecha de Modificación</th>
                            <th>Acción</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            `;
            const tbody = table.querySelector('tbody');
            data.forEach(row => {
                tbody.innerHTML += `
                    <tr>
                        <td>${row.FIDE_DESCUENTOS_V_ID_DESCUENTO_PK}</td>
                        <td>${row.FIDE_DESCUENTOS_V_ID_CLIENTE_FK}</td>
                        <td>${row.FIDE_DESCUENTOS_V_ID_TIPO_DESCUENTO_FK}</td>
                        <td>${row.V_CREADO_POR}</td>
                        <td>${row.V_MODIFICADO_POR}</td>
                        <td>${row.V_FECHA_DE_CREACION}</td>
                        <td>${row.V_FECHA_DE_MODIFICACION}</td>
                        <td>${row.V_ACCION}</td>
                        <td>${row.V_ESTADO}</td>
                    </tr>
                `;
            });
        }
    } catch (error) {
        console.error('Error fetching descuentos:', error);
    }
}

// ---------------------------------------
// Función: Crear una Nueva Entrada en Descuentos
// ---------------------------------------
async function createDescuentos() {
    const id_descuento = document.getElementById('create_id_descuento').value;
    const id_cliente = document.getElementById('create_id_cliente_descuentos').value;
    const id_tipo_descuento = document.getElementById('create_id_tipo_descuento_descuentos').value;
    const creado_por = document.getElementById('create_descuentos_creado_por').value;
    const fecha_creacion = document.getElementById('create_descuentos_fecha_creacion').value;

    try {
        const response = await fetch('http://127.0.0.1:5000/api/descuentos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id_descuento,
                id_cliente,
                id_tipo_descuento,
                creado_por,
                fecha_creacion
            })
        });

        if (response.ok) {
            alert('Descuentos creado exitosamente');
            fetchDescuentos();
        } else {
            const errorData = await response.json();
            alert(`Error creating descuentos: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Error creating descuentos:', error);
        alert('Error creating descuentos.');
    }
}

// ---------------------------------------
// Función: Leer una Entrada de Descuentos
// ---------------------------------------
async function readDescuentos() {
    const idDescuento = document.getElementById('read_id_descuento').value;

    try {
        const response = await fetch(`http://127.0.0.1:5000/api/descuentos/${idDescuento}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('API response:', data);

        const descuentosTableContainer = document.getElementById('descuentos-read-table');
        if (data.length > 0) {
            descuentosTableContainer.innerHTML = '';

            const table = document.createElement('table');
            const thead = document.createElement('thead');
            const tbody = document.createElement('tbody');

            const columns = [
                'ID Descuento',
                'ID Cliente',
                'ID Tipo Descuento',
                'Creado Por',
                'Modificado Por',
                'Fecha de Creación',
                'Fecha de Modificación',
                'Acción',
                'Estado'
            ];

            const headers = columns.map(column => {
                const th = document.createElement('th');
                th.textContent = column;
                return th;
            });

            const headerRow = document.createElement('tr');
            headers.forEach(th => headerRow.appendChild(th));
            thead.appendChild(headerRow);
            table.appendChild(thead);

            data.forEach(item => {
                const row = document.createElement('tr');

                const idCell = document.createElement('td');
                idCell.textContent = item.FIDE_DESCUENTOS_V_ID_DESCUENTO_PK || '';
                row.appendChild(idCell);

                const idClienteCell = document.createElement('td');
                idClienteCell.textContent = item.FIDE_DESCUENTOS_V_ID_CLIENTE_FK || '';
                row.appendChild(idClienteCell);

                const idTipoDescuentoCell = document.createElement('td');
                idTipoDescuentoCell.textContent = item.FIDE_DESCUENTOS_V_ID_TIPO_DESCUENTO_FK || '';
                row.appendChild(idTipoDescuentoCell);

                const creadoPorCell = document.createElement('td');
                creadoPorCell.textContent = item.V_CREADO_POR || '';
                row.appendChild(creadoPorCell);

                const modificadoPorCell = document.createElement('td');
                modificadoPorCell.textContent = item.V_MODIFICADO_POR || '';
                row.appendChild(modificadoPorCell);

                const fechaCreacionCell = document.createElement('td');
                fechaCreacionCell.textContent = item.V_FECHA_DE_CREACION || '';
                row.appendChild(fechaCreacionCell);

                const fechaModificacionCell = document.createElement('td');
                fechaModificacionCell.textContent = item.V_FECHA_DE_MODIFICACION || '';
                row.appendChild(fechaModificacionCell);

                const accionCell = document.createElement('td');
                accionCell.textContent = item.V_ACCION || '';
                row.appendChild(accionCell);

                const estadoCell = document.createElement('td');
                estadoCell.textContent = item.V_ESTADO || '';
                row.appendChild(estadoCell);

                tbody.appendChild(row);
            });

            table.appendChild(tbody);
            descuentosTableContainer.appendChild(table);
        } else {
            descuentosTableContainer.innerHTML = '<p>No se encontraron datos.</p>';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('descuentos-read-table').innerHTML = `<p>Ocurrió un error al leer el descuentos: ${error.message}</p>`;
    }
}

// ---------------------------------------
// Función: Actualizar una Entrada de Descuentos
// ---------------------------------------
async function updateDescuentos() {
    const id_descuento = document.getElementById('update_id_descuento').value;
    const id_cliente = document.getElementById('update_id_cliente_descuentos').value;
    const id_tipo_descuento = document.getElementById('update_id_tipo_descuento_descuentos').value;
    const modificado_por = document.getElementById('update_modificado_por_descuentos').value;
    const fecha_modificacion = document.getElementById('update_fecha_modificacion_descuentos').value;

    try {
        const response = await fetch(`http://127.0.0.1:5000/api/descuentos/${id_descuento}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id_cliente,
                id_tipo_descuento,
                modificado_por,
                fecha_modificacion
            })
        });

        if (response.ok) {
            alert('Descuentos actualizado exitosamente');
            fetchDescuentos();
        } else {
            const errorData = await response.json();
            alert(`Error updating descuentos: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Error updating descuentos:', error);
        alert('Error updating descuentos.');
    }
}

// ---------------------------------------
// Función: Borrar una Entrada de Descuentos
// ---------------------------------------
async function deleteDescuentos() {
    const id_descuento = document.getElementById('delete_id_descuento')?.value;

    if (!id_descuento) {
        alert('Por favor, ingresa el ID del descuentos a eliminar.');
        return;
    }

    try {
        const response = await fetch(`http://127.0.0.1:5000/api/descuentos/${id_descuento}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert('Descuentos eliminado exitosamente');
            fetchDescuentos();
        } else {
            const errorData = await response.json();
            alert(`Error deleting descuentos: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Error deleting descuentos:', error);
        alert('Error deleting descuentos.');
    }
}

// ---------------------------------------
// Función: Obtener Datos de la Tabla Proveedores Producto
// ---------------------------------------
async function fetchProveedoresProducto() {
    try {
        const response = await fetch('http://localhost:5000/api/proveedores_producto');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const table = document.getElementById('proveedores_producto-table');
        if (table) {
            table.innerHTML = `
                <table>
                    <thead>
                        <tr>
                            <th>ID Proveedor</th>
                            <th>ID Producto</th>
                            <th>Creado Por</th>
                            <th>Modificado Por</th>
                            <th>Fecha de Creación</th>
                            <th>Fecha de Modificación</th>
                            <th>Acción</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            `;
            const tbody = table.querySelector('tbody');
            data.forEach(row => {
                tbody.innerHTML += `
                    <tr>
                        <td>${row.FIDE_PROVEEDORES_PRODUCTO_V_ID_PROVEEDOR_FK}</td>
                        <td>${row.FIDE_PROVEEDORES_PRODUCTO_V_ID_PRODUCTO_FK}</td>
                        <td>${row.V_CREADO_POR}</td>
                        <td>${row.V_MODIFICADO_POR}</td>
                        <td>${row.V_FECHA_DE_CREACION}</td>
                        <td>${row.V_FECHA_DE_MODIFICACION}</td>
                        <td>${row.V_ACCION}</td>
                        <td>${row.V_ESTADO}</td>
                    </tr>
                `;
            });
        }
    } catch (error) {
        console.error('Error fetching proveedores producto:', error);
    }
}

// ---------------------------------------
// Función: Crear una Nueva Entrada en Proveedores Producto
// ---------------------------------------
async function createProveedoresProducto() {
    const id_proveedor = document.getElementById('create_id_proveedor').value;
    const id_producto = document.getElementById('create_id_producto').value;
    const creado_por = document.getElementById('create_proveedores_producto_creado_por').value;
    const fecha_creacion = document.getElementById('create_proveedores_producto_fecha_creacion').value;

    try {
        const response = await fetch('http://127.0.0.1:5000/api/proveedores_producto', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id_proveedor,
                id_producto,
                creado_por,
                fecha_creacion
            })
        });

        if (response.ok) {
            alert('Proveedores Producto creado exitosamente');
            fetchProveedoresProducto();
        } else {
            const errorData = await response.json();
            alert(`Error creating proveedores producto: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Error creating proveedores producto:', error);
        alert('Error creating proveedores producto.');
    }
}

// ---------------------------------------
// Función: Leer una Entrada de Proveedores Producto
// ---------------------------------------
async function readProveedoresProducto() {
    const idProveedor = document.getElementById('read_id_proveedor').value;
    const idProducto = document.getElementById('read_id_producto').value;

    try {
        const response = await fetch(`http://127.0.0.1:5000/api/proveedores_producto/${idProveedor}/${idProducto}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('API response:', data);

        const proveedoresProductoTableContainer = document.getElementById('proveedores_producto-read-table');
        if (data.length > 0) {
            proveedoresProductoTableContainer.innerHTML = '';

            const table = document.createElement('table');
            const thead = document.createElement('thead');
            const tbody = document.createElement('tbody');

            const columns = [
                'ID Proveedor',
                'ID Producto',
                'Creado Por',
                'Modificado Por',
                'Fecha de Creación',
                'Fecha de Modificación',
                'Acción',
                'Estado'
            ];

            const headers = columns.map(column => {
                const th = document.createElement('th');
                th.textContent = column;
                return th;
            });

            const headerRow = document.createElement('tr');
            headers.forEach(th => headerRow.appendChild(th));
            thead.appendChild(headerRow);
            table.appendChild(thead);

            data.forEach(item => {
                const row = document.createElement('tr');

                const idProveedorCell = document.createElement('td');
                idProveedorCell.textContent = item.FIDE_PROVEEDORES_PRODUCTO_V_ID_PROVEEDOR_FK || '';
                row.appendChild(idProveedorCell);

                const idProductoCell = document.createElement('td');
                idProductoCell.textContent = item.FIDE_PROVEEDORES_PRODUCTO_V_ID_PRODUCTO_FK || '';
                row.appendChild(idProductoCell);

                const creadoPorCell = document.createElement('td');
                creadoPorCell.textContent = item.V_CREADO_POR || '';
                row.appendChild(creadoPorCell);

                const modificadoPorCell = document.createElement('td');
                modificadoPorCell.textContent = item.V_MODIFICADO_POR || '';
                row.appendChild(modificadoPorCell);

                const fechaCreacionCell = document.createElement('td');
                fechaCreacionCell.textContent = item.V_FECHA_DE_CREACION || '';
                row.appendChild(fechaCreacionCell);

                const fechaModificacionCell = document.createElement('td');
                fechaModificacionCell.textContent = item.V_FECHA_DE_MODIFICACION || '';
                row.appendChild(fechaModificacionCell);

                const accionCell = document.createElement('td');
                accionCell.textContent = item.V_ACCION || '';
                row.appendChild(accionCell);

                const estadoCell = document.createElement('td');
                estadoCell.textContent = item.V_ESTADO || '';
                row.appendChild(estadoCell);

                tbody.appendChild(row);
            });

            table.appendChild(tbody);
            proveedoresProductoTableContainer.appendChild(table);
        } else {
            proveedoresProductoTableContainer.innerHTML = '<p>No se encontraron datos.</p>';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('proveedores_producto-read-table').innerHTML = `<p>Ocurrió un error al leer el proveedores producto: ${error.message}</p>`;
    }
}

// ---------------------------------------
// Función: Actualizar una Entrada de Proveedores Producto
// ---------------------------------------
async function updateProveedoresProducto() {
    const id_proveedor = document.getElementById('update_id_proveedor').value;
    const id_producto = document.getElementById('update_id_producto').value;
    const modificado_por = document.getElementById('update_modificado_por_proveedores_producto').value;
    const fecha_modificacion = document.getElementById('update_fecha_modificacion_proveedores_producto').value;

    try {
        const response = await fetch(`http://127.0.0.1:5000/api/proveedores_producto/${id_proveedor}/${id_producto}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                modificado_por,
                fecha_modificacion
            })
        });

        if (response.ok) {
            alert('Proveedores Producto actualizado exitosamente');
            fetchProveedoresProducto();
        } else {
            const errorData = await response.json();
            alert(`Error updating proveedores producto: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Error updating proveedores producto:', error);
        alert('Error updating proveedores producto.');
    }
}

// ---------------------------------------
// Función: Borrar una Entrada de Proveedores Producto
// ---------------------------------------
async function deleteProveedoresProducto() {
    const id_proveedor = document.getElementById('delete_id_proveedor')?.value;
    const id_producto = document.getElementById('delete_id_producto')?.value;

    if (!id_proveedor || !id_producto) {
        alert('Por favor, ingresa el ID del proveedor y el ID del producto a eliminar.');
        return;
    }

    try {
        const response = await fetch(`http://127.0.0.1:5000/api/proveedores_producto/${id_proveedor}/${id_producto}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert('Proveedores Producto eliminado exitosamente');
            fetchProveedoresProducto();
        } else {
            const errorData = await response.json();
            alert(`Error deleting proveedores producto: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Error deleting proveedores producto:', error);
        alert('Error deleting proveedores producto.');
    }
}

// ---------------------------------------
// Función: Obtener Datos de la Tabla Facturación
// ---------------------------------------
async function fetchFacturacion() {
    try {
        const response = await fetch('http://localhost:5000/api/facturacion');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const table = document.getElementById('facturacion-table');
        if (table) {
            table.innerHTML = `
                <table>
                    <thead>
                        <tr>
                            <th>ID Factura</th>
                            <th>ID Producto</th>
                            <th>ID Descuento</th>
                            <th>ID Cliente</th>
                            <th>ID Local</th>
                            <th>Cantidad Producto</th>
                            <th>Precio Subtotal</th>
                            <th>Precio Total</th>
                            <th>Fecha Pago</th>
                            <th>Creado Por</th>
                            <th>Modificado Por</th>
                            <th>Fecha de Creación</th>
                            <th>Fecha de Modificación</th>
                            <th>Acción</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            `;
            const tbody = table.querySelector('tbody');
            data.forEach(row => {
                tbody.innerHTML += `
                    <tr>
                        <td>${row.FIDE_FACTURACION_V_ID_FACTURA_PK}</td>
                        <td>${row.FIDE_FACTURACION_V_ID_PRODUCTO_FK}</td>
                        <td>${row.FIDE_FACTURACION_V_ID_DESCUENTO_FK}</td>
                        <td>${row.FIDE_FACTURACION_V_ID_CLIENTE_FK}</td>
                        <td>${row.FIDE_FACTURACION_V_ID_LOCAL_FK}</td>
                        <td>${row.V_CANTIDAD_PRODUCTO}</td>
                        <td>${row.V_PRECIO_SUBTOTAL}</td>
                        <td>${row.V_PRECIO_TOTAL}</td>
                        <td>${row.V_FECHA_PAGO}</td>
                        <td>${row.V_CREADO_POR}</td>
                        <td>${row.V_MODIFICADO_POR}</td>
                        <td>${row.V_FECHA_DE_CREACION}</td>
                        <td>${row.V_FECHA_DE_MODIFICACION}</td>
                        <td>${row.V_ACCION}</td>
                        <td>${row.V_ESTADO}</td>
                    </tr>
                `;
            });
        }
    } catch (error) {
        console.error('Error fetching facturación:', error);
    }
}

// ---------------------------------------
// Función: Crear una Nueva Entrada en Facturación
// ---------------------------------------
async function createFacturacion() {
    const id_factura = document.getElementById('create_id_factura').value;
    const id_producto = document.getElementById('create_id_producto_facturacion').value;
    const id_descuento = document.getElementById('create_id_descuento_facturacion').value;
    const id_cliente = document.getElementById('create_id_cliente_facturacion').value;
    const id_local = document.getElementById('create_id_local_facturacion').value;
    const cantidad_producto = document.getElementById('create_cantidad_producto').value;
    const precio_subtotal = document.getElementById('create_precio_subtotal').value;
    const precio_total = document.getElementById('create_precio_total').value;
    const fecha_pago = document.getElementById('create_facturacion_fecha_pago').value;
    const creado_por = document.getElementById('create_facturacion_creado_por').value;
    const fecha_creacion = document.getElementById('create_facturacion_fecha_creacion').value;

    try {
        const response = await fetch('http://127.0.0.1:5000/api/facturacion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id_factura,
                id_producto,
                id_descuento,
                id_cliente,
                id_local,
                cantidad_producto,
                precio_subtotal,
                precio_total,
                fecha_pago,
                creado_por,
                fecha_creacion
            })
        });

        if (response.ok) {
            alert('Facturación creada exitosamente');
            fetchFacturacion();
        } else {
            const errorData = await response.json();
            alert(`Error creating facturación: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Error creating facturación:', error);
        alert('Error creating facturación.');
    }
}

// ---------------------------------------
// Función: Leer una Entrada de Facturación
// ---------------------------------------
async function readFacturacion() {
    const idFactura = document.getElementById('read_id_factura').value;

    try {
        const response = await fetch(`http://127.0.0.1:5000/api/facturacion/${idFactura}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('API response:', data);

        const facturacionTableContainer = document.getElementById('facturacion-read-table');
        if (data.length > 0) {
            facturacionTableContainer.innerHTML = '';

            const table = document.createElement('table');
            const thead = document.createElement('thead');
            const tbody = document.createElement('tbody');

            const columns = [
                'ID Factura',
                'ID Producto',
                'ID Descuento',
                'ID Cliente',
                'ID Local',
                'Cantidad Producto',
                'Precio Subtotal',
                'Precio Total',
                'Fecha Pago',
                'Creado Por',
                'Modificado Por',
                'Fecha de Creación',
                'Fecha de Modificación',
                'Acción',
                'Estado'
            ];

            const headers = columns.map(column => {
                const th = document.createElement('th');
                th.textContent = column;
                return th;
            });

            const headerRow = document.createElement('tr');
            headers.forEach(th => headerRow.appendChild(th));
            thead.appendChild(headerRow);
            table.appendChild(thead);

            data.forEach(item => {
                const row = document.createElement('tr');

                const idFacturaCell = document.createElement('td');
                idFacturaCell.textContent = item.FIDE_FACTURACION_V_ID_FACTURA_PK || '';
                row.appendChild(idFacturaCell);

                const idProductoCell = document.createElement('td');
                idProductoCell.textContent = item.FIDE_FACTURACION_V_ID_PRODUCTO_FK || '';
                row.appendChild(idProductoCell);

                const idDescuentoCell = document.createElement('td');
                idDescuentoCell.textContent = item.FIDE_FACTURACION_V_ID_DESCUENTO_FK || '';
                row.appendChild(idDescuentoCell);

                const idClienteCell = document.createElement('td');
                idClienteCell.textContent = item.FIDE_FACTURACION_V_ID_CLIENTE_FK || '';
                row.appendChild(idClienteCell);

                const idLocalCell = document.createElement('td');
                idLocalCell.textContent = item.FIDE_FACTURACION_V_ID_LOCAL_FK || '';
                row.appendChild(idLocalCell);

                const cantidadProductoCell = document.createElement('td');
                cantidadProductoCell.textContent = item.V_CANTIDAD_PRODUCTO || '';
                row.appendChild(cantidadProductoCell);

                const precioSubtotalCell = document.createElement('td');
                precioSubtotalCell.textContent = item.V_PRECIO_SUBTOTAL || '';
                row.appendChild(precioSubtotalCell);

                const precioTotalCell = document.createElement('td');
                precioTotalCell.textContent = item.V_PRECIO_TOTAL || '';
                row.appendChild(precioTotalCell);

                const fechaPagoCell = document.createElement('td');
                fechaPagoCell.textContent = item.V_FECHA_PAGO || '';
                row.appendChild(fechaPagoCell);

                const creadoPorCell = document.createElement('td');
                creadoPorCell.textContent = item.V_CREADO_POR || '';
                row.appendChild(creadoPorCell);

                const modificadoPorCell = document.createElement('td');
                modificadoPorCell.textContent = item.V_MODIFICADO_POR || '';
                row.appendChild(modificadoPorCell);

                const fechaCreacionCell = document.createElement('td');
                fechaCreacionCell.textContent = item.V_FECHA_DE_CREACION || '';
                row.appendChild(fechaCreacionCell);

                const fechaModificacionCell = document.createElement('td');
                fechaModificacionCell.textContent = item.V_FECHA_DE_MODIFICACION || '';
                row.appendChild(fechaModificacionCell);

                const accionCell = document.createElement('td');
                accionCell.textContent = item.V_ACCION || '';
                row.appendChild(accionCell);

                const estadoCell = document.createElement('td');
                estadoCell.textContent = item.V_ESTADO || '';
                row.appendChild(estadoCell);

                tbody.appendChild(row);
            });

            table.appendChild(tbody);
            facturacionTableContainer.appendChild(table);
        } else {
            facturacionTableContainer.innerHTML = '<p>No se encontraron datos.</p>';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('facturacion-read-table').innerHTML = `<p>Ocurrió un error al leer la facturación: ${error.message}</p>`;
    }
}

// ---------------------------------------
// Función: Actualizar una Entrada de Facturación
// ---------------------------------------
async function updateFacturacion() {
    const id_factura = document.getElementById('update_id_factura').value;
    const id_producto = document.getElementById('update_id_producto_facturacion').value;
    const id_descuento = document.getElementById('update_id_descuento_facturacion').value;
    const id_cliente = document.getElementById('update_id_cliente_facturacion').value;
    const id_local = document.getElementById('update_id_local_facturacion').value;
    const cantidad_producto = document.getElementById('update_cantidad_producto').value;
    const precio_subtotal = document.getElementById('update_precio_subtotal').value;
    const precio_total = document.getElementById('update_precio_total').value;
    const fecha_pago = document.getElementById('update_facturacion_fecha_pago').value;
    const modificado_por = document.getElementById('update_facturacion_modificado_por').value;
    const fecha_modificacion = document.getElementById('update_facturacion_fecha_modificacion').value;

    try {
        const response = await fetch(`http://127.0.0.1:5000/api/facturacion/${id_factura}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id_producto,
                id_descuento,
                id_cliente,
                id_local,
                cantidad_producto,
                precio_subtotal,
                precio_total,
                fecha_pago,
                modificado_por,
                fecha_modificacion
            })
        });

        if (response.ok) {
            alert('Facturación actualizada exitosamente');
            fetchFacturacion();
        } else {
            const errorData = await response.json();
            alert(`Error updating facturación: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Error updating facturación:', error);
        alert('Error updating facturación.');
    }
}

// ---------------------------------------
// Función: Borrar una Entrada de Facturación
// ---------------------------------------
async function deleteFacturacion() {
    const id_factura = document.getElementById('delete_id_factura')?.value;

    if (!id_factura) {
        alert('Por favor, ingresa el ID de la factura a eliminar.');
        return;
    }

    try {
        const response = await fetch(`http://127.0.0.1:5000/api/facturacion/${id_factura}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert('Factura eliminada exitosamente');
            fetchFacturacion();
        } else {
            const errorData = await response.json();
            alert(`Error deleting facturación: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Error deleting facturación:', error);
        alert('Error deleting facturación.');
    }
}

// ---------------------------------------
// Función: Obtener Datos de la Tabla Ventas
// ---------------------------------------
async function fetchVentas() {
    try {
        const response = await fetch('http://localhost:5000/api/ventas');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const table = document.getElementById('ventas-table');
        if (table) {
            table.innerHTML = `
                <table>
                    <thead>
                        <tr>
                            <th>ID Venta</th>
                            <th>ID Factura</th>
                            <th>ID Producto</th>
                            <th>ID Local</th>
                            <th>ID Entrega</th>
                            <th>Creado Por</th>
                            <th>Modificado Por</th>
                            <th>Fecha de Creación</th>
                            <th>Fecha de Modificación</th>
                            <th>Acción</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            `;
            const tbody = table.querySelector('tbody');
            data.forEach(row => {
                tbody.innerHTML += `
                    <tr>
                        <td>${row.FIDE_VENTAS_V_ID_VENTA_PK}</td>
                        <td>${row.FIDE_VENTAS_V_ID_FACTURA_FK}</td>
                        <td>${row.FIDE_VENTAS_V_ID_PRODUCTO_FK}</td>
                        <td>${row.FIDE_VENTAS_V_ID_LOCAL_FK}</td>
                        <td>${row.FIDE_VENTAS_V_ID_ENTREGA_FK}</td>
                        <td>${row.V_CREADO_POR}</td>
                        <td>${row.V_MODIFICADO_POR}</td>
                        <td>${row.V_FECHA_DE_CREACION}</td>
                        <td>${row.V_FECHA_DE_MODIFICACION}</td>
                        <td>${row.V_ACCION}</td>
                        <td>${row.V_ESTADO}</td>
                    </tr>
                `;
            });
        }
    } catch (error) {
        console.error('Error fetching ventas:', error);
    }
}

// ---------------------------------------
// Función: Crear una Nueva Entrada en Ventas
// ---------------------------------------
async function createVentas() {
    const id_venta = document.getElementById('create_id_venta').value;
    const id_factura = document.getElementById('create_id_factura_ventas').value;
    const id_producto = document.getElementById('create_id_producto_ventas').value;
    const id_local = document.getElementById('create_id_local_ventas').value;
    const id_entrega = document.getElementById('create_id_entrega_ventas').value;
    const creado_por = document.getElementById('create_ventas_creado_por').value;
    const fecha_creacion = document.getElementById('create_ventas_fecha_creacion').value;

    try {
        const response = await fetch('http://127.0.0.1:5000/api/ventas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id_venta,
                id_factura,
                id_producto,
                id_local,
                id_entrega,
                creado_por,
                fecha_creacion
            })
        });

        if (response.ok) {
            alert('Venta creada exitosamente');
            fetchVentas();
        } else {
            const errorData = await response.json();
            alert(`Error creating ventas: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Error creating ventas:', error);
        alert('Error creating ventas.');
    }
}

// ---------------------------------------
// Función: Leer una Entrada de Ventas
// ---------------------------------------
async function readVentas() {
    const idVenta = document.getElementById('read_id_venta').value;

    try {
        const response = await fetch(`http://127.0.0.1:5000/api/ventas/${idVenta}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('API response:', data);

        const ventasTableContainer = document.getElementById('ventas-read-table');
        if (data.length > 0) {
            ventasTableContainer.innerHTML = '';

            const table = document.createElement('table');
            const thead = document.createElement('thead');
            const tbody = document.createElement('tbody');

            const columns = [
                'ID Venta',
                'ID Factura',
                'ID Producto',
                'ID Local',
                'ID Entrega',
                'Creado Por',
                'Modificado Por',
                'Fecha de Creación',
                'Fecha de Modificación',
                'Acción',
                'Estado'
            ];

            const headers = columns.map(column => {
                const th = document.createElement('th');
                th.textContent = column;
                return th;
            });

            const headerRow = document.createElement('tr');
            headers.forEach(th => headerRow.appendChild(th));
            thead.appendChild(headerRow);
            table.appendChild(thead);

            data.forEach(item => {
                const row = document.createElement('tr');

                const idVentaCell = document.createElement('td');
                idVentaCell.textContent = item.FIDE_VENTAS_V_ID_VENTA_PK || '';
                row.appendChild(idVentaCell);

                const idFacturaCell = document.createElement('td');
                idFacturaCell.textContent = item.FIDE_VENTAS_V_ID_FACTURA_FK || '';
                row.appendChild(idFacturaCell);

                const idProductoCell = document.createElement('td');
                idProductoCell.textContent = item.FIDE_VENTAS_V_ID_PRODUCTO_FK || '';
                row.appendChild(idProductoCell);

                const idLocalCell = document.createElement('td');
                idLocalCell.textContent = item.FIDE_VENTAS_V_ID_LOCAL_FK || '';
                row.appendChild(idLocalCell);

                const idEntregaCell = document.createElement('td');
                idEntregaCell.textContent = item.FIDE_VENTAS_V_ID_ENTREGA_FK || '';
                row.appendChild(idEntregaCell);

                const creadoPorCell = document.createElement('td');
                creadoPorCell.textContent = item.V_CREADO_POR || '';
                row.appendChild(creadoPorCell);

                const modificadoPorCell = document.createElement('td');
                modificadoPorCell.textContent = item.V_MODIFICADO_POR || '';
                row.appendChild(modificadoPorCell);

                const fechaCreacionCell = document.createElement('td');
                fechaCreacionCell.textContent = item.V_FECHA_DE_CREACION || '';
                row.appendChild(fechaCreacionCell);

                const fechaModificacionCell = document.createElement('td');
                fechaModificacionCell.textContent = item.V_FECHA_DE_MODIFICACION || '';
                row.appendChild(fechaModificacionCell);

                const accionCell = document.createElement('td');
                accionCell.textContent = item.V_ACCION || '';
                row.appendChild(accionCell);

                const estadoCell = document.createElement('td');
                estadoCell.textContent = item.V_ESTADO || '';
                row.appendChild(estadoCell);

                tbody.appendChild(row);
            });

            table.appendChild(tbody);
            ventasTableContainer.appendChild(table);
        } else {
            ventasTableContainer.innerHTML = '<p>No se encontraron datos.</p>';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('ventas-read-table').innerHTML = `<p>Ocurrió un error al leer la ventas: ${error.message}</p>`;
    }
}

// ---------------------------------------
// Función: Actualizar una Entrada de Ventas
// ---------------------------------------
async function updateVentas() {
    const id_venta = document.getElementById('update_id_venta').value;
    const id_factura = document.getElementById('update_id_factura_ventas').value;
    const id_producto = document.getElementById('update_id_producto_ventas').value;
    const id_local = document.getElementById('update_id_local_ventas').value;
    const id_entrega = document.getElementById('update_id_entrega_ventas').value;
    const modificado_por = document.getElementById('update_modificado_por_ventas').value;
    const fecha_modificacion = document.getElementById('update_fecha_modificacion_ventas').value;

    try {
        const response = await fetch(`http://127.0.0.1:5000/api/ventas/${id_venta}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id_factura,
                id_producto,
                id_local,
                id_entrega,
                modificado_por,
                fecha_modificacion
            })
        });

        if (response.ok) {
            alert('Venta actualizada exitosamente');
            fetchVentas();
        } else {
            const errorData = await response.json();
            alert(`Error updating ventas: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Error updating ventas:', error);
        alert('Error updating ventas.');
    }
}

// ---------------------------------------
// Función: Borrar una Entrada de Ventas
// ---------------------------------------
async function deleteVentas() {
    const id_venta = document.getElementById('delete_id_venta')?.value;

    if (!id_venta) {
        alert('Por favor, ingresa el ID de la venta a eliminar.');
        return;
    }

    try {
        const response = await fetch(`http://127.0.0.1:5000/api/ventas/${id_venta}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert('Venta eliminada exitosamente');
            fetchVentas();
        } else {
            const errorData = await response.json();
            alert(`Error deleting ventas: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Error deleting ventas:', error);
        alert('Error deleting ventas.');
    }
}