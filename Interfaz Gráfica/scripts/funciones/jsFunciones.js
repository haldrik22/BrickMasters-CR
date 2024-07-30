document.addEventListener('DOMContentLoaded', () => {
    // Función correo
    window.getClienteEmail = async () => {
        const idCliente = document.getElementById('id_cliente').value;
        if (!idCliente) {
            alert('Por favor, ingrese el ID del cliente.');
            return;
        }

        const response = await fetch('/obtener_correo_cliente', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id_cliente: parseInt(idCliente) })
        });

        const data = await response.json();
        document.getElementById('resultado_correo').textContent = data.correo || 'Error al obtener correo';
    };
});
