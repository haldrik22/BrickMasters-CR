async function loadInvoiceLibraries() {
    return new Promise((resolve, reject) => {
        const script1 = document.createElement('script');
        script1.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
        script1.onload = () => {
            const script2 = document.createElement('script');
            script2.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.21/jspdf.plugin.autotable.min.js";
            script2.onload = resolve;
            script2.onerror = reject;
            document.head.appendChild(script2);
        };
        script1.onerror = reject;
        document.head.appendChild(script1);
    });
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
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody></tbody>
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
                        <td>
                            <button class="btn btn-primary edit-btn" data-id="${row.FIDE_FACTURACION_V_ID_FACTURA_PK}">Editar</button>
                            <button class="btn btn-danger" onclick="deleteFacturacion(${row.FIDE_FACTURACION_V_ID_FACTURA_PK})">Eliminar</button>
                            <button class="btn btn-info" onclick="previewInvoice(${row.FIDE_FACTURACION_V_ID_FACTURA_PK})">Previsualizar</button>
                        </td>
                    </tr>
                `;
            });
            setupEditButtons();
        }
    } catch (error) {
        console.error('Error fetching facturación:', error);
    }
}

// ---------------------------------------
// Función: Previsualizar Factura (Updated)
// ---------------------------------------
async function previewInvoice(id_factura) {
    await loadInvoiceLibraries(); 
    
    try {
        console.log(`Previewing invoice for ID: ${id_factura}`);

        // Fetch the facturación data
        const response = await fetch(`http://localhost:5000/api/facturacion/${id_factura}`);
        if (!response.ok) {
            console.log('Error fetching facturación data');
            alert('Error al obtener los datos de la factura para la previsualización');
            return;
        }
        
        const facturaData = await response.json();
        console.log('Facturación data fetched:', facturaData);

        // Fetch the product details including image path from the catalogo API
        const productId = facturaData[0].FIDE_FACTURACION_V_ID_PRODUCTO_FK;
        console.log(`Fetching product details for product ID: ${productId}`);

        const catalogoResponse = await fetch(`http://localhost:5000/api/catalogo/${productId}`);
        if (!catalogoResponse.ok) {
            console.log('Error fetching product details from catalogo');
            throw new Error('Failed to fetch product details from catalogo');
        }
        
        const catalogoData = await catalogoResponse.json();
        console.log('Product details fetched from catalogo:', catalogoData);

        const clientAccount = {
            nom_cliente: facturaData[0].V_Nom_cliente,
            ape_cliente: facturaData[0].V_Ape_cliente,
            correo_cliente: facturaData[0].V_Correo_cliente,
            tel_cliente: facturaData[0].V_Tel_cliente,
            direccion_cliente: facturaData[0].V_Direccion_cliente
        };

        const productDetails = {
            name: facturaData[0].V_Nom_producto,
            quantity: facturaData[0].V_Cantidad_producto,
            price: facturaData[0].V_Precio_Subtotal / facturaData[0].V_Cantidad_producto,
            V_IMAGE_PATH: catalogoData[0].V_IMAGE_PATH, // Use the correct image path from catalogo
            V_DESCRIPCION_PRODUCTO: facturaData[0].V_Descripcion_producto
        };

        const cartData = [productDetails]; // Assuming one product per factura

        console.log('Generating PDF...');
        const doc = new jsPDF();

        // Generate the PDF in-memory
        generatePDF(clientAccount, cartData, id_factura, facturaData[0].FIDE_ENTREGAS_V_ID_ENTREGA_PK, facturaData[0].FIDE_FACTURACION_V_Id_local_FK, facturaData[0].V_Descuento);

        const pdfBlob = doc.output('blob'); // Output the PDF as a blob
        const url = URL.createObjectURL(pdfBlob); // Create a URL for the blob

        console.log("PDF URL:", url); // Debugging

        const iframe = document.getElementById('invoicePreview');
        iframe.src = url;
        $('#previewModal').modal('show');

    } catch (error) {
        console.error('Error previsualizando la factura:', error); //Highlighted error line in console!
        alert('Error al previsualizar la factura');
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

    try {
        const response = await fetch(`http://localhost:5000/api/facturacion/${id_factura}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id_producto, id_descuento, id_cliente, id_local, cantidad_producto,
                precio_subtotal, precio_total, fecha_pago
            })
        });

        if (response.ok) {
            alert('Facturación actualizada exitosamente');
            fetchFacturacion();
            $('#editModal').modal('hide');
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
// Configurar Botones de Edición
// ---------------------------------------
function setupEditButtons() {
    document.querySelectorAll('.edit-btn').forEach(button => {
        button.addEventListener('click', function () {
            const facturaId = this.dataset.id;
            fetch(`http://localhost:5000/api/facturacion/${facturaId}`)
                .then(response => response.json())
                .then(data => {
                    showEditForm(data[0]);
                    $('#editModal').modal('show');
                })
                .catch(error => {
                    console.error('Error fetching facturación data:', error);
                });
        });
    });
}

// ---------------------------------------
// Función: Mostrar Formulario de Edición
// ---------------------------------------
function showEditForm(facturaData) {
    document.getElementById('update_id_factura').value = facturaData.FIDE_FACTURACION_V_ID_FACTURA_PK;
    document.getElementById('update_id_producto_facturacion').value = facturaData.FIDE_FACTURACION_V_ID_PRODUCTO_FK;
    document.getElementById('update_id_descuento_facturacion').value = facturaData.FIDE_FACTURACION_V_ID_DESCUENTO_FK;
    document.getElementById('update_id_cliente_facturacion').value = facturaData.FIDE_FACTURACION_V_ID_CLIENTE_FK;
    document.getElementById('update_id_local_facturacion').value = facturaData.FIDE_FACTURACION_V_ID_LOCAL_FK;
    document.getElementById('update_cantidad_producto').value = facturaData.V_CANTIDAD_PRODUCTO;
    document.getElementById('update_precio_subtotal').value = facturaData.V_PRECIO_SUBTOTAL;
    document.getElementById('update_precio_total').value = facturaData.V_PRECIO_TOTAL;
    document.getElementById('update_facturacion_fecha_pago').value = facturaData.V_FECHA_PAGO;
}

// ---------------------------------------
// Función: Eliminar Facturación
// ---------------------------------------
async function deleteFacturacion(id_factura) {
    if (!id_factura) {
        alert('Por favor, ingresa el ID de la factura a eliminar.');
        return;
    }

    try {
        const response = await fetch(`http://localhost:5000/api/facturacion/${id_factura}`, {
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
// Función: Descargar Factura
// ---------------------------------------
async function downloadInvoice(facturaId) {
    await loadInvoiceLibraries();
    const { jsPDF } = window.jspdf;

    try {
        const response = await fetch(`http://localhost:5000/api/facturacion/${facturaId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch factura data');
        }
        const facturaData = await response.json();

        // Fetch the product details including image path from the catalogo API
        const productId = facturaData[0].FIDE_FACTURACION_V_ID_PRODUCTO_FK;
        const catalogoResponse = await fetch(`http://localhost:5000/api/catalogo/${productId}`);
        if (!catalogoResponse.ok) {
            throw new Error('Failed to fetch product details from catalogo');
        }
        const catalogoData = await catalogoResponse.json();

        const clientAccount = {
            nom_cliente: facturaData[0].V_Nom_cliente,
            ape_cliente: facturaData[0].V_Ape_cliente,
            correo_cliente: facturaData[0].V_Correo_cliente,
            tel_cliente: facturaData[0].V_Tel_cliente,
            direccion_cliente: facturaData[0].V_Direccion_cliente
        };

        const productDetails = {
            name: facturaData[0].V_Nom_producto,
            quantity: facturaData[0].V_Cantidad_producto,
            price: facturaData[0].V_Precio_Subtotal / facturaData[0].V_Cantidad_producto,
            V_IMAGE_PATH: catalogoData[0].V_IMAGE_PATH, // Use the correct image path from catalogo
            V_DESCRIPCION_PRODUCTO: facturaData[0].V_Descripcion_producto
        };

        const cartData = [productDetails]; // Assuming one product per factura for simplicity

        generatePDF(clientAccount, cartData, facturaId, facturaData[0].FIDE_ENTREGAS_V_ID_ENTREGA_PK, facturaData[0].FIDE_FACTURACION_V_Id_local_FK, facturaData[0].V_Descuento);

    } catch (error) {
        console.error('Error generating invoice PDF:', error);
    }
}

// ---------------------------------------
// Función: Generar PDF de Factura
// ---------------------------------------
function generatePDF(clientAccount, cartData, facturaId, entregaId, id_local, descuento) {
    const doc = new jsPDF();

    // Header
    doc.setFillColor(216, 19, 36);
    doc.rect(0, 0, 210, 30, 'F');
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(255, 255, 255);
    doc.text("BrickMasters CR", 10, 20);

    // Client Information
    doc.setFontSize(12);
    doc.setTextColor(11, 33, 84);
    doc.text(`Factura ID: ${facturaId}`, 10, 40);
    doc.text(`Cliente: ${clientAccount.nom_cliente} ${clientAccount.ape_cliente}`, 10, 50);
    doc.text(`Correo: ${clientAccount.correo_cliente}`, 10, 60);
    doc.text(`Teléfono: ${clientAccount.tel_cliente}`, 10, 70);
    doc.text(`Dirección: ${clientAccount.direccion_cliente}`, 10, 80);

    // Product Table with Image
    const tableColumnHeaders = ["Producto", "Cantidad", "Precio", "Subtotal"];
    const tableRows = [];

    cartData.forEach((item, index) => {
        // Add the product info to the table
        tableRows.push([
            item.name,
            item.quantity,
            `$${item.price.toFixed(2)}`,
            `$${(item.quantity * item.price).toFixed(2)}`
        ]);

        // Add the product image below the table row
        if (item.V_IMAGE_PATH) {
            const img = new Image();
            img.src = item.V_IMAGE_PATH;
            doc.addImage(img, 'JPEG', 10, 100 + (index * 30), 50, 50); // Adjust the position and size as needed
        }
    });

    doc.autoTable({
        head: [tableColumnHeaders],
        body: tableRows,
        startY: 135 + cartData.length * 30, // Adjust start position to leave space for images
        theme: 'grid',
        styles: {
            fontSize: 12,
            font: 'Helvetica',
            textColor: [89, 98, 119],
        },
        headStyles: {
            fillColor: [11, 33, 84],
            textColor: [255, 255, 255],
            fontStyle: 'bold',
        },
        alternateRowStyles: { fillColor: [242, 242, 242] },
        margin: { top: 100, left: 10, right: 10 },
    });

    // Totals and IDs
    const subtotal = cartData.reduce((acc, item) => acc + (item.quantity * item.price), 0);
    const total = subtotal * (1 - descuento / 100);        
    doc.text(`Subtotal: $${subtotal.toFixed(2)}`, 10, doc.previousAutoTable.finalY + 10);
    if (descuento > 0) {
        doc.text(`Descuento Aplicado: ${descuento}%`, 10, doc.previousAutoTable.finalY + 20);
    }
    doc.text(`Total: $${total.toFixed(2)}`, 10, doc.previousAutoTable.finalY + 30);
    doc.text(`Entrega ID: ${entregaId}`, 10, doc.previousAutoTable.finalY + 40);
    doc.text(`Local ID: ${id_local}`, 10, doc.previousAutoTable.finalY + 50);
    
    // Footer
    doc.setFillColor(11, 33, 84);
    doc.rect(0, 280, 210, 15, 'F');
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    doc.text("Gracias por su compra en BrickMasters CR", 10, 288);

    doc.save("FacturacionBRICKMASTERS.pdf");
}

// Ejecuta la función para cargar la tabla de facturación al cargar la página
window.onload = fetchFacturacion;
