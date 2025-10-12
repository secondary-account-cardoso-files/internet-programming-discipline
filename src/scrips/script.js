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
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("preMatricula");
  const nascimento = document.getElementById("nascimento");

  form.addEventListener("submit", function (e) {
    const pattern = /^\d{2}\/\d{2}\/\d{4}$/;
    if (nascimento.value && !pattern.test(nascimento.value)) {
      e.preventDefault();
      alert("Por favor, informe a data de nascimento no formato dd/mm/aaaa");
      nascimento.focus();
      return false;
    }
    // Exemplo de mensagem de confirmação; remova se não desejar alert.
    alert("Formulário enviado com sucesso (simulação).");
  });
});
