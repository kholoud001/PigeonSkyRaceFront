import { Component } from '@angular/core';
import {KeycloakService} from 'keycloak-angular';

@Component({
  selector: 'app-secure',
  standalone: false,

  templateUrl: './secure.component.html',
  styleUrl: './secure.component.css'
})
export class SecureComponent {

  constructor(private keycloakService: KeycloakService) {}

  ngOnInit(): void {
    if (!this.keycloakService.isLoggedIn()) {
      console.log('User is not logged in');
      // Optionally redirect to login page or show a message
    }
  }

}
