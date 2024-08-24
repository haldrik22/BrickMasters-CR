// Function traer cliente correo
function obtenerCorreoCliente() {
    const id_cliente = document.getElementById('idClienteInput').value;
    
    if (!id_cliente) {
        alert('Por favor, ingrese un ID de cliente.');
        return;
    }

    fetch('http://127.0.0.1:5000/obtener_correo_cliente', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_cliente: id_cliente }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.correo) {
            document.getElementById('correoClienteOutput').textContent = `Correo del Cliente: ${data.correo}`;
        } else {
            document.getElementById('correoClienteOutput').textContent = `Error: ${data.message}`;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('correoClienteOutput').textContent = 'Hubo un error al realizar la solicitud.';
    });
}

// Function traer precio por ID
function obtenerPrecioProducto() {
    const id_producto = document.getElementById('idProductoInput').value;
    
    if (!id_producto) {
        alert('Por favor, ingrese un ID de producto.');
        return;
    }

    fetch('http://127.0.0.1:5000/obtener_precio_producto', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_producto: id_producto }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.precio) {
            document.getElementById('precioProductoOutput').textContent = `Precio del Producto: ${data.precio}`;
        } else {
            document.getElementById('precioProductoOutput').textContent = `Error: ${data.error}`;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('precioProductoOutput').textContent = 'Hubo un error al realizar la solicitud.';
    });
}

// Function calcular monto descuento
function calcularMontoDescuento() {
    const id_descuento = document.getElementById('idDescuentoInput').value;
    const subtotal = document.getElementById('subtotalInput').value;
    
    if (!id_descuento || !subtotal) {
        alert('Por favor, ingrese el ID del descuento y el subtotal.');
        return;
    }

    fetch('http://127.0.0.1:5000/calcular_monto_descuento', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_descuento: id_descuento, subtotal: subtotal }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.monto_descuento) {
            document.getElementById('montoDescuentoOutput').textContent = `Monto del Descuento: ${data.monto_descuento}`;
        } else {
            document.getElementById('montoDescuentoOutput').textContent = `Error: ${data.error}`;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('montoDescuentoOutput').textContent = 'Hubo un error al realizar la solicitud.';
    });
}

// Function disponibilidad de producto
function verificarDisponibilidadProducto() {
    const id_producto = document.getElementById('idProductoDisponibilidadInput').value;
    
    if (!id_producto) {
        alert('Por favor, ingrese un ID de producto.');
        return;
    }

    fetch('http://127.0.0.1:5000/verificar_disponibilidad_producto', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_producto: id_producto }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.disponibilidad) {
            document.getElementById('disponibilidadProductoOutput').textContent = `Disponibilidad del Producto: ${data.disponibilidad}`;
        } else {
            document.getElementById('disponibilidadProductoOutput').textContent = `Error: ${data.error}`;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('disponibilidadProductoOutput').textContent = 'Hubo un error al realizar la solicitud.';
    });
}


// Function traer contacto proveedor por su ID
function obtenerContactoProveedor() {
    const id_proveedor = document.getElementById('idProveedorInput').value;
    
    if (!id_proveedor) {
        alert('Por favor, ingrese un ID de proveedor.');
        return;
    }

    fetch('http://127.0.0.1:5000/obtener_contacto_proveedor', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_proveedor: id_proveedor }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.contacto) {
            document.getElementById('contactoProveedorOutput').textContent = `Contacto del Proveedor: ${data.contacto}`;
        } else {
            document.getElementById('contactoProveedorOutput').textContent = `Error: ${data.error}`;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('contactoProveedorOutput').textContent = 'Hubo un error al realizar la solicitud.';
    });
}


// Function traer descuento por ID
function obtenerPorcentajeDescuento() {
    const id_cliente = document.getElementById('idClienteDescuentoInput').value;
    
    if (!id_cliente) {
        alert('Por favor, ingrese un ID de cliente.');
        return;
    }

    fetch('http://127.0.0.1:5000/obtener_porcentaje_descuento', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_cliente: id_cliente }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.porcentaje_descuento) {
            document.getElementById('porcentajeDescuentoOutput').textContent = `Porcentaje de Descuento: ${data.porcentaje_descuento}%`;
        } else {
            document.getElementById('porcentajeDescuentoOutput').textContent = `Error: ${data.error}`;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('porcentajeDescuentoOutput').textContent = 'Hubo un error al realizar la solicitud.';
    });
}


// Function traer número de órdenes por cliente
function obtenerTotalOrdenesCliente() {
    const id_cliente = document.getElementById('idClienteOrdenesInput').value;
    
    if (!id_cliente) {
        alert('Por favor, ingrese un ID de cliente.');
        return;
    }

    fetch('http://127.0.0.1:5000/obtener_total_ordenes_cliente', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_cliente: id_cliente }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.total_ordenes) {
            document.getElementById('totalOrdenesOutput').textContent = `Total de Órdenes: ${data.total_ordenes}`;
        } else {
            document.getElementById('totalOrdenesOutput').textContent = `Error: ${data.error}`;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('totalOrdenesOutput').textContent = 'Hubo un error al realizar la solicitud.';
    });
}


// Function traer número de ventas por producto
function obtenerTotalVentasProducto() {
    const id_producto = document.getElementById('idProductoVentasInput').value;
    
    if (!id_producto) {
        alert('Por favor, ingrese un ID de producto.');
        return;
    }

    fetch('http://127.0.0.1:5000/obtener_total_ventas_producto', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_producto: id_producto }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.total_ventas) {
            document.getElementById('totalVentasOutput').textContent = `Total de Ventas: ${data.total_ventas}`;
        } else {
            document.getElementById('totalVentasOutput').textContent = `Error: ${data.error}`;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('totalVentasOutput').textContent = 'Hubo un error al realizar la solicitud.';
    });
}


// Function traer inventario completo
const columnLabelMap = {
    'FIDE_PRODUCTOS_V_ID_PRODUCTO_PK': 'ID Producto',
    'V_CANTIDAD_PRODUCTO': 'Cantidad',
    'V_NOM_PRODUCTO': 'Nombre Producto'
};

function obtenerInventario() {
    fetch('http://127.0.0.1:5000/obtener_inventario', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            document.getElementById('inventarioOutput').textContent = `Error: ${data.error}`;
        } else {
            const inventarioTable = document.getElementById('inventarioTable');
            inventarioTable.innerHTML = '';

            if (data.length > 0) {
                const headers = Object.keys(data[0]);
                const headerRow = inventarioTable.insertRow(-1);
                headers.forEach(header => {
                    const cell = headerRow.insertCell(-1);
                    cell.textContent = columnLabelMap[header] || header;
                });

                data.forEach(row => {
                    const tableRow = inventarioTable.insertRow(-1);
                    headers.forEach(header => {
                        const cell = tableRow.insertCell(-1);
                        cell.textContent = row[header];
                    });
                });
            } else {
                inventarioTable.innerHTML = '<tr><td colspan="100%">No hay datos disponibles.</td></tr>';
            }
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('inventarioOutput').textContent = 'Hubo un error al realizar la solicitud.';
    });
}


// Función para obtener órdenes de facturación
const columnLabelMap2 = {
    'FIDE_FACTURACION_V_ID_CLIENTE_FK': 'ID Cliente',
    'FIDE_FACTURACION_V_ID_FACTURA_PK': 'ID Factura',
    'V_PRECIO_TOTAL': 'Precio Total'
};

function obtenerOrdenesFacturacion() {
    fetch('http://127.0.0.1:5000/obtener_ordenes_facturacion', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            document.getElementById('ordenesFacturacionOutput').textContent = `Error: ${data.error}`;
        } else {
            const ordenesTable = document.getElementById('ordenesFacturacionTable');
            ordenesTable.innerHTML = '';

            if (data.length > 0) {
                const headers = Object.keys(data[0]);
                const headerRow = ordenesTable.insertRow(-1);
                headers.forEach(header => {
                    const cell = headerRow.insertCell(-1);
                    cell.textContent = columnLabelMap2[header] || header;
                });

                data.forEach(row => {
                    const tableRow = ordenesTable.insertRow(-1);
                    headers.forEach(header => {
                        const cell = tableRow.insertCell(-1);
                        cell.textContent = row[header];
                    });
                });
            } else {
                ordenesTable.innerHTML = '<tr><td colspan="100%">No hay datos disponibles.</td></tr>';
            }
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('ordenesFacturacionOutput').textContent = 'Hubo un error al realizar la solicitud.';
    });
}

// Function para traer proveedores
const columnLabelMap3 = {
    'FIDE_PROVEEDORES_V_ID_PROVEEDOR_PK': 'ID Proveedor',
    'V_NOM_PROVEDOR': 'Nombre Proveedor',
    'V_NOM_PRODUCTO': 'Producto Suministrado'
};

function obtenerProveedores() {
    fetch('http://127.0.0.1:5000/obtener_proveedores', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            document.getElementById('proveedoresOutput').textContent = `Error: ${data.error}`;
        } else {
            const proveedoresTable = document.getElementById('proveedoresTable');
            proveedoresTable.innerHTML = '';

            if (data.length > 0) {
                const headers = Object.keys(data[0]);
                const headerRow = proveedoresTable.insertRow(-1);
                headers.forEach(header => {
                    const cell = headerRow.insertCell(-1);
                    cell.textContent = columnLabelMap3[header] || header;
                });

                data.forEach(row => {
                    const tableRow = proveedoresTable.insertRow(-1);
                    headers.forEach(header => {
                        const cell = tableRow.insertCell(-1);
                        cell.textContent = row[header];
                    });
                });
            } else {
                proveedoresTable.innerHTML = '<tr><td colspan="100%">No hay datos disponibles.</td></tr>';
            }
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('proveedoresOutput').textContent = 'Hubo un error al realizar la solicitud.';
    });
}

// Function para traer descuentos
const columnLabelMap4 = {
    'FIDE_TIPO_DESCUENTO_V_ID_CLIENTE_FK': 'ID Cliente',
    'FIDE_TIPO_DESCUENTO_V_ID_TIPO_DESCUENTO_PK': 'ID Tipo de Descuento',
    'V_PORCENTAJE_DESCUENTO': 'Porcentaje Descuento'
};

function obtenerDescuentos() {
    fetch('http://127.0.0.1:5000/obtener_descuentos', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            document.getElementById('descuentosOutput').textContent = `Error: ${data.error}`;
        } else {
            const descuentosTable = document.getElementById('descuentosTable');
            descuentosTable.innerHTML = '';

            if (data.length > 0) {
                const headers = Object.keys(data[0]);
                const headerRow = descuentosTable.insertRow(-1);
                headers.forEach(header => {
                    const cell = headerRow.insertCell(-1);
                    cell.textContent = columnLabelMap4[header] || header;
                });

                data.forEach(row => {
                    const tableRow = descuentosTable.insertRow(-1);
                    headers.forEach(header => {
                        const cell = tableRow.insertCell(-1);
                        cell.textContent = row[header];
                    });
                });
            } else {
                descuentosTable.innerHTML = '<tr><td colspan="100%">No hay datos disponibles.</td></tr>';
            }
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('descuentosOutput').textContent = 'Hubo un error al realizar la solicitud.';
    });
}


// Función para obtener tiendas
const columnLabelMap5 = {
    'FIDE_LOCALES_V_ID_LOCAL_PK': 'ID Local',
    'V_DIRECCION_LOCAL': 'Dirección Local',
    'V_NOM_LOCAL': 'Nombre Local',
    'V_TEL_LOCAL': 'Teléfono Local'
};

function obtenerTiendas() {
    fetch('http://127.0.0.1:5000/obtener_tiendas', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            document.getElementById('tiendasOutput').textContent = `Error: ${data.error}`;
        } else {
            const tiendasTable = document.getElementById('tiendasTable');
            tiendasTable.innerHTML = '';

            if (data.length > 0) {
                const headers = Object.keys(data[0]);
                const headerRow = tiendasTable.insertRow(-1);
                headers.forEach(header => {
                    const cell = headerRow.insertCell(-1);
                    cell.textContent = columnLabelMap5[header] || header;
                });

                data.forEach(row => {
                    const tableRow = tiendasTable.insertRow(-1);
                    headers.forEach(header => {
                        const cell = tableRow.insertCell(-1);
                        cell.textContent = row[header];
                    });
                });
            } else {
                tiendasTable.innerHTML = '<tr><td colspan="100%">No hay datos disponibles.</td></tr>';
            }
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('tiendasOutput').textContent = 'Hubo un error al realizar la solicitud.';
    });
}



// Función para obtener productos del catálogo
const columnLabelMap6 = {
    'FIDE_CATALOGO_V_ID_PRODUCTO_PK': 'ID del Producto',
    'V_NOM_PRODUCTO': 'Nombre del Producto',
    'V_PRECIO_PRODUCTO': 'Precio del Producto'
};

function obtenerProductosCatalogo() {
    fetch('http://127.0.0.1:5000/obtener_productos_catalogo', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            document.getElementById('productosCatalogoOutput').textContent = `Error: ${data.error}`;
        } else {
            const productosCatalogoTable = document.getElementById('productosCatalogoTable');
            productosCatalogoTable.innerHTML = '';

            if (data.length > 0) {
                const headers = Object.keys(data[0]);
                const headerRow = productosCatalogoTable.insertRow(-1);
                headers.forEach(header => {
                    const cell = headerRow.insertCell(-1);
                    cell.textContent = columnLabelMap6[header] || header;
                });

                data.forEach(row => {
                    const tableRow = productosCatalogoTable.insertRow(-1);
                    headers.forEach(header => {
                        const cell = tableRow.insertCell(-1);
                        cell.textContent = row[header];
                    });
                });
            } else {
                productosCatalogoTable.innerHTML = '<tr><td colspan="100%">No hay datos disponibles.</td></tr>';
            }
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('productosCatalogoOutput').textContent = 'Hubo un error al realizar la solicitud.';
    });
}



// Función para obtener clientes
const columnLabelMap7 = {
    'FIDE_CLIENTES_V_ID_CLIENTE_PK': 'ID del Cliente',
    'V_APE_CLIENTE': 'Apellido del Cliente',
    'V_NOM_CLIENTE': 'Nombre del Cliente'
};

function obtenerClientes() {
    fetch('http://127.0.0.1:5000/obtener_clientes', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            document.getElementById('clientesOutput').textContent = `Error: ${data.error}`;
        } else {
            const clientesTable = document.getElementById('clientesTable');
            clientesTable.innerHTML = '';

            if (data.length > 0) {
                const headers = Object.keys(data[0]);
                const headerRow = clientesTable.insertRow(-1);
                headers.forEach(header => {
                    const cell = headerRow.insertCell(-1);
                    cell.textContent = columnLabelMap7[header] || header;
                });

                data.forEach(row => {
                    const tableRow = clientesTable.insertRow(-1);
                    headers.forEach(header => {
                        const cell = tableRow.insertCell(-1);
                        cell.textContent = row[header];
                    });
                });
            } else {
                clientesTable.innerHTML = '<tr><td colspan="100%">No hay datos disponibles.</td></tr>';
            }
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('clientesOutput').textContent = 'Hubo un error al realizar la solicitud.';
    });
}


// Función para obtener órdenes y pagos
const columnLabelMap8 = {
    'FIDE_FACTURACION_V_ID_CLIENTE_FK': 'ID del Cliente',
    'FIDE_FACTURACION_V_ID_FACTURA_PK': 'ID de la Factura',
    'V_PRECIO_TOTAL': 'Precio Total'
};

function obtenerOrdenesPagos() {
    fetch('http://127.0.0.1:5000/obtener_ordenes_pagos', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            document.getElementById('ordenesPagosOutput').textContent = `Error: ${data.error}`;
        } else {
            const ordenesPagosTable = document.getElementById('ordenesPagosTable');
            ordenesPagosTable.innerHTML = '';

            if (data.length > 0) {
                const headers = Object.keys(data[0]);
                const headerRow = ordenesPagosTable.insertRow(-1);
                headers.forEach(header => {
                    const cell = headerRow.insertCell(-1);
                    cell.textContent = columnLabelMap8[header] || header;
                });

                data.forEach(row => {
                    const tableRow = ordenesPagosTable.insertRow(-1);
                    headers.forEach(header => {
                        const cell = tableRow.insertCell(-1);
                        cell.textContent = row[header];
                    });
                });
            } else {
                ordenesPagosTable.innerHTML = '<tr><td colspan="100%">No hay datos disponibles.</td></tr>';
            }
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('ordenesPagosOutput').textContent = 'Hubo un error al realizar la solicitud.';
    });
}


// Función para obtener las entregas de proveedores
const columnLabelMap9 = {
    'FIDE_PROVEEDORES_V_ID_PROVEEDOR_PK': 'ID del Proveedor',
    'V_NOM_PROVEDOR': 'Nombre del Proveedor',
    'V_PRODUCTO_PROVEEDOR': 'Producto del Proveedor'
};

function obtenerEntregasProveedores() {
    fetch('http://127.0.0.1:5000/obtener_entregas_proveedores', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            document.getElementById('entregasProveedoresOutput').textContent = `Error: ${data.error}`;
        } else {
            const entregasProveedoresTable = document.getElementById('entregasProveedoresTable');
            entregasProveedoresTable.innerHTML = '';

            if (data.length > 0) {
                const headers = Object.keys(data[0]);
                const headerRow = entregasProveedoresTable.insertRow(-1);
                headers.forEach(header => {
                    const cell = headerRow.insertCell(-1);
                    cell.textContent = columnLabelMap9[header] || header;
                });

                data.forEach(row => {
                    const tableRow = entregasProveedoresTable.insertRow(-1);
                    headers.forEach(header => {
                        const cell = tableRow.insertCell(-1);
                        cell.textContent = row[header];
                    });
                });
            } else {
                entregasProveedoresTable.innerHTML = '<tr><td colspan="100%">No hay datos disponibles.</td></tr>';
            }
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('entregasProveedoresOutput').textContent = 'Hubo un error al realizar la solicitud.';
    });
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
