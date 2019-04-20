import { Component } from '@angular/core';
import { AuthService } from "./common/service/auth/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private router: Router, private authService: AuthService) {
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  signOut(): void {
    AuthService.signOut();
    this.router.navigate(['/']);
  }

}
