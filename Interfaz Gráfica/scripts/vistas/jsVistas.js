function openModal(viewName) {
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const modalFooter = document.getElementById('modalFooter');

    modalFooter.innerHTML = ''; // Clear the footer content

    if (viewName === 'fetchClientesDescuentosEntregas') {
        modalTitle.innerText = 'Clientes, Descuentos y Entregas';
        modalBody.innerHTML = `<div id="result-display"></div>`;
        fetchClientesDescuentosEntregas();
    } else if (viewName === 'fetchProductosProveedores') {
        modalTitle.innerText = 'Productos y Proveedores';
        modalBody.innerHTML = `<div id="result-display"></div>`;
        fetchProductosProveedores();
    } else if (viewName === 'fetchLocalesProductos') {
        modalTitle.innerText = 'Locales y Productos';
        modalBody.innerHTML = `<div id="result-display"></div>`;
        fetchLocalesProductos();
    } else if (viewName === 'fetchTipoDescuentosClientes') {
        modalTitle.innerText = 'Tipo Descuentos y Clientes';
        modalBody.innerHTML = `<div id="result-display"></div>`;
        fetchTipoDescuentosClientes();
    } else if (viewName === 'fetchEntregasClientesContacto') {
        modalTitle.innerText = 'Entregas y Clientes Contacto';
        modalBody.innerHTML = `<div id="result-display"></div>`;
        fetchEntregasClientesContacto();
    }

    const modal = new bootstrap.Modal(document.getElementById('functionModal'));
    modal.show();
}


// Function to fetch and display data for a specific view
async function fetchViewData(apiEndpoint, resultElementId, columnAliases) {
    try {
        const response = await fetch(apiEndpoint);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();

        const table = document.createElement('table');
        table.border = '1';
        table.className = 'view-table';

        if (data.length > 0) {
            const thead = document.createElement('thead');
            const headerRow = document.createElement('tr');
            Object.keys(data[0]).forEach(key => {
                const th = document.createElement('th');
                th.textContent = columnAliases[key] || key;
                headerRow.appendChild(th);
            });
            thead.appendChild(headerRow);
            table.appendChild(thead);

            const tbody = document.createElement('tbody');
            data.forEach(row => {
                const tr = document.createElement('tr');
                Object.values(row).forEach(value => {
                    const td = document.createElement('td');
                    td.textContent = value;
                    tr.appendChild(td);
                });
                tbody.appendChild(tr);
            });
            table.appendChild(tbody);
        } else {
            table.textContent = 'No data available';
        }

        const resultElement = document.getElementById(resultElementId);
        if (resultElement) {
            resultElement.innerHTML = '';
            resultElement.appendChild(table);
        } else {
            console.error(`Element with ID "${resultElementId}" not found`);
        }
    } catch (error) {
        console.error('Error fetching view data:', error);
        const resultElement = document.getElementById(resultElementId);
        if (resultElement) {
            resultElement.textContent = 'Error al obtener los datos de la vista';
        }
    }
}

// Function to fetch and display data for Clientes, Descuentos y Entregas
async function fetchClientesDescuentosEntregas() {
    const columnAliases = {
        FIDE_CLIENTES_V_ID_CLIENTE_PK: 'ID Cliente',
        V_NOM_CLIENTE: 'Nombre Cliente',
        V_APE_CLIENTE: 'Apellido Cliente',
        V_CORREO_CLIENTE: 'Correo Cliente',
        FIDE_DESCUENTOS_V_ID_DESCUENTO_PK: 'ID Descuento',
        FIDE_DESCUENTOS_V_ID_TIPO_DESCUENTO_FK: 'ID Tipo Descuento',
        FIDE_ENTREGAS_V_ID_ENTREGA_PK: 'ID Entrega',
        V_DIRECCION_CLIENTE: 'Dirección Cliente'
    };
    await fetchViewData('http://127.0.0.1:5000/api/vista/clientes_descuentos_entregas', 'result-display', columnAliases);
}

// Function to fetch and display data for Productos y Proveedores
async function fetchProductosProveedores() {
    const columnAliases = {
        FIDE_PRODUCTOS_V_ID_PRODUCTO_PK: 'ID Producto',
        V_NOM_PRODUCTO: 'Nombre Producto',
        V_PRECIO_PRODUCTO: 'Precio Producto',
        FIDE_PROVEEDORES_V_ID_PROVEEDOR_PK: 'ID Proveedor',
        V_NOM_PROVEDOR: 'Nombre Proveedor',
        V_CORREO_PROVEEDOR: 'Correo Proveedor'
    };
    await fetchViewData('http://127.0.0.1:5000/api/vista/productos_proveedores', 'result-display', columnAliases);
}

// Function to fetch and display data for Locales y Productos
async function fetchLocalesProductos() {
    const columnAliases = {
        FIDE_LOCALES_V_ID_LOCAL_PK: 'ID Local',
        V_NOM_LOCAL: 'Nombre Local',
        V_DIRECCION_LOCAL: 'Dirección Local',
        FIDE_PRODUCTOS_V_ID_PRODUCTO_PK: 'ID Producto',
        V_NOM_PRODUCTO: 'Nombre Producto',
        V_CANTIDAD_PRODUCTO: 'Cantidad Producto'
    };
    await fetchViewData('http://127.0.0.1:5000/api/vista/locales_productos', 'result-display', columnAliases);
}

// Function to fetch and display data for Tipo Descuentos y Clientes
async function fetchTipoDescuentosClientes() {
    const columnAliases = {
        FIDE_TIPO_DESCUENTO_V_ID_TIPO_DESCUENTO_PK: 'ID Tipo Descuento',
        V_PORCENTAJE_DESCUENTO: 'Porcentaje Descuento',
        FIDE_DESCUENTOS_V_ID_DESCUENTO_PK: 'ID Descuento',
        FIDE_DESCUENTOS_V_ID_CLIENTE_FK: 'ID Cliente',
        V_NOM_CLIENTE: 'Nombre Cliente'
    };
    await fetchViewData('http://127.0.0.1:5000/api/vista/tipo_descuentos_clientes', 'result-display', columnAliases);
}

// Function to fetch and display data for Entregas y Clientes Contacto
async function fetchEntregasClientesContacto() {
    const columnAliases = {
        FIDE_ENTREGAS_V_ID_ENTREGA_PK: 'ID Entrega',
        V_NOM_CLIENTE: 'Nombre Cliente',
        V_DIRECCION_CLIENTE: 'Dirección Cliente',
        V_TEL_CLIENTE: 'Teléfono Cliente',
        V_CORREO_CLIENTE: 'Correo Cliente'
    };
    await fetchViewData('http://127.0.0.1:5000/api/vista/entregas_clientes_contacto', 'result-display', columnAliases);
}
