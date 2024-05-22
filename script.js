async function fetchLaunchData() {
    const launchType = document.getElementById('launchType').value;
    let url = 'https://api.spacexdata.com/v4/launches/';

    switch (launchType) {
        case 'latest':
            url += 'latest';
            break;
        case 'upcoming':
            url += 'upcoming';
            break;
        default:
            url += 'latest';
    }

    try {
        const response = await fetch(url);
        const launches = await response.json();

        const launchElement = document.getElementById('launchInfo');
        launchElement.innerHTML = '';

        if (Array.isArray(launches)) {
            launches.forEach(launch => {
                launchElement.innerHTML += `
                    <p><strong>Missão:</strong> ${launch.name}</p>
                    <p><strong>Data:</strong> ${new Date(launch.date_utc).toLocaleDateString()}</p>
                    <p><strong>Detalhes:</strong> ${launch.details || "N/A"}</p>
                    <hr />
                `;
            });
        } else {
            launchElement.innerHTML = `
                <p><strong>Missão:</strong> ${launches.name}</p>
                <p><strong>Data:</strong> ${new Date(launches.date_utc).toLocaleDateString()}</p>
                <p><strong>Detalhes:</strong> ${launches.details || "N/A"}</p>
            `;
        }
    } catch (error) {
        console.error('Falha ao buscar dados do lançamento:', error);
        document.getElementById('launchInfo').innerHTML = '<p>Erro ao carregar informações do lançamento.</p>';
    }
}

function revelarEasterEgg() {
    const easterEgg = document.getElementById('easterEgg');
    if (easterEgg.style.display === 'none' || easterEgg.style.display === '') {
        easterEgg.style.display = 'block';
    } else {
        easterEgg.style.display = 'none';
    }
}
