import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

// Interfaz para la respuesta del login
interface LoginResponse {
  token: string;
  userData: {
    dni: string;
    name: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // URL base de la API
  private apiUrl = 'https://bridge.tramicode.es/api';

  constructor(private http: HttpClient, private router: Router) {}

  // Método para solicitar código OTP
  requestOTP(dni: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/otp/request`, { dni });
  }

  // Método para validar código OTP
  validateOTP(dni: string, code: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/auth/otp/validate`, { dni, code })
      .pipe(
        tap((response) => {
          // Guardar el token y los datos del usuario en localStorage
          if (response && response.token) {
            localStorage.setItem('token', response.token);
          }
        })
      );
  }

  // Método para cerrar sesión
  logout(): void {
    // Eliminar datos del localStorage
    localStorage.removeItem('token');
    // Redirigir al login
    this.router.navigate(['/login']);
  }

  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token; // Devuelve true si hay token, false si no
  }

  // Obtener el token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Obtener datos del usuario
  getUserData(): { dni: string; name: string } {
    return {
      dni: localStorage.getItem('userDni') || '',
      name: localStorage.getItem('userName') || '',
    };
  }
}
