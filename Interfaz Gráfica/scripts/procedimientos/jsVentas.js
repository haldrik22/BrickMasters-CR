// Function to fetch and display data from the FIDE_VENTAS_TB table
function fetchVentas() {
    fetch('http://127.0.0.1:5000/api/ventas', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            document.getElementById('ventasOutput').textContent = `Error: ${data.error}`;
        } else {
            displayVentas(data);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('ventasOutput').textContent = 'Hubo un error al realizar la solicitud.';
    });
}

// Function to display ventas data in the table
function displayVentas(ventas) {
    const table = document.getElementById('ventasTable');
    table.innerHTML = '';

    if (ventas.length > 0) {
        // Create table headers
        const headers = Object.keys(ventas[0]);
        const headerRow = table.insertRow(-1);
        headers.forEach(header => {
            const cell = headerRow.insertCell(-1);
            cell.textContent = header;
        });

        // Create table rows
        ventas.forEach(row => {
            const tableRow = table.insertRow(-1);
            headers.forEach(header => {
                const cell = tableRow.insertCell(-1);
                cell.textContent = row[header];
            });
        });
    } else {
        table.innerHTML = '<tr><td colspan="100%">No hay datos disponibles.</td></tr>';
    }
}

// Function to filter the table based on search input
function filterVentas() {
    const searchValue = document.getElementById('searchBar').value.toLowerCase();
    const table = document.getElementById('ventasTable');
    const rows = table.getElementsByTagName('tr');

    for (let i = 1; i < rows.length; i++) {
        let match = false;
        const cells = rows[i].getElementsByTagName('td');
        for (let j = 0; j < cells.length; j++) {
            if (cells[j].textContent.toLowerCase().includes(searchValue)) {
                match = true;
                break;
            }
        }
        rows[i].style.display = match ? '' : 'none';
    }
}

// Event listener for search input
document.getElementById('searchBar').addEventListener('input', filterVentas);

// Fetch and display ventas data on page load
document.addEventListener('DOMContentLoaded', fetchVentas);
