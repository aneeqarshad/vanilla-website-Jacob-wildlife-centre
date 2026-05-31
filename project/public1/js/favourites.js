Promise.all([
    fetch("data/animals.json").then(res => res.json())
])
.then(([animals]) => {

    let favs = JSON.parse(localStorage.getItem("favourites")) || [];
    const favList = document.getElementById("favList");
    const noFavs = document.getElementById("noFavs");

    if (favs.length === 0) {
        noFavs.style.display = "block";
        return;
    }

    let favAnimals = animals.filter(a => favs.includes(String(a.id)));

    favAnimals.forEach(animal => {
        const card = document.createElement("div");
        card.classList.add("fav-card");

        card.innerHTML = `
            <img src="${animal.image}" alt="${animal.name}">
            <h3>${animal.name}</h3>
            <p>${animal.description}</p>

            <div class="btn-row">
                <a href="animal-detail.html?id=${animal.id}" class="details-btn">Details</a>
                <button class="remove-btn" data-id="${animal.id}">Remove</button>
            </div>
        `;

        favList.appendChild(card);
    });

    document.querySelectorAll(".remove-btn").forEach(btn => {
        btn.addEventListener("click", function () {
            const id = this.getAttribute("data-id");
            favs = favs.filter(f => f !== id);
            localStorage.setItem("favourites", JSON.stringify(favs));
            location.reload();
        });
    });

});
