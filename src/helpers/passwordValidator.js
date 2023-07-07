export function passwordValidator(password) {
    if (!password) return "La contraseña no puede estar vacía."
    if (password.length < 5) return 'La contraseña debe tener 5 caracteres como mínimo'
    return ''
  }