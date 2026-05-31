fetch("data/animals.json")
  .then(response => response.json())
  .then(animals => {
      const list = document.getElementById("animalList");

      animals.forEach(animal => {
          const card = document.createElement("div");
          card.classList.add("animal-card");

          card.innerHTML = `
              <img src="${animal.image}" alt="${animal.name}">
              <h3>${animal.name}</h3>
              <p>${animal.description}</p>

              <div class="btn-row">
                  <a href="animal-detail.html?id=${animal.id}" class="details-btn">Details</a>
                  <button class="fav-btn" data-id="${animal.id}">♡ Favourite</button>
              </div>
          `;

          list.appendChild(card);
      });

      // Handle favourites
      document.querySelectorAll(".fav-btn").forEach(btn => {
          btn.addEventListener("click", function () {
              const id = this.getAttribute("data-id");
              let favs = JSON.parse(localStorage.getItem("favourites")) || [];

              if (!favs.includes(id)) {
                  favs.push(id);
                  localStorage.setItem("favourites", JSON.stringify(favs));
                  this.textContent = "✓ Added";
              }
          });
      });

  })
  .catch(error => console.error("Error loading animals:", error));
