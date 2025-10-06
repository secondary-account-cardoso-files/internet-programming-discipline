function calcular(operacao) {
  const num1 = parseFloat(document.getElementById("num1").value);
  const num2 = parseFloat(document.getElementById("num2").value);
  let resultado;

  if (isNaN(num1) || isNaN(num2)) {
    alert("Por favor, insira números válidos.");
    return;
  }

  switch (operacao) {
    case "soma":
      resultado = num1 + num2;
      break;
    case "subtracao":
      resultado = num1 - num2;
      break;
    case "multiplicacao":
      resultado = num1 * num2;
      break;
    case "divisao":
      if (num2 === 0) {
        alert("Divisão por zero não é permitida.");
        return;
      }
      resultado = num1 / num2;
      break;
    default:
      alert("Operação inválida.");
      return;
  }

  document.getElementById("resultado").textContent = `Resultado: ${resultado}`;
}
