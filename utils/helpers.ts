export function formatCurrency(
  value: number,
  locale: string = "pt-BR",
  currency: string = "BRL"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(value);
}

// Função para aplicar máscara de telefone brasileiro
export function formatPhoneBrazil(value: string): string {
  // Remove todos os caracteres não numéricos
  const numbers = value.replace(/\D/g, '');
  
  // Limita a 11 dígitos (celular brasileiro)
  const limitedNumbers = numbers.slice(0, 11);
  
  // Aplica a máscara baseada na quantidade de dígitos
  if (limitedNumbers.length <= 2) {
    return `(${limitedNumbers}`;
  } else if (limitedNumbers.length <= 7) {
    return `(${limitedNumbers.slice(0, 2)}) ${limitedNumbers.slice(2)}`;
  } else {
    return `(${limitedNumbers.slice(0, 2)}) ${limitedNumbers.slice(2, 7)}-${limitedNumbers.slice(7)}`;
  }
}

// Função para remover a máscara e retornar apenas números
export function unformatPhone(value: string): string {
  return value.replace(/\D/g, '');
}

// Função para validar se o telefone brasileiro é válido
export function isValidBrazilianPhone(phone: string): boolean {
  const numbers = unformatPhone(phone);
  
  // Deve ter 10 ou 11 dígitos (telefone fixo ou celular)
  if (numbers.length < 10 || numbers.length > 11) {
    return false;
  }
  
  // Código de área deve estar entre 11 e 99
  const areaCode = parseInt(numbers.substring(0, 2));
  if (areaCode < 11 || areaCode > 99) {
    return false;
  }
  
  // Para celular (11 dígitos), o primeiro dígito após o DDD deve ser 9
  if (numbers.length === 11) {
    const firstDigit = parseInt(numbers.charAt(2));
    if (firstDigit !== 9) {
      return false;
    }
  }
  
  // Para telefone fixo (10 dígitos), o primeiro dígito após o DDD deve ser 2, 3, 4 ou 5
  if (numbers.length === 10) {
    const firstDigit = parseInt(numbers.charAt(2));
    if (firstDigit < 2 || firstDigit > 5) {
      return false;
    }
  }
  
  return true;
}

// Função para validar entrada de telefone em tempo real
export function validatePhoneInput(newValue: string, currentValue: string): string {
  const numbers = newValue.replace(/\D/g, '');
  
  // Não permite mais de 11 dígitos
  if (numbers.length > 11) {
    return currentValue;
  }
  
  // Se tem pelo menos 2 dígitos, valida o código de área
  if (numbers.length >= 2) {
    const areaCode = parseInt(numbers.substring(0, 2));
    if (areaCode < 11 || areaCode > 99) {
      return currentValue;
    }
  }
  
  // Se tem 3 dígitos, valida o primeiro dígito após o DDD
  if (numbers.length >= 3) {
    const firstDigit = parseInt(numbers.charAt(2));
    // Deve ser 9 (celular) ou 2-5 (fixo)
    if (firstDigit !== 9 && (firstDigit < 2 || firstDigit > 5)) {
      return currentValue;
    }
  }
  
  return formatPhoneBrazil(newValue);
}
