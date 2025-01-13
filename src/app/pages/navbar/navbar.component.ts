// src/app/navbar/navbar.component.ts
import { Component } from '@angular/core';
import { KeycloakService } from '../../services/keycloak/keycloak.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class NavbarComponent {
  constructor(private keycloakService: KeycloakService) {}

  isAuthenticated(): boolean {
    return this.keycloakService.isAuthenticated();
  }

  login() {
    this.keycloakService.login();
  }

  logout() {
    this.keycloakService.logout();
  }
}
