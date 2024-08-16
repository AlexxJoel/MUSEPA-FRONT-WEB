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



// to base64

export const toBase64 = (file) => {
  return new Promise((resolve, reject) => {
    if (!(file instanceof Blob)) {
      reject(new Error('Invalid input: Expected a Blob or File object.'));
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(new Error(`FileReader error: ${error.message}`));
  });
};

// url to blob
export const urlToBase64 = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error fetching the image: ${response.statusText}`);
    }

    const blob = await response.blob();
    return await toBase64(blob);
  } catch (error) {
    console.error('Error converting URL to Base64:', error);
    throw error;
  }
};
