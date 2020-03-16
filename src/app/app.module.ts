import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './pages/home/home.component';
import {WebcamModule} from 'ngx-webcam';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {WebcamComponent} from './components/webcam/webcam.component';
import {HttpClientModule} from '@angular/common/http';
import {WebcamOriginalComponent} from './components/webcam-original/webcam-original.component';
import {NgxElectronModule} from 'ngx-electron';
import {AuthorizationComponent} from './pages/authorization/authorization.component';
import {SettingsComponent} from './pages/settings/settings.component';
import {CookieService} from 'ngx-cookie-service';
import {ModalComponent} from './components/modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WebcamComponent,
    WebcamOriginalComponent,
    AuthorizationComponent,
    SettingsComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    WebcamModule,
    FormsModule,
    NgxElectronModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
