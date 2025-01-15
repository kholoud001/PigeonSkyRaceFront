import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpTokenInterceptor } from './services/interceptor/http-token.interceptor';
import { KeycloakService } from './services/keycloak/keycloak.service';
import { UnauthorizedComponent } from './modules/unauthorized/unauthorized.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { FooterComponent } from './pages/footer/footer.component';
import {RouterModule} from '@angular/router';
import {AdminComponent} from './modules/admin/welcome/admin.component';
import {ChangeUserRoleComponent} from './modules/admin/change-user-role/change-user-role.component';
import {FormsModule} from "@angular/forms";
import { ManageUsersComponent } from './modules/admin/manage-users/manage-users.component';

export function kcFactory(kcService: KeycloakService) {
  return () => kcService.init().catch(error => {
    console.error('Keycloak init failed', error);
  });
}

@NgModule({
  declarations: [
    AppComponent,
    UnauthorizedComponent,
    FooterComponent,
    ChangeUserRoleComponent,
    ManageUsersComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        NavbarComponent,
        RouterModule,
        FormsModule
    ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: kcFactory,
      multi: true,
      deps: [KeycloakService]
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

