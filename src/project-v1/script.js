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
