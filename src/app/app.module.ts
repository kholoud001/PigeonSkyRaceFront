import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS, HttpClient} from '@angular/common/http';

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
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

export function kcFactory(kcService: KeycloakService) {
  return () => kcService.init().catch(error => {
    console.error('Keycloak init failed', error);
  });
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
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
        FormsModule,
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      })    ],
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
    },
    TranslateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

