export const isValidCPF = cpf => {
  if (cpf.length !== 11) throw new Error("CPF não tem 11 dígitos");

  const cpfArr = [...cpf];

  const justTheSameDigit = cpfArr.every(digit => digit === cpfArr[0]);

  if (justTheSameDigit) throw new Error("CPF de apenas um dígito");

  let sum1 = 0;
  let sum2 = 0;

  for (let i = 0; i < 9; i++) {
    sum1 += parseInt(cpfArr[i]) * (10 - i);
  }

  let rest1 = (sum1 * 10) % 11;

  rest1 = rest1 === 10 || rest1 === 11 ? 0 : rest1;

  if (rest1 !== parseInt(cpfArr[9]))
    throw new Error("Primeiro dígito verificador inválido");

  for (let i = 0; i < 10; i++) sum2 += parseInt(cpfArr[i]) * (11 - i);

  let rest2 = (sum2 * 10) % 11;

  rest2 = rest2 === 10 || rest2 === 11 ? 0 : rest2;

  if (rest2 !== parseInt(cpfArr[10]))
    throw new Error("Segundo dígito verificador inválido");

  return true;
};
