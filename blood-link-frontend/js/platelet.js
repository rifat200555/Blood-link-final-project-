// Show Platelet Hospitals Using Fixed Data (No API)
function showPlateletHospitalsFixed() {
    const division = document.getElementById('division').value;
    const district = document.getElementById('district').value;
    const resultsSection = document.getElementById('resultsSection');
    const plateletResults = document.getElementById('plateletResults');
    const loading = document.getElementById('loadingMessage');

    plateletResults.innerHTML = '';
    resultsSection.classList.add('hidden');

    if (!division) {
        alert('Please select a division.');
        return;
    }

    loading.classList.remove('hidden');

    setTimeout(() => { // simulate loading
        loading.classList.add('hidden');

        const hospitalsInDivision = PLATELET_HOSPITALS[division] || [];
        const filteredHospitals = district
            ? hospitalsInDivision.filter(h => h.district === district)
            : hospitalsInDivision;

        if (filteredHospitals.length === 0) {
            plateletResults.innerHTML = '<p class="no-results">No platelet collection hospitals found in your area.</p>';
        } else {
            filteredHospitals.forEach(hospital => {
                const div = document.createElement('div');
                div.className = 'result-item';
                div.innerHTML = `
                    <h4>${hospital.name}</h4>
                    <p><strong>Address:</strong> ${hospital.address}</p>
                    <p><strong>District:</strong> ${hospital.district}</p>
                    <p><strong>Phone:</strong> ${hospital.phone}</p>
                `;
                plateletResults.appendChild(div);
            });
        }

        resultsSection.classList.remove('hidden');
        resultsSection.scrollIntoView({ behavior: 'smooth' });
    }, 300);
}

// Initialize division and district dropdowns
document.addEventListener('DOMContentLoaded', () => {
    const divisionSelect = document.getElementById('division');
    const districtSelect = document.getElementById('district');

    Object.keys(PLATELET_HOSPITALS).forEach(division => {
        const option = document.createElement('option');
        option.value = division;
        option.textContent = division;
        divisionSelect.appendChild(option);
    });

    divisionSelect.addEventListener('change', () => {
        const division = divisionSelect.value;
        districtSelect.innerHTML = '<option value="">All Districts</option>';
        if (division && PLATELET_HOSPITALS[division]) {
            districtSelect.disabled = false;
            const districts = [...new Set(PLATELET_HOSPITALS[division].map(h => h.district))];
            districts.forEach(d => {
                const option = document.createElement('option');
                option.value = d;
                option.textContent = d;
                districtSelect.appendChild(option);
            });
        } else {
            districtSelect.disabled = true;
        }
    });
});