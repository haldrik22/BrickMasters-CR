async function openCatalogoAdminView() {
    try {
        const response = await fetch('http://127.0.0.1:5000/api/catalogo');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const tableBody = document.querySelector('#catalogo-admin-table tbody');
        tableBody.innerHTML = '';

        data.forEach(product => {
            const rowHtml = `
                <tr>
                    <td>${product.FIDE_CATALOGO_V_Id_producto_PK}</td>
                    <td>${product.V_Nom_producto}</td>
                    <td>${product.V_Precio_producto}</td>
                    <td>${product.V_Descripcion_producto}</td>
                    <td>${product.V_Cantidad_producto}</td>
                    <td><img src="${product.V_Image_Path}" alt="Imagen del Producto" class="img-thumbnail" style="width: 80px; height: auto;"></td>
                    <td>
                        <button class="btn btn-primary" onclick="openEditarImagenModal(${product.FIDE_CATALOGO_V_Id_producto_PK})">Editar Imagen</button>
                        <button class="btn btn-danger" onclick="removerDeCatalogo(${product.FIDE_CATALOGO_V_Id_producto_PK})">Remover</button>
                    </td>
                </tr>
            `;
            tableBody.innerHTML += rowHtml;
        });

        $('#catalogoAdminModal').modal('show');
    } catch (error) {
        console.error('Error fetching catalogo:', error);
    }
}

// 'Editar Imagen' modal
function openEditarImagenModal(productId) {
    document.getElementById('editarCatalogoProductoId').value = productId;
    document.getElementById('editarImagenUpload').value = '';
    $('#editarImagenModal').modal('show');
}

// 'Editar Imagen' proceso
async function editarImagenCatalogo() {
    const productId = document.getElementById('editarCatalogoProductoId').value;
    const imageUpload = document.getElementById('editarImagenUpload').files[0];

    if (!imageUpload) {
        alert('Por favor, selecciona una imagen para actualizar.');
        return;
    }

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
        const finalImagePath = uploadData.imagePath;

        // Update the image path in the Catalogo table
        const response = await fetch(`http://127.0.0.1:5000/api/catalogo/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                imagen_catalogo_producto: finalImagePath
            })
        });

        if (response.ok) {
            alert('Imagen actualizada exitosamente.');
            $('#editarImagenModal').modal('hide');
        } else {
            const errorData = await response.json();
            alert(`Error updating image: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Error updating image:', error);
        alert('Error updating image.');
    }
}

async function removerDeCatalogo(productId) {
    if (confirm('¿Estás seguro de que quieres remover este producto del catálogo?')) {
        try {
            const response = await fetch(`http://127.0.0.1:5000/api/catalogo/${productId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert('Producto removido del catálogo exitosamente');
                openCatalogoAdminView(); // Refresh the view
            } else {
                const errorData = await response.json();
                alert(`Error removing product from catalog: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error removing product from catalog:', error);
            alert('Error removing product from catalog.');
        }
    }
}

