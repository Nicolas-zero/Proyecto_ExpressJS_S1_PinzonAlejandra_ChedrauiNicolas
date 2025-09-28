// js/movies.js
document.addEventListener("DOMContentLoaded", async () => {
  const container = document.querySelector(".movies-row");

  try {
    const res = await fetch("http://localhost:3000/api/movies"); // 👈 importante
    if (!res.ok) throw new Error("Error en la respuesta del servidor");

    const movies = await res.json();

    container.innerHTML = ""; // limpiar placeholder

    movies.forEach((movie) => {
      const card = `
        <div class="movie-card">
          <img src="${movie.poster}" alt="${movie.title}">
          <div class="movie-info">
            <h3>${movie.title}</h3>
            <p>${movie.description}</p>
            <span class="stars">⭐ ${movie.rating}</span>
          </div>
        </div>
      `;
      container.innerHTML += card;
    });
  } catch (err) {
    console.error("Error cargando películas:", err);
    container.innerHTML = `<p>No se pudieron cargar las películas. Revisa la consola.</p>`;
  }
});
