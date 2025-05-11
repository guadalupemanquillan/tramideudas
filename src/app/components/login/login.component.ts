import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: false,
})
export class LoginComponent implements OnInit {
  currentStep: number = 1;
  dni: string = '';
  otpCode: string = '';
  dniError: string = '';
  otpError: string = '';
  isLoggedIn: boolean = false;
  isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Verificar si el usuario ya está autenticado
    if (this.authService.isAuthenticated()) {
      // Si hay un token válido, mostrar mensaje de éxito
      this.isLoggedIn = true;
      this.goToDashboard();
    }
  }

  // Validación DNI/NIE/CIF según algoritmo español
  validateID(id: string): boolean {
    id = id.toUpperCase().trim();
    const dniRegex = /^(\d{8})([A-Z])$/;
    const nieRegex = /^[XYZ]\d{7}[A-Z]$/;
    const cifRegex = /^[ABCDEFGHJKLMNPQRSUVW]\d{7}[0-9A-J]$/;
    const letters = 'TRWAGMYFPDXBNJZSQVHLCKET';

    if (dniRegex.test(id)) {
      const match = id.match(dniRegex);
      if (match) {
        const num = match[1];
        const letter = match[2];
        return letters.charAt(parseInt(num, 10) % 23) === letter;
      }
    }

    if (nieRegex.test(id)) {
      const prefix = id[0] === 'X' ? '0' : id[0] === 'Y' ? '1' : '2';
      const num = prefix + id.substr(1, 7);
      return letters.charAt(parseInt(num, 10) % 23) === id[8];
    }

    if (cifRegex.test(id)) {
      const c0 = id.charAt(0);
      const body = id.substr(1, 7);
      const control = id.charAt(8);
      let sumEven = 0,
        sumOdd = 0;

      for (let i = 0; i < body.length; i++) {
        const n = parseInt(body.charAt(i), 10);
        if (i % 2 === 0) {
          const d = n * 2;
          sumOdd += Math.floor(d / 10) + (d % 10);
        } else {
          sumEven += n;
        }
      }

      const total = sumEven + sumOdd;
      const digit = (10 - (total % 10)) % 10;
      const lettersC = 'JABCDEFGHI';

      if ('PQRSNW'.includes(c0)) {
        return control === lettersC.charAt(digit);
      }

      if ('ABEH'.includes(c0)) {
        return control === String(digit);
      }

      return control === String(digit) || control === lettersC.charAt(digit);
    }

    return false;
  }

  // Paso 1: solicitar código
  requestOTP(): void {
    this.dniError = '';
    this.isLoading = true;

    if (!this.validateID(this.dni)) {
      this.dniError = 'DNI/NIE/CIF no válido';
      this.isLoading = false;
      return;
    }

    this.authService.requestOTP(this.dni).subscribe({
      next: () => {
        this.currentStep = 2;
        this.isLoading = false;
      },
      error: (error) => {
        this.dniError =
          'Error al solicitar el código. Por favor, inténtelo de nuevo.';
        this.isLoading = false;
        console.error('Error al solicitar OTP:', error);
      },
    });
  }

  // Paso 2: validar código
  validateOTP(): void {
    this.otpError = '';
    this.isLoading = true;

    this.authService.validateOTP(this.dni, this.otpCode).subscribe({
      next: () => {
        this.isLoggedIn = true;
        this.isLoading = false;
        this.goToDashboard();
      },
      error: (error) => {
        this.otpError = 'Código incorrecto. Por favor, inténtelo de nuevo.';
        this.isLoading = false;
        console.error('Error al validar OTP:', error);
      },
    });
  }

  // Navegar al dashboard
  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}
