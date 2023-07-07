export function ageValidator(age) {
    const numberPatter = /^[0-9]+$/;
    if (!age) return "La edad no puede estar vacia"
    if (!numberPatter.test(age)){return 'La edad debe ser un numero'} else if(age>120){return 'La edad debe ser menor a 120'}
    

    return ''
  }