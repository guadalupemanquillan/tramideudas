import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // Obtener el token del localStorage
    const token = localStorage.getItem('token');

    // Si hay token, añadirlo a las cabeceras
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    // Continuar con la petición y capturar errores
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // Si la respuesta es un 401 (No autorizado)
        if (error.status === 401) {
          console.log('Sesión expirada o token inválido');

          // Eliminar datos de sesión
          localStorage.removeItem('token');
          localStorage.removeItem('userDni');

          // Redirigir al login
          this.router.navigate(['/login']);
        }

        // Propagar el error
        return throwError(() => error);
      })
    );
  }
}
