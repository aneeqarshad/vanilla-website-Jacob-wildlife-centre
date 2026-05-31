const urlParams = new URLSearchParams(window.location.search);
const animalId = urlParams.get('id');

fetch('data/animals.json')
    .then(res => res.json())
    .then(animals => {
        // Find the animal by ID
        const animal = animals.find(a => a.id == animalId);
        
        if (animal) {
            
            const animalDetail = document.getElementById('animalDetail');
            animalDetail.innerHTML = `
                <img src="${animal.image}" alt="${animal.name}">
                <h2>${animal.name}</h2>
                <p>${animal.description}</p>
            `;
            
            
            const favBtn = document.getElementById('favBtn');
            favBtn.addEventListener('click', () => {
                let favs = JSON.parse(localStorage.getItem('favourites')) || [];
                if (!favs.includes(String(animal.id))) {
                    favs.push(String(animal.id));
                    localStorage.setItem('favourites', JSON.stringify(favs));
                    alert(`${animal.name} added to favourites!`);
                } else {
                    alert(`${animal.name} is already in your favourites.`);
                }
            });
        } else {
            animalDetail.innerHTML = `<p>Animal not found.</p>`;
        }
    })
    .catch(error => {
        console.error('Error fetching animal data:', error);
    });
