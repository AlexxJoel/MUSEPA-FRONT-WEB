export const generateRandomPassword = (length = 12) => {
  const lowerCase = "abcdefghijklmnopqrstuvwxyz";
  const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const specialChars = "!@#$%^&*()-_=+[]{}|;:,.<>?";

  // Aseguramos que la contraseña tenga al menos un carácter de cada tipo
  const allChars = lowerCase + upperCase + numbers + specialChars;

  let password = "";
  password += lowerCase[Math.floor(Math.random() * lowerCase.length)];
  password += upperCase[Math.floor(Math.random() * upperCase.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += specialChars[Math.floor(Math.random() * specialChars.length)];

  // Generamos el resto de la contraseña
  for (let i = password.length; i < length; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }

  // Mezclamos la contraseña para evitar patrones predecibles
  return password
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");
};