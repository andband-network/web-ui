import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatDialogModule, MatInputModule } from '@angular/material';
import { JwtModule } from '@auth0/angular-jwt';

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
import { RegistrationComponent } from './registration/registration.component';
import { ConfirmationModalDialogComponent } from './common/component/confirmation-model-dialog/confirmation-modal-dialog.component';

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
    RegistrationComponent,
    ConfirmationModalDialogComponent
  ],
  entryComponents: [
    ComposeMessageDialogComponent,
    ConfirmationModalDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
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
