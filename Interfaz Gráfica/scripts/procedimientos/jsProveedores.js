document.addEventListener("DOMContentLoaded", function () {
    fetchProveedores();
});

async function fetchProveedores() {
    try {
        const response = await fetch('http://localhost:5000/api/proveedores');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const container = document.getElementById('proveedores-container');

        data.forEach(proveedor => {
            const proveedorDiv = document.createElement('div');
            proveedorDiv.classList.add('col-lg-4', 'col-md-6', 'wow', 'fadeInUp');
            proveedorDiv.setAttribute('data-wow-delay', '0.1s');

            proveedorDiv.innerHTML = `
                <div class="service-item text-center pt-3">
                    <div class="p-4">
                        <i class="fa fa-3x fa-truck text-primary mb-4"></i>
                        <h5 class="mb-3">${proveedor.V_Nom_provedor}</h5>
                        <p><strong>Email:</strong> ${proveedor.V_Correo_proveedor}</p>
                        <p><strong>Producto:</strong> ${proveedor.V_Producto_proveedor}</p>
                        <p><strong>Teléfono:</strong> ${proveedor.V_Tel_proveedor}</p>
                        <p><strong>Dirección:</strong> ${proveedor.V_Direccion_proveedor}</p>
                    </div>
                </div>
            `;
            container.appendChild(proveedorDiv);
        });
    } catch (error) {
        console.error('Error fetching proveedores:', error);
    }
}
