import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl = 'http://localhost:8080/auth';  // URL backend bạn cần chỉnh
  private tokenKey = 'jwt_token';

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

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  getCurrentUser() {
  const token = this.getToken();
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return { username: payload.sub || payload.username || null }; // tùy payload backend
  } catch {
    return null;
  }
}
}
