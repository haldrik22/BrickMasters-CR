// Function to fetch and display data from the FIDE_CLIENTES_DESCUENTOS_ENTREGAS_V view with column aliases
function obtenerClientesDescuentosEntregas() {
    const reportContainer = document.getElementById('clientesDescuentosEntregasTableContainer');
    const toggleButton = document.getElementById('toggleReporteButton');

    if (reportContainer.style.display === 'block') {
        reportContainer.style.display = 'none';
        toggleButton.textContent = 'Mostrar Reporte';
        return;
    }

    fetch('http://127.0.0.1:5000/api/vista/clientes_descuentos_entregas', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            document.getElementById('clientesDescuentosEntregasOutput').textContent = `Error: ${data.error}`;
        } else {
            const table = document.getElementById('clientesDescuentosEntregasTable');
            table.innerHTML = '';

            if (data.length > 0) {
                const columnAliasMap = {
                    'FIDE_CLIENTES_V_ID_CLIENTE_PK': 'ID Cliente',
                    'FIDE_DESCUENTOS_V_ID_DESCUENTO_PK': 'ID Descuento',
                    'FIDE_DESCUENTOS_V_ID_TIPO_DESCUENTO_FK': 'ID Tipo Descuento',
                    'FIDE_ENTREGAS_V_ID_ENTREGA_PK': 'ID Entrega',
                    'V_APE_CLIENTE': 'Apellido Cliente',
                    'V_CORREO_CLIENTE': 'Correo Cliente',
                    'V_DIRECCION_CLIENTE': 'Dirección Cliente',
                    'V_NOM_CLIENTE': 'Nombre Cliente'
                };

                const headers = Object.keys(data[0]);
                const headerRow = table.insertRow(-1);
                headers.forEach(header => {
                    const cell = headerRow.insertCell(-1);
                    cell.textContent = columnAliasMap[header] || header;
                });

                data.forEach(row => {
                    const tableRow = table.insertRow(-1);
                    headers.forEach(header => {
                        const cell = tableRow.insertCell(-1);
                        cell.textContent = row[header];
                    });
                });

                reportContainer.style.display = 'block';
                toggleButton.textContent = 'Esconder Reporte';
                document.getElementById('downloadButton').style.display = 'inline-block';
            } else {
                table.innerHTML = '<tr><td colspan="100%">No hay datos disponibles.</td></tr>';
            }
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('clientesDescuentosEntregasOutput').textContent = 'Hubo un error al realizar la solicitud.';
    });
}

// Function to download the view data as a PDF
function descargarPDFClientesDescuentosEntregas() {
    const { jsPDF } = window.jspdf;  
    const doc = new jsPDF();

    const table = document.getElementById('clientesDescuentosEntregasTable');
    const rows = [...table.rows];

    const pdfData = rows.map(row => {
        return [...row.cells].map(cell => cell.textContent);
    });

    doc.autoTable({
        head: [pdfData[0]],
        body: pdfData.slice(1),
    });

    doc.save('Clientes_Descuentos_Entregas.pdf');
}

// Function to fetch and display data from the FIDE_PRODUCTOS_PROVEEDORES_V view with column aliases
function obtenerProductosProveedores() {
    const reportContainer = document.getElementById('productosProveedoresTableContainer');
    const toggleButton = document.getElementById('toggleProductosProveedoresButton');

    if (reportContainer.style.display === 'block') {
        reportContainer.style.display = 'none';
        toggleButton.textContent = 'Mostrar Reporte';
        return;
    }

    fetch('http://127.0.0.1:5000/api/vista/productos_proveedores', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            document.getElementById('productosProveedoresOutput').textContent = `Error: ${data.error}`;
        } else {
            const table = document.getElementById('productosProveedoresTable');
            table.innerHTML = '';

            if (data.length > 0) {
                const columnAliasMap = {
                    'V_NOM_PRODUCTO': 'Nombre Producto',
                    'V_PRECIO_PRODUCTO': 'Precio Producto',
                    'FIDE_PROVEEDORES_V_ID_PROVEEDOR_PK': 'ID Proveedor',
                    'V_NOM_PROVEDOR': 'Nombre Proveedor',
                    'V_CORREO_PROVEEDOR': 'Correo Proveedor',
                    'FIDE_PRODUCTOS_V_ID_PRODUCTO_PK': 'ID Producto'
                };

                const headers = Object.keys(data[0]);
                const headerRow = table.insertRow(-1);
                headers.forEach(header => {
                    const cell = headerRow.insertCell(-1);
                    cell.textContent = columnAliasMap[header] || header;
                });

                data.forEach(row => {
                    const tableRow = table.insertRow(-1);
                    headers.forEach(header => {
                        const cell = tableRow.insertCell(-1);
                        cell.textContent = row[header];
                    });
                });

                reportContainer.style.display = 'block';
                toggleButton.textContent = 'Esconder Reporte';
                document.getElementById('downloadProductosProveedoresButton').style.display = 'inline-block';
            } else {
                table.innerHTML = '<tr><td colspan="100%">No hay datos disponibles.</td></tr>';
            }
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('productosProveedoresOutput').textContent = 'Hubo un error al realizar la solicitud.';
    });
}

// Function to download the view data as a PDF
function descargarPDFProductosProveedores() {
    const { jsPDF } = window.jspdf;  
    const doc = new jsPDF();

    const table = document.getElementById('productosProveedoresTable');
    const rows = [...table.rows];

    const pdfData = rows.map(row => {
        return [...row.cells].map(cell => cell.textContent);
    });

    doc.autoTable({
        head: [pdfData[0]],
        body: pdfData.slice(1),
    });

    doc.save('Productos_Proveedores.pdf');
}


// Function to fetch and display data from the FIDE_LOCALES_PRODUCTOS_V view with column aliases
function obtenerLocalesProductos() {
    const reportContainer = document.getElementById('localesProductosTableContainer');
    const toggleButton = document.getElementById('toggleLocalesProductosButton');

    if (reportContainer.style.display === 'block') {
         
        reportContainer.style.display = 'none';
        toggleButton.textContent = 'Mostrar Reporte';
        return;
    }

     
    fetch('http://127.0.0.1:5000/api/vista/locales_productos', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            document.getElementById('localesProductosOutput').textContent = `Error: ${data.error}`;
        } else {
            const table = document.getElementById('localesProductosTable');
            table.innerHTML = '';

            if (data.length > 0) {
                // Define the column name to alias mapping
                const columnAliasMap = {
                    'FIDE_LOCALES_V_ID_LOCAL_PK': 'ID Local',
                    'V_NOM_LOCAL': 'Nombre Local',
                    'V_DIRECCION_LOCAL': 'Dirección Local',
                    'FIDE_PRODUCTOS_V_ID_PRODUCTO_PK': 'ID Producto',
                    'V_NOM_PRODUCTO': 'Nombre Producto',
                    'V_CANTIDAD_PRODUCTO': 'Cantidad Producto'
                };

                // Create table headers with aliases
                const headers = Object.keys(data[0]);
                const headerRow = table.insertRow(-1);
                headers.forEach(header => {
                    const cell = headerRow.insertCell(-1);
                    cell.textContent = columnAliasMap[header] || header;
                });

                // Create table rows
                data.forEach(row => {
                    const tableRow = table.insertRow(-1);
                    headers.forEach(header => {
                        const cell = tableRow.insertCell(-1);
                        cell.textContent = row[header];
                    });
                });

                // Show the table and the download button
                reportContainer.style.display = 'block';
                toggleButton.textContent = 'Esconder Reporte';
                document.getElementById('downloadLocalesProductosButton').style.display = 'inline-block';
            } else {
                table.innerHTML = '<tr><td colspan="100%">No hay datos disponibles.</td></tr>';
            }
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('localesProductosOutput').textContent = 'Hubo un error al realizar la solicitud.';
    });
}

// Function to download the view data as a PDF
function descargarPDFLocalesProductos() {
    const { jsPDF } = window.jspdf;  
    const doc = new jsPDF();

    const table = document.getElementById('localesProductosTable');
    const rows = [...table.rows];

    const pdfData = rows.map(row => {
        return [...row.cells].map(cell => cell.textContent);
    });

    doc.autoTable({
        head: [pdfData[0]],
        body: pdfData.slice(1),
    });

    doc.save('Locales_Productos.pdf');
}


/// Function to fetch and display data from the FIDE_TIPO_DESCUENTOS_CLIENTES_V view with column aliases
function obtenerTipoDescuentosClientes() {
    const reportContainer = document.getElementById('tipoDescuentosClientesTableContainer');
    const toggleButton = document.getElementById('toggleTipoDescuentosClientesButton');

    if (reportContainer.style.display === 'block') {
         
        reportContainer.style.display = 'none';
        toggleButton.textContent = 'Mostrar Reporte';
        return;
    }

     
    fetch('http://127.0.0.1:5000/api/vista/tipo_descuentos_clientes', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            document.getElementById('tipoDescuentosClientesOutput').textContent = `Error: ${data.error}`;
        } else {
            const table = document.getElementById('tipoDescuentosClientesTable');
            table.innerHTML = '';

            if (data.length > 0) {
                // Define the column name to alias mapping
                const columnAliasMap = {
                    'FIDE_TIPO_DESCUENTO_V_ID_TIPO_DESCUENTO_PK': 'ID Tipo Descuento',
                    'V_PORCENTAJE_DESCUENTO': 'Porcentaje Descuento',
                    'FIDE_DESCUENTOS_V_ID_DESCUENTO_PK': 'ID Descuento',
                    'FIDE_DESCUENTOS_V_ID_CLIENTE_FK': 'ID Cliente',
                    'V_NOM_CLIENTE': 'Nombre Cliente'
                };

                // Create table headers with aliases
                const headers = Object.keys(data[0]);
                const headerRow = table.insertRow(-1);
                headers.forEach(header => {
                    const cell = headerRow.insertCell(-1);
                    cell.textContent = columnAliasMap[header] || header;
                });

                // Create table rows
                data.forEach(row => {
                    const tableRow = table.insertRow(-1);
                    headers.forEach(header => {
                        const cell = tableRow.insertCell(-1);
                        cell.textContent = row[header];
                    });
                });

                // Show the table and the download button
                reportContainer.style.display = 'block';
                toggleButton.textContent = 'Esconder Reporte';
                document.getElementById('downloadTipoDescuentosClientesButton').style.display = 'inline-block';
            } else {
                table.innerHTML = '<tr><td colspan="100%">No hay datos disponibles.</td></tr>';
            }
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('tipoDescuentosClientesOutput').textContent = 'Hubo un error al realizar la solicitud.';
    });
}

// Function to download the view data as a PDF
function descargarPDFTipoDescuentosClientes() {
    const { jsPDF } = window.jspdf;  
    const doc = new jsPDF();

    const table = document.getElementById('tipoDescuentosClientesTable');
    const rows = [...table.rows];

    const pdfData = rows.map(row => {
        return [...row.cells].map(cell => cell.textContent);
    });

    doc.autoTable({
        head: [pdfData[0]],
        body: pdfData.slice(1),
    });

    doc.save('Tipo_Descuentos_Clientes.pdf');
}


// Function to fetch and display data from the FIDE_ENTREGAS_CLIENTES_CONTACTO_V view with column aliases
function obtenerEntregasClientesContacto() {
    const reportContainer = document.getElementById('entregasClientesContactoTableContainer');
    const toggleButton = document.getElementById('toggleEntregasClientesContactoButton');

    if (reportContainer.style.display === 'block') {
         
        reportContainer.style.display = 'none';
        toggleButton.textContent = 'Mostrar Reporte';
        return;
    }

     
    fetch('http://127.0.0.1:5000/api/vista/entregas_clientes_contacto', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            document.getElementById('entregasClientesContactoOutput').textContent = `Error: ${data.error}`;
        } else {
            const table = document.getElementById('entregasClientesContactoTable');
            table.innerHTML = '';

            if (data.length > 0) {
                // Define the column name to alias mapping
                const columnAliasMap = {
                    'FIDE_ENTREGAS_V_ID_ENTREGA_PK': 'ID Entrega',
                    'V_NOM_CLIENTE': 'Nombre Cliente',
                    'V_APE_CLIENTE': 'Apellido Cliente',
                    'V_DIRECCION_CLIENTE': 'Dirección Cliente',
                    'V_TEL_CLIENTE': 'Teléfono Cliente',
                    'V_CORREO_CLIENTE': 'Correo Cliente'
                };

                // Create table headers with aliases
                const headers = Object.keys(data[0]);
                const headerRow = table.insertRow(-1);
                headers.forEach(header => {
                    const cell = headerRow.insertCell(-1);
                    cell.textContent = columnAliasMap[header] || header;
                });

                // Create table rows
                data.forEach(row => {
                    const tableRow = table.insertRow(-1);
                    headers.forEach(header => {
                        const cell = tableRow.insertCell(-1);
                        cell.textContent = row[header];
                    });
                });

                // Show the table and the download button
                reportContainer.style.display = 'block';
                toggleButton.textContent = 'Esconder Reporte';
                document.getElementById('downloadEntregasClientesContactoButton').style.display = 'inline-block';
            } else {
                table.innerHTML = '<tr><td colspan="100%">No hay datos disponibles.</td></tr>';
            }
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('entregasClientesContactoOutput').textContent = 'Hubo un error al realizar la solicitud.';
    });
}

// Function to download the view data as a PDF
function descargarPDFEntregasClientesContacto() {
    const { jsPDF } = window.jspdf;  
    const doc = new jsPDF();

    const table = document.getElementById('entregasClientesContactoTable');
    const rows = [...table.rows];

    const pdfData = rows.map(row => {
        return [...row.cells].map(cell => cell.textContent);
    });

    doc.autoTable({
        head: [pdfData[0]],
        body: pdfData.slice(1),
    });

    doc.save('Entregas_Clientes_Contacto.pdf');
}

// Function to fetch and display data from the FIDE_VENTAS_DETALLES_V view with column aliases
function obtenerVentasDetalles() {
    const reportContainer = document.getElementById('ventasDetallesTableContainer');
    const toggleButton = document.getElementById('toggleVentasDetallesButton');

    if (reportContainer.style.display === 'block') {
         
        reportContainer.style.display = 'none';
        toggleButton.textContent = 'Mostrar Reporte';
        return;
    }

     
    fetch('http://127.0.0.1:5000/api/vista/ventas_detalles', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            document.getElementById('ventasDetallesOutput').textContent = `Error: ${data.error}`;
        } else {
            const table = document.getElementById('ventasDetallesTable');
            table.innerHTML = '';

            if (data.length > 0) {
                const columnAliasMap = {
                    'FIDE_VENTAS_V_ID_VENTA_PK': 'ID Venta',
                    'V_NOM_PRODUCTO': 'Nombre Producto',
                    'V_PRECIO_PRODUCTO': 'Precio Producto',
                    'V_NOM_CLIENTE': 'Nombre Cliente',
                    'V_APE_CLIENTE': 'Apellido Cliente',
                    'V_CORREO_CLIENTE': 'Correo Cliente',
                    'V_NOM_LOCAL': 'Nombre Local',
                    'V_DIRECCION_CLIENTE': 'Dirección Cliente',
                    'V_FECHA_DE_CREACION': 'Fecha de Creación',
                    'V_ESTADO': 'Estado'
                };

                const headers = Object.keys(data[0]);
                const headerRow = table.insertRow(-1);
                headers.forEach(header => {
                    const cell = headerRow.insertCell(-1);
                    cell.textContent = columnAliasMap[header] || header;
                });

                data.forEach(row => {
                    const tableRow = table.insertRow(-1);
                    headers.forEach(header => {
                        const cell = tableRow.insertCell(-1);
                        cell.textContent = row[header];
                    });
                });

                reportContainer.style.display = 'block';
                toggleButton.textContent = 'Esconder Reporte';
                document.getElementById('downloadVentasDetallesButton').style.display = 'inline-block';
            } else {
                table.innerHTML = '<tr><td colspan="100%">No hay datos disponibles.</td></tr>';
            }
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('ventasDetallesOutput').textContent = 'Hubo un error al realizar la solicitud.';
    });
}

// Function to download the view data as a PDF
function descargarPDFVentasDetalles() {
    const { jsPDF } = window.jspdf;  
    const doc = new jsPDF();

    const table = document.getElementById('ventasDetallesTable');
    const rows = [...table.rows];

    const pdfData = rows.map(row => {
        return [...row.cells].map(cell => cell.textContent);
    });

    doc.autoTable({
        head: [pdfData[0]],
        body: pdfData.slice(1),
    });

    doc.save('Ventas_Detalles.pdf');
}

// Function to fetch and display data from the FIDE_STOCK_PRODUCTOS_V
function obtenerStockProductos() {
    const reportContainer = document.getElementById('stockProductosTableContainer');
    const toggleButton = document.getElementById('toggleStockProductosButton');

    if (reportContainer.style.display === 'block') {
        reportContainer.style.display = 'none';
        toggleButton.textContent = 'Mostrar Reporte';
        return;
    }

    fetch('http://127.0.0.1:5000/api/vista/stock_productos', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            document.getElementById('stockProductosOutput').textContent = `Error: ${data.error}`;
        } else {
            const table = document.getElementById('stockProductosTable');
            table.innerHTML = '';

            if (data.length > 0) {
                const columnAliasMap = {
                    'FIDE_PRODUCTOS_V_ID_PRODUCTO_PK': 'ID Producto',
                    'V_NOM_PRODUCTO': 'Nombre Producto',
                    'V_CANTIDAD_PRODUCTO': 'Cantidad Producto',
                    'V_NOM_LOCAL': 'Nombre Local',
                    'V_DIRECCION_LOCAL': 'Dirección Local'
                };

                const headers = Object.keys(data[0]);
                const headerRow = table.insertRow(-1);
                headers.forEach(header => {
                    const cell = headerRow.insertCell(-1);
                    cell.textContent = columnAliasMap[header] || header;
                });

                data.forEach(row => {
                    const tableRow = table.insertRow(-1);
                    headers.forEach(header => {
                        const cell = tableRow.insertCell(-1);
                        cell.textContent = row[header];
                    });
                });

                reportContainer.style.display = 'block';
                toggleButton.textContent = 'Esconder Reporte';
                document.getElementById('downloadStockProductosButton').style.display = 'inline-block';
            } else {
                table.innerHTML = '<tr><td colspan="100%">No hay datos disponibles.</td></tr>';
            }
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('stockProductosOutput').textContent = 'Hubo un error al realizar la solicitud.';
    });
}

// Function to download the view data as a PDF
function descargarPDFStockProductos() {
    const { jsPDF } = window.jspdf;  
    const doc = new jsPDF();

    const table = document.getElementById('stockProductosTable');
    const rows = [...table.rows];

    const pdfData = rows.map(row => {
        return [...row.cells].map(cell => cell.textContent);
    });

    doc.autoTable({
        head: [pdfData[0]],
        body: pdfData.slice(1),
    });

    doc.save('Stock_Productos.pdf');
}

// Function to fetch and display data from the FIDE_ORDENES_CLIENTES_V view with column aliases
function obtenerOrdenesClientes() {
    const reportContainer = document.getElementById('ordenesClientesTableContainer');
    const toggleButton = document.getElementById('toggleOrdenesClientesButton');

    if (reportContainer.style.display === 'block') {
        reportContainer.style.display = 'none';
        toggleButton.textContent = 'Mostrar Reporte';
        return;
    }

    fetch('http://127.0.0.1:5000/api/vista/ordenes_clientes', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            document.getElementById('ordenesClientesOutput').textContent = `Error: ${data.error}`;
        } else {
            const table = document.getElementById('ordenesClientesTable');
            table.innerHTML = '';

            if (data.length > 0) {
                const columnAliasMap = {
                    'FIDE_FACTURACION_V_ID_FACTURA_PK': 'ID Factura',
                    'V_NOM_CLIENTE': 'Nombre Cliente',
                    'V_NOM_PRODUCTO': 'Nombre Producto',
                    'V_CANTIDAD_PRODUCTO': 'Cantidad Producto',
                    'V_PRECIO_TOTAL': 'Precio Total',
                    'V_FECHA_PAGO': 'Fecha de Pago'
                };

                const headers = Object.keys(data[0]);
                const headerRow = table.insertRow(-1);
                headers.forEach(header => {
                    const cell = headerRow.insertCell(-1);
                    cell.textContent = columnAliasMap[header] || header;
                });

                data.forEach(row => {
                    const tableRow = table.insertRow(-1);
                    headers.forEach(header => {
                        const cell = tableRow.insertCell(-1);
                        cell.textContent = row[header];
                    });
                });

                reportContainer.style.display = 'block';
                toggleButton.textContent = 'Esconder Reporte';
                document.getElementById('downloadOrdenesClientesButton').style.display = 'inline-block';
            } else {
                table.innerHTML = '<tr><td colspan="100%">No hay datos disponibles.</td></tr>';
            }
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('ordenesClientesOutput').textContent = 'Hubo un error al realizar la solicitud.';
    });
}

// Function to download the view data as a PDF
function descargarPDFOrdenesClientes() {
    const { jsPDF } = window.jspdf;  
    const doc = new jsPDF();

    const table = document.getElementById('ordenesClientesTable');
    const rows = [...table.rows];

    const pdfData = rows.map(row => {
        return [...row.cells].map(cell => cell.textContent);
    });

    doc.autoTable({
        head: [pdfData[0]],
        body: pdfData.slice(1),
    });

    doc.save('Ordenes_Clientes.pdf');
}

// Function display data FIDE_PROVEEDORES_RELACIONES_V
function obtenerProveedoresRelaciones() {
    const reportContainer = document.getElementById('proveedoresRelacionesTableContainer');
    const toggleButton = document.getElementById('toggleProveedoresRelacionesButton');

    if (reportContainer.style.display === 'block') {
        reportContainer.style.display = 'none';
        toggleButton.textContent = 'Mostrar Reporte';
        return;
    }

    fetch('http://127.0.0.1:5000/api/vista/proveedores_relaciones', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            document.getElementById('proveedoresRelacionesOutput').textContent = `Error: ${data.error}`;
        } else {
            const table = document.getElementById('proveedoresRelacionesTable');
            table.innerHTML = '';

            if (data.length > 0) {
                const columnAliasMap = {
                    'FIDE_PROVEEDORES_V_ID_PROVEEDOR_PK': 'ID Proveedor',
                    'V_NOM_PROVEDOR': 'Nombre Proveedor',
                    'FIDE_PRODUCTOS_V_ID_PRODUCTO_PK': 'ID Producto',
                    'V_NOM_PRODUCTO': 'Nombre Producto',
                    'V_PRECIO_PRODUCTO': 'Precio Producto'
                };

                const headers = Object.keys(data[0]);
                const headerRow = table.insertRow(-1);
                headers.forEach(header => {
                    const cell = headerRow.insertCell(-1);
                    cell.textContent = columnAliasMap[header] || header;
                });

                data.forEach(row => {
                    const tableRow = table.insertRow(-1);
                    headers.forEach(header => {
                        const cell = tableRow.insertCell(-1);
                        cell.textContent = row[header];
                    });
                });

                reportContainer.style.display = 'block';
                toggleButton.textContent = 'Esconder Reporte';
                document.getElementById('downloadProveedoresRelacionesButton').style.display = 'inline-block';
            } else {
                table.innerHTML = '<tr><td colspan="100%">No hay datos disponibles.</td></tr>';
            }
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('proveedoresRelacionesOutput').textContent = 'Hubo un error al realizar la solicitud.';
    });
}

// Function to download the view data as a PDF
function descargarPDFProveedoresRelaciones() {
    const { jsPDF } = window.jspdf;  
    const doc = new jsPDF();

    const table = document.getElementById('proveedoresRelacionesTable');
    const rows = [...table.rows];

    const pdfData = rows.map(row => {
        return [...row.cells].map(cell => cell.textContent);
    });

    doc.autoTable({
        head: [pdfData[0]],
        body: pdfData.slice(1),
    });

    doc.save('Proveedores_Relaciones.pdf');
}

// Function to fetch and display data from the FIDE_VENTAS_LOCALES_V view with column aliases
function obtenerVentasLocales() {
    const reportContainer = document.getElementById('ventasLocalesTableContainer');
    const toggleButton = document.getElementById('toggleVentasLocalesButton');

    if (reportContainer.style.display === 'block') {
        reportContainer.style.display = 'none';
        toggleButton.textContent = 'Mostrar Reporte';
        return;
    }

     
    fetch('http://127.0.0.1:5000/api/vista/ventas_locales', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            document.getElementById('ventasLocalesOutput').textContent = `Error: ${data.error}`;
        } else {
            const table = document.getElementById('ventasLocalesTable');
            table.innerHTML = '';

            if (data.length > 0) {
                const columnAliasMap = {
                    'FIDE_LOCALES_V_ID_LOCAL_PK': 'ID Local',
                    'V_NOM_LOCAL': 'Nombre Local',
                    'V_TOTAL_VENTAS': 'Total Ventas',
                    'V_CANTIDAD_VENTAS': 'Cantidad Ventas'
                };

                const headers = Object.keys(data[0]);
                const headerRow = table.insertRow(-1);
                headers.forEach(header => {
                    const cell = headerRow.insertCell(-1);
                    cell.textContent = columnAliasMap[header] || header;
                });

                data.forEach(row => {
                    const tableRow = table.insertRow(-1);
                    headers.forEach(header => {
                        const cell = tableRow.insertCell(-1);
                        cell.textContent = row[header];
                    });
                });

                reportContainer.style.display = 'block';
                toggleButton.textContent = 'Esconder Reporte';
                document.getElementById('downloadVentasLocalesButton').style.display = 'inline-block';
            } else {
                table.innerHTML = '<tr><td colspan="100%">No hay datos disponibles.</td></tr>';
            }
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('ventasLocalesOutput').textContent = 'Hubo un error al realizar la solicitud.';
    });
}

// Function to download the view data as a PDF
function descargarPDFVentasLocales() {
    const { jsPDF } = window.jspdf;  
    const doc = new jsPDF();

    const table = document.getElementById('ventasLocalesTable');
    const rows = [...table.rows];

    const pdfData = rows.map(row => {
        return [...row.cells].map(cell => cell.textContent);
    });

    doc.autoTable({
        head: [pdfData[0]],
        body: pdfData.slice(1),
    });

    doc.save('Ventas_Locales.pdf');
}
