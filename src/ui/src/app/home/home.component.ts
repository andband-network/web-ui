import { Component, OnInit } from '@angular/core';
import { RegistrationService } from "./service/registration.service";
import { AuthService } from "../common/service/auth/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private registrationService: RegistrationService, private authService: AuthService,) {
  }

  ngOnInit() {
  }

  login(credentials) {
    this.authService.login(credentials)
      .subscribe(response => {
        this.router.navigate(['/profile']);
      }, error => {
        console.log('error');
        console.log(error);
      });
  }

  resister(userDetails) {
    this.registrationService.register(userDetails);
  }

}
