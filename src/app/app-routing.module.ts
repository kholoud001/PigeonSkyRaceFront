import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { KeycloakGuard } from './auth/keycloak.guard';


const routes: Routes = [
  { path: '', component: AppComponent, canActivate: [KeycloakGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
