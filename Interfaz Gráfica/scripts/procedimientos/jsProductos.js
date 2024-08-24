// TABLA PRODUCTOS

// ---------------------------------------
// Función: Crear una Nueva Entrada en Productos
// ---------------------------------------
async function createProducto() {
    const nom_producto = document.getElementById('create_nom_producto')?.value;
    const piezas_producto = document.getElementById('create_piezas_producto')?.value;
    const precio_producto = document.getElementById('create_precio_producto')?.value;
    const cantidad_producto = document.getElementById('create_cantidad_producto')?.value;
    const descripcion_producto = document.getElementById('create_descripcion_producto')?.value;
    const id_proveedor = document.getElementById('create_id_proveedor')?.value; // Optional field

    try {
        const response = await fetch('http://127.0.0.1:5000/api/productos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nom_producto,
                piezas_producto,
                precio_producto,
                cantidad_producto,
                descripcion_producto,
                id_proveedor 
            })
        });

        if (response.ok) {
            alert('Producto creado exitosamente');
            fetchProductos();
            $('#createModal').modal('hide');  // Cierra el modal de crear producto
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
// Función: Obtener Datos de la Tabla Productos
// Descripción: Trae la tabla completa de la base de datos y la muestra en una tabla con botones para editar, eliminar, y agregar a catálogo.
// ---------------------------------------
async function fetchProductos() {
    try {
        const response = await fetch('http://127.0.0.1:5000/api/productos');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const productos = await response.json();

        const table = document.getElementById('productos-table');
        if (table) {
            table.innerHTML = `
                <thead>
                    <tr>
                        <th>ID Producto</th>
                        <th>Nombre</th>
                        <th>Piezas</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Descripción</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody></tbody>
            `;

            const tbody = table.querySelector('tbody');
            for (const producto of productos) {
                const { isInCatalog, isInactive } = await checkProductInCatalogo(producto.FIDE_PRODUCTOS_V_ID_PRODUCTO_PK);
                productos.sort((a, b) => a.FIDE_PRODUCTOS_V_Id_producto_PK - b.FIDE_PRODUCTOS_V_Id_producto_PK);
                const rowHtml = `
                    <tr>
                        <td>${producto.FIDE_PRODUCTOS_V_ID_PRODUCTO_PK}</td>
                        <td>${producto.V_NOM_PRODUCTO}</td>
                        <td>${producto.V_PIEZAS_PRODUCTO}</td>
                        <td>${producto.V_PRECIO_PRODUCTO}</td>
                        <td>${producto.V_CANTIDAD_PRODUCTO}</td>
                        <td>${producto.V_DESCRIPCION_PRODUCTO}</td>
                        <td>
                            <div class="btn-group">
                                <button class="btn btn-primary edit-btn" data-producto-id="${producto.FIDE_PRODUCTOS_V_ID_PRODUCTO_PK}">Editar</button>
                                <button class="btn btn-danger" onclick="deleteProducto(${producto.FIDE_PRODUCTOS_V_ID_PRODUCTO_PK})">Eliminar</button>
                                <button class="btn btn-dark catalogo-btn" data-producto-id="${producto.FIDE_PRODUCTOS_V_ID_PRODUCTO_PK}" onclick="openAgregarCatalogoModal(${producto.FIDE_PRODUCTOS_V_ID_PRODUCTO_PK})"></button>
                            </div>
                        </td>
                    </tr>
                `;
                tbody.innerHTML += rowHtml;

                updateAgregarCatalogoButton(producto.FIDE_PRODUCTOS_V_ID_PRODUCTO_PK, isInCatalog, isInactive);
            }

            setupEditButtonsProductos();
        }
    } catch (error) {
        console.error('Error fetching productos:', error);
    }
}

// ---------------------------------------
// Función: Configurar Botones de Edición
// Descripción: Añade eventos a los botones de editar para mostrar el formulario de edición con los datos del producto seleccionado.
// ---------------------------------------
function setupEditButtonsProductos() {
    document.querySelectorAll('.edit-btn').forEach(button => {
        button.addEventListener('click', function () {
            const productoId = this.dataset.productoId;
            fetch(`http://127.0.0.1:5000/api/productos/${productoId}`)
                .then(response => response.json())
                .then(data => {
                    showEditFormProducto(data);
                    $('#editModal').modal('show');  // Muestra el modal de edición
                })
                .catch(error => {
                    console.error('Error fetching producto data:', error);
                });
        });
    });
}

// ---------------------------------------
// Función: Mostrar Formulario de Edición
// Descripción: Muestra el formulario de edición con los datos del producto seleccionado.
// ---------------------------------------
function showEditFormProducto(productoData) {
    document.getElementById('update_id_producto').value = productoData.FIDE_PRODUCTOS_V_ID_PRODUCTO_PK;
    document.getElementById('update_nom_producto').value = productoData.V_NOM_PRODUCTO;
    document.getElementById('update_piezas_producto').value = productoData.V_PIEZAS_PRODUCTO;
    document.getElementById('update_precio_producto').value = productoData.V_PRECIO_PRODUCTO;
    document.getElementById('update_cantidad_producto').value = productoData.V_CANTIDAD_PRODUCTO;
    document.getElementById('update_descripcion_producto').value = productoData.V_DESCRIPCION_PRODUCTO;
}

// ---------------------------------------
// Función: Actualizar una Entrada de Productos
// Descripción: Envía los datos actualizados del producto al backend para modificar la base de datos.
// ---------------------------------------
async function updateProducto() {
    const id_producto = document.getElementById('update_id_producto')?.value;
    const nom_producto = document.getElementById('update_nom_producto')?.value;
    const piezas_producto = document.getElementById('update_piezas_producto')?.value;
    const precio_producto = document.getElementById('update_precio_producto')?.value;
    const cantidad_producto = document.getElementById('update_cantidad_producto')?.value;
    const descripcion_producto = document.getElementById('update_descripcion_producto')?.value;

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
                descripcion_producto
            })
        });

        if (response.ok) {
            alert('Producto actualizado exitosamente');
            fetchProductos();
            $('#editModal').modal('hide');  
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
// Descripción: Cambia el estado del producto a "INACTIVO" en la base de datos y oculta la entrada en la tabla.
// ---------------------------------------
async function deleteProducto(id_producto) {
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

            await fetch(`http://127.0.0.1:5000/api/catalogo/${id_producto}`, {
                method: 'DELETE'
            });

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
// Función: Abrir Modal de Crear Producto
// ---------------------------------------
function openCreateModalProducto() {
    $('#createModal').modal('show');
}

// ---------------------------------------
// Función: Filtrar Productos
// Descripción: Filtra las entradas de la tabla productos basado en la categoría seleccionada y la entrada del campo de búsqueda.
// ---------------------------------------
function filterProductos() {
    const searchCategory = document.getElementById('search-category').value.toLowerCase();
    const searchTerm = document.getElementById('search-bar').value.toLowerCase();
    const table = document.getElementById('productos-table');
    const rows = table.getElementsByTagName('tr');

    for (let i = 1; i < rows.length; i++) { 
        const cells = rows[i].getElementsByTagName('td');
        let match = false;

        if (searchCategory === 'id' && cells[0].innerText.toLowerCase().includes(searchTerm)) {
            match = true;
        } else if (searchCategory === 'nombre' && cells[1].innerText.toLowerCase().includes(searchTerm)) {
            match = true;
        } else if (searchCategory === 'piezas' && cells[2].innerText.toLowerCase().includes(searchTerm)) {
            match = true;
        } else if (searchCategory === 'precio' && cells[3].innerText.toLowerCase().includes(searchTerm)) {
            match = true;
        }

        rows[i].style.display = match ? '' : 'none';
    }
}

// ---------------------------------------
// Función: Obtener y Poblar la Lista de Proveedores
// ---------------------------------------
async function loadProveedoresDropdown() {
    try {
        const response = await fetch('http://127.0.0.1:5000/api/proveedores');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const proveedores = await response.json();
        const dropdown = document.getElementById('create_id_proveedor');
        dropdown.innerHTML = '<option value="">-- Seleccione un Proveedor --</option>'; 
        proveedores.forEach(proveedor => {
            const option = document.createElement('option');
            option.value = proveedor.FIDE_PROVEEDORES_V_Id_proveedor_PK;
            option.text = proveedor.V_Nom_provedor;
            dropdown.appendChild(option);
        });
    } catch (error) {
        console.error('Error loading proveedores:', error);
    }
}

// Llamar a la función para poblar el dropdown cuando se carga el modal de crear producto
document.getElementById('createModal').addEventListener('show.bs.modal', loadProveedoresDropdown);

// 'Agregar a Catálogo' modal
function openAgregarCatalogoModal(productId) {
    document.getElementById('catalogoProductoId').value = productId;
    document.getElementById('catalogoImageUpload').value = ''; 
    $('#agregarCatalogoModal').modal('show');
}

// 'Agregar a Catálogo' proceso
async function agregarProductoACatalogo() {
    const productId = document.getElementById('catalogoProductoId').value;
    const imageUpload = document.getElementById('catalogoImageUpload').files[0];

    if (!imageUpload) {
        alert('Por favor, sube una imagen.');
        return;
    }

    let finalImagePath = '';

    const formData = new FormData();
    formData.append('image', imageUpload);

    try {
        const uploadResponse = await fetch('http://127.0.0.1:5000/api/upload_image', {
            method: 'POST',
            body: formData,
        });

        if (!uploadResponse.ok) {
            throw new Error('Failed to upload image.');
        }

        const uploadData = await uploadResponse.json();
        finalImagePath = uploadData.imagePath;
    } catch (error) {
        console.error('Error uploading image:', error);
        alert('Error uploading image.');
        return;
    }

    try {
        const response = await fetch('http://127.0.0.1:5000/api/catalogo/agregar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id_producto: productId,
                image_path: finalImagePath
            })
        });

        if (response.ok) {
            alert('Producto agregado a catálogo exitosamente');
            $('#agregarCatalogoModal').modal('hide');
        } else {
            const errorData = await response.json();
            alert(`Error adding product to catalog: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Error adding product to catalog:', error);
        alert('Error adding product to catalog.');
    }
}    

function updateAgregarCatalogoButton(productId, isInCatalog, isInactive) {
    const button = document.querySelector(`button[data-producto-id="${productId}"].catalogo-btn`);
    const btnGroup = button.parentElement;

    if (isInactive && isInCatalog) {
        button.innerText = 'Producto Desactivado';
        button.classList.add('btn-warning');
        button.disabled = true;
    } else if (isInCatalog) {
        button.innerText = 'Producto Agregado';
        button.classList.add('btn-secondary');
        button.disabled = true;
    } else {
        button.innerText = 'Agregar a Catálogo';
        button.classList.remove('btn-secondary', 'btn-warning');
        button.classList.add('btn-dark');
        button.disabled = false;
    }
}

// Function to check if a product is in the catalog
async function checkProductInCatalogo(productId) {
    try {
        const response = await fetch(`http://127.0.0.1:5000/api/catalogo/${productId}`);
        if (!response.ok) {
            if (response.status === 404) {
                return { isInCatalog: false, isInactive: false };
            } else {
                throw new Error('Network response was not ok');
            }
        }
        const product = await response.json();
        const isInactive = product && product.V_ESTADO === 'INACTIVO';
        return { isInCatalog: true, isInactive };
    } catch (error) {
        console.error('Error checking if product is in catalog:', error);
        return { isInCatalog: false, isInactive: false };
    }
}

// ---------------------------------------
// Ejecuta la función para cargar la tabla de productos al cargar la página
// ---------------------------------------
window.onload = fetchProductos;
