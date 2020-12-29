import { LoaderService } from './../services/loader.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NoopInterceptor } from './request.intercept';
import { API_URLS } from './../services/utils/URLS';
import { SharedLibsModule } from './Shared/shared-libs/shared-libs.module';
import { LoginComponent } from './auth/login/login.component';
import { AppRoutingModule } from './app-routing.module';

import { OAuthVerificationComponent } from './auth/oauth-verification/oauth-verification.component'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations"
import { DatePipe } from '@angular/common';
import { ErrorPageComponent } from './error-page/error-page.component';
import { NgxUiLoaderModule, NgxUiLoaderRouterModule, NgxUiLoaderConfig, NgxUiLoaderHttpModule } from 'ngx-ui-loader';



let loaderConfig:NgxUiLoaderConfig = {};
let tblLoaderConfig = {};
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    OAuthVerificationComponent,
    ErrorPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgxUiLoaderModule.forRoot(loaderConfig),
    FormsModule,
    ReactiveFormsModule,
    NgxUiLoaderRouterModule,
    SharedLibsModule
    

  ],
  providers: [API_URLS,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NoopInterceptor,
      multi: true
    },
    DatePipe,
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }


export class config {

  constructor(private demoService:LoaderService){
    loaderConfig = this.demoService.config;
    tblLoaderConfig = this.demoService.tblLoaderConfig;
  }
}