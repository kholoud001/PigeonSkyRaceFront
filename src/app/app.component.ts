import { Component } from '@angular/core';
import {KeycloakService} from './services/keycloak/keycloak.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pigeon';


}
