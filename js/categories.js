// public/js/categories.js
document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("categories-container");

  try {
    //  Traer datos del backend
    const res = await fetch("http://localhost:3000/api/categories/movies-by-category/all");
    const data = await res.json();

    // Recorrer categorías
    data.forEach(cat => {
      // Crear sección por categoría
      const section = document.createElement("section");
      section.classList.add("category-row");

      // Título de la categoría
      const title = document.createElement("h2");
      title.textContent = cat.category;
      section.appendChild(title);

      // Contenedor de películas
      const moviesRow = document.createElement("div");
      moviesRow.classList.add("movies-row");

      // Crear cards de películas
      cat.movies.forEach(movie => {
        const card = document.createElement("div");
        card.classList.add("movie-card");

        card.innerHTML = `
          <img src="${movie.poster}" alt="${movie.title}">
          <h3>${movie.title}</h3>
          <p>${movie.year}</p>
        `;

        moviesRow.appendChild(card);
      });

      section.appendChild(moviesRow);
      container.appendChild(section);
    });
  } catch (error) {
    console.error("❌ Error cargando categorías:", error);
    container.innerHTML = `<p style="color:red;">No se pudieron cargar las categorías.</p>`;
  }
});
