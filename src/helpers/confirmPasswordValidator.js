export function confirmPasswordValidator(password,confirmPassword) {
    if (password !== confirmPassword) return "La contraseñas no coinciden."
    return ''
  }