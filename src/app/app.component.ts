import { Component } from '@angular/core';
import {KeycloakService} from './services/keycloak/keycloak.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pigeon';


  constructor(private translate: TranslateService) {}

  changeLanguage(event: any): void {
    const language = event.target.value;
    this.translate.use(language);
  }
}
