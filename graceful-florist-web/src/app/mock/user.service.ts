import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {uuid} from '../../../graceful-florist-type';
import {jwtDecode} from 'jwt-decode';

interface User {
  id: uuid;
  username: string;
  roles: UserRole[];
}

export enum UserRole {
  ADMIN = 'ROLE_ADMIN',
  USER = 'ROLE_USER'
}

interface Token {
  id: uuid;
  sub: string;
  roles: UserRole[];
  iat: number;
  exp: number;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public user$: Observable<User | null>;
  private readonly userSubject: BehaviorSubject<User | null>;

  constructor() {
    const user = this.getUserFromToken(
      localStorage.getItem('accessToken') ?? ''
    );
    this.userSubject = new BehaviorSubject<User | null>(user);
    this.user$ = this.userSubject.asObservable();
  }

  setToken(token: string): void {
    localStorage.setItem('accessToken', token);
    const user: User | null = this.getUserFromToken(token);
    if (user) {
      this.userSubject.next(user);
    }
  }

  clearUser(): void {
    localStorage.removeItem('accessToken');
    this.userSubject.next(null);
  }

  getUser(): User | null {
    return this.userSubject.value;
  }

  authenticated(): boolean {
    return !!this.getUser();
  }

  decodeToken(token: string): Token | null {
    try {
      return jwtDecode(token);
    } catch (Error) {
      return null;
    }
  }

  getUserFromToken(token: string): User | null {
    const decodedToken = this.decodeToken(token);
    if (!decodedToken) {
      return null;
    }
    return {
      id: decodedToken.id,
      username: decodedToken.sub,
      roles: decodedToken.roles
    };
  }
}
