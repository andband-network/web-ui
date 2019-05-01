import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AccountComponent } from './account/account.component';
import { ProfileComponent } from './profile/profile.component';
import { MessagesComponent } from './messages/messages.component';
import { SearchResultsComponent } from './search/search-results/search-results.component';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'confirm-registration/:token',
    component: RegistrationComponent
  },
  {
    path: 'account',
    component: AccountComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'profile/:profileId',
    component: ProfileComponent
  },
  {
    path: 'messages',
    component: MessagesComponent
  },
  {
    path: 'search-results',
    component: SearchResultsComponent
  },
  {
    path: '**',
    component: HomeComponent// TODO - redirect component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
