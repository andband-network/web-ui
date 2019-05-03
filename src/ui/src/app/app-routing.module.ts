import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AccountComponent } from './account/account.component';
import { ProfileComponent } from './profile/profile.component';
import { MessagesComponent } from './messages/messages.component';
import { SearchResultsComponent } from './search/search-results/search-results.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthGuard } from './common/service/auth/guard/auth-guard.service';
import { AnonymousAuthGuard } from './common/service/auth/guard/anonymous-auth-guard.service';
import { RedirectComponent } from './common/component/redirect/redirect.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AnonymousAuthGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile/:profileId',
    component: ProfileComponent
  },
  {
    path: 'messages',
    component: MessagesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'search-results',
    component: SearchResultsComponent
  },
  {
    path: 'account',
    component: AccountComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'confirm-registration/:token',
    component: RegistrationComponent,
    canActivate: [AnonymousAuthGuard]
  },
  {
    path: '**',
    component: RedirectComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
