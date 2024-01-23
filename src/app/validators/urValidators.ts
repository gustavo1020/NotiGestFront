import {ValidatorFn, AbstractControl } from '@angular/forms';

export function urlValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!control.value) {
      // Si el valor es nulo, no aplicamos la validación
      return null;
    }

    // Expresión regular para validar una URL
    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;

    // Comprobamos si la URL cumple con el patrón
    if (urlPattern.test(control.value)) {
      return null; // La URL es válida
    } else {
      return { 'invalidUrl': true }; // La URL no es válida
    }
  };
}