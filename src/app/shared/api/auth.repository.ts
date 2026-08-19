import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Login } from '@domain/login.type';
import { Register } from '@domain/register.type';
import { User } from '@domain/user.type';
import { UserAccessToken } from '@domain/userAccessToken.type';
import { AuthStore } from '@state/auth.store';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthRepository {
  private apiUrl = 'http://localhost:3000';
  private http = inject(HttpClient);
  private authStore = inject(AuthStore);

  postRegister$(register: Register): Observable<UserAccessToken> {
    return this.http
      .post<UserAccessToken>(`${this.apiUrl}/users`, register)
      .pipe(tap((userAccessToken: UserAccessToken) => this.authStore.setState(userAccessToken)));
  }

  postLogin$(login: Login): Observable<UserAccessToken> {
    return this.http
      .post<UserAccessToken>(`${this.apiUrl}/login`, login)
      .pipe(tap((userAccessToken: UserAccessToken) => this.authStore.setState(userAccessToken)));
  }
}
