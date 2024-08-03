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

    // Oculta todas las tablas y botones de CRUD
    if (catalogoTableDisplay) catalogoTableDisplay.style.display = 'none';
    if (localesTableDisplay) localesTableDisplay.style.display = 'none';
    if (clientesTableDisplay) clientesTableDisplay.style.display = 'none';
    if (productosTableDisplay) productosTableDisplay.style.display = 'none';
    if (proveedoresTableDisplay) proveedoresTableDisplay.style.display = 'none';

    const catalogoButtons = document.getElementById('catalogo-buttons');
    const localesButtons = document.getElementById('locales-buttons');
    const clientesButtons = document.getElementById('clientes-buttons');
    const productosButtons = document.getElementById('productos-buttons');
    const proveedoresButtons = document.getElementById('proveedores-buttons');

    if (catalogoButtons) catalogoButtons.style.display = 'none';
    if (localesButtons) localesButtons.style.display = 'none';
    if (clientesButtons) clientesButtons.style.display = 'none';
    if (productosButtons) productosButtons.style.display = 'none';
    if (proveedoresButtons) proveedoresButtons.style.display = 'none';

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
    } else {
        if (inputFormContainer) inputFormContainer.style.display = 'none';
        if (catalogoTableDisplay) catalogoTableDisplay.innerHTML = '<p>Selecciona una tabla para mostrar el formulario.</p>';
        if (localesTableDisplay) localesTableDisplay.innerHTML = '<p>Selecciona una tabla para mostrar el formulario.</p>';
        if (clientesTableDisplay) clientesTableDisplay.innerHTML = '<p>Selecciona una tabla para mostrar el formulario.</p>';
        if (productosTableDisplay) productosTableDisplay.innerHTML = '<p>Selecciona una tabla para mostrar el formulario.</p>';
        if (proveedoresTableDisplay) proveedoresTableDisplay.innerHTML = '<p>Selecciona una tabla para mostrar el formulario.</p>';
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
// TABLA CATÁLOGO
// ---------------------------------------
// Función: Obtener Datos de la Tabla Catalogo
// ---------------------------------------
async function fetchCatalogo() {
    try {
        const response = await fetch('http://localhost:5000/api/catalogo');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const table = document.getElementById('catalogo-table');
        if (table) {
            table.innerHTML = `
                <table>
                    <thead>
                        <tr>
                            <th>ID Producto</th>
                            <th>Nombre Producto</th>
                            <th>Precio Producto</th>
                            <th>Descripción Producto</th>
                            <th>Cantidad Producto</th>
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
                        <td>${row.FIDE_CATALOGO_V_Id_producto_PK}</td>
                        <td>${row.V_Nom_producto}</td>
                        <td>${row.V_Precio_producto}</td>
                        <td>${row.V_Descripcion_producto}</td>
                        <td>${row.V_Cantidad_producto}</td>
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
        console.error('Error fetching catalogo:', error);
    }
}

// ---------------------------------------
// Función: Crear una Nueva Entrada en Catalogo
// ---------------------------------------
async function createCatalogo() {
    const id_catalogo_producto = document.getElementById('create_id_catalogo_producto').value;
    const nom_catalogo_producto = document.getElementById('create_nom_catalogo_producto').value;
    const precio_catalogo_producto = document.getElementById('create_precio_catalogo_producto').value;
    const descripcion_catalogo_producto = document.getElementById('create_descripcion_catalogo_producto').value;
    const cantidad_catalogo_producto = document.getElementById('create_cantidad_catalogo_producto').value;
    const creado_por_catalogo = document.getElementById('create_catalogo_creado_por').value;
    const fecha_creacion_catalogo = document.getElementById('create_catalogo_fecha_creacion').value;

    try {
        const response = await fetch('http://127.0.0.1:5000/api/catalogo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id_catalogo_producto,
                nom_catalogo_producto,
                precio_catalogo_producto,
                descripcion_catalogo_producto,
                cantidad_catalogo_producto,
                creado_por_catalogo,
                fecha_creacion_catalogo
            })
        });

        if (response.ok) {
            alert('Catalogo creado exitosamente');
            fetchCatalogo();
        } else {
            const errorData = await response.json();
            alert(`Error creating catalog: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Error creating catalog:', error);
        alert('Error creating catalog.');
    }
}

// ---------------------------------------
// Función: Leer una Entrada del Catalogo
// ---------------------------------------
async function readCatalogo() {
    const idCatalogoProducto = document.getElementById('read_id_catalogo_producto').value;

    try {
        const response = await fetch(`http://127.0.0.1:5000/api/catalogo/${idCatalogoProducto}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('API response:', data);

        const catalogoTableContainer = document.getElementById('catalogo-read-table');
        if (data.length > 0) {
            catalogoTableContainer.innerHTML = '';

            const table = document.createElement('table');
            const thead = document.createElement('thead');
            const tbody = document.createElement('tbody');

            const columns = [
                'ID Producto',
                'Nombre Producto',
                'Precio Producto',
                'Descripción Producto',
                'Cantidad Producto',
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
                idCell.textContent = item.FIDE_CATALOGO_V_ID_PRODUCTO_PK || '';
                row.appendChild(idCell);

                const nameCell = document.createElement('td');
                nameCell.textContent = item.V_NOM_PRODUCTO || '';
                row.appendChild(nameCell);

                const priceCell = document.createElement('td');
                priceCell.textContent = item.V_PRECIO_PRODUCTO || '';
                row.appendChild(priceCell);

                const descriptionCell = document.createElement('td');
                descriptionCell.textContent = item.V_DESCRIPCION_PRODUCTO || '';
                row.appendChild(descriptionCell);

                const quantityCell = document.createElement('td');
                quantityCell.textContent = item.V_CANTIDAD_PRODUCTO || '';
                row.appendChild(quantityCell);

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
            catalogoTableContainer.appendChild(table);
        } else {
            catalogoTableContainer.innerHTML = '<p>No se encontraron datos.</p>';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('catalogo-read-table').innerHTML = `<p>Ocurrió un error al leer el catálogo: ${error.message}</p>`;
    }
}

// ---------------------------------------
// Función: Actualizar una Entrada del Catalogo
// ---------------------------------------
async function updateCatalogo() {
    const id_catalogo_producto = document.getElementById('update_id_catalogo_producto').value;
    const nom_catalogo_producto = document.getElementById('update_nom_catalogo_producto').value;
    const precio_catalogo_producto = document.getElementById('update_precio_catalogo_producto').value;
    const descripcion_catalogo_producto = document.getElementById('update_descripcion_catalogo_producto').value;
    const cantidad_catalogo_producto = document.getElementById('update_cantidad_catalogo_producto').value;
    const modificado_por_catalogo = document.getElementById('update_modificado_por_catalogo').value;
    const fecha_modificacion_catalogo = document.getElementById('update_fecha_modificacion_catalogo').value;

    try {
        const response = await fetch(`http://127.0.0.1:5000/api/catalogo/${id_catalogo_producto}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nom_catalogo_producto,
                precio_catalogo_producto,
                descripcion_catalogo_producto,
                cantidad_catalogo_producto,
                modificado_por_catalogo,
                fecha_modificacion_catalogo
            })
        });

        if (response.ok) {
            alert('Catalogo actualizado exitosamente');
            fetchCatalogo();
        } else {
            const errorData = await response.json();
            alert(`Error updating catalog: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Error updating catalog:', error);
        alert('Error updating catalog.');
    }
}

// ---------------------------------------
// Función: Borrar una Entrada del Catalogo
// ---------------------------------------
async function deleteCatalogo() {
    const id_catalogo_producto = document.getElementById('delete_id_catalogo_producto')?.value;

    if (!id_catalogo_producto) {
        alert('Por favor, ingresa el ID del producto a eliminar.');
        return;
    }

    try {
        const response = await fetch(`http://127.0.0.1:5000/api/catalogo/${id_catalogo_producto}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert('Producto eliminado exitosamente');
            fetchCatalogo();
        } else {
            const errorData = await response.json();
            alert(`Error deleting catalog: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Error deleting catalog:', error);
        alert('Error deleting catalog.');
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
// Función: Obtener Datos de la Tabla Clientes
// ---------------------------------------
async function fetchClientes() {
    try {
        const response = await fetch('http://localhost:5000/api/clientes');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const table = document.getElementById('clientes-table');
        if (table) {
            table.innerHTML = `
                <table>
                    <thead>
                        <tr>
                            <th>ID Cliente</th>
                            <th>Nombre Cliente</th>
                            <th>Apellido Cliente</th>
                            <th>Correo Cliente</th>
                            <th>Teléfono Cliente</th>
                            <th>Dirección Cliente</th>
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
                        <td>${row.FIDE_CLIENTES_V_Id_cliente_PK}</td>
                        <td>${row.V_Nom_cliente}</td>
                        <td>${row.V_Ape_cliente}</td>
                        <td>${row.V_Correo_cliente}</td>
                        <td>${row.V_Tel_cliente}</td>
                        <td>${row.V_Direccion_cliente}</td>
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
        console.error('Error fetching clientes:', error);
    }
}

// ---------------------------------------
// Función: Crear una Nueva Entrada en Clientes
// ---------------------------------------
async function createCliente() {
    const id_cliente = document.getElementById('create_id_cliente')?.value;
    const nom_cliente = document.getElementById('create_nom_cliente')?.value;
    const ape_cliente = document.getElementById('create_ape_cliente')?.value;
    const correo_cliente = document.getElementById('create_correo_cliente')?.value;
    const tel_cliente = document.getElementById('create_tel_cliente')?.value;
    const direccion_cliente = document.getElementById('create_direccion_cliente')?.value;
    const creado_por = document.getElementById('create_cliente_creado_por')?.value;
    const fecha_creacion = document.getElementById('create_cliente_fecha_creacion')?.value;

    try {
        const response = await fetch('http://127.0.0.1:5000/api/clientes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id_cliente,
                nom_cliente,
                ape_cliente,
                correo_cliente,
                tel_cliente,
                direccion_cliente,
                creado_por,
                fecha_creacion
            })
        });

        if (response.ok) {
            alert('Cliente creado exitosamente');
            fetchClientes();
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
// Función: Leer una Entrada de Cliente
// ---------------------------------------
async function readCliente() {
    const idCliente = document.getElementById('read_id_cliente').value;

    try {
        const response = await fetch(`http://127.0.0.1:5000/api/clientes/${idCliente}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('API response:', data);

        const clienteTableContainer = document.getElementById('cliente-read-table');
        if (data.length > 0) {
            clienteTableContainer.innerHTML = '';

            const table = document.createElement('table');
            const thead = document.createElement('thead');
            const tbody = document.createElement('tbody');

            const columns = [
                'ID Cliente',
                'Nombre Cliente',
                'Apellido Cliente',
                'Correo Cliente',
                'Teléfono Cliente',
                'Dirección Cliente',
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
                idCell.textContent = item.FIDE_CLIENTES_V_ID_CLIENTE_PK || '';
                row.appendChild(idCell);

                const nameCell = document.createElement('td');
                nameCell.textContent = item.V_NOM_CLIENTE || '';
                row.appendChild(nameCell);

                const surnameCell = document.createElement('td');
                surnameCell.textContent = item.V_APE_CLIENTE || '';
                row.appendChild(surnameCell);

                const emailCell = document.createElement('td');
                emailCell.textContent = item.V_CORREO_CLIENTE || '';
                row.appendChild(emailCell);

                const phoneCell = document.createElement('td');
                phoneCell.textContent = item.V_TEL_CLIENTE || '';
                row.appendChild(phoneCell);

                const addressCell = document.createElement('td');
                addressCell.textContent = item.V_DIRECCION_CLIENTE || '';
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
            clienteTableContainer.appendChild(table);
        } else {
            clienteTableContainer.innerHTML = '<p>No se encontraron datos.</p>';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('cliente-read-table').innerHTML = `<p>Ocurrió un error al leer el cliente: ${error.message}</p>`;
    }
}

// ---------------------------------------
// Función: Actualizar una Entrada de Clientes
// ---------------------------------------
async function updateCliente() {
    const id_cliente = document.getElementById('update_id_cliente')?.value;
    const nom_cliente = document.getElementById('update_nom_cliente')?.value;
    const ape_cliente = document.getElementById('update_ape_cliente')?.value;
    const correo_cliente = document.getElementById('update_correo_cliente')?.value;
    const tel_cliente = document.getElementById('update_tel_cliente')?.value;
    const direccion_cliente = document.getElementById('update_direccion_cliente')?.value;
    const modificado_por = document.getElementById('update_cliente_modificado_por')?.value;
    const fecha_modificacion = document.getElementById('update_cliente_fecha_modificacion')?.value;

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
                modificado_por,
                fecha_modificacion
            })
        });

        if (response.ok) {
            alert('Cliente actualizado exitosamente');
            fetchClientes();
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
// ---------------------------------------
async function deleteCliente() {
    const id_cliente = document.getElementById('delete_id_cliente')?.value;

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
