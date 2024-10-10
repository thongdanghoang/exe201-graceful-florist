import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {uuid} from '../../../graceful-florist-type';
import {jwtDecode} from 'jwt-decode';
import {HttpClient} from '@angular/common/http';
import {
  SearchCriteriaDto,
  SearchResultDto
} from '../modules/shared/models/abstract-base-dto';
import {StaffDTO} from '../modules/admin/model/staff.dto';
import {AppRoutingConstants} from '../app-routing-constants';
import {UserDto} from '../modules/products/models/product.dto';

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

  constructor(private readonly httpClient: HttpClient) {
    const user = this.getUserFromToken(
      localStorage.getItem('accessToken') ?? ''
    );
    this.userSubject = new BehaviorSubject<User | null>(user);
    this.user$ = this.userSubject.asObservable();
  }

  getStaffs(
    criteria: SearchCriteriaDto<void>
  ): Observable<SearchResultDto<StaffDTO>> {
    return this.httpClient.post<SearchResultDto<StaffDTO>>(
      `${AppRoutingConstants.BACKEND_API_URL}/${AppRoutingConstants.ADMIN_PATH}/${AppRoutingConstants.USERS_MANAGEMENT}`,
      criteria
    );
  }

  addStaff(staff: StaffDTO): Observable<StaffDTO> {
    return this.httpClient.put<StaffDTO>(
      `${AppRoutingConstants.BACKEND_API_URL}/${AppRoutingConstants.ADMIN_PATH}/${AppRoutingConstants.USERS_MANAGEMENT}`,
      staff
    );
  }

  deleteStaffByID(id: uuid): Observable<void> {
    return this.httpClient.delete<void>(
      `${AppRoutingConstants.BACKEND_API_URL}/${AppRoutingConstants.ADMIN_PATH}/${AppRoutingConstants.USERS_MANAGEMENT}/${id}`
    );
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

  getUserDetail(): Observable<UserDto> {
    return this.httpClient.get<UserDto>(
      `${AppRoutingConstants.BACKEND_API_URL}/${AppRoutingConstants.USERS_MANAGEMENT}`
    );
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
