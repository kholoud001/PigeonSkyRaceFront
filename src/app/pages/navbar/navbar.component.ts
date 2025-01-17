import { Component } from '@angular/core';
import { KeycloakService } from '../../services/keycloak/keycloak.service';
import {CommonModule} from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class NavbarComponent {
  constructor(private keycloakService: KeycloakService, private router: Router) {}

  isAuthenticated(): boolean {
    return this.keycloakService.isAuthenticated();
  }

  login() {
    this.keycloakService.login();
  }

  logout() {
    this.keycloakService.logout();
  }


  isAdmin(): boolean {
    const userRoles = this.keycloakService.getUserRoles();
    return userRoles.includes('ROLE_ADMIN');
  }

  isBreeder() {
    const userRoles = this.keycloakService.getUserRoles();
    return userRoles.includes('ROLE_USER');
  }

  isOrganizer() {
    const userRoles=this.keycloakService.getUserRoles();
    return userRoles.includes('ROLE_ORGANIZER');
  }

  changeRole() {
    this.router.navigate(['/admin/change-user-role']);
  }

  manageUsers() {
    this.router.navigate(['/admin/all-users']);

  }

  pigeonsList() {
    this.router.navigate(['/user/pigeons']);

  }

  loftsList() {
    this.router.navigate(['/user/lofts']);

  }

  competitonsList() {
    this.router.navigate(['/organizer/competitions']);

  }

  resutls() {

  }
}
