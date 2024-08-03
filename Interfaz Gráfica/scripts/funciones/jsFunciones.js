function showInputForm() {
    const functionSelect = document.getElementById('function-select');
    const inputForm = document.getElementById('input-form');
    const resultDisplay = document.getElementById('result-display');
    inputForm.innerHTML = '';
    resultDisplay.innerHTML = '';

    if (functionSelect.value === 'correo') {
        inputForm.innerHTML = `
            <label for="id_cliente">ID del Cliente</label>
            <input type="number" id="id_cliente" placeholder="Ingresa el ID del cliente">
            <button onclick="getClienteEmail()">Obtener Correo</button>
            <div id="resultado_correo"></div>
        `;
    } else if (functionSelect.value === 'precio') {
        inputForm.innerHTML = `
            <label for="id_producto">ID del Producto</label>
            <input type="number" id="id_producto" placeholder="Ingresa el ID del producto">
            <button onclick="getProductoPrecio()">Obtener Precio</button>
            <div id="resultado_precio"></div>
        `;
    } else if (functionSelect.value === 'descuento') {
        inputForm.innerHTML = `
            <label for="id_descuento">ID del Descuento</label>
            <input type="number" id="id_descuento" placeholder="Ingresa el ID del descuento">
            <label for="subtotal">Subtotal</label>
            <input type="number" step="0.01" id="subtotal" placeholder="Ingresa el subtotal">
            <button onclick="calcularMontoDescuento()">Calcular Descuento</button>
            <div id="resultado_descuento"></div>
        `;
    } else if (functionSelect.value === 'disponibilidad') {
        inputForm.innerHTML = `
            <label for="id_producto">ID del Producto</label>
            <input type="number" id="id_producto" placeholder="Ingresa el ID del producto">
            <button onclick="verificarDisponibilidadProducto()">Verificar Disponibilidad</button>
            <div id="resultado_disponibilidad"></div>
        `;
    } else if (functionSelect.value === 'contacto') {
        inputForm.innerHTML = `
            <label for="id_proveedor">ID del Proveedor</label>
            <input type="number" id="id_proveedor" placeholder="Ingresa el ID del proveedor">
            <button onclick="obtenerContactoProveedor()">Obtener Contacto</button>
            <div id="resultado_contacto"></div>
        `;
    } else if (functionSelect.value === 'porcentaje_descuento') {
        inputForm.innerHTML = `
            <label for="id_cliente">ID del Cliente</label>
            <input type="number" id="id_cliente" placeholder="Ingresa el ID del cliente">
            <button onclick="obtenerPorcentajeDescuento()">Obtener Porcentaje de Descuento</button>
            <div id="resultado_porcentaje_descuento"></div>
        `;
    } else if (functionSelect.value === 'total_ordenes') {
        inputForm.innerHTML = `
            <label for="id_cliente">ID del Cliente</label>
            <input type="number" id="id_cliente" placeholder="Ingresa el ID del cliente">
            <button onclick="obtenerTotalOrdenesCliente()">Obtener Total de Órdenes</button>
            <div id="resultado_total_ordenes"></div>
        `;
    } else if (functionSelect.value === 'total_ventas') {
        inputForm.innerHTML = `
            <label for="id_producto">ID del Producto</label>
            <input type="number" id="id_producto" placeholder="Ingresa el ID del producto">
            <button onclick="obtenerTotalVentasProducto()">Obtener Total de Ventas</button>
            <div id="resultado_total_ventas"></div>
        `;
    } else if (functionSelect.value === 'inventario') {
        resultDisplay.innerHTML = '<div id="resultado_inventario"></div>';
        obtenerInventarioProductos();
    } else if (functionSelect.value === 'ordenes_facturacion') {
        resultDisplay.innerHTML = '<div id="resultado_ordenes_facturacion"></div>';
        obtenerOrdenesFacturacion();
    } else if (functionSelect.value === 'proveedores') {
        resultDisplay.innerHTML = '<div id="resultado_proveedores"></div>';
        obtenerProveedores();
    } else if (functionSelect.value === 'descuentos') {
        resultDisplay.innerHTML = '<div id="resultado_descuentos"></div>';
        obtenerDescuentos();
    } else if (functionSelect.value === 'tiendas') {
        resultDisplay.innerHTML = '<div id="resultado_tiendas"></div>';
        obtenerTiendas();
    } else if (functionSelect.value === 'productos_catalogo') {
        resultDisplay.innerHTML = '<div id="resultado_productos_catalogo"></div>';
        obtenerProductosCatalogo();
    } else if (functionSelect.value === 'clientes') {
        resultDisplay.innerHTML = '<div id="resultado_clientes"></div>';
        obtenerClientes();
    } else if (functionSelect.value === 'ordenes_pagos') {
        resultDisplay.innerHTML = '<div id="resultado_ordenes_pagos"></div>';
        obtenerOrdenesPagos();
    } else if (functionSelect.value === 'entregas_proveedores') {
        resultDisplay.innerHTML = '<div id="resultado_entregas_proveedores"></div>';
        obtenerEntregasProveedores();
    }
}

 // Función correo
 async function getClienteEmail() {
    const idCliente = document.getElementById('id_cliente').value;
    if (!idCliente) {
        alert('Por favor, ingrese el ID del cliente.');
        return;
    }

    try {
        const response = await fetch('http://127.0.0.1:5000/obtener_correo_cliente', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id_cliente: parseInt(idCliente) })
        });

        const data = await response.json();
        document.getElementById('resultado_correo').textContent = data.correo || 'Error al obtener correo';
    } catch (error) {
        document.getElementById('resultado_correo').textContent = 'Error de conexión o en la solicitud';
    }}

// Función para obtener el precio de un producto
async function getProductoPrecio() {
    const idProducto = document.getElementById('id_producto').value;
    if (!idProducto) {
        alert('Por favor, ingrese el ID del producto.');
        return;
    }

    try {
        const response = await fetch('http://127.0.0.1:5000/obtener_precio_producto', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id_producto: parseInt(idProducto) })
        });

        const data = await response.json();
        document.getElementById('resultado_precio').textContent = data.precio || 'Error al obtener precio';
    } catch (error) {
        document.getElementById('resultado_precio').textContent = 'Error de conexión o en la solicitud';
    }
}

// Función para calcular el monto de descuento
async function calcularMontoDescuento() {
    const idDescuento = document.getElementById('id_descuento').value;
    const subtotal = document.getElementById('subtotal').value;
    if (!idDescuento || !subtotal) {
        alert('Por favor, ingrese todos los campos requeridos.');
        return;
    }

    try {
        const response = await fetch('http://127.0.0.1:5000/calcular_monto_descuento', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id_descuento: parseInt(idDescuento), subtotal: parseFloat(subtotal) })
        });

        const data = await response.json();
        document.getElementById('resultado_descuento').textContent = data.monto_descuento || 'Error al calcular descuento';
    } catch (error) {
        document.getElementById('resultado_descuento').textContent = 'Error de conexión o en la solicitud';
    }
}

// Función para verificar la disponibilidad del producto
async function verificarDisponibilidadProducto() {
    const idProducto = document.getElementById('id_producto').value;
    if (!idProducto) {
        alert('Por favor, ingrese el ID del producto.');
        return;
    }

    try {
        const response = await fetch('http://127.0.0.1:5000/verificar_disponibilidad_producto', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id_producto: parseInt(idProducto) })
        });

        const data = await response.json();
        document.getElementById('resultado_disponibilidad').textContent = data.disponibilidad || 'Error al verificar disponibilidad';
    } catch (error) {
        document.getElementById('resultado_disponibilidad').textContent = 'Error de conexión o en la solicitud';
    }
}

// Función para obtener la información de contacto de un proveedor
async function obtenerContactoProveedor() {
    const idProveedor = document.getElementById('id_proveedor').value;
    if (!idProveedor) {
        alert('Por favor, ingrese el ID del proveedor.');
        return;
    }

    try {
        const response = await fetch('http://127.0.0.1:5000/obtener_contacto_proveedor', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id_proveedor: parseInt(idProveedor) })
        });

        const data = await response.json();
        document.getElementById('resultado_contacto').textContent = data.contacto || 'Error al obtener contacto';
    } catch (error) {
        document.getElementById('resultado_contacto').textContent = 'Error de conexión o en la solicitud';
    }
}

// Función para obtener el porcentaje de descuento de un cliente
async function obtenerPorcentajeDescuento() {
    const idCliente = document.getElementById('id_cliente').value;
    if (!idCliente) {
        alert('Por favor, ingrese el ID del cliente.');
        return;
    }

    try {
        const response = await fetch('http://127.0.0.1:5000/obtener_porcentaje_descuento', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id_cliente: parseInt(idCliente) })
        });

        const data = await response.json();
        document.getElementById('resultado_porcentaje_descuento').textContent = data.porcentaje_descuento || 'Error al obtener porcentaje de descuento';
    } catch (error) {
        document.getElementById('resultado_porcentaje_descuento').textContent = 'Error de conexión o en la solicitud';
    }
}

// Función para obtener el total de órdenes de un cliente
async function obtenerTotalOrdenesCliente() {
    const idCliente = document.getElementById('id_cliente').value;
    if (!idCliente) {
        alert('Por favor, ingrese el ID del cliente.');
        return;
    }

    try {
        const response = await fetch('http://127.0.0.1:5000/obtener_total_ordenes_cliente', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id_cliente: parseInt(idCliente) })
        });

        const data = await response.json();
        document.getElementById('resultado_total_ordenes').textContent = data.total_ordenes || 'Error al obtener total de órdenes';
    } catch (error) {
        document.getElementById('resultado_total_ordenes').textContent = 'Error de conexión o en la solicitud';
    }
}

// Función para obtener el total de ventas de un producto
async function obtenerTotalVentasProducto() {
    const idProducto = document.getElementById('id_producto').value;
    if (!idProducto) {
        alert('Por favor, ingrese el ID del producto.');
        return;
    }

    try {
        const response = await fetch('http://127.0.0.1:5000/obtener_total_ventas_producto', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id_producto: parseInt(idProducto) })
        });

        const data = await response.json();
        document.getElementById('resultado_total_ventas').textContent = data.total_ventas || 'Error al obtener total de ventas';
    } catch (error) {
        document.getElementById('resultado_total_ventas').textContent = 'Error de conexión o en la solicitud';
    }
}

// Función para obtener inventario total
async function obtenerInventarioProductos() {
    try {
        const response = await fetch('http://127.0.0.1:5000/obtener_inventario');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();

        const columnAliases = {
            FIDE_PRODUCTOS_V_ID_PRODUCTO_PK: 'ID Producto',
            V_NOM_PRODUCTO: 'Nombre Producto',
            V_PIEZAS_PRODUCTO: 'Piezas',
            V_PRECIO_PRODUCTO: 'Precio',
            V_CANTIDAD_PRODUCTO: 'Cantidad',
            V_DESCRIPCION_PRODUCTO: 'Descripción',
            V_CREADO_POR: 'Creado por',
            V_MODIFICADO_POR: 'Modificado por',
            V_FECHA_DE_CREACION: 'Creado por',
            V_FECHA_DE_MODIFICACION: 'Fecha de Modificación',
            V_ACCION: 'Acción',
            V_ESTADO: 'Estado'
        };

        const table = document.createElement('table');
        table.border = '1';
        table.className = 'inventory-table';

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

        const resultElement = document.getElementById('resultado_inventario');
        if (resultElement) {
            resultElement.innerHTML = '';
            resultElement.appendChild(table);
        } else {
            console.error('Element with ID "resultado_inventario" not found');
        }
    } catch (error) {
        console.error('Error fetching inventory:', error);
        const resultElement = document.getElementById('resultado_inventario');
        if (resultElement) {
            resultElement.textContent = 'Error al obtener inventario';
        }
    }
};
// Función para obtener órdenes de facturación
async function obtenerOrdenesFacturacion() {
    const columnAliases = {
        FIDE_FACTURACION_V_ID_FACTURA_PK: 'ID Factura',
        FIDE_FACTURACION_V_ID_CLIENTE_FK: 'ID Cliente',
        V_PRECIO_TOTAL: 'Precio Total'
    };

    try {
        const response = await fetch('http://127.0.0.1:5000/obtener_ordenes_facturacion');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        displayTable(data, 'Órdenes de Facturación', columnAliases);
    } catch (error) {
        console.error('Error fetching órdenes de facturación:', error);
        displayError('Error al obtener órdenes de facturación');
    }
}

// Función para obtener proveedores
async function obtenerProveedores() {
    const columnAliases = {
        FIDE_PROVEEDORES_V_ID_PROVEEDOR_PK: 'ID Proveedor',
        V_NOM_PROVEDOR: 'Nombre Proveedor',
        V_PRODUCTO_PROVEEDOR: 'Producto Proveedor'
    };

    try {
        const response = await fetch('http://127.0.0.1:5000/obtener_proveedores');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        displayTable(data, 'Proveedores', columnAliases);
    } catch (error) {
        console.error('Error fetching proveedores:', error);
        displayError('Error al obtener proveedores');
    }
}

// Función para obtener descuentos
async function obtenerDescuentos() {
    const columnAliases = {
        FIDE_TIPO_DESCUENTO_V_ID_TIPO_DESCUENTO_PK: 'ID Tipo Descuento',
        FIDE_TIPO_DESCUENTO_V_ID_CLIENTE_FK: 'ID Cliente',
        V_PORCENTAJE_DESCUENTO: 'Porcentaje Descuento'
    };

    try {
        const response = await fetch('http://127.0.0.1:5000/obtener_descuentos');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        displayTable(data, 'Descuentos', columnAliases);
    } catch (error) {
        console.error('Error fetching descuentos:', error);
        displayError('Error al obtener descuentos');
    }
}

// Función para obtener tiendas
async function obtenerTiendas() {
    const columnAliases = {
        FIDE_LOCALES_V_ID_LOCAL_PK: 'ID Local',
        V_NOM_LOCAL: 'Nombre Local',
        V_TEL_LOCAL: 'Teléfono Local',
        V_DIRECCION_LOCAL: 'Dirección Local'
    };

    try {
        const response = await fetch('http://127.0.0.1:5000/obtener_tiendas');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        displayTable(data, 'Tiendas', columnAliases);
    } catch (error) {
        console.error('Error fetching tiendas:', error);
        displayError('Error al obtener tiendas');
    }
}

// Función para obtener productos del catálogo
async function obtenerProductosCatalogo() {
    const columnAliases = {
        FIDE_CATALOGO_V_ID_PRODUCTO_PK: 'ID Producto',
        V_NOM_PRODUCTO: 'Nombre Producto',
        V_PRECIO_PRODUCTO: 'Precio Producto'
    };

    try {
        const response = await fetch('http://127.0.0.1:5000/obtener_productos_catalogo');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        displayTable(data, 'Productos del Catálogo', columnAliases);
    } catch (error) {
        console.error('Error fetching productos catálogo:', error);
        displayError('Error al obtener productos del catálogo');
    }
}

// Función para obtener clientes
async function obtenerClientes() {
    const columnAliases = {
        FIDE_CLIENTES_V_ID_CLIENTE_PK: 'ID Cliente',
        V_NOM_CLIENTE: 'Nombre Cliente',
        V_APE_CLIENTE: 'Apellido Cliente'
    };

    try {
        const response = await fetch('http://127.0.0.1:5000/obtener_clientes');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        displayTable(data, 'Clientes', columnAliases);
    } catch (error) {
        console.error('Error fetching clientes:', error);
        displayError('Error al obtener clientes');
    }
}

// Función para obtener órdenes y pagos
async function obtenerOrdenesPagos() {
    const columnAliases = {
        FIDE_FACTURACION_V_ID_FACTURA_PK: 'ID Factura',
        FIDE_FACTURACION_V_ID_CLIENTE_FK: 'ID Cliente',
        V_PRECIO_TOTAL: 'Precio Total'
    };

    try {
        const response = await fetch('http://127.0.0.1:5000/obtener_ordenes_pagos');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        displayTable(data, 'Órdenes y Pagos', columnAliases);
    } catch (error) {
        console.error('Error fetching órdenes pagos:', error);
        displayError('Error al obtener órdenes y pagos');
    }
}

// Función para obtener las entregas de proveedores
async function obtenerEntregasProveedores() {
    const columnAliases = {
        FIDE_PROVEEDORES_V_ID_PROVEEDOR_PK: 'ID Proveedor',
        V_NOM_PROVEDOR: 'Nombre Proveedor',
        V_PRODUCTO_PROVEEDOR: 'Producto Proveedor'
    };

    try {
        const response = await fetch('http://127.0.0.1:5000/obtener_entregas_proveedores');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        displayTable(data, 'Entregas de Proveedores', columnAliases);
    } catch (error) {
        console.error('Error fetching entregas proveedores:', error);
        displayError('Error al obtener entregas de proveedores');
    }
}

// Función para mostrar tabla de resultados
function displayTable(data, title, columnAliases) {
    const resultDisplay = document.getElementById('result-display');
    resultDisplay.innerHTML = '';

    const table = document.createElement('table');
    table.className = 'styled-table';
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
    resultDisplay.appendChild(table);
}

// Función para mostrar mensaje de error
function displayError(message) {
    const resultDisplay = document.getElementById('result-display');
    resultDisplay.innerHTML = `<p class="error-message">${message}</p>`;
}
