document.addEventListener("DOMContentLoaded", function () {
    const localesContainer = document.getElementById('locales-container');

    async function fetchLocales() {
        try {
            const response = await fetch('http://127.0.0.1:5000/api/locales');
            if (!response.ok) {
                throw new Error('Error fetching locales data');
            }
            const locales = await response.json();

            localesContainer.innerHTML = '';

            locales.forEach(local => {
                const localDiv = document.createElement('div');
                localDiv.classList.add('col-lg-4', 'col-md-6', 'wow', 'fadeInUp');
                localDiv.setAttribute('data-wow-delay', '0.1s');

                localDiv.innerHTML = `
                    <div class="service-item text-center pt-3">
                        <div class="p-4">
                            <i class="fa fa-3x fa-map-marker-alt text-primary mb-4"></i>
                            <h5 class="mb-3">${local.V_Nom_local}</h5>
                            <p>${local.V_Direccion_local}</p>
                            <p>Teléfono: ${local.V_Tel_local}</p>
                            <p>Horario de Atención: Lunes a Sabado, 9am - 6pm</p>
                        </div>
                    </div>
                `;

                localesContainer.appendChild(localDiv);
            });
        } catch (error) {
            console.error('Error fetching locales:', error);
            localesContainer.innerHTML = '<p>Lo sentimos, no pudimos cargar la información de los locales en este momento.</p>';
        }
    }

    fetchLocales();
});
