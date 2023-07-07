export function emailValidator(email) {
    const re = /\S+@\S+\.\S+/
    if (!email) return "El email no puede estar vacío."
    if (!re.test(email)) return 'Ops! Se necesita un email válido'
    return ''
  }