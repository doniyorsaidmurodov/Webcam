import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './pages/home/home.component';
import {WebcamModule} from 'ngx-webcam';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {WebcamComponent} from './components/webcam/webcam.component';
import {HttpClientModule} from '@angular/common/http';
import {WebcamOriginalComponent} from './components/webcam-original/webcam-original.component';
import {NgxElectronModule} from 'ngx-electron';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WebcamComponent,
    WebcamOriginalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    WebcamModule,
    FormsModule,
    NgxElectronModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
