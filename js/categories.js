document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("categories-container");

  try {
    const res = await fetch("http://localhost:3000/api/categories/movies-by-category");
    const data = await res.json();

    data.forEach(cat => {
      // Crear título de la categoría
      const section = document.createElement("section");
      section.classList.add("category-row");

      const title = document.createElement("h2");
      title.textContent = cat.category;
      section.appendChild(title);

      // Contenedor de películas
      const row = document.createElement("div");
      row.classList.add("movies-row");

      cat.movies.forEach(movie => {
        const card = document.createElement("div");
        card.classList.add("movie-card");
        card.innerHTML = `
          <img src="${movie.poster}" alt="${movie.title}">
          <h3>${movie.title}</h3>
          <p>${movie.description}</p>
          <span>⭐ ${movie.rating}</span>
        `;
        row.appendChild(card);
      });

      section.appendChild(row);
      container.appendChild(section);
    });
  } catch (err) {
    console.error("Error cargando películas:", err);
  }
});
