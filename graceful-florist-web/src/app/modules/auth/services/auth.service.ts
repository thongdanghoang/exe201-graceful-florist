import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppRoutingConstants} from '../../../app-routing-constants';
import {Observable} from 'rxjs';

export interface TokenResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private readonly httpClient: HttpClient) {}

  public login(username: string, password: string): Observable<TokenResponse> {
    return this.httpClient.post<TokenResponse>(
      `${AppRoutingConstants.BACKEND_API_URL}/auth/sign-in`,
      {username, password}
    );
  }

  public register(
    fullName: string,
    username: string,
    password: string
  ): Observable<TokenResponse> {
    return this.httpClient.post<TokenResponse>(
      `${AppRoutingConstants.BACKEND_API_URL}/auth/sign-up`,
      {fullName, username, password}
    );
  }
}
