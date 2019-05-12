import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatSidenavModule,
  MatTableModule,
  MatToolbarModule
} from '@angular/material';
import { JwtModule } from '@auth0/angular-jwt';
import { NgxSpinnerModule } from 'ngx-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { AccountComponent } from './account/account.component';
import { AuthService } from './common/service/auth/auth.service';
import { DomainInfo } from './common/util/domain-info';
import { SearchResultsComponent } from './search/search-results/search-results.component';
import { SearchBoxComponent } from './search/search-box/search-box.component';
import { MessagesComponent } from './messages/messages.component';
import { ComposeMessageDialogComponent } from './messages/compose-message/compose-message-dialog.component';
import { RegistrationConfirmationComponent } from './registration/confirmation/registration-confirmation.component';
import { ConfirmationModalDialogComponent } from './common/component/dialog/confirmation-model/confirmation-modal-dialog.component';
import { RedirectComponent } from './common/component/redirect/redirect.component';
import { SearchDialogComponent } from './search/search-dialog/search-dialog.component';
import { RegistrationComponent } from './registration/registration.component';
import { BannerComponent } from './banner/banner.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    AccountComponent,
    SearchResultsComponent,
    SearchBoxComponent,
    MessagesComponent,
    ComposeMessageDialogComponent,
    RegistrationConfirmationComponent,
    ConfirmationModalDialogComponent,
    RedirectComponent,
    SearchDialogComponent,
    RegistrationComponent,
    BannerComponent,
    ResetPasswordComponent
  ],
  entryComponents: [
    ComposeMessageDialogComponent,
    ConfirmationModalDialogComponent,
    SearchDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatDialogModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatCardModule,
    NgxSpinnerModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: AuthService.getAccessToken,
        whitelistedDomains: [DomainInfo.getApiDomain()],
        blacklistedRoutes: [DomainInfo.getApiUri() + AuthService.getOAuthTokenPath()]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
