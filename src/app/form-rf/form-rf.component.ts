import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NoWhiteSpaceValidator } from '../customize-validate/CustomValidates';

@Component({
  selector: 'app-form-rf',
  templateUrl: './form-rf.component.html',
  styleUrls: ['./form-rf.component.scss'],
})
export class FormRfComponent implements OnInit {
  // signInForm = new FormGroup({
  //   username: new FormControl(''), // <== default value
  //   password: new FormControl(''), // <== default value
  //   rememberMe: new FormControl(false), // <== default value
  // });
  constructor(private fb: FormBuilder) {}

  control = this.fb.control('', Validators.minLength(5));

  signInForm = this.fb.group({
    // pattern(regex)
    username: [
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(6),
        NoWhiteSpaceValidator,
      ]),
    ],
    password: [
      '',
      Validators.compose([Validators.required, Validators.minLength(6)]),
    ],
    rememberMe: false,
  });

  onSubmit(): void {
    console.log(this.signInForm);
  }

  ngOnInit(): void {}
}
