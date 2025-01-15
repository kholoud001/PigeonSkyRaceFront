import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Keycloak from 'keycloak-js';

@Injectable({
  providedIn: 'root',
})
export class KeycloakService {
  private keycloakInstance: Keycloak;

  constructor(private router: Router) {
    this.keycloakInstance = new Keycloak({
      url: 'http://localhost:8080',
      realm: 'pigeonSecurity',
      clientId: 'spring-boot-app',
    });
  }

  async init(): Promise<boolean> {
    try {
      const authenticated = await this.keycloakInstance.init({
        onLoad: 'login-required',
        silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
      });

      if (authenticated) {
        console.log('User is authenticated');
        this.storeToken();
        // this.redirectUserBasedOnRole();
      } else {
        console.warn('User is not authenticated');
      }

      return authenticated;
    } catch (error) {
      console.error('Keycloak initialization error:', error);
      throw error;
    }
  }

  login(): Promise<void> {
    return this.keycloakInstance.login({
      redirectUri: window.location.origin,
    });
  }

  logout(): Promise<void> {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    return this.keycloakInstance.logout({
      redirectUri: window.location.origin,
    });
  }

  refreshToken(): Promise<void> {
    return this.keycloakInstance.updateToken(70).then(() => {
      this.storeToken();
    }).catch((err) => {
      console.error('Token refresh failed:', err);
      this.logout();
    });
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  getProfile(): Promise<any> {
    return this.keycloakInstance.loadUserProfile();
  }

  isAuthenticated(): boolean {
    return !!this.keycloakInstance.token;
  }

  hasRole(role: string): boolean {
    const tokenParsed = this.keycloakInstance.tokenParsed;
    if (tokenParsed && tokenParsed.realm_access) {
      return tokenParsed.realm_access.roles.includes(role);
    }
    return false;
  }

  private storeToken(): void {
    localStorage.setItem('token', this.keycloakInstance.token || '');
    localStorage.setItem('refreshToken', this.keycloakInstance.refreshToken || '');
    console.log('Token stored:', this.keycloakInstance.token);
  }

  getUserRoles(): string[] {
    const keycloakInstance = this.keycloakInstance;
    return keycloakInstance && keycloakInstance.realmAccess
      ? keycloakInstance.realmAccess.roles
      : [];
  }

  // private redirectUserBasedOnRole(): void {
  //   const tokenParsed = this.keycloakInstance.tokenParsed;
  //   const roles = tokenParsed?.realm_access?.roles || [];
  //
  //   if (roles.includes('ROLE_ADMIN')) {
  //     this.router.navigate(['/admin']);
  //   } else if (roles.includes('ROLE_USER')) {
  //     this.router.navigate(['/user']);
  //   } else if (roles.includes('ROLE_ORGANIZER')) {
  //     this.router.navigate(['/organizer']);
  //   } else {
  //     this.router.navigate(['/unauthorized']);
  //   }
  // }



}
