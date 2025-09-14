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

/**
 * Carrega o conteúdo de uma página HTML do diretório /pages
 * e insere dentro do <section> principal.
 * @param {string} page Nome do arquivo HTML a ser carregado (ex: 'inicio.html')
 */
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
    })
    .catch((err) => {
      section.innerHTML = `<p>Erro ao carregar a página: ${err.message}</p>`;
    });
}

document.addEventListener("DOMContentLoaded", function () {
  loadPage("inicio.html");
});

function setupCadastroForm() {
  const form = document.getElementById("cadastroForm");
  if (!form) return;

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

    // Salva cliente no localStorage
    const clientes = JSON.parse(localStorage.getItem("clientes") || "[]");
    clientes.push({
      nome,
      cpf,
      cep,
      rua,
      numero,
      cidade,
      estado,
      dataNascimento,
    });
    localStorage.setItem("clientes", JSON.stringify(clientes));

    // Carrega página de usuários
    loadPage("users.html");
  });
}

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

// Editar usuário
window.editUser = function (index) {
  const clientes = JSON.parse(localStorage.getItem("clientes") || "[]");
  const cliente = clientes[index];
  if (!cliente) return;
  // Preenche o formulário de cadastro com os dados do usuário
  loadPage("cadastro.html");
  setTimeout(() => {
    const form = document.getElementById("cadastroForm");
    if (form) {
      form.nome.value = cliente.nome;
      form.cpf.value = cliente.cpf;
      form.cep.value = cliente.cep;
      form.rua.value = cliente.rua;
      form.numero.value = cliente.numero;
      form.cidade.value = cliente.cidade;
      form.estado.value = cliente.estado;
      form.dataNascimento.value = cliente.dataNascimento;
      // Ao salvar, substitui o usuário
      form.onsubmit = function (e) {
        e.preventDefault();
        // ...validação igual ao cadastro...
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

        // Atualiza cliente
        clientes[index] = {
          nome,
          cpf,
          cep,
          rua,
          numero,
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

// Excluir usuário
window.deleteUser = function (index) {
  if (!confirm("Deseja realmente excluir este usuário?")) return;
  const clientes = JSON.parse(localStorage.getItem("clientes") || "[]");
  clientes.splice(index, 1);
  localStorage.setItem("clientes", JSON.stringify(clientes));
  loadPage("users.html");
};

// Alugar livro
window.alugarLivro = function (index) {
  localStorage.setItem("clienteSelecionado", index);
  loadPage("livros.html");
};

function renderLivrosPage() {
  // Dados dos livros
  const livros = [
    {
      titulo: "Algoritmos e Lógica de Programação",
      autor: "Norton Trevisan",
      categoria: "TI",
      lancamento: "2017",
    },
    {
      titulo: "Psicologia para Programadores",
      autor: "Carlos Souza",
      categoria: "Psicologia",
      lancamento: "2019",
    },
    {
      titulo: "Matemática Discreta",
      autor: "Kenneth Rosen",
      categoria: "Matemática",
      lancamento: "2012",
    },
    {
      titulo: "Literatura Brasileira",
      autor: "Machado de Assis",
      categoria: "Literatura",
      lancamento: "1881",
    },
    {
      titulo: "História da Computação",
      autor: "Martin Campbell-Kelly",
      categoria: "História",
      lancamento: "2003",
    },
    {
      titulo: "Engenharia de Software",
      autor: "Ian Sommerville",
      categoria: "TI",
      lancamento: "2015",
    },
    {
      titulo: "Psicologia das Relações Humanas",
      autor: "Ana Beatriz Barbosa",
      categoria: "Psicologia",
      lancamento: "2020",
    },
    {
      titulo: "Matemática Financeira",
      autor: "José Dutra",
      categoria: "Matemática",
      lancamento: "2016",
    },
    {
      titulo: "Grandes Obras da Literatura",
      autor: "Clarice Lispector",
      categoria: "Literatura",
      lancamento: "1977",
    },
    {
      titulo: "História Geral",
      autor: "Mary Del Priore",
      categoria: "História",
      lancamento: "2010",
    },
  ];

  // Recupera usuário selecionado
  const clientes = JSON.parse(localStorage.getItem("clientes") || "[]");
  const clienteIndex = localStorage.getItem("clienteSelecionado");
  const usuario = clientes[clienteIndex];

  // Exibe usuário
  const usuarioDiv = document.getElementById("livros-usuario");
  if (usuarioDiv) {
    usuarioDiv.innerHTML = usuario
      ? `Usuário: <strong>${usuario.nome}</strong> (${usuario.cpf})`
      : "Usuário não identificado.";
  }

  // Renderiza tabela de livros
  function renderLivros() {
    const tbody = document.querySelector("#livros-table tbody");
    if (!tbody) return;
    tbody.innerHTML = "";
    livros.forEach((livro, i) => {
      tbody.innerHTML += `
        <tr>
          <td>${livro.titulo}</td>
          <td>${livro.autor}</td>
          <td>${livro.categoria}</td>
          <td>${livro.lancamento}</td>
          <td>
            <button class="action-btn rent-btn" onclick="alugarLivroParaUsuario(${i})">Alugar</button>
          </td>
        </tr>
      `;
    });
  }

  // Função para alugar livro
  window.alugarLivroParaUsuario = function (livroIndex) {
    if (!usuario) return alert("Usuário não identificado.");
    const alugados = JSON.parse(localStorage.getItem("livrosAlugados") || "[]");
    alugados.push({
      usuario: usuario.nome,
      cpf: usuario.cpf,
      livro: livros[livroIndex].titulo,
      autor: livros[livroIndex].autor,
      categoria: livros[livroIndex].categoria,
      lancamento: livros[livroIndex].lancamento,
      data: new Date().toLocaleDateString(),
    });
    localStorage.setItem("livrosAlugados", JSON.stringify(alugados));
    renderRelatorio();
    alert(`Livro "${livros[livroIndex].titulo}" alugado para ${usuario.nome}!`);
  };

  // Relatório de livros alugados
  function renderRelatorio() {
    const relatorioDiv = document.getElementById("relatorio-alugados");
    if (!relatorioDiv) return;
    const alugados = JSON.parse(localStorage.getItem("livrosAlugados") || "[]");
    if (alugados.length === 0) {
      relatorioDiv.innerHTML = "<p>Nenhum livro alugado.</p>";
      return;
    }
    let html = `<table class="users-table">
      <thead>
        <tr>
          <th>Usuário</th>
          <th>CPF</th>
          <th>Livro</th>
          <th>Autor</th>
          <th>Categoria</th>
          <th>Lançamento</th>
          <th>Data do Aluguel</th>
        </tr>
      </thead>
      <tbody>`;
    alugados.forEach((a) => {
      html += `<tr>
        <td>${a.usuario}</td>
        <td>${a.cpf}</td>
        <td>${a.livro}</td>
        <td>${a.autor}</td>
        <td>${a.categoria}</td>
        <td>${a.lancamento}</td>
        <td>${a.data}</td>
      </tr>`;
    });
    html += `</tbody></table>`;
    relatorioDiv.innerHTML = html;
  }

  renderLivros();
  renderRelatorio();
}
