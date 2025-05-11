import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: false,
})
export class NavbarComponent {
  @Input() userDisplayName: string = '';
  @Input() userDni: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  // Cerrar sesión
  logout(): void {
    this.authService.logout();
  }
}
