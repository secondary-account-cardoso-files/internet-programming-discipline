document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.querySelector(".menu-toggle");
  const sideMenu = document.querySelector(".side-menu");
  if (toggleBtn && sideMenu) {
    toggleBtn.addEventListener("click", () => {
      sideMenu.classList.toggle("open");
    });
    // Fecha o menu ao clicar em um link
    sideMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => sideMenu.classList.remove("open"));
    });
  }
});

document.getElementById("exercise01"), function (a, b) {};
