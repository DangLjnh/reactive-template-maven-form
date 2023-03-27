import { emailValidator } from './../customize-validate/CustomValidates';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { User, Address, cities } from '../data-model';
@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
  cities = cities;
  userFromGroup!: FormGroup;
  constructor(private fromBuilder: FormBuilder) {
    this.createForm();
  } //create form control

  //default value
  createForm() {
    this.userFromGroup = this.fromBuilder.group({
      name: ['Linh', [Validators.required, Validators.minLength(4)]],
      // email: ['', [Validators.required, emailValidator()]],
      email: ['', [Validators.required]],
      address: this.fromBuilder.group({
        street: ['', [Validators.required]],
        city: this.cities[0],
      }),
    });
  }

  ngOnInit(): void {}
}
