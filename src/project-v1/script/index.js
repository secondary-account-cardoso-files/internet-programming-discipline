// ======== Máscaras =========
const aplicarMascara = (valor, tipo) => {
  valor = valor.replace(/\D/g, "");

  if (tipo === "cpf") {
    valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  }

  if (tipo === "cep") {
    valor = valor.replace(/(\d{5})(\d)/, "$1-$2");
  }

  if (tipo === "data") {
    valor = valor.replace(/(\d{2})(\d)/, "$1/$2");
    valor = valor.replace(/(\d{2})(\d)/, "$1/$2");
    valor = valor.replace(/(\d{4})(\d)/, "$1");
  }

  return valor;
};

// ======== Validações =========
const validarCPF = (cpf) => {
  cpf = cpf.replace(/\D/g, "");
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

  let soma = 0;
  for (let i = 0; i < 9; i++) soma += parseInt(cpf.charAt(i)) * (10 - i);
  let resto = 11 - (soma % 11);
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.charAt(9))) return false;

  soma = 0;
  for (let i = 0; i < 10; i++) soma += parseInt(cpf.charAt(i)) * (11 - i);
  resto = 11 - (soma % 11);
  if (resto === 10 || resto === 11) resto = 0;
  return resto === parseInt(cpf.charAt(10));
};

const validarCEP = (cep) => {
  cep = cep.replace(/\D/g, "");
  return cep.length === 8;
};

const validarData = (data) => {
  const partes = data.split("/");
  if (partes.length !== 3) return false;

  const dia = parseInt(partes[0], 10);
  const mes = parseInt(partes[1], 10);
  const ano = parseInt(partes[2], 10);

  if (isNaN(dia) || isNaN(mes) || isNaN(ano)) return false;

  const dataObj = new Date(ano, mes - 1, dia);
  if (
    dataObj.getDate() !== dia ||
    dataObj.getMonth() + 1 !== mes ||
    dataObj.getFullYear() !== ano
  ) {
    return false;
  }

  // Verificar idade mínima de 18 anos
  const hoje = new Date();
  const idade = hoje.getFullYear() - ano;
  if (
    idade < 18 ||
    (idade === 18 &&
      (hoje.getMonth() + 1 < mes ||
        (hoje.getMonth() + 1 === mes && hoje.getDate() < dia)))
  ) {
    return false;
  }

  return true;
};

// ======== Validação no Submit =========
document.getElementById("cadastroForm").addEventListener("submit", (event) => {
  event.preventDefault();

  let valido = true;

  // Nome
  const nome = document.getElementById("nome").value.trim();
  if (nome.length < 3) {
    document.getElementById("nomeError").innerText = "Digite um nome válido.";
    valido = false;
  } else {
    document.getElementById("nomeError").innerText = "";
  }

  // CPF
  if (!validarCPF(cpfInput.value)) {
    document.getElementById("cpfError").innerText = "CPF inválido.";
    valido = false;
  } else {
    document.getElementById("cpfError").innerText = "";
  }

  // CEP
  if (!validarCEP(cepInput.value)) {
    document.getElementById("cepError").innerText = "CEP inválido.";
    valido = false;
  } else {
    document.getElementById("cepError").innerText = "";
  }

  // Data de Nascimento
  if (!validarData(dataInput.value)) {
    document.getElementById("dataError").innerText =
      "Data inválida ou menor de 18 anos.";
    valido = false;
  } else {
    document.getElementById("dataError").innerText = "";
  }

  if (valido) {
    alert("Formulário enviado com sucesso!");
    event.target.reset();
  }
});

// ======== Navegação entre páginas =========
function loadPage(page) {
  const section = document.querySelector("main.grid-layout section");
  if (!section) return;
  fetch(`./pages/${page}`)
    .then((response) => {
      if (!response.ok) throw new Error("Página não encontrada");
      return response.text();
    })
    .then((html) => {
      section.innerHTML = html;
      if (page === "cadastro.html") {
        setupCadastroForm();
      }
      if (page === "users.html") {
        renderUsers();
      }
      if (page === "livros.html") {
        renderLivrosPage();
      }
      if (page === "inicio.html") {
        renderCollaborators();
      }
      if (page === "table.html") {
        renderTablePage();
      }
    })
    .catch((err) => {
      section.innerHTML = `<p>Erro ao carregar a página: ${err.message}</p>`;
    });
}

// Carrega a página inicial ao carregar o documento
document.addEventListener("DOMContentLoaded", function () {
  loadPage("inicio.html");
});

// Expor loadPage globalmente para os links HTML
window.loadPage = loadPage;

function setupCadastroForm() {
  const form = document.getElementById("cadastroForm");
  if (!form) return;

  // Verificar se está editando
  const editingIndex = localStorage.getItem("editingClientIndex");
  if (editingIndex !== null) {
    const clientes = JSON.parse(localStorage.getItem("clientes") || "[]");
    const cliente = clientes[editingIndex];
    if (cliente) {
      // Preencher formulário com dados existentes
      setTimeout(() => {
        form.nome.value = cliente.nome || "";
        form.cpf.value = cliente.cpf || "";
        form.cep.value = cliente.cep || "";
        form.rua.value = cliente.rua || "";
        form.numero.value = cliente.numero || "";
        if (form.complemento)
          form.complemento.value = cliente.complemento || "";
        form.cidade.value = cliente.cidade || "";
        form.estado.value = cliente.estado || "";
        form.dataNascimento.value = cliente.dataNascimento || "";

        // Mudar texto do botão
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) submitBtn.textContent = "Atualizar";
      }, 100);
    }
  }

  // Adiciona máscaras nos inputs dinâmicos
  const cpfInput = document.getElementById("cpf");
  const cepInput = document.getElementById("cep");
  const dataInput = document.getElementById("dataNascimento");

  cpfInput.addEventListener("input", () => {
    cpfInput.value = aplicarMascara(cpfInput.value, "cpf");
  });

  cepInput.addEventListener("input", () => {
    cepInput.value = aplicarMascara(cepInput.value, "cep");
  });

  dataInput.addEventListener("input", () => {
    dataInput.value = aplicarMascara(dataInput.value, "data");
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Limpa erros
    [
      "nomeError",
      "cpfError",
      "cepError",
      "ruaError",
      "numeroError",
      "cidadeError",
      "estadoError",
      "dataError",
      "complementoError",
    ].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.textContent = "";
    });

    // Coleta dados
    const nome = form.nome.value.trim();
    const cpf = form.cpf.value.trim();
    const cep = form.cep.value.trim();
    const rua = form.rua.value.trim();
    const numero = form.numero.value.trim();
    const complemento = (form.complemento?.value || "").trim();
    const cidade = form.cidade.value.trim();
    const estado = form.estado.value.trim();
    const dataNascimento = form.dataNascimento.value.trim();

    let valid = true;

    if (!nome) {
      document.getElementById("nomeError").textContent = "Nome obrigatório.";
      valid = false;
    }
    if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf)) {
      document.getElementById("cpfError").textContent =
        "CPF deve estar no formato 000.000.000-00.";
      valid = false;
    }
    if (!/^\d{5}-\d{3}$/.test(cep)) {
      document.getElementById("cepError").textContent =
        "CEP deve estar no formato 00000-000.";
      valid = false;
    }
    if (!rua) {
      document.getElementById("ruaError").textContent = "Rua obrigatória.";
      valid = false;
    }
    if (!numero) {
      document.getElementById("numeroError").textContent =
        "Número obrigatório.";
      valid = false;
    }
    if (!cidade) {
      document.getElementById("cidadeError").textContent =
        "Cidade obrigatória.";
      valid = false;
    }
    if (!estado || estado.length !== 2) {
      document.getElementById("estadoError").textContent =
        "UF obrigatório (2 letras).";
      valid = false;
    }
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(dataNascimento)) {
      document.getElementById("dataError").textContent =
        "Data deve estar no formato dd/mm/aaaa.";
      valid = false;
    }

    if (!valid) return;

    const clientes = JSON.parse(localStorage.getItem("clientes") || "[]");
    const clienteData = {
      nome,
      cpf,
      cep,
      rua,
      numero,
      complemento,
      cidade,
      estado,
      dataNascimento,
    };

    if (editingIndex !== null) {
      // Atualizar cliente existente
      clientes[editingIndex] = clienteData;
      localStorage.removeItem("editingClientIndex");
      alert("Cliente atualizado com sucesso!");
    } else {
      // Adicionar novo cliente
      clientes.push(clienteData);
      alert("Cliente cadastrado com sucesso!");
    }

    localStorage.setItem("clientes", JSON.stringify(clientes));
    loadPage("table.html");
  });
}

// Consulta na API do Github
function projectCollaboratorsGithub() {
  const cardosofiles = fetch("https://api.github.com/users/cardosofiles").then(
    (res) => res.json()
  );
  const joaoatelie = fetch("https://api.github.com/users/joaoatelie").then(
    (res) => res.json()
  );
  const marcosLima = fetch("https://api.github.com/users/marcoslima5789").then(
    (res) => res.json()
  );
  return Promise.all([cardosofiles, joaoatelie, marcosLima]);
}

// Renderiza cartões dos colaboradores no inicio.html
function renderCollaborators() {
  const container = document.getElementById("collaborators");
  if (!container) return;
  container.innerHTML = `<p style="text-align:center;color:#6b7280;">Carregando colaboradores...</p>`;

  projectCollaboratorsGithub()
    .then((users) => {
      const cards = users
        .map((user) => {
          const nome = user.name || "(sem nome)";
          const login = user.login || "";
          const avatar = user.avatar_url || "";
          const url = user.html_url || `https://github.com/${login}`;
          return `
            <article class="collab-card">
              <img src="${avatar}" alt="Avatar de ${login}">
              <h4 title="${nome}">${nome}</h4>
              <p>@${login}</p>
              <a href="${url}" target="_blank" rel="noopener">Ver perfil</a>
            </article>
          `;
        })
        .join("");
      container.innerHTML = cards;
    })
    .catch(() => {
      container.innerHTML = `<p style="text-align:center;color:#dc2626;">Não foi possível carregar os colaboradores agora.</p>`;
    });
}

// Renderiza a tabela de usuários
function renderUsers() {
  const section = document.querySelector("main.grid-layout section");
  const container = document.getElementById("users-table-container") || section;
  const clientes = JSON.parse(localStorage.getItem("clientes") || "[]");
  let html = "";
  if (clientes.length === 0) {
    html += `<p>Nenhum cliente cadastrado.</p>`;
  } else {
    html += `<table class="users-table">
      <thead>
        <tr>
          <th>Nome</th>
          <th>CPF</th>
          <th>CEP</th>
          <th>Rua</th>
          <th>Nº</th>
          <th>Complemento</th>
          <th>Cidade</th>
          <th>UF</th>
          <th>Data de Nascimento</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>`;
    clientes.forEach((c, i) => {
      html += `<tr>
        <td>${c.nome}</td>
        <td>${c.cpf}</td>
        <td>${c.cep}</td>
        <td>${c.rua}</td>
        <td>${c.numero}</td>
        <td>${c.complemento || ""}</td>
        <td>${c.cidade}</td>
        <td>${c.estado}</td>
        <td>${c.dataNascimento}</td>
        <td>
          <button class="action-btn edit-btn" onclick="editUser(${i})">Editar</button>
          <button class="action-btn delete-btn" onclick="deleteUser(${i})">Excluir</button>
          <button class="action-btn rent-btn" onclick="alugarLivro(${i})">Alugar Livro</button>
        </td>
      </tr>`;
    });
    html += `</tbody></table>`;
  }
  container.innerHTML = html;
}

function renderClientForm() {
  const clients = JSON.parse(localStorage.getItem("clientes") || "[]");

  // Verifica se há clientes cadastrados
  if (clients.length === 0) {
    return `
      <div style="text-align: center; padding: 2rem;">
        <h2>Nenhum cliente cadastrado</h2>
        <p>Cadastre o primeiro cliente para visualizar a tabela.</p>
      </div>
    `;
  }

  // Gera a tabela HTML com os clientes e opções de editar/deletar
  let tableHTML = `
    <div style="padding: 2rem;">
      <h2 style="text-align: center; margin-bottom: 1.5rem;">Clientes Cadastrados</h2>
      <table class="users-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>CPF</th>
            <th>CEP</th>
            <th>Rua</th>
            <th>Nº</th>
            <th>Complemento</th>
            <th>Cidade</th>
            <th>UF</th>
            <th>Data de Nascimento</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
  `;

  // Adiciona cada cliente como uma linha da tabela com botões de ação
  clients.forEach((client, index) => {
    tableHTML += `
      <tr>
        <td>${client.nome || "-"}</td>
        <td>${client.cpf || "-"}</td>
        <td>${client.cep || "-"}</td>
        <td>${client.rua || "-"}</td>
        <td>${client.numero || "-"}</td>
        <td>${client.complemento || "-"}</td>
        <td>${client.cidade || "-"}</td>
        <td>${client.estado || "-"}</td>
        <td>${client.dataNascimento || "-"}</td>
        <td>
          <button class="action-btn edit-btn" onclick="editUser(${index})">Editar</button>
          <button class="action-btn delete-btn" onclick="deleteUser(${index})">Excluir</button>
        </td>
      </tr>
    `;
  });

  tableHTML += `
        </tbody>
      </table>
      <p style="text-align: center; margin-top: 1rem; color: #666;">
        Total de clientes cadastrados: <strong>${clients.length}</strong>
      </p>
    </div>
  `;

  return tableHTML;
}

// Função para usar a renderização em uma página específica
function loadClientTable() {
  const section = document.querySelector("main.grid-layout section");
  if (section) {
    section.innerHTML = renderClientForm();
  }
}

// Função para excluir usuário e recarregar a tabela
window.deleteUser = function (index) {
  if (!confirm("Deseja realmente excluir este usuário?")) return;
  const clientes = JSON.parse(localStorage.getItem("clientes") || "[]");
  clientes.splice(index, 1);
  localStorage.setItem("clientes", JSON.stringify(clientes));
  // Recarrega a tabela após exclusão
  loadClientTable();
};

// Editar usuário: preencher e salvar “complemento”
window.editUser = function (index) {
  const clientes = JSON.parse(localStorage.getItem("clientes") || "[]");
  const cliente = clientes[index];
  if (!cliente) return;
  loadPage("cadastro.html");
  setTimeout(() => {
    const form = document.getElementById("cadastroForm");
    if (form) {
      form.nome.value = cliente.nome;
      form.cpf.value = cliente.cpf;
      form.cep.value = cliente.cep;
      form.rua.value = cliente.rua;
      form.numero.value = cliente.numero;
      if (form.complemento) form.complemento.value = cliente.complemento || "";
      form.cidade.value = cliente.cidade;
      form.estado.value = cliente.estado;
      form.dataNascimento.value = cliente.dataNascimento;

      form.onsubmit = function (e) {
        e.preventDefault();
        // Limpa erros
        [
          "nomeError",
          "cpfError",
          "cepError",
          "ruaError",
          "numeroError",
          "cidadeError",
          "estadoError",
          "dataError",
          "complementoError",
        ].forEach((id) => {
          const el = document.getElementById(id);
          if (el) el.textContent = "";
        });

        // Coleta dados
        const nome = form.nome.value.trim();
        const cpf = form.cpf.value.trim();
        const cep = form.cep.value.trim();
        const rua = form.rua.value.trim();
        const numero = form.numero.value.trim();
        const complemento = (form.complemento?.value || "").trim();
        const cidade = form.cidade.value.trim();
        const estado = form.estado.value.trim();
        const dataNascimento = form.dataNascimento.value.trim();

        let valid = true;

        if (!nome) {
          document.getElementById("nomeError").textContent =
            "Nome obrigatório.";
          valid = false;
        }
        if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf)) {
          document.getElementById("cpfError").textContent =
            "CPF deve estar no formato 000.000.000-00.";
          valid = false;
        }
        if (!/^\d{5}-\d{3}$/.test(cep)) {
          document.getElementById("cepError").textContent =
            "CEP deve estar no formato 00000-000.";
          valid = false;
        }
        if (!rua) {
          document.getElementById("ruaError").textContent = "Rua obrigatória.";
          valid = false;
        }
        if (!numero) {
          document.getElementById("numeroError").textContent =
            "Número obrigatório.";
          valid = false;
        }
        if (!cidade) {
          document.getElementById("cidadeError").textContent =
            "Cidade obrigatória.";
          valid = false;
        }
        if (!estado || estado.length !== 2) {
          document.getElementById("estadoError").textContent =
            "UF obrigatório (2 letras).";
          valid = false;
        }
        if (!/^\d{2}\/\d{2}\/\d{4}$/.test(dataNascimento)) {
          document.getElementById("dataError").textContent =
            "Data deve estar no formato dd/mm/aaaa.";
          valid = false;
        }

        if (!valid) return;

        clientes[index] = {
          nome,
          cpf,
          cep,
          rua,
          numero,
          complemento,
          cidade,
          estado,
          dataNascimento,
        };
        localStorage.setItem("clientes", JSON.stringify(clientes));
        loadPage("users.html");
      };
    }
  }, 300);
};

// Nova função para renderizar a página table.html
function renderTablePage() {
  const section = document.querySelector("main.grid-layout section");
  if (!section) return;

  const clients = JSON.parse(localStorage.getItem("clientes") || "[]");

  if (clients.length === 0) {
    section.innerHTML = `
      <div style="text-align: center; padding: 2rem;">
        <h2>Nenhum cliente cadastrado</h2>
        <p>Cadastre o primeiro cliente para visualizar a tabela.</p>
        <button onclick="loadPage('cadastro.html')" style="background: #0056b3; color: white; padding: 12px 24px; border: none; border-radius: 6px; cursor: pointer; margin-top: 1rem;">
          Cadastrar Cliente
        </button>
      </div>
    `;
    return;
  }

  let tableHTML = `
    <div style="padding: 1rem;">
      <h2 style="text-align: center; margin-bottom: 1.5rem; color: #2563eb;">Clientes Cadastrados</h2>
      <div style="text-align: center; margin-bottom: 1rem;">
        <button onclick="loadPage('cadastro.html')" style="background: #28a745; color: white; padding: 8px 16px; border: none; border-radius: 6px; cursor: pointer; margin-right: 8px;">
          Novo Cadastro
        </button>
        <button onclick="exportarCSV()" style="background: #17a2b8; color: white; padding: 8px 16px; border: none; border-radius: 6px; cursor: pointer;">
          Exportar CSV
        </button>
      </div>
      <div style="overflow-x: auto;">
        <table class="users-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>CPF</th>
              <th>CEP</th>
              <th>Rua</th>
              <th>Nº</th>
              <th>Complemento</th>
              <th>Cidade</th>
              <th>UF</th>
              <th>Data Nasc.</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
  `;

  clients.forEach((client, index) => {
    tableHTML += `
      <tr>
        <td>${client.nome || "-"}</td>
        <td>${client.cpf || "-"}</td>
        <td>${client.cep || "-"}</td>
        <td>${client.rua || "-"}</td>
        <td>${client.numero || "-"}</td>
        <td>${client.complemento || "-"}</td>
        <td>${client.cidade || "-"}</td>
        <td>${client.estado || "-"}</td>
        <td>${client.dataNascimento || "-"}</td>
        <td>
          <button class="action-btn edit-btn" onclick="editClient(${index})">Editar</button>
          <button class="action-btn delete-btn" onclick="deleteClient(${index})">Excluir</button>
        </td>
      </tr>
    `;
  });

  tableHTML += `
          </tbody>
        </table>
      </div>
      <p style="text-align: center; margin-top: 1rem; color: #666;">
        Total de clientes cadastrados: <strong>${clients.length}</strong>
      </p>
    </div>
  `;

  section.innerHTML = tableHTML;
}

// Funções para gerenciar clientes na table.html
window.editClient = function (index) {
  const clientes = JSON.parse(localStorage.getItem("clientes") || "[]");
  const cliente = clientes[index];
  if (!cliente) return;

  // Salva o índice para edição
  localStorage.setItem("editingClientIndex", index);
  loadPage("cadastro.html");
};

window.deleteClient = function (index) {
  if (!confirm("Deseja realmente excluir este cliente?")) return;
  const clientes = JSON.parse(localStorage.getItem("clientes") || "[]");
  clientes.splice(index, 1);
  localStorage.setItem("clientes", JSON.stringify(clientes));
  renderTablePage(); // Recarrega a tabela
};

window.exportarCSV = function () {
  const clientes = JSON.parse(localStorage.getItem("clientes") || "[]");
  if (clientes.length === 0) {
    alert("Nenhum cliente cadastrado para exportar.");
    return;
  }

  const csvContent = [
    [
      "Nome",
      "CPF",
      "CEP",
      "Rua",
      "Número",
      "Complemento",
      "Cidade",
      "UF",
      "Data Nascimento",
    ].join(","),
    ...clientes.map((c) =>
      [
        c.nome,
        c.cpf,
        c.cep,
        c.rua,
        c.numero,
        c.complemento || "",
        c.cidade,
        c.estado,
        c.dataNascimento,
      ].join(",")
    ),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "clientes.csv";
  a.click();
  window.URL.revokeObjectURL(url);
};

// Atualizar setupCadastroForm para suportar edição
function setupCadastroForm() {
  const form = document.getElementById("cadastroForm");
  if (!form) return;

  // Verificar se está editando
  const editingIndex = localStorage.getItem("editingClientIndex");
  if (editingIndex !== null) {
    const clientes = JSON.parse(localStorage.getItem("clientes") || "[]");
    const cliente = clientes[editingIndex];
    if (cliente) {
      // Preencher formulário com dados existentes
      setTimeout(() => {
        form.nome.value = cliente.nome || "";
        form.cpf.value = cliente.cpf || "";
        form.cep.value = cliente.cep || "";
        form.rua.value = cliente.rua || "";
        form.numero.value = cliente.numero || "";
        if (form.complemento)
          form.complemento.value = cliente.complemento || "";
        form.cidade.value = cliente.cidade || "";
        form.estado.value = cliente.estado || "";
        form.dataNascimento.value = cliente.dataNascimento || "";

        // Mudar texto do botão
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) submitBtn.textContent = "Atualizar";
      }, 100);
    }
  }

  // Adiciona máscaras nos inputs dinâmicos
  const cpfInput = document.getElementById("cpf");
  const cepInput = document.getElementById("cep");
  const dataInput = document.getElementById("dataNascimento");

  cpfInput.addEventListener("input", () => {
    cpfInput.value = aplicarMascara(cpfInput.value, "cpf");
  });

  cepInput.addEventListener("input", () => {
    cepInput.value = aplicarMascara(cepInput.value, "cep");
  });

  dataInput.addEventListener("input", () => {
    dataInput.value = aplicarMascara(dataInput.value, "data");
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Limpa erros
    [
      "nomeError",
      "cpfError",
      "cepError",
      "ruaError",
      "numeroError",
      "cidadeError",
      "estadoError",
      "dataError",
      "complementoError",
    ].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.textContent = "";
    });

    // Coleta dados
    const nome = form.nome.value.trim();
    const cpf = form.cpf.value.trim();
    const cep = form.cep.value.trim();
    const rua = form.rua.value.trim();
    const numero = form.numero.value.trim();
    const complemento = (form.complemento?.value || "").trim();
    const cidade = form.cidade.value.trim();
    const estado = form.estado.value.trim();
    const dataNascimento = form.dataNascimento.value.trim();

    let valid = true;

    if (!nome) {
      document.getElementById("nomeError").textContent = "Nome obrigatório.";
      valid = false;
    }
    if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf)) {
      document.getElementById("cpfError").textContent =
        "CPF deve estar no formato 000.000.000-00.";
      valid = false;
    }
    if (!/^\d{5}-\d{3}$/.test(cep)) {
      document.getElementById("cepError").textContent =
        "CEP deve estar no formato 00000-000.";
      valid = false;
    }
    if (!rua) {
      document.getElementById("ruaError").textContent = "Rua obrigatória.";
      valid = false;
    }
    if (!numero) {
      document.getElementById("numeroError").textContent =
        "Número obrigatório.";
      valid = false;
    }
    if (!cidade) {
      document.getElementById("cidadeError").textContent =
        "Cidade obrigatória.";
      valid = false;
    }
    if (!estado || estado.length !== 2) {
      document.getElementById("estadoError").textContent =
        "UF obrigatório (2 letras).";
      valid = false;
    }
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(dataNascimento)) {
      document.getElementById("dataError").textContent =
        "Data deve estar no formato dd/mm/aaaa.";
      valid = false;
    }

    if (!valid) return;

    const clientes = JSON.parse(localStorage.getItem("clientes") || "[]");
    const clienteData = {
      nome,
      cpf,
      cep,
      rua,
      numero,
      complemento,
      cidade,
      estado,
      dataNascimento,
    };

    if (editingIndex !== null) {
      // Atualizar cliente existente
      clientes[editingIndex] = clienteData;
      localStorage.removeItem("editingClientIndex");
      alert("Cliente atualizado com sucesso!");
    } else {
      // Adicionar novo cliente
      clientes.push(clienteData);
      alert("Cliente cadastrado com sucesso!");
    }

    localStorage.setItem("clientes", JSON.stringify(clientes));
    loadPage("table.html");
  });
}
