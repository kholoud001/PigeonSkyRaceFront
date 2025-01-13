import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { KeycloakService } from '../keycloak/keycloak.service'; // Your service for Keycloak

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private keycloakService: KeycloakService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const requiredRoles = route.data['roles'] as Array<string>;

    if (this.keycloakService.isAuthenticated() && this.hasRequiredRole(requiredRoles)) {
      return true;
    }

    this.router.navigate(['/unauthorized']);
    return false;
  }

  private hasRequiredRole(requiredRoles: Array<string>): boolean {
    for (let role of requiredRoles) {
      if (this.keycloakService.hasRole(role)) {
        return true;
      }
    }
    return false;
  }
}
