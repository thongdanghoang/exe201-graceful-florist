import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

interface User {
  username: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public user$: Observable<User | null>;
  private readonly userSubject: BehaviorSubject<User | null>;

  constructor() {
    const user = JSON.parse(sessionStorage.getItem('mockUser') || 'null');
    this.userSubject = new BehaviorSubject<User | null>(user);
    this.user$ = this.userSubject.asObservable();
  }

  setUser(user: User): void {
    sessionStorage.setItem('mockUser', JSON.stringify(user));
    this.userSubject.next(user);
  }

  clearUser(): void {
    sessionStorage.removeItem('mockUser');
    this.userSubject.next(null);
  }

  getUser(): User | null {
    return this.userSubject.value;
  }

  authenticated(): boolean {
    return !!this.getUser();
  }
}
