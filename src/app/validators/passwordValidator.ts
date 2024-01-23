import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value: string = control.value || '';

    const hasUpperCase = /[A-Z]/.test(value);

    const hasLowerCase = /[a-z]/.test(value);

    const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>-]/.test(value);

    const hasNumber = /\d/.test(value);

    const isLengthValid = value.length >= 8;

    return !hasUpperCase || !hasLowerCase || !hasSpecialCharacter || !hasNumber || !isLengthValid
      ? { invalidPassword: true }
      : null;
  };
}