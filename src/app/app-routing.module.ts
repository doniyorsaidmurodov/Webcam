import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {AuthorizationComponent} from './pages/authorization/authorization.component';
import {SettingsComponent} from './pages/settings/settings.component';
import {GuardService} from './pages/services/guard.service';

const routes: Routes = [
  {path: '', redirectTo: 'auth', pathMatch: 'full'},
  {path: 'home', component: HomeComponent, canActivate: [GuardService]},
  {path: 'auth', component: AuthorizationComponent},
  {path: 'settings', component: SettingsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
