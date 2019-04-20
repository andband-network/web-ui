import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { AccountComponent } from './account/account.component';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { HttpService } from "./common/service/http/http.service";
import { JwtModule } from "@auth0/angular-jwt";
import { AuthService } from "./common/service/auth/auth.service";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    AccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: AuthService.getAccessToken,
        whitelistedDomains: [HttpService.getApiDomain()],
        blacklistedRoutes: [HttpService.getApiUri() + AuthService.getAuthPath()]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
