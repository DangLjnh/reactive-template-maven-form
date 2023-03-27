import { debounceTime, map, Observable, switchMap, timer } from 'rxjs';
import { UserService } from './../user.service';
import {
  AbstractControl,
  ValidatorFn,
  ValidationErrors,
  FormGroup,
} from '@angular/forms';
export const emailValidator = (): ValidatorFn => {
  // control is input elements, error if not null
  return (control: AbstractControl): { [key: string]: string } => {
    const result =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
        control.value
      );
    return result === true
      ? { result: 'true' }
      : { error: 'Wrong email format' };
  };
};

// NoWhiteSpaceValidator -> don't need invoke
export const NoWhiteSpaceValidator = (
  control: AbstractControl
): ValidationErrors | null => {
  // const controlVal = control.value
  const { value: controlVal } = control;
  const isWhiteSpaceOnly = (controlVal || '').trim().length === 0;
  let isValid = !isWhiteSpaceOnly;
  return isValid ? null : { whitespace: 'Value is only whitespace' };
};

export const validateNameFromApiWithDebounce = (api: UserService) => {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return timer(300).pipe(
      switchMap(() =>
        api.validateUser(control.value).pipe(
          map((isValid: boolean) => {
            return isValid ? null : { invalidUsername: true };
          }),
          debounceTime(500)
        )
      )
    );
  };
};

export const validateNameFromApi = (api: UserService) => {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    api.validateUser(control.value).subscribe(console.log);
    return api.validateUser(control.value).pipe(
      map((isValid: boolean) => {
        return isValid ? null : { invalidUsername: true };
      }),
      debounceTime(500)
    );
  };
};

export const validateSamePassword = (
  firstControlName: string,
  secondControlName: string
) => {
  return (formGroup: FormGroup): ValidationErrors | null => {
    const { value: firstControlValue } = formGroup.get(
      firstControlName
    ) as AbstractControl;
    const { value: secondControlValue } = formGroup.get(
      secondControlName
    ) as AbstractControl;
    return firstControlValue === secondControlValue
      ? null
      : {
          valueNotMatch: {
            firstControlValue,
            secondControlValue,
          },
        };
  };
};

// NoWhiteSpaceValidator -> need invoke
// export const NoWhiteSpaceValidator = (): ValidatorFn => {
//   return (control: AbstractControl): ValidationErrors | null => {
//     // const controlVal = control.value
//     const { value: controlVal } = control;
//     const isWhiteSpaceOnly = (controlVal || '').trim().length === 0;
//     let isValid = !isWhiteSpaceOnly;
//     return isValid ? null : { whitespace: 'Value is only whitespace' };
//   };
// };
