// Elementos
const logoutBtn = document.getElementById("logout-btn");
const logoutModal = document.getElementById("logout-modal");
const cancelBtn = document.getElementById("cancel-btn");
const confirmBtn = document.getElementById("confirm-btn");

// Abrir modal
logoutBtn.addEventListener("click", () => {
  logoutModal.style.display = "flex";
});

// Cancelar cierre
cancelBtn.addEventListener("click", () => {
  logoutModal.style.display = "none";
});

// Confirmar salida
confirmBtn.addEventListener("click", () => {
  // Aquí puedes redirigir al login o cerrar sesión
  window.location.href = "/login.html"; 
});
