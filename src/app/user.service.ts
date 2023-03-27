import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}
  validateUser(username: string): Observable<boolean> {
    console.log(`Call api`);
    let existsUsers = ['danglinh', 'nguyenvu', 'anhdat'];
    let isValid = existsUsers.every((x) => x !== username);
    return of(isValid).pipe(delay(1000));
  }
}
