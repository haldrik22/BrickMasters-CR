async function registerClient() {
    console.log("Register function called");  // This will confirm if the function is being triggered

    const nom_cliente = document.getElementById('regNomCliente')?.value;
    const ape_cliente = document.getElementById('regApeCliente')?.value;
    const correo_cliente = document.getElementById('regCorreoCliente')?.value;
    const tel_cliente = document.getElementById('regTelCliente')?.value;
    const direccion_cliente = document.getElementById('regDireccionCliente')?.value;
    const password = document.getElementById('regPasswordCliente')?.value;

    try {
        const response = await fetch('http://127.0.0.1:5000/api/clientes/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nom_cliente,
                ape_cliente,
                correo_cliente,
                tel_cliente,
                direccion_cliente,
                password
            })
        });

        if (response.ok) {
            alert('Client registered successfully');
            $('#registerModal').modal('hide');
        } else {
            const errorData = await response.json();
            alert(`Error registering client: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Error registering client:', error);
        alert('Error registering client.');
    }
}

async function loginClient() {
    const correo_cliente = document.getElementById('loginEmail')?.value;
    const password = document.getElementById('loginPassword')?.value;

    try {
        const response = await fetch('http://127.0.0.1:5000/api/clientes/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                correo_cliente,
                password
            })
        });

        if (response.ok) {
            alert('Login successful');
            // Redirect to the main app page or dashboard
            window.location.href = 'Clientes.html';  // Change to your desired page
        } else {
            const errorData = await response.json();
            alert(`Login failed: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Error logging in:', error);
        alert('Error logging in.');
    }
}
