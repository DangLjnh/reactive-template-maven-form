import { Subject, tap, switchMap, startWith, filter, take } from 'rxjs';
import {
  validateNameFromApiWithDebounce,
  validateSamePassword,
} from './../customize-validate/CustomValidates';
import { UserService } from './../user.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
const PASSWORD_PATTERN = /^(?=.*[!@#$%^&*]+)[a-z0-9!@#$%^&*]{6,32}$/;
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  formSubmit$ = new Subject();
  registerForm = this.fb.group(
    {
      // pass all Validators after that run custom validators
      username: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(/^[a-z]{6,32}$/i),
        ]),
        validateNameFromApiWithDebounce(this.api),
      ],

      password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          // Validators.pattern(PASSWORD_PATTERN),
        ]),
      ],
      confirmPassword: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          // Validators.pattern(PASSWORD_PATTERN),
        ]),
      ],
    },
    {
      // options
      validators: validateSamePassword('password', 'confirmPassword'),
    }
  );
  submitForm() {
    console.log(this.registerForm.value);
  }
  constructor(private fb: FormBuilder, private api: UserService) {}

  ngOnInit(): void {
    this.formSubmit$
      .pipe(
        tap(() => this.registerForm.markAsDirty()),
        // use switchMap -> return value Observable
        switchMap(() =>
          this.registerForm.statusChanges.pipe(
            startWith(this.registerForm.status),
            filter((status) => status !== 'PENDING'),
            take(1)
          )
        ),
        filter((status) => status === 'VALID'),
        tap(() => {
          this.submitForm();
        })
      )
      .subscribe();
  }
}
