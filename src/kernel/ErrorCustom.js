
class CustomError extends Error {
  constructor(code, message) {
    super(message ? message : "An error occurred");
    this.code = code ? code : 500;
    this.error = true;
  }
}

export default CustomError
