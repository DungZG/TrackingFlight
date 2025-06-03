import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

interface LoginResponse {
  token: string;
  role: string;
}

interface UserPayload {
  username: string;
  email: string;
  createdAt: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  cccd?: string;
  gender?: string;
  location?: string;
  date?: string;
  dob?: string;
}
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl = 'http://localhost:8080/auth';  // URL backend bạn cần chỉnh
  private tokenKey = 'jwt_token';
  private role='role';

  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient) {}

  private hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  login(username: string, password: string): Observable<LoginResponse> {
  return this.http.post<LoginResponse>(`${this.baseUrl}/login`, { username, password }).pipe(
    tap((res) => {
      localStorage.setItem(this.tokenKey, res.token);
      this.loggedIn.next(true); // Thêm dòng này để cập nhật trạng thái đăng nhập
    })
  );
}

  register(username: string, email: string, password: string): Observable<any> {
  const body = {
    username,
    email,
    password
  };
  return this.http.post(`${this.baseUrl}/register`, body);
}

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.loggedIn.next(false);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getRole(): string|null{
    return localStorage.getItem(this.role)
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  updateUser(data: any): Observable<any> {
  const token = this.getToken();
  let headers = new HttpHeaders();

  if (token) {
    headers = headers.set('Authorization', `Bearer ${token}`);
  }

  return this.http.put(`${this.baseUrl}/update`, data, { headers });
}

  getCurrentUser(): UserPayload | null {
  const token = this.getToken();
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return {
      username: payload.sub || payload.username || '',
      email: payload.email || '',
      createdAt: payload.createdAt || '',
      phone: payload.phone || '',
      firstName: payload.firstName || '',
      lastName: payload.lastName || '',
      cccd: payload.cccd || '',
      gender: payload.gender || '',
      location: payload.location || '',
      date: payload.date || ''
    };
  } catch {
    return null;
  }
}
}
